import React, { Component } from "react";
import Header from '../Header/index';
import Aside from '../SideBar/index';
import { Link } from "react-router-dom"
import ImageContainer from "../../components/imageContainer"
import axios from "axios";
import ReactLoading from 'react-loading'
import _ from 'lodash';
import XLSX from 'xlsx';
import moment from 'moment'

class ProductList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            product: [],
            deleteProductId: '',
            filteredList: [],
            listToFilter: [],
            pictures: [],
            stateUpdate: false,
            Loading: false,
            countItems: 0,
            selectedProducytId: [],
            routeToPage: false,
            batchKey: 'product_name',
            batchValue: '',
            selectedArray: [
            { key: 'product_line', value: 'product_line' },
            { key: 'product_name', value: 'product_name' }, { key: 'category', value: 'Category' },
            { key: 'cost', value: 'Cost' }],
            attrebuteArray: [
                { key: 'category', value: 'Category' },
                { key: 'cost', value: 'Cost' },
                { key: 'created_at', value: 'created_at' },
                { key: 'link', value: 'link' },
                { key: 'long_description', value: 'long_description' },
                { key: 'main_image', value: 'main_image' },
                { key: 'material', value: 'material' },
                { key: 'medium_description', value: 'medium_description' },
                { key: 'msrp', value: 'msrp' },
                { key: 'product_id', value: 'product_id' },
                { key: 'product_line', value: 'product_line' },
                { key: 'product_name', value: 'product_name' },
                { key: 'product_status', value: 'product_status' },
                { key: 'retail_price', value: 'retail_price' },
                { key: 'style', value: 'style' },
                { key: 'tags', value: 'tags' },
                { key: 'upc', value: 'upc' },
                { key: 'updated_at', value: 'updated_at' },
                { key: 'warnings', value: 'warnings' },
                { key: 'wholesale_price', value: 'wholesale_price' },
                { key: 'workflow_state', value: 'workflow_state' },
            ],
            bulkDelete: [],
            searchValue1: '',
            searchValue2: ''
        }
    }


    componentWillMount() {
        let self = this
        self.setState({ Loading: true })
        axios.get("/api/getAllProducts").then(function (response) {
            console.log("product list ", response.data);
            if (response.data) {
                self.setState({
                    product: response.data.products,
                    filteredList: response.data.products,
                    listToFilter: response.data.products,
                    stateUpdate: true,
                    Loading: false
                })
            }

        }).catch(function (error) {
            self.setState({ Loading: false })
            console.log("error  login is ", error);
        })

        //getting images from JSONfile
        let imageData = []
        try {
            axios.post("/api/get-images").then((res) => {
                if (res.status === 200) {
                    let data = res.data.data[0].imageData
                    data = JSON.parse(data)
                    let image = "data:" + data.data.mimetype + ";base64," + data.data.data
                    console.log("image found===========", image)
                    // convert values into object
                    if (res.data.data.length) {
                        res.data.data.map((imageString) => {
                            let imageJsonData = JSON.parse(imageString.imageData)
                            imageData.push({
                                data: imageJsonData.data,
                                id: imageJsonData.data.id,
                                image: "data:" + imageJsonData.data.mimetype + ";base64," + imageJsonData.data.data
                            })
                        })
                        console.log("imageData=============", imageData)
                    }
                    self.setState({
                        pictures: imageData,
                    })

                } else {
                    console.log("error in image fetching response", res)
                }
            })
        } catch (err) {
            console.log("error in image fetching", err)
        }
    }

    async deleteProductById() {
        console.log('delete product by id', this.state)
        let self = this
        // self.setState({ Loading: true })
        console.log("this.stateeeeee", this.state)
        if (self.state.deleteProductId) {
            await axios.post("/api/deleteProductByID", { id: this.state.deleteProductId }).then(function (response) {
                console.log('resposne from Delete api==', response)
                if (response.data.product) {
                    self.setState({ deleteProductId: '', Loading: false })
                    window.location.href = "/productList"
                }

            }).catch(function (error) {
                this.setState({ deleteProductId: '', Loading: false })
                console.log("error in delete product", error)
            })
        }

        else if (self.state.bulkDelete) {
            console.log('bulk delete===', self.state.bulkDelete)
            var id = self.state.bulkDelete
            axios.post("api/bulkProductDelete", { id: id }).then(function (response) {
                console.log('resposne from api==', product)
                if (response.data.product) {
                    self.setState({ bulkDelete: '', Loading: false })
                    window.location.href = "/productList"
                }

            }).catch(function (error) {
                this.setState({ bulkDelete: '', Loading: false })
            })
        }



    }

    filterSearch(event) {
        this.setState({ stateUpdate: true })
        console.log('state on filtersearcch===', this.state)
        var newList = this.state.listToFilter
        var searchString = event.target.value

        console.log('product to be search---', searchString)

        var newFilteredList = newList.filter(function (searchResult) {
            if (
                ((typeof searchResult.category != "undefined" && searchResult.category != null && searchResult.category !== "") && searchResult.category.toLowerCase().includes(searchString.toLowerCase())) ||
                ((typeof searchResult.product_name != "undefined" && searchResult.product_name != null && searchResult.product_name !== "") && searchResult.product_name.toLowerCase().includes(searchString.toLowerCase())) ||
                ((typeof searchResult.link != "undefined" && searchResult.link != null && searchResult.link !== "") && searchResult.link.toLowerCase().includes(searchString.toLowerCase())) ||
                ((typeof searchResult.product_id != "undefined" && searchResult.product_id != null && searchResult.product_id !== "") && searchResult.product_id.toString().includes(searchString))


                // ((typeof e.Phone != "undefined" && e.Phone != null && e.Phone !== "") && e.Phone.toString().includes(val))

                //     ||

                //     ((typeof searchResult.product_id != "undefined" && searchResult.product_id != null && searchResult.product_id !== "") && searchResult.product_id.toLowerCase().includes(searchString.toLowerCase()))||
                //     ((typeof searchResult.cost != "undefined" && searchResult.cost != null && searchResult.cost !== "") && searchResult.cost.toLowerCase().includes(searchString.toLowerCase()))||
                //    ((typeof searchResult.long_description != "undefined" && searchResult.long_description != null && searchResult.long_description !== "") && searchResult.long_description.toLowerCase().includes(searchString.toLowerCase()))||
                //     ((typeof searchResult.material != "undefined" && searchResult.material != null && searchResult.material !== "") && searchResult.material.toLowerCase().includes(searchString.toLowerCase()))||
                //     ((typeof searchResult.medium_description != "undefined" && searchResult.medium_description != null && searchResult.medium_description !== "") && searchResult.medium_description.toLowerCase().includes(searchString.toLowerCase()))||
                //     ((typeof searchResult.msrp != "undefined" && searchResult.msrp != null && searchResult.msrp !== "") && searchResult.msrp.toLowerCase().includes(searchString.toLowerCase()))||
                //     ((typeof searchResult.style != "undefined" && searchResult.style != null && searchResult.style !== "") && searchResult.style.toLowerCase().includes(searchString.toLowerCase()))
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

    componentDidUpdate() {
        if (this.state.stateUpdate === true) {
            let self = this
            let { filteredList, pictures } = self.state
            let newProductsWithImage = []
            // check length of pictures
            if (pictures.length > 0 && filteredList.length > 0) {
                filteredList.map((prodct) => {

                    console.log("id in product", prodct.product_id)
                    // console.log("id in picture", Number(pic.id))
                    newProductsWithImage.push({
                        category: prodct.category,
                        cost: prodct.cost,
                        created_at: prodct.created_at,
                        link: prodct.link,
                        long_description: prodct.long_description,
                        main_image: _.filter(pictures, (pic) => {
                            if (prodct.product_id === Number(pic.id)) {
                                return pic.image
                            }
                        }),
                        material: prodct.material,
                        medium_description: prodct.medium_description,
                        msrp: prodct.msrp,
                        product_id: prodct.product_id,
                        product_line: prodct.product_line,
                        product_name: prodct.product_name,
                        product_status: prodct.product_status,
                        retail_price: prodct.retail_price,
                        style: prodct.style,
                        tags: prodct.tags,
                        upc: prodct.upc,
                        updated_at: prodct.updated_at,
                        warnings: prodct.warnings,
                        wholesale_price: prodct.wholesale_price,
                        workflow_state: prodct.workflow_state

                    })
                })
                self.setState({
                    product: newProductsWithImage,
                    filteredList: newProductsWithImage,
                    stateUpdate: false
                })
            }
        }
    }

    openListView() {
        console.log('list viewwwwwwwwwwwwwww')
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
            let domIcon = document.getElementById(`activebtn${index}`)
            if (domIcon.style.display === '' || domIcon.style.display === 'none') {
                counter = counter + 1
                selectedProdeuctIds.push(key)
                document.getElementById(`activebtn${index}`).style.display = 'block'
                document.getElementById(`card-hover${index}`).style.visibility = 'hidden'
            } else {
                counter = counter - 1
                // document.getElementById(`activebtn${index}`).style.display = 'none'
            }

            this.setState({ countItems: counter, selectedProducytId: selectedProdeuctIds })


        }
        catch (e) { console.log("err", e) }


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
            counter = counter - 1
            if (counter < 0) {
                counter = 0
            }
            let domIcon = document.getElementById(`card-hover${index}`).style.visibility = 'visible'
            document.getElementById(`activebtn${index}`).style.display = 'none'
            selectedProdeuctIds.splice(selectedProdeuctIds.indexOf(key), 1)
            this.setState({ countItems: counter })

        } catch (e) { console.log("error ", e) }

    }


    /**Method for hide and show menu option s */
    showhideSpan() {
        let spanSho = document.getElementsByClassName('counting-action-section')[0]
        try {
            if (this.state.countItems > 0) {
                spanSho.style.display = 'block'
            } else {
                spanSho.style.display = 'none'
            }
        } catch (e) { }

    }


    /**
     * Method for formating data for CSV
     */
    filterDataCSV(data) {
        let tempData = []
        let json = {}

        data.map(data => {
            json = {
                "Category": `${data.category}`,
                "Cost": data.cost,
                "Created Date": moment(new Date(data.created_at)).format('MM/DD/YYYY'),
                "Link": data.link,
                "Product Decription": data.long_description,
                "Material": data.material,
                "Medium Description": data.medium_description,
                "MSRP": data.msrp,
                "Product Id": data.product_id,
                "product Line ": data.product_line,
                "Product Name": data.product_name,
                "Product Status": data.product_status,
                "Retail Price": data.retail_price,
                "Style": data.style,
                "Tags": data.tags,
                "UPC": data.upc,
                "Update Date ": moment(new Date(data.updated_at)).format('MM/DD/YYYY'),
                "Warnings": data.warnings,
                "Wholesale Price": data.wholesale_price,
                "Workflow State": data.workflow_state
            }
            tempData.push(json)
        })
        return tempData

    }




    /**  Method for download CSV file  */
    createExcel() {
        try {

            let e = []
            e = this.filterDataCSV(this.state.selectedProducytId)

            var wb = XLSX.utils.book_new();
            var wscols = [
                { wch: 30 },
                { wch: 30 },
                { wch: 30 },
                { wch: 100 },
                { wch: 30 },
                { wch: 30 },
                { wch: 30 },
                { wch: 30 },
                { wch: 30 },
                { wch: 30 },
                { wch: 30 },
                { wch: 30 },
                { wch: 30 },
                { wch: 30 },
                { wch: 30 },
                { wch: 30 },
                { wch: 30 },
                { wch: 30 },
                { wch: 30 },
                { wch: 30 },

            ];
            var wsrows = [
                { hpt: 15 }, // "points"
                { hpx: 16 }, // "pixels"
            ];


            XLSX.utils.book_append_sheet(wb, ws, "WorksheetName");

            / make the worksheet /
            var ws = XLSX.utils.json_to_sheet(e);
            ws['!cols'] = wscols;
            ws['!rows'] = wsrows;

            / add to workbook /
            var wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "People");

            / generate an XLSX file /
            XLSX.writeFile(wb, `Product_report${new Date()}.xlsx`);

        }
        catch (e) { console.log("catch", e) }
    }

    /****
     * Method for select all Product
     * @param{}
     ***/
    selectAllProduct(e) {
        let allproduct = this.state.filteredList
        if (allproduct.length > 0) {
            allproduct.map((key, index) => {
                this.handleIcon(e, index, key)
                this.setState({ countItems: allproduct.length })
            })
        }

    }


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
            }
        } catch (e) { console.log("error", e) }

    }

    change(e) {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    batchUpdate() {
        console.log('state on batch update----', this.state)
        var state = this.state
        var id = []

        state.selectedProducytId.length ? state.selectedProducytId.map((key) => {
            return id.push(key.product_id)
        }) : ''


        var batchUpdate = {
            batchKey: state.batchKey,
            batchValue: state.batchValue,
            id: id
        }

        console.log('batchUpdate----', batchUpdate)
        axios.post("api/batchUpdate", batchUpdate).then(function (response) {
            console.log('resposne from api==', product)
            if (response.data.task) {
                window.location.href = "/productList"
            }

        }).catch(function (error) {

        })

    }
    /****
     * @param {event} 
     */
    compareProducts(e) {

        if (this.props.history !== undefined && this.state.routeToPage === false) {
            this.setState({ routeToPage: true })
            this.props.history.push(
                {
                    pathname: '/compareProducts',
                    state: { compareProductsList: this.state.selectedProducytId }
                }
            )
        }

    }



    bulkDelete() {
        console.log('state on batch update----', this.state)
        var state = this.state
        var id = []

        state.selectedProducytId.length ? state.selectedProducytId.map((key) => {
            return id.push(key.product_id)
        }) : ''

        this.setState({
            bulkDelete: id
        })


    }

    searchValues(e) {

        var searchValue1 = this.state.searchValue1
        var searchValue2 = e.target.value

        console.log('searchValue1--', searchValue1)
        console.log('searchValue2', searchValue2)
        var data = {
            searchValue1: searchValue1,
            searchValue2: searchValue2
        }

        axios.get("/api/searchFilterByValues", data).then(function (response) {
            console.log("product list ", response.data);
            if (response.data) {
                // self.setState({
                //     product: response.data.products,
                //     filteredList: response.data.products,
                //     listToFilter: response.data.products,
                //     stateUpdate: true,
                //     Loading: false
                // })
            }

        }).catch(function (error) {
            // self.setState({ Loading: false })
            console.log("error  login is ", error);
        })



    }

    selectAttrebute(index) {
        this.state.selectedArray.push(index);
    }

    render() {
        const { filteredList, attrebuteArray, selectedArray } = this.state;
        const { product, pictures } = this.state;
        let buff
        let base64data
        this.showhideSpan()
        return (
            <div>
                {/* <div className="preloader">
                    <div className="loader">
                        <div className="loader__figure"></div>
                        <p className="loader__label">Please Wait..</p>
                    </div>
                </div> */}
                {
                    this.state.Loading === true &&
                    <div className="loader-react">
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
                                        <h2 className="page-title">Products</h2>
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
                                                                        <select id="pref-perpage" className="form-control" name="searchValue1" onChange={e => this.change(e)}>
                                                                            <option value={0}>Category</option>
                                                                            <option value={"Toothpastes"}>Toothpastes</option>
                                                                            <option value={"Toothbrushes"}>Toothbrushes</option>
                                                                            <option value={"Mouthwashes"}>Mouthwashes</option>
                                                                            <option value={"Kids Products"}>Kids Products</option>
                                                                            <option value={"Toothpowder"}>Toothpowder</option>
                                                                            <option value={"Liquid handwash"}>Liquid handwash</option>

                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <div className="form-group">
                                                                        <select id="pref-perpage" className="form-control" name="searchValue2" onChange={e => this.searchValues(e)}>
                                                                            <option value={0}>Status</option>
                                                                            <option value={"Active"}>Active</option>
                                                                            <option value={"Inactive"}>Inactive</option>

                                                                        </select>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </div>

                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row mar_bt_30">
                                <div className="col-md-6">
                                    <input className="content-search" type="text" name="search" placeholder="Filter Records" onChange={(e) => this.filterSearch(e)} />
                                </div>
                                <div className="filter float-right col-md-6">
                                    <div className="float-right">
                                        <button className="primary-button float-right">
                                            <Link to="/newProduct"><span className="icon plus" />NEW PRODUCT</Link>
                                        </button>
                                        <a href="javscript:void(0);" onClick={this.openListView.bind(this)} className="filter-btn list-view paginationshow">filter</a>
                                        <a href="javscript:void(0);" className="filter-btn card-view noactive">filter</a>
                                        <a href="javscript:void(0);" className="filter-btn Setting_btn" data-toggle="modal" data-target="#setting"><i className="ti-settings" /></a>
                                        <a href="javscript:void(0);" className="filter-btn filter droptoggle_custome" id="filter">filter</a>
                                        <div className="selected-actions">
                                            <div className="option-box drop-option-link">
                                                <div className="nav-item dropdown dropcolgate">
                                                    <a className="nav-link custome_navlink" href="javascript:void(0);" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                                        <div className="option-box select-count selected"><span id="Counting">{this.state.countItems}</span> <span className="selected-text">Selected</span></div>
                                                        <div className="dot-icon"><ImageContainer src="icons/option-all.png" /> </div>
                                                    </a>
                                                    <div className="dropdown-menu drop_20">
                                                        <div className="counting-action-section">
                                                            <div className="selections">
                                                                <div className="group-selection">
                                                                    <div className="option-box select-all"><a href="javscript:void(0)" onClick={(e) => { this.selectAllProduct(e) }}><i className="ti-layout-grid2"></i>Select All</a></div>
                                                                    <div className="option-box clear-all"><a href="#" onClick={(e) => { this.clearAllProduct(e) }}><i className="fa fa-times-circle"></i>Clear All</a></div>
                                                                </div>
                                                                <div className="group-action">
                                                                    <div className="option-box delete"><a data-toggle="modal" data-target="#delete" onClick={this.bulkDelete.bind(this)}><i className="ti-trash"></i>Delete</a></div>

                                                                    <div className="option-box download"><a href="javscript:void(0)" onClick={(e) => { this.createExcel(e) }}><i className="fa fa-file-download"></i>Download</a></div>
                                                                    <div className="option-box move-folder"><a href="javscript:void(0)"><i className="ti-folder"></i>Move to Folder</a></div>
                                                                    <div className="option-box import"><a href="javscript:void(0)"><i className="ti-import"></i>Product Import</a></div>
                                                                    <div className="option-box export"><a href="javscript:void(0)"><i className="ti-export"></i>Export Template</a></div>
                                                                    <div className="option-box compare batchUpdate" data-toggle="modal" data-target="#colgate">
                                                                    <a href="javscript:void(0)"><i className="ti-layout-column2"></i>Batch Update</a>
                                                                    </div>
                                                                    <div className="option-box compare">
                                                                        <a href="javscript:void(0)" onClick={(e) => { this.compareProducts(e) }}><i className="ti-layout-column2"></i>Compare Products</a></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <a className="dropdown-item" href="javascript:void(0);"><i className="ti-check" />Approve</a>
                                                        <a className="dropdown-item" href="javascript:void(0);"><i className="ti-close" />Reject</a>
                                                        <a className="dropdown-item" href="javascript:void(0);"><i className="fas fa-upload" />Publish</a>
                                                    </div>
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






                            {/* card row start ---------------------------------------------------------------------*/}
                            <div className="table-view fullpageview">
                                <div className="row">
                                    <div className="col-md-12">

                                        <table id="example" className="table tabtable">
                                            <thead>
                                                <tr className="starting">
                                                    <th scope="col"><input type="checkbox" onClick="checkAll(this)" /></th>
                                                    <th scope="col" />
                                                    <th scope="col">Product ID</th>
                                                    {selectedArray.map((keyinner, indexinner) => {
                                                        return (<th scope="col">{keyinner.value}</th>);

                                                    })
                                                    }
                                                    <th />
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    filteredList.length > 0 ? filteredList.map((key, index) => {
                                                        return <tr>
                                                            <td><input type="checkbox" name="" /></td>
                                                            <td><div className="image-thumb"><a href="detailpage.html">
                                                                <ImageContainer src="1.png" /> </a></div></td>
                                                            <td><Link to={{ pathname: '/productDetailPage', state: { _data: key } }} >{key.product_id}</Link></td>
                                                            {selectedArray.map((keyinner, indexinner) => {
                                                                return (<td>{key[keyinner.key]}</td>);

                                                            })
                                                            }
                                                            <td><div className="row-hover">
                                                                <div className="row-link-options"> <Link className="icon edit-icon" to={{ pathname: '/editProduct', state: { _data: key } }}> <ImageContainer src="icons/edit.png" /></Link>  <a className="icon delete-icon" href="javscript:void(0)" data-toggle="modal" data-target="#delete"> <ImageContainer src="icons/delete.png" />
                                                                </a></div>
                                                            </div></td>
                                                        </tr>
                                                    }) : ''}

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
                            <div className="row">
                                {
                                    filteredList.length > 0 ? filteredList.map((key, index) => {
                                        return <div className="col-xs-12 col-sm-4 col-md-3 card-block">
                                            <div className="card">
                                                <div className="card-body text-center">
                                                    <a className="icon check-icon activebtn" href="javscript:void(0)" id={`activebtn${index}`} onClick={(e) => { this.handledeSelect(e, index, key) }}>
                                                        <ImageContainer src="icons/check.png" />
                                                    </a>

                                                    <p className="img">
                                                        {key.main_image !== null && key.main_image !== undefined && key.main_image.length > 0 ?
                                                            <img src={key.main_image[0].image} alt="" />
                                                            :
                                                            <ImageContainer src="5.png" alt="" />
                                                        }

                                                        {/* <img src={base64data ? 'data:' + "image/png" + ';base64,' + base64data : ""} alt="" /> */}
                                                    </p>
                                                    <h4 className="card-title">{key.product_id}</h4>
                                                    <p className="card-text">{key.product_name}<br /></p>
                                                </div>
                                                <div className="card-hover" id={`card-hover${index}`}>
                                                    <div className="card-link-options">
                                                        <Link className="icon view-icon" to={{ pathname: '/productDetailPage', state: { _data: key } }} ><ImageContainer src="icons/view.png" /></Link>
                                                        <Link className="icon edit-icon" to={{ pathname: '/editProduct', state: { _data: key } }}><ImageContainer src="icons/edit.png" /></Link>
                                                        <a className="icon delete-icon" href="javscript:void(0)" data-toggle="modal" data-target="#delete" onClick={(e) => this.setState({ deleteProductId: key.product_id })}><ImageContainer src="icons/delete.png" /></a>
                                                        <a className="icon check-icon select_box" href="javscript:void(0)" onClick={(e) => { this.handleIcon(e, index, key) }}><ImageContainer src="icons/check.png" /></a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                    }) : ''

                                }
                            </div>
                        </div>
                    </div>
                </div>



                {/* The Modal */}
                <div className="modal fade allmodalcolgate" id="setting">
                    <div className="modal-dialog productlist_section">
                        <div className="modal-content">
                            {/* Modal Header */}
                            <div className="modal-header">
                                <h4 className="modal-title title_modalheader col-md-7">Grid Configuration</h4>
                                <div className="filtercustome col-md-4">
                                    <li className="nav-item dropdown Select_Language">
                                        <a className="nav-link dropdown-toggle" href="#" id="dropdown09" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Select Language</a>
                                        <div className="dropdown-menu" aria-labelledby="dropdown09">
                                            <a className="dropdown-item" href="#fr"><span className="flag-icon flag-icon-us"> </span>  English</a>
                                            <a className="dropdown-item" href="#fr"><span className="flag-icon flag-icon-fr"> </span>  French</a>
                                            <a className="dropdown-item" href="#it"><span className="flag-icon flag-icon-it"> </span>  Italian</a>
                                            <a className="dropdown-item" href="#ru"><span className="flag-icon flag-icon-ru"> </span>  Russian</a>
                                        </div>
                                    </li>
                                </div>
                                <button type="button" className="close" data-dismiss="modal">×</button>
                            </div>
                            {/* Modal body */}
                            <div className="modal-body filtercustome productlist_body">
                                <div className="row">
                                    <div className="col-md-12 custome_section_productlist_body">
                                        <div className="row">
                                            <div className="col-md-6 nopad_left">
                                                <div id="accordion">
                                                    <div className="card">
                                                        <div className="card-header" id="heading-1">
                                                            <h5 className="mb-0">
                                                                <a role="button" data-toggle="collapse" href="#collapse-1" aria-expanded="true" aria-controls="collapse-1">
                                                                    Class Attributes
                              </a>
                                                            </h5>
                                                        </div>
                                                        <div id="collapse-1" className="collapse show" data-parent="#accordion" aria-labelledby="heading-1">
                                                            <ul>
                                                                {attrebuteArray.length > 0 ? attrebuteArray.map((key, index) => {
                                                                    return <li><a href="#" onClick={(e) => this.selectAttrebute(key)}>{key.value}</a></li>
                                                                }) : ''
                                                                }
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div className="card">
                                                        <div className="card-header" id="heading-2">
                                                            <h5 className="mb-0">
                                                                <a role="button" data-toggle="collapse" href="#collapse-2" aria-expanded="true" aria-controls="collapse-2">
                                                                    Formatters
                              </a>
                                                            </h5>
                                                        </div>
                                                        <div id="collapse-2" className="collapse" data-parent="#accordion" aria-labelledby="heading-2">
                                                            <ul>
                                                                <li><a href="#">Bool</a>
                                                                    <ul>
                                                                        <li>Operator Boolean Formatter</li>
                                                                    </ul>
                                                                </li>
                                                                <li><a href="#">Other</a>
                                                                    <ul>
                                                                        <li>Operator Date Formatter</li>
                                                                    </ul>
                                                                </li>
                                                                <li><a href="#">String</a>
                                                                    <ul>
                                                                        <li>Operator Text</li>
                                                                    </ul>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <ul className="list_ofproduct">
                                                    {
                                                        selectedArray.length > 0 ? selectedArray.map((key, index) => {
                                                            return <li>{key.key}</li>
                                                        }) : ''
                                                    }
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Modal footer */}
                            <div className="modal-footer productlist_footer">
                                <button type="button" className="btn btn-primary" data-dismiss="modal">SAVE</button>
                                <button type="button" className="btn btn-outline-primary" data-dismiss="modal">CANCEL</button>
                            </div>
                        </div>
                    </div>
                </div>



                {/* <!-- The Modal --> */}
                <div className="modal fade allmodalcolgate" id="colgate">
                    <div className="modal-dialog">
                        <div className="modal-content">

                            {/* <!-- Modal Header --> */}
                            <div className="modal-header">
                                <h4 className="modal-title title_modalheader">Batch Update</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>

                            {/* <!-- Modal body --> */}
                            <div className="modal-body filtercustome">
                                <form>
                                    <div className="form-group">
                                        <label>Labels</label>
                                        <select id="pref-perpage" class="form-control" name="batchKey" onChange={e => this.change(e)}>
                                            <option value="product_name">Product Name</option>
                                            <option value="link">Link</option>
                                            <option value="upc">UPC</option>
                                            <option value="category">Category</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Property Edit</label>
                                        <input className="form-control" type="text" name="batchValue" onChange={e => this.change(e)} />
                                    </div>

                                </form>
                            </div>

                            {/* <!-- Modal footer --> */}
                            <div class="modal-footer">
                                <button type="button" class="btn btn-primary" data-dismiss="modal" onClick={this.batchUpdate.bind(this)} >UPDATE</button>
                                <button type="button" class="btn btn-outline-primary" data-dismiss="modal">CANCEL</button>
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
                                <h4 className="modal-title title_modalheader">Delete Product</h4>
                                <button type="button" className="close" data-dismiss="modal" onClick={(e) => this.setState({ deleteProductId: '' })}>×</button>
                            </div>
                            {/* The product delete */}
                            <div className="modal fade allmodalcolgate" id="delete">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        {/* Modal Header */}
                                        <div className="modal-header">
                                            <h4 className="modal-title title_modalheader">Delete Product</h4>
                                            <button type="button" className="close" data-dismiss="modal" onClick={(e) => this.setState({ deleteProductId: '' })}>×</button>
                                        </div>
                                        {/* Modal body */}
                                        <div className="modal-body filtercustome">
                                            <h1 className="delete_product_list">Are you sure you want to delete</h1>
                                        </div>
                                        {/* Modal footer */}
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-primary removeproduct" data-dismiss="modal" onClick={this.deleteProductById.bind(this)}>Yes</button>
                                            <button type="button" className="btn btn-outline-primary" data-dismiss="modal" onClick={(e) => this.setState({ deleteProductId: '' })}>No</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Modal footer */}
                            <div className="modal-footer productlist_footer">
                                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.deleteProductById.bind(this)}>DELETE</button>
                                <button type="button" className="btn btn-outline-primary" data-dismiss="modal" onClick={(e) => this.setState({ deleteProductId: '' })}>CANCEL</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>




        )
    }
}


export default ProductList;