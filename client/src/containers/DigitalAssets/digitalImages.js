import React, { Component } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Header from '../Header/index';
import Aside from '../SideBar/index';
import { Link } from "react-router-dom"
import ImageContainer from "../../components/imageContainer"
import ReactLoading from 'react-loading'
import AssetJsonModel from '../ObjectJsonModel/assetStateToJson'
import axios from "axios";
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
            existAsset: ''
        }
    }

    getAssetList() {
        let self = this
        try {
            axios.get("/api/getAssetList").then(function (response) {
                console.log("Assety list ", response.data);
                if (response.data) {
                    self.setState({
                        assetList: response.data.assets,
                        filteredList: response.data.assets,
                        listToFilter: response.data.assets,
                        // stateUpdate: true,
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
    async componentWillMount() {
        //getting images from JSONfile
        let self = this
        self.setState({ Loading: true })
        // let assetData = []
        try {
            await this.getAssetList()
            //     await axios.post("/api/get-asset").then((res) => {
            //         console.log("image found===========", res)
            //         if (res.status === 200) {
            //             // let data = res.data.data[0].assetData
            //             // data = JSON.parse(data)
            //             // let image = "data:" + data.data.mimetype + ";base64," + data.data.data
            //             // convert values into object
            //             if (res.data.data.length) {
            //                 res.data.data.map((assetString) => {
            //                     let assetJsonData = JSON.parse(assetString.assetData)
            //                     assetData.push({
            //                         data: assetJsonData.data,
            //                         id: assetJsonData.data.id,
            //                         image: "data:" + assetJsonData.data.mimetype + ";base64," + assetJsonData.data.data
            //                     })
            //                 })
            //                 console.log("assetData=============", assetData)
            //             }
            //             self.setState({
            //                 pictures: assetData,
            //                 Loading: false
            //             })

            //         } else {
            //             self.setState({Loading: false})
            //             console.log("error in image fetching response", res)
            //         }
            //     })
        } catch (err) {
            self.setState({ Loading: false })
            console.log("error in will mount catch", err)
        }
    }

    componentDidMount() {
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
        console.log("ev========", ev)
        let self = this
        let { assetList } = self.state
        var idCardBase64
        var assetBodyData
        ev.preventDefault()
        var FileSize = self.uploadInput.files[0].size / 1024 / 1024;
        if (FileSize <= 5) {
            self.getBase64(self.uploadInput.files[0], (result) => {
                var base64 = result.split(",");
                idCardBase64 = base64[1]

                assetBodyData = AssetJsonModel._getJsonDataFromAsset({ base64: idCardBase64, fileName: self.uploadInput.files[0].name, mimetype: self.uploadInput.files[0].type, id: this.state.asset_id })
                console.log("===assetBodyData====", assetBodyData)
                self.setState({
                    image: assetBodyData.data,
                })
                //compare image here
                let duplicateAsset = assetList.filter((asset) => asset.asset_data === idCardBase64)
                if (duplicateAsset.length === 0) {
                    console.log("new image found")
                    self.setState({
                        asset_data: idCardBase64,
                        asset_type: self.uploadInput.files[0].type
                    })
                } else {
                    console.log("Image already exist", duplicateAsset[0])
                    self.setState({ existAsset: duplicateAsset[0] })
                }
                // axios.post("/api/upload/asset", assetBodyData).then((res) => {
                //     console.log("error in response", res)
                //     if (res.data) {
                //         console.log("res in uploading", res)
                //         return
                //     } else {
                //         console.log("error in response", res)
                //         return
                //     }
                // }).catch((err) => {
                //     console.log("errorrrrrrrrrrrrrr in uploading", err)
                //     return
                // })

            });
        }
        else {
            console.log("fileSizeExceedMessage=======")
        }
    }

    //Method to get Bas64 of file
    getBase64(file, cb) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            cb(reader.result)
        };
        reader.onerror = function (error) {
        };
    }

    clearState() {
        let self = this
        self.setState({
            Loading: false,
            asset_id: '',
            asset_name: '',
            _assetImageId: ''
        })
    }

    async submitAssets() {
        let self = this
        self.setState({ Loading: true })
        console.log("state on save====", this.state);
        let state = self.state;
        let assetObj = {
            asset_id: state.asset_id,
            asset_name: state.asset_name,
            _assetImageId: state.asset_id,
            asset_data: state.asset_data,
            asset_type: state.asset_type
        }
        console.log("assetObj on submit", assetObj)
        await axios.post("/api/createNewAsset", assetObj).then(function (response) {
            console.log('resposne from api==', response)
            if (response.data.asset) {
                self.getAssetList()
                window.location.href = "/digitalImages"
            } else {
                self.setState({ Loading: false })
                console.log("resposne eror submitAssets==", response)
            }

        }).catch(function (error) {
            self.setState({ Loading: false })
            console.log("error============", error)
        })
    }

    async getImageFromDrive() {
        try {
            let self = this
            await axios.get("/api/getAssetFromDrive").then(function (response) {
                console.log('resposne from /api/getAssetFromDrive==', response)
                if (response.status === 200) {
                    self.setState({ Loading: false })
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

    render() {
        console.log("states in digitalImage", this.state)
        const { assetList, existAsset } = this.state;
        let img = this.state.image
        let image = ''
        if (img !== '') {
            image = "data:" + img.mimetype + ";base64," + img.data
        }
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
                    <Aside />
                    <div className="page-wrapper">
                        <div className="container-fluid r-aside custome_container">
                            <div className="page-header">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="counting-action-section">
                                            <div className="row">
                                            </div>
                                        </div>
                                        <h2 className="page-title">Digital Assets Management</h2>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div id="filter-panel" className="filter-panel filtercustome" style={{ display: 'none' }}>
                                        <div className="panel panel-default">
                                            <div className="panel-body">
                                                <form>
                                                    <div className="row custom_row">
                                                        <div className="col-md-8">
                                                            <div className="row">
                                                                <div className="col-md-4">
                                                                    <div className="form-group">
                                                                        <select id="pref-perpage" className="form-control">
                                                                            <option value={0}>Type</option>
                                                                            <option value="PNG">PNG</option>
                                                                            <option value="JPEG">JPEG</option>
                                                                            <option value="TIFF">TIFF</option>
                                                                            <option value="SVG">SVG</option>
                                                                            {/*                              <option value="7">7</option>
                              <option value="8">8</option>
                              <option value="9">9</option>*/}
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
                                                                <div className="col-md-4">
                                                                    <div className="form-group">
                                                                        <select id="pref-perpage" className="form-control">
                                                                            <option value={0}>Status</option>
                                                                            <option value="New">New</option>
                                                                            <option value="In Approval">In Approval</option>
                                                                            <option value="Approved">Approved</option>
                                                                            <option value="Rejected">Rejected</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <div className="form-group">
                                                                <input className="form-control search_filter" type="text" name="search" placeholder="Search by ID or Filename" />
                                                                <i className="ti-search filtersearch" /> </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* card row start ---------------------------------------------------------------------*/}
                            <div className="row mar_bt_30">
                                <div className="col-md-4">
                                    <input class="content-search" type="text" name="search" placeholder="Filter Records" />
                                 
                                </div>
                                <div className="filter float-right col-md-8">
                                <button className="google_btn float-right" onClick={(e) => this.getImageFromDrive(this)}><i className="ti-upload"></i>get images form google</button>
                                    <button className="primary-button float-right"><a href="javscript:void(0);" data-toggle="modal" data-target="#colgate"> <span className="icon plus" />Upload Assets </a></button>
                                    
                                    <a href="javscript:void(0)" className="filter-btn list-view paginationshow">filter</a>
                                    <a href="javscript:void(0)" className="filter-btn card-view noactive">filter</a>
                                    <a href="javscript:void(0)" className="filter-btn filter droptoggle_custome" id="filter">filter</a>
                                    <div className="selected-actions">
                                        <div className="option-box drop-option-link">
                                            <div className="nav-item dropdown dropcolgate">
                                                <a className="nav-link custome_navlink" href="javascript:void(0)" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                                    <div className="option-box select-count selected"><span id="Counting">0</span> <span className="selected-text">Selected</span></div>
                                                    <div className="dot-icon"><ImageContainer src="icons/option-all.png" /></div>
                                                </a>
                                                <div className="dropdown-menu drop_20">
                                                    <div className="counting-action-section">
                                                        <div className="selections">
                                                            <div className="group-selection">
                                                                <div className="option-box select-all"><a onClick="selectAll()" href="javscript:void(0)">Select All</a></div>
                                                                <div className="option-box clear-all"><a onClick="clearAll()" href="javscript:void(0)">Clear All</a></div>
                                                            </div>
                                                            <div className="group-action">
                                                                <div className="option-box delete"><a href>Delete</a></div>
                                                                <div className="option-box download"><a href="javscript:void(0)">Download</a></div>
                                                                <div className="option-box move-folder"><a href="javscript:void(0)">Move to Folder</a></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <a className="dropdown-item" href="javascript:void(0)"><i className="ti-check" />Approve</a>
                                                    <a className="dropdown-item" href="javascript:void(0)"><i className="ti-close" />Reject</a>
                                                    <a className="dropdown-item" href="javascript:void(0)"><i className="ti-reload" />Update Request</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <select name="example_length" aria-controls="example" class="form-control form-control-sm">
                                        <option value="5">5 per page</option>
                                        <option value="10">10 per page</option>
                                        <option value="25">25 per page</option>
                                        <option value="-1">All</option>
                                    </select>

                                </div>
                            </div>
                            <div className="table-view digitalImage">
                                <div className="row">


                                    <div className="col-md-12">

                                        <table id="example" className="table tabtable">
                                            <thead>
                                                <tr className="starting">
                                                    <th scope="col"><input type="checkbox" onClick="checkAll(this)" /></th>
                                                    <th scope="col" />
                                                    <th scope="col">Name</th>
                                                    <th scope="col">Type</th>
                                                    <th scope="col">Details</th>
                                                    <th scope="col">Created At</th>
                                                    <th />
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td><input type="checkbox" /></td>
                                                    <td><div className="image-thumb"> <ImageContainer src="1.png" /> </div></td>
                                                    <td className="productlist_name">Palmolive-Camellia....jpg</td>
                                                    <td>image</td>
                                                    <td>2832 x 4256 2.74 MB</td>
                                                    <td>4/25/19 6:49 pm</td>
                                                    <td><div className="row-hover">
                                                        <div className="row-link-options"> <a className="icon edit-icon" href="#"> <ImageContainer src="icons/edit.png" /> </a> <a className="icon delete-icon" href="javscript:void(0)" data-toggle="modal" data-target="#delete"> <ImageContainer src="icons/delete.png" />
                                                        </a></div>
                                                    </div></td>
                                                </tr>
                                                <tr>
                                                    <td><input type="checkbox" /></td>
                                                    <td><div className="image-thumb"> <ImageContainer src="1.png" /> </div></td>
                                                    <td className="productlist_name">palmolive-aroma.png</td>
                                                    <td>image</td>
                                                    <td>2832 x 4256 2.74 MB</td>
                                                    <td>4/25/19 6:49 pm</td>
                                                    <td><div className="row-hover">
                                                        <div className="row-link-options"> <a className="icon edit-icon" href="#"> <ImageContainer src="icons/edit.png" /> </a> <a className="icon delete-icon" href="javscript:void(0)" data-toggle="modal" data-target="#delete"> <ImageContainer src="icons/delete.png" />
                                                        </a></div>
                                                    </div></td>
                                                </tr>
                                                <tr>
                                                    <td><input type="checkbox" /></td>
                                                    <td><div className="image-thumb"> <ImageContainer src="1.png" /> </div></td>
                                                    <td className="productlist_name">widelogos_dubius.png</td>
                                                    <td>image</td>
                                                    <td>2832 x 4256 2.74 MB</td>
                                                    <td>4/25/19 6:49 pm</td>
                                                    <td><div className="row-hover">
                                                        <div className="row-link-options"> <a className="icon edit-icon" href="#"> <ImageContainer src="icons/edit.png" /> </a> <a className="icon delete-icon" href="javscript:void(0)" data-toggle="modal" data-target="#delete"> <ImageContainer src="icons/delete.png" />
                                                        </a></div>
                                                    </div></td>
                                                </tr>
                                                <tr>
                                                    <td><input type="checkbox" /></td>
                                                    <td><div className="image-thumb"> <ImageContainer src="1.png" /> </div></td>
                                                    <td className="productlist_name">palmolive-aroma.png</td>
                                                    <td>image</td>
                                                    <td>2832 x 4256 2.74 MB</td>
                                                    <td>4/25/19 6:49 pm</td>
                                                    <td><div className="row-hover">
                                                        <div className="row-link-options"> <a className="icon edit-icon" href="#"> <ImageContainer src="icons/edit.png" /> </a> <a className="icon delete-icon" href="javscript:void(0)" data-toggle="modal" data-target="#delete"> <ImageContainer src="icons/delete.png" />
                                                        </a></div>
                                                    </div></td>
                                                </tr>
                                                <tr>
                                                    <td><input type="checkbox" /></td>
                                                    <td><div className="image-thumb"> <ImageContainer src="1.png" /> </div></td>
                                                    <td className="productlist_name">widelogos_dubius.png</td>
                                                    <td>image</td>
                                                    <td>2832 x 4256 2.74 MB</td>
                                                    <td>4/25/19 6:49 pm</td>
                                                    <td><div className="row-hover">
                                                        <div className="row-link-options"> <a className="icon edit-icon" href="#"> <ImageContainer src="icons/edit.png" /> </a> <a className="icon delete-icon" href="javscript:void(0)" data-toggle="modal" data-target="#delete"> <ImageContainer src="icons/delete.png" />
                                                        </a></div>
                                                    </div></td>
                                                </tr>
                                                <tr>
                                                    <td><input type="checkbox" /></td>
                                                    <td><div className="image-thumb"> <ImageContainer src="1.png" /> </div></td>
                                                    <td className="productlist_name">palmolive-aroma.png</td>
                                                    <td>image</td>
                                                    <td>2832 x 4256 2.74 MB</td>
                                                    <td>4/25/19 6:49 pm</td>
                                                    <td><div className="row-hover">
                                                        <div className="row-link-options"> <a className="icon edit-icon" href="#"> <ImageContainer src="icons/edit.png" /> </a> <a className="icon delete-icon" href="javscript:void(0)" data-toggle="modal" data-target="#delete"> <ImageContainer src="icons/delete.png" />
                                                        </a></div>
                                                    </div></td>
                                                </tr>
                                                <tr>
                                                    <td><input type="checkbox" /></td>
                                                    <td><div className="image-thumb"> <ImageContainer src="1.png" /> </div></td>
                                                    <td className="productlist_name">palmolive-aroma.png</td>
                                                    <td>image</td>
                                                    <td>2832 x 4256 2.74 MB</td>
                                                    <td>4/25/19 6:49 pm</td>
                                                    <td><div className="row-hover">
                                                        <div className="row-link-options"> <a className="icon edit-icon" href="#"> <ImageContainer src="icons/edit.png" /> </a> <a className="icon delete-icon" href="javscript:void(0)" data-toggle="modal" data-target="#delete"> <ImageContainer src="icons/delete.png" />
                                                        </a></div>
                                                    </div></td>
                                                </tr>
                                                <tr>
                                                    <td><input type="checkbox" /></td>
                                                    <td><div className="image-thumb"> <ImageContainer src="1.png" /> </div></td>
                                                    <td className="productlist_name">palmolive-aroma.png</td>
                                                    <td>image</td>
                                                    <td>2832 x 4256 2.74 MB</td>
                                                    <td>4/25/19 6:49 pm</td>
                                                    <td><div className="row-hover">
                                                        <div className="row-link-options"> <a className="icon edit-icon" href="#"> <ImageContainer src="icons/edit.png" /> </a> <a className="icon delete-icon" href="javscript:void(0)" data-toggle="modal" data-target="#delete"> <ImageContainer src="icons/delete.png" />
                                                        </a></div>
                                                    </div></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <div className="pagebottompart">
                                            <p className="float-left col-md-10 dataTables">Showing 1 to 5 of 8 entries</p>
                                            <div className="col-md-2 pull-right">
                                                <ul className="pagination">
                                                    <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                                                    <li className="page-item"><a className="page-link" href="#">1</a></li>
                                                    <li className="page-item active"><a className="page-link" href="#">2</a></li>
                                                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                                                    <li className="page-item"><a className="page-link" href="#">Next</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row digitalImage">
                                {assetList.length > 0 && assetList !== undefined ?
                                    assetList.map((asset, index) => {
                                        return <div className="col-xs-12 col-sm-4 col-md-3 card-block">
                                            <div className="card document_list">
                                                <div className="card-body text-center">
                                                    <span className="digitalImageIco">
                                                        <ImageContainer src="icons/img.png" />
                                                    </span>
                                                    <a className="icon check-icon activebtn" href="javscript:void(0)"> <ImageContainer src="icons/check.png" /> </a>
                                                    <p className="img"><img className="img-fluid" src={"data:" + asset.asset_type + ";base64," + asset.asset_data} /></p>
                                                    <div className="card-info">
                                                        <h4 className="card-title">{asset.asset_name}</h4>
                                                        <p className="card-text">{asset.created_at}</p>
                                                        <p className="card-text">2832 x 4256  |  2.74 MB</p>
                                                    </div>
                                                </div>
                                                <div className="card-hover">
                                                    <div className="card-link-options">
                                                        <Link className="icon view-icon" to={{ pathname: '/digitalImagePage', state: { _data: asset } }}><ImageContainer src="icons/view.png" /></Link>
                                                        <Link className="icon edit-icon" to={{ pathname: '/editDigitalImage', state: { _data: asset } }}><ImageContainer src="icons/edit.png" /></Link>
                                                        <a className="icon delete-icon" href="javscript:void(0)" data-toggle="modal" data-target="#delete"> <ImageContainer src="icons/delete.png" />
                                                        </a>  <a className="icon check-icon select_box" href="javscript:void(0)"> <ImageContainer src="icons/check.png" /> </a> </div>
                                                </div>
                                            </div>
                                        </div>
                                    })
                                    : <div></div>
                                }

                            </div>
                        </div>
                    </div>
                    {/* The Modal */}
                    <div className="modal fade allmodalcolgate" id="colgate">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                {/* Modal Header */}
                                <div className="modal-header">
                                    <h4 className="modal-title title_modalheader">Upload Assets</h4>
                                    <button type="button" className="close" data-dismiss="modal" onClick={this.clearState.bind(this)}>×</button>
                                </div>
                                {/* Modal body */}
                                <div className="modal-body filtercustome">
                                    <form>
                                        <div className="form-group">
                                            <label>Asset Id</label>
                                            <input className="form-control" type="text" name="asset_id" placeholder={12345} value={this.state.asset_id} onChange={e => this.change(e)} />
                                        </div>
                                        <div className="form-group">
                                            <label>Asset Name</label>
                                            <input className="form-control" type="text" name="asset_name" placeholder={12345} value={this.state.asset_name} onChange={e => this.change(e)} />
                                        </div>
                                        {existAsset !== '' ?
                                            <span>Asset already Exist <Link to={{ pathname: '/digitalImagePage', state: { _data: existAsset } }}>See here</Link></span>
                                            : ''}
                                        <div className="avatar-upload">

                                            <div className="avatar-preview">
                                                <div id="imagePreview">
                                                    {image !== '' && image !== undefined ?
                                                        <img src={image} height="50px" width="50px" className="digital_img" />
                                                        : ''} </div>
                                            </div>
                                            <div className="avatar-edit">
                                                <input type="file" ref={(ref) => { this.uploadInput = ref }} onChange={this.handleUploadAttachment.bind(this)} style={{ display: 'none' }} />
                                                <a onClick={(e) => this.uploadInput.click()} className="create-new-link">Upload Files</a>
                                                {/* <input type="file" id="imageUpload" accept=".png, .jpg, .jpeg" />
                                                <label htmlFor="imageUpload">Select images</label> */}
                                            </div>
                                        </div>
                                        <p><span className="label label-danger label-rounded">NOTE!</span> Attached images thumbnail is supported in latest firefox chrome,
                    Opera,Safari and Internet Explore 10 only</p>
                                    </form>
                                </div>
                                {/* Modal footer */}
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
                                    <button type="button" className="btn btn-primary removeproduct" data-dismiss="modal">Yes</button>
                                    <button type="button" className="btn btn-outline-primary" data-dismiss="modal">No</button>
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