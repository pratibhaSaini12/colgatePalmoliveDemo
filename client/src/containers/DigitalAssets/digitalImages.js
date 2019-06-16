import React, { Component } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Header from '../Header/index';
import Aside from '../SideBar/index';
import { Link } from "react-router-dom"
import ImageContainer from "../../components/imageContainer"
import Pagination from "react-js-pagination";
import ReactLoading from 'react-loading'
import AssetJsonModel from '../ObjectJsonModel/assetStateToJson'
import axios from "axios";
import {Alert} from 'react-bootstrap'
import Moment from 'moment';
class DigitalImages extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Loading: false,
            asset_id: '',
            asset_name: '',
            _assetImageId: '',
            image: '',
            pictures: [],
            stateUpdate: false,
            asset_data: '',
            asset_type: '',
            filteredList: '',
            listToFilter: '',
            assetList: [],
            existAsset: '',
            deleteAssetId: '',
            countItems: 0,
            selectedProducytId: [],
            pageactive: 1,
            dataPerPage: 10,
            allAssets : true,
            imagesForList: "All",
            productImageList: [],
            successMessage:'',
            selectAssetIds:[],
            listview:false
        }
    }
    getAssetList(isDrive) { 
        let self = this
            self.setState({
                Loading:true
            });
            if(isDrive){
                self.setState({ successMessage: 'image fetched successfully !!' })
            }
        try {
            axios.get("/api/getAssetList").then(function (response) {
                console.log("Assety list ", response.data);

                if (response.data) {
                    self.setState({
                        assetList: response.data.assets,
                        filteredList: response.data.assets,
                        listToFilter: response.data.assets,
                        Loading: false
                    })
                    
                    return
                    // document.getElementById("colgate").setAttribute("data-dismiss","modal")
                }

            }).catch(function (error) {
                self.setState({ Loading: false })
                console.log("error API getAssetList is ", error);
                return
            })
        } catch (err) {
            console.log("catch err=========getAssetList", err)
            return
        }
    }
    componentWillMount() {
        this.getAssetList();
    }


    componentWillReceiveProps(nextProps) {
        console.log("new props ",nextProps)
    }

    change(e) {
        console.log("e.target.value", e.target.value)
        console.log("e.target.name", e.target.name)
        // this.setState({ errMessage: false })
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    //handeling image upload
    handleUploadAttachment(ev) {
        let self = this
        let { assetList } = self.state
        var idCardBase64
        var assetBodyData
        self.setState({
            Loading:true,
            existAsset:''
        })
        ev.preventDefault()
        var FileSize = self.uploadInput;
        if (FileSize !='') {
            const data = new FormData();
            data.append('file',self.uploadInput.files[0]);
            axios.post("/api/compareassets",data).then(function (response) {
                console.log('response'+response.data);
                 if(response.data.error !== undefined){
                    self.setState({
                        asset_data:self.uploadInput.files[0],
                        image:URL.createObjectURL(self.uploadInput.files[0]),
                        existAsset:response.data.key
                     })
                 }else{
                    self.setState({
                        asset_data:self.uploadInput.files[0],
                        image:URL.createObjectURL(self.uploadInput.files[0]),
                     })
                 }
                 self.setState({
                    Loading:false
                })
            })     
         }else{
            self.setState({
                Loading:false
            })
         }
            
    }

    filterSearch(event) {
        this.setState({ stateUpdate: true })
        console.log('state on filtersearcch===', this.state)
        var newList = this.state.listToFilter
        var searchString = event.target.value
        var newFilteredList = newList.filter(function (searchResult) {
            if (
                ((typeof searchResult.asset_name != "undefined" && searchResult.asset_name != null && searchResult.asset_name !== "") && searchResult.asset_name.toLowerCase().includes(searchString.toLowerCase()))
            ) {
                return searchResult
            }
        })

        this.setState({
            filteredList: newFilteredList,
            listToFilter: this.state.listToFilter,
            stateUpdate: false
        })
    }

    clearState() {
        let self = this
        self.setState({
            image:'',
            existAsset:'',
            asset_id: '',
            asset_name: '',
            uploadInput:''
        })
    }

    async submitAssets() {
        let self = this
        self.setState({ Loading: true })
        this.clearState();
        console.log("state on save====", this.state);
        let state = self.state;
        const data = new FormData();
    
        data.append('file',state.asset_data);
        if(sessionStorage.getItem('userData') !== null ) {
           let tempData = JSON.parse(sessionStorage.getItem('userData'))
            console.log('------',tempData.userData.first_name);
            data.append('username',tempData.userData.first_name);
        }
        data.append('time',(new Date()).getTime());
        await axios.post("/api/createNewAsset",data).then(function (response) {
            console.log('resposne from api==', response)
            if (response.data.asset) {
                self.getAssetList();
            } else {
                self.setState({ Loading: false })
                console.log("resposne eror submitAssets==", response)
            }
            $('#colgate').modal('hide')
            

        }).catch(function (error) {
            self.setState({ Loading: false })
            console.log("error============", error)
        })
    }

    async getImageFromDrive() {
        if(sessionStorage.getItem('userData')!== null ) {
            let tempData = JSON.parse(sessionStorage.getItem('userData'));
            var fullName = tempData.userData.first_name+" "+tempData.userData.last_name
            console.log("tempData is ",tempData.userData.first_name)
            try {
                let self = this;
                self.setState({ Loading: true });
                await axios.get("/api/uploadfilesfromgoogledrive?name="+fullName).then(function (response) {
                    console.log('resposne from /api/getAssetFromDrive==', response)
                    if (response.status === 200 && response.data.success) {
                        //$("#successGoogle").show();
                        setTimeout(() => {
                            self.getAssetList(true);
                        }, 1500);
                    }
                }).catch(function (error) {
                    self.setState({ Loading: false })
                    console.log("error============/api/getAssetFromDrive", error)
                })
                // window.location.href = "/digitalImages"
            } catch (e) {
                console.log("not wokreddd===========")
            }
        }
    }

    async deleteProductById() {
        try{
            console.log('delete asset by id', this.state.deleteAssetId)
            let self = this
            // self.setState({ Loading: true })
            console.log("this.stateeeeee", self.state)
            if (self.state.deleteAssetId) {
                await axios.post("/api/deleteAssetByID", { id: self.state.deleteAssetId }).then(function (response) {
                    console.log('resposne from Delete api==', response)
                    if (response.data.asset) {
                        self.setState({ deleteAssetId: '', Loading: false })
                        window.location.href = "/digitalImages"
                    }
    
                }).catch(function (error) {
                    self.setState({ deleteAssetId: '', Loading: false })
                    console.log("error in delete product", error)
                })
            }
        }catch(e){
            
        }
    }
    
    /**
     * Method for select Product and handle  
     * @param {e,index,key}
     */
    handleIcon(e, index, key) {
        try {
            let counter = this.state.countItems
            if (counter < 0) {
                counter = 0
            }
            let selectedProdeuctIds = this.state.selectedProducytId
            let selectAssetIds = this.state.selectAssetIds
            let domIcon = document.getElementById(`activebtn${index}`)
            if (domIcon.style.display === '' || domIcon.style.display === 'none') {
                counter = counter + 1
                selectedProdeuctIds.push(key)
                selectAssetIds.push(key.asset_id)
                document.getElementById(`activebtn${index}`).style.display = 'block'
                document.getElementById(`asset-checkbox${index}`).checked = true;
                document.getElementById(`card-hover${index}`).style.visibility = 'hidden'
            } else {
                counter = counter - 1
                // document.getElementById(`activebtn${index}`).style.display = 'none'
            }

            this.setState({ countItems: counter, selectedProducytId: selectedProdeuctIds,selectAssetIds:selectAssetIds })


        }
        catch (e) { console.log("err", e) }


    }

    handleCheckbox(e,index,key){
        if(document.getElementById(`asset-checkbox${index}`).checked){
            this.handleIcon(e, index, key)
        }else{
            this.handledeSelect(e, index, key)
        }
    }

    handleChange(e) {
        var val = e.target.value
        let self = this

        self.setState({
            dataPerPage: Number(val)
        })
    }


    // method for change active page pagination
    changeactive(page) {
        this.setState({
            pageactive: page
        })
    }

    //method for change page number in pagination
    handlePageChange(pageNumber) {
        let self = this
        console.log("valueeeee====", pageNumber)
        self.setState({
            pageactive: pageNumber
        })
    }

    /**
     * Method for Handel deSlect product 
     * @param(e,index,key) 
     * 
     * */
    handledeSelect(e, index, key) {
        try {
            let counter = this.state.countItems
            let selectedProdeuctIds = this.state.selectedProducytId
            let selectAssetIds = this.state.selectAssetIds
            counter = counter - 1
            if (counter < 0) {
                counter = 0
            }
            let domIcon = document.getElementById(`card-hover${index}`).style.visibility = 'visible'
            document.getElementById(`activebtn${index}`).style.display = 'none'
            document.getElementById(`asset-checkbox${index}`).checked = false;
            selectedProdeuctIds.splice(selectedProdeuctIds.indexOf(key), 1)
            selectAssetIds.splice(selectAssetIds.indexOf(key.asset_id),1)
            this.setState({ countItems: counter,selectAssetIds:selectAssetIds })

        } catch (e) { console.log("error ", e) }

    }

    /****
     * Method for select all Product
     * @param{}
     ***/
    selectAllProduct(e) {
        let allproduct = this.state.filteredList
        let selectAssetIds = [];
        if (allproduct.length > 0) {
            allproduct.map((key, index) => {
                this.handleIcon(e, index, key)
                selectAssetIds.push(key.asset_id);
            })
            this.setState({ countItems: allproduct.length,selectAssetIds:selectAssetIds })
            console.log('-------------',selectAssetIds);
        }

    }

    /**Method for hide and show menu option s */
    // showhideSpan() {
    //     let spanSho = document.getElementsByClassName('counting-action-section')[1]
    //     try {
    //         if (this.state.countItems > 0) {
    //             spanSho.style.display = 'block'
    //         } else {
    //             spanSho.style.display = 'none'
    //         }
    //     } catch (e) { }

    // }

    /**
     * 
     * @param {event,index,key} 
     */
    clearAllProduct(e) {
        try {

            let allproduct = this.state.filteredList
            if (allproduct.length > 0) {
                allproduct.map((key, index) => {
                    this.handledeSelect(e, index, key)
                    this.setState({ countItems: 0 })
                })
                this.setState({ countItems: 0,selectAssetIds:[] })
            }
        } catch (e) { console.log("error", e) }

    }
    chnageImages (e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render() {


        console.log("states in digitalImage", this.state.successMessage)
        let { filteredList } = this.state
        const { assetList, existAsset, productImageList ,image } = this.state;
        let { dataPerPage } = this.state
        var list = filteredList ? filteredList.slice((this.state.pageactive - 1) * dataPerPage, (this.state.pageactive) * dataPerPage) : ''
       
        //this.showhideSpan()
        console.log(assetList);
        return (
            <div>
                {/* <div className="preloader">
                    <div className="loader">
                        <div className="loader__figure" />
                        <p className="loader__label">Please Wait..</p>
                    </div>
                </div> */}
                {
                    this.state.Loading === true && <div className="loader-react">
                        <ReactLoading type={'spinningBubbles'} color={'#554b6c'} className="reactLoader" />
                    </div>
                }

               
                <div id="main-wrapper">
                    <Header />
                    <Aside active={"digital"} />
                    <div className="page-wrapper">
                        <div className="container-fluid r-aside custome_container">
                            <div className="page-header">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="counting-action-section">
                                            <div className="row">
                                            </div>
                                        </div>
                                        <h2 className="page-title">Digital Assets Management-Image</h2>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                            {
                                    this.state.successMessage===''?'':<Alert color="danger">{this.state.successMessage}</Alert>
                            }
                                <div className="col-md-12">
                                    <div id="filter-panel" className="filter-panel filtercustome" style={{ display: 'none' }}>
                                        <div className="panel panel-default">
                                            <div className="panel-body">
                                                <form>
                                                    <div className="row custom_row">
                                                        <div className="col-md-12">
                                                            <div className="row">
                                                            <div className="col-md-4">
                                                                    <div className="form-group">
                                                                        <span> Coming soon....</span>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <div className="form-group">
                                                                        <select id="pref-perpage" className="form-control">
                                                                            <option value={0}>Type</option>
                                                                            <option value="PNG">PNG</option>
                                                                            <option value="JPEG">JPEG</option>
                                                                            <option value="TIFF">TIFF</option>
                                                                            <option value="SVG">SVG</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <div className="form-group">
                                                                        <select id="pref-perpage" className="form-control">
                                                                            <option value={0}>Size</option>
                                                                            <option value="Small">Small</option>
                                                                            <option value="Medium">Medium</option>
                                                                            <option value="Large">Large</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {/* <div className="col-md-4">
                                                            <div className="form-group">
                                                                <input className="form-control search_filter" type="text" name="search" placeholder="Search by ID or Filename" />
                                                                <i className="ti-search filtersearch" />
                                                            </div>
                                                        </div> */}
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* card row start ---------------------------------------------------------------------*/}
                            <div className="row mar_bt_30">
                                {/* <div className="col-md-4">
                                    <input class="content-search" type="text" name="search" placeholder="Filter Records" />
                                 
                                </div> */}
                                <div className="col-md-4">
                                <div className="row">
                                    <div className="col-md-9">
                                    <input className="content-search" type="text" name="search" onChange={(e) => this.filterSearch(e)} placeholder="Filter Records" />
                                    </div>
                                    <div className="col-md-3">
                                    {/* <select name="imagesForList" aria-controls="example" value={this.state.imagesForList} onChange={(e)=> this.chnageImages(e)} class="form-control form-control-sm autowidth" >
                                        <option value="All">All Assets</option>
                                        <option value="Product">Product Assets</option>
                                        <option value="Assets">Other Assets</option>
                                    </select> */}
                                    </div>
                                    </div>
                                    </div>
                                <div className="filter float-right col-md-8">
                                    <button className="google_btn float-right" onClick={(e) => this.getImageFromDrive(this)}><i className="ti-download"></i>get images from google</button>
                                    <a className="new-product primary-button float-right" href="javscript:void(0);" data-toggle="modal" data-target="#colgate"> <i className="ti-plus"></i> Upload Assets </a>
                                    <a href="javscript:void(0);" onClick={(e)=>{this.setState({listview:true})}} className="filter-btn list-view paginationshow">filter</a>
                                    <a href="javscript:void(0);" className="filter-btn card-view noactive" onClick={(e)=>{this.setState({listview:false})}} >filter</a>
                                    <a href="javscript:void(0)" className="filter-btn filter droptoggle_custome" id="filter">filter</a>
                                    <div className="selected-actions">
                                        <div className="option-box drop-option-link">
                                            <div className="nav-item dropdown dropcolgate">
                                                <a className="nav-link custome_navlink" href="javascript:void(0)" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                                    <div className="option-box select-count selected"><span id="Counting">{this.state.countItems}</span> <span className="selected-text">Selected</span></div>
                                                    <div className="dot-icon"><ImageContainer src="icons/option-all.png" /></div>
                                                </a>
                                                <div className="dropdown-menu drop_20">
                                                    <div className="counting-action-section show">
                                                        <div className="selections">
                                                            <div className="group-selection">
                                                                <div className="option-box select-all"><a href="javscript:void(0);" onClick={(e) => { this.selectAllProduct(e) }}>Select All</a></div>
                                                                <div className="option-box clear-all"><a onClick={(e) => { this.clearAllProduct(e) }} href="javscript:void(0)">Clear All</a></div>
                                                            </div>
                                                            <div className="group-action">
                                                                <div className="option-box delete" ><a data-toggle="modal" data-target="#delete" onClick={(e)=>this.setState({deleteAssetId:this.state.selectAssetIds})}>Delete</a></div>
                                                                <div className="option-box download"><a href="javscript:void(0)">Download</a></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* <a className="dropdown-item" href="javascript:void(0)"><i className="ti-check" />Approve</a>
                                                    <a className="dropdown-item" href="javascript:void(0)"><i className="ti-close" />Reject</a> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <select name="example_length" aria-controls="example" value={this.state.dataPerPage} onChange={(e) => this.handleChange(e)} class="form-control form-control-sm">
                                        <option value="5">5 per page</option>
                                        <option value="10">10 per page</option>
                                        <option value="25">25 per page</option>
                                        <option value="100">All</option>
                                    </select>

                                </div>
                            </div>
                            <div className="table-view digitalImage tabtable" style={this.state.listview ? {display:'block'}:{display:'none'}}>
                                <div className="row">


                                    <div className="col-md-12">

                                        <table id="example" className="table">
                                            <thead>
                                                <tr className="starting">
                                                    <th scope="col"><input type="checkbox" onClick={(e) => { e.target.checked ? this.selectAllProduct(e) : this.clearAllProduct(e)}} /></th>
                                                    <th scope="col">Image</th>
                                                    <th scope="col">Name</th>
                                                    <th scope="col">Type</th>
                                                    <th scope="col">Size</th>
                                                    <th scope="col">Created Date</th>
                                                    <th />
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {list.length > 0 && list !== undefined ?
                                                    list.map((asset, index) => {
                                                       return <tr key={index}>
                                                            <td><input id={`asset-checkbox${index}`} type="checkbox" onClick={(e) => { this.handleCheckbox(e, index, asset) }} /></td>
                                                            <td>
                                                                <div className="image-thumb">
                                                                    <img className="img-fluid" src={asset.path} />
                                                                </div>
                                                            </td>
                                                            
                                                            <td className="productlist_name">{asset.asset_name}</td>
                                                            <td>{asset.asset_type}</td>
                                                            <td>{Number.parseFloat(asset.size).toFixed(2)} MB</td>
                                                            <td>{Moment(asset.created_at).format('MM/DD/YYYY HH:mm A')}</td>
                                                            <td><div className="row-hover">
                                                                <div className="row-link-options"> <Link className="icon view-icon" to={{ pathname: '/digitalImagePage', state: { _data: asset } }}><ImageContainer src="icons/view.png" /></Link>
                                                                    <a className="icon delete-icon" href="javscript:void(0)" data-toggle="modal" data-target="#delete" onClick={(e) => this.setState({ deleteAssetId: [asset.asset_id] })}> 
                                                                        <ImageContainer src="icons/delete.png" />
                                                                    </a>
                                                                </div>
                                                            </div></td>
                                                        </tr>
                                                    }) : ''}
                                                
                                            </tbody>
                                        </table>
                                        <div className="pagebottompart">
                                            {/* <p className="float-left col-md-10 dataTables">Showing 1 to 5 of 8 entries</p>
                                            <div className="col-md-2 pull-right">
                                                <ul className="pagination">
                                                    <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                                                    <li className="page-item"><a className="page-link" href="#">1</a></li>
                                                    <li className="page-item active"><a className="page-link" href="#">2</a></li>
                                                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                                                    <li className="page-item"><a className="page-link" href="#">Next</a></li>
                                                </ul>
                                            </div> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="row-view" style={this.state.listview ? {display:'none'}:{display:'block'}}>
                            <div className="row digitalImage">
                                { list.length > 0 && list !== undefined ?
                                    list.map((asset, index) => {
                                        return <div className="col-xs-12 col-sm-4 col-md-3 card-block">
                                            <div className="card card custome_img document_list document_list">
                                                <div className="card-body text-center">
                                                    <span className="digitalImageIco">
                                                        <ImageContainer src="icons/img.png" />
                                                    </span>
                                                    <a className="icon check-icon activebtn" href="javscript:void(0);" id={`activebtn${index}`} onClick={(e) => { this.handledeSelect(e, index, asset) }} > <ImageContainer src="icons/check.png" /> </a>
                                                    <p className="img"><img className="img-fluid" src={asset.path} /></p>
                                                    <div className="card-info">
                                                        <h4 className="card-title">{asset.asset_name}</h4>
                                                        <p className="card-text">{Moment(asset.created_at).format('MM/DD/YYYY HH:mm A')}</p>
                                                        <p className="card-text">{Number.parseFloat(asset.size).toFixed(2)} MB</p>
                                                    </div>
                                                </div>
                                                <div className="card-hover" id={`card-hover${index}`}>
                                                    <div className="card-link-options">
                                                        <Link className="icon view-icon" to={{ pathname: '/digitalImagePage', state: { _data: asset } }}><ImageContainer src="icons/view.png" /></Link>
                                                        {/* <Link className="icon edit-icon" to={{ pathname: '/editDigitalImage', state: { _data: asset } }}><ImageContainer src="icons/edit.png" /></Link> */}
                                                        <a className="icon delete-icon" href="javscript:void(0);" data-toggle="modal" data-target="#delete" onClick={(e) => this.setState({ deleteAssetId: [asset.asset_id] })}> <ImageContainer src="icons/delete.png" />
                                                        </a>  <a className="icon check-icon select_box" href="javscript:void(0);" onClick={(e) => { this.handleIcon(e, index, asset) }}> <ImageContainer src="icons/check.png" /> </a> </div>
                                                </div>
                                            </div>

                                        </div>

                                    })
                                    : <div></div>
                                }

                            </div>
                            {/* product images */}
                            <div className="row digitalImage">
                                {productImageList.length > 0 && productImageList !== undefined ?
                                    productImageList.map((asset, index) => {
                                        return <div className="col-xs-12 col-sm-4 col-md-3 card-block">
                                            <div className="card document_list">
                                                <div className="card-body text-center">
                                                    <span className="digitalImageIco">
                                                        <ImageContainer src="icons/img.png" />
                                                    </span>
                                                    <a className="icon check-icon activebtn" href="javscript:void(0);" id={`activebtn${index}`} onClick={(e) => { this.handledeSelect(e, index, asset) }} > <ImageContainer src="icons/check.png" /> </a>
                                                    <p className="img"><img className="img-fluid" src={asset.image} /></p>
                                                    <div className="card-info">
                                                        <h4 className="card-title">{asset.fileName !== undefined ? asset.fileName : ''}</h4>
                                                        <p className="card-text">{asset.created_at!== undefined ? asset.created_at : ''}</p>
                                                        <p className="card-text">{asset.fileSize!== undefined ? asset.fileSize : ''}</p>
                                                    </div>
                                                </div>
                                                <div className="card-hover" id={`card-hover${index}`}>
                                                    <div className="card-link-options">
                                                        <Link className="icon view-icon" to={{ pathname: '/digitalImagePage', state: { _data: asset } }}><ImageContainer src="icons/view.png" /></Link>
                                                        {/* <Link className="icon edit-icon" to={{ pathname: '/editDigitalImage', state: { _data: asset } }}><ImageContainer src="icons/edit.png" /></Link> */}
                                                        <a className="icon delete-icon" href="javscript:void(0);" data-toggle="modal" data-target="#delete" onClick={(e) => this.setState({ deleteAssetId: asset.id !== undefined ? asset.id : '' })}> <ImageContainer src="icons/delete.png" />
                                                        </a>  <a className="icon check-icon select_box" href="javscript:void(0);" onClick={(e) => { this.handleIcon(e, index, asset) }}> <ImageContainer src="icons/check.png" /> </a> </div>
                                                </div>
                                            </div>
                                        </div>
                                    })
                                    : <div></div>
                                }

                            </div>


                        </div>
                        <div className="pagination pull-right my-1 float-right">
                                <Pagination
                                    hideFirstLastPages
                                    activePage={this.state.pageactive}
                                    itemsCountPerPage={dataPerPage}
                                    totalItemsCount={filteredList.length}
                                    pageRangeDisplayed={4}
                                    onChange={this.handlePageChange.bind(this)}
                                    prevPageText='Prev'
                                    nextPageText='Next'
                                />
                            </div>
                    </div>
                    {/* The Modal */}
                    <div className="modal fade allmodalcolgate" id="colgate">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                {/* Modal Header */}
                                <div className="modal-header">
                                    <h4 className="modal-title title_modalheader" >Upload Assets</h4>
                                    <button type="button" className="close" data-dismiss="modal" onClick={this.clearState.bind(this)}>×</button>
                                </div>
                                {/* Modal body */}
                                <div className="modal-body filtercustome">
                                    <form>
                                       
                                        <div className="avatar-upload">
                                            <div className="row">
                                        <div className="col-md-6">
                                        {existAsset !== '' ?
                                              <span style={{'color':'red','margin-right':'66px;'}}>Asset already Exist </span>
                                           
                                            : ''}
                                            <div className="avatar-preview">
                                                <div id="imagePreview">
                                                    
                                                    {image !== '' && image !== undefined ?
                                                        <img src={image} className="digital_img Assets" />
                                                        : ''} 
                                                </div>
                                               </div>
                                            </div>
                                            
                                            {
                                                existAsset !== '' && existAsset !== undefined ?
                                                <div className="col-md-6">
                                                      <span>Duplicate Asset</span>
                                                <div className="avatar-preview">
                                                   
                                                    <div id="imagePreview">
                                                            <img src={existAsset.path} className="digital_img Assets" />
                                                    </div>
                                                </div>
                                                </div>
                                                : ''
                                            }  
                                            </div>
                                            <div className="avatar-edit">
                                                <input type="file" ref={(ref) => { this.uploadInput = ref }} onChange={this.handleUploadAttachment.bind(this)} style={{ display: 'none' }} />
                                                <a onClick={(e) => this.uploadInput.click()} className="create-new-link">Upload Files</a>
                                                
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-primary" onClick={this.submitAssets.bind(this)}>CREATE</button>
                                    <button type="button" className="btn btn-outline-primary" data-dismiss="modal" onClick={this.clearState.bind(this)}>CANCEL</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* The product delete */}
                    <div className="modal fade allmodalcolgate" id="delete">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                {/* Modal Header */}
                                <div className="modal-header">
                                    <h4 className="modal-title title_modalheader">Delete Assets</h4>
                                    <button type="button" className="close" data-dismiss="modal">×</button>
                                </div>
                                {/* Modal body */}
                                <div className="modal-body filtercustome">
                                    <h1 className="delete_product_list">Are you sure you want to delete</h1>
                                </div>
                                {/* Modal footer */}
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-primary removeproduct" data-dismiss="modal" onClick={this.deleteProductById.bind(this)}>Yes</button>
                                    <button type="button" className="btn btn-outline-primary" data-dismiss="modal">No</button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
            </div>
        )
    }
}


export default DigitalImages;