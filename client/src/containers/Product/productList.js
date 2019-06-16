import React, { Component } from "react";
import Header from '../Header/index';
import Aside from '../SideBar/index';
import { Link } from "react-router-dom"
import ImageContainer from "../../components/imageContainer"
import axios from "axios";
import ReactLoading from 'react-loading'
import Pagination from "react-js-pagination";
import _ from 'lodash';
import XLSX from 'xlsx';
import moment from 'moment';
import { Alert } from 'reactstrap';


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
                { key: 'product_name', value: 'Product Name' },
                { key: 'category', value: 'Category' },
                { key: 'cost', value: 'Price ($)' }],
            attrebuteArray: [
                { key: 'created_at', value: 'Created Date' },
                { key: 'msrp', value: 'Formatted MSRP ($)' },
                { key: 'product_id', value: 'Product Id' },
                { key: 'product_status', value: 'Product Status' },
                { key: 'retail_price', value: 'Formatted Retail Price ($)' },
                { key: 'style', value: 'Style' },
                { key: 'upc', value: 'Sku' },
                { key: 'updated_at', value: 'Updated Date' },
                { key: 'wholesale_price', value: 'Formatted Base Wholesale Price ($)' },
                { key: 'workflow_state', value: 'Workflow State' },
            ],
            bulkDelete: [],
            searchValue1: '',
            searchValue2: '',
            searchValue3: '',
            pageactive: 1,
            dataPerPage: 10,
            additionalPictures: [],
            batchHidden: true,
            listView: false,
            deleteSuccessMsg: '',
            flashMessageSuccess: '',
            isSearchHide : true,



        }
    }


    componentWillMount() {
        console.log("willmount=========")
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

        //getting additional images
        let additionalImage = []
        try {
            axios.get("/api/get-additional-image").then((res) => {
                if (res.status === 200) {
                    let data = res.data.data[0].imageData
                    data = JSON.parse(data)
                    // convert values into object
                    if (res.data.data.length) {
                        res.data.data.map((imageString) => {
                            let imageJsonData = JSON.parse(imageString.imageData)
                            additionalImage.push({
                                data: imageJsonData.data,
                                id: imageJsonData.data.id,
                                image: "data:" + imageJsonData.data.mimetype + ";base64," + imageJsonData.data.data
                            })
                        })
                    }
                    self.setState({
                        additionalPictures: additionalImage,
                    })

                } else {
                    console.log("error in additional image fetching response", res)
                }
            })
        } catch (err) {
            console.log("error in additional image fetching", err)
        }
    }

    // componentWillReceiveProps (nextProps) {
    //     console.log("called============",nextProps)
    //     let self = this
    //     let data
    //     let  {filteredList} = self.state
    //     if(self.props.location.state !== undefined){
    //         console.log("found============")
    //         let status = self.props.location.state._complete
    //         if(status === "complete") {
    //             data = filteredList.filter((dat)=> dat.product_status === "Active")
    //         } else if( status === "incomplete") {
    //             data = filteredList.filter((dat)=> dat.product_status === "Inactive")
    //         } else {
    //             data = filteredList.filter((dat)=> dat.product_status === "")
    //         }
    //         console.log("data============", data)
    //         self.setState({
    //             product: data,
    //             filteredList: data,
    //             listToFilter: data,
    //         })
    //     }
    // }

    async deleteProductById() {
        console.log('delete product by id', this.state)
        let self = this
        self.setState({ Loading: true })
        console.log("this.stateeeeee", this.state)
        if (self.state.deleteProductId) {
            await axios.post("/api/deleteProductByID", { id: this.state.deleteProductId }).then(function (response) {
                console.log('resposne from Delete api==', response)
                if (response.data.product) {
                    self.setState({
                        deleteSuccessMsg: 'Product has been deleted successfully',
                    })
                    setTimeout(function () {
                        self.setState({
                            deleteProductId: '',
                            Loading: false,
                        })
                        window.location.href = "/productList"
                    }, 3000);
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
                console.log('resposne from api==', response)
                // window.location.href = "/productList"
                self.setState({
                    deleteSuccessMsg: 'Product has been deleted successfully',
                })
                if (response.data.product) {
                    // self.setState({ bulkDelete: '', Loading: false })
                    //window.location.href = "/productList"
                    setTimeout(function () {
                        self.setState({
                            bulkDelete: '',
                            Loading: false,
                        })
                        window.location.href = "/productList"
                    }, 3000);
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
                ((typeof searchResult.product_id != "undefined" && searchResult.product_id != null && searchResult.product_id !== "") && searchResult.product_id.toString().includes(searchString)) ||
                ((typeof searchResult.category != "undefined" && searchResult.category != null && searchResult.category !== "") && searchResult.category.toLowerCase().includes(searchString.toLowerCase())) ||
                ((typeof searchResult.cost != "undefined" && searchResult.cost != null && searchResult.cost !== "") && searchResult.cost.toString().includes(searchString))

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
       

    }

    handleChange(e) {
        var val = e.target.value
        let self = this
        self.setState({
            filter
        })
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

    openListView() {
        try {
            let tableView = document.getElementsByClassName('tabtable')[0];
            let cardView = document.getElementById('row-view')
            tableView.style.display = 'block';
            cardView.style.display = 'none'
            this.setState({ listView: true })
            /**Try Code  */
            let selectedItems = this.state.selectedProducytId
            this.setState({ selectedProducytId: [] })

            let tempSelectedList = []
            let allProduct = selectedItems
            allProduct.length > 0 ? allProduct.map(list => {
                let domSelectElement = document.getElementById(`listChecked${list.product_id}`)
                tempSelectedList.push(list)
                domSelectElement.checked = true
            })
                : void 0

            this.setState({ selectedProducytId: tempSelectedList })



        } catch (e) { console.log('hello', e) }
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
            let domIcon = document.getElementById(`activebtn${key.product_id}`)
            if (domIcon.style.display === '' || domIcon.style.display === 'none') {
                counter = counter + 1
                selectedProdeuctIds.push(key)
                document.getElementById(`activebtn${key.product_id}`).style.display = 'block'
                document.getElementById(`card-hover${key.product_id}`).style.visibility = 'hidden'
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
            document.getElementById(`card-hover${key.product_id}`).style.visibility = 'visible'
            document.getElementById(`activebtn${key.product_id}`).style.display = 'none'
            selectedProdeuctIds.splice(selectedProdeuctIds.indexOf(key), 1)
            this.setState({ countItems: counter })

        } catch (e) { console.log("error ", e) }

    }


    /**Method for hide and show menu option s */
    showhideSpan() {
        let spanSho = document.getElementsByClassName('counting-action-section')[0]
        try {
            if (this.state.selectedProducytId.length > 0) {
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
                "Product Id": data.product_id,
                "Product Name": data.product_name,
                "SKU": data.upc,
                "Category": `${data.category}`,
                "Product Status": data.product_status,
                "Brand": data.brand,
                "Style": data.style,
                "Price ($)": data.cost,
                "Formatted Base Wholesale Price ($)": data.wholesale_price,
                "Formatted MSRP ($)": data.msrp,
                "Formatted Retail Price ($)": data.retail_price,
                "Workflow State": data.workflow_state,
                "Product Quality": data.product_completion,
                "Created Date": moment(new Date(data.created_at)).format('MM/DD/YYYY'),
                "Update Date ": moment(new Date(data.updated_at)).format('MM/DD/YYYY')
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

            // make the worksheet 
            var ws = XLSX.utils.json_to_sheet(e);
            ws['!cols'] = wscols;
            ws['!rows'] = wsrows;

            // add to workbook 
            var wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Products");


            / generate an XLSX file /
            XLSX.writeFile(wb, `Products.xlsx`);

        }
        catch (e) { console.log("catch", e) }
    }

    /****
     * Method for select all Product
     * @param{}
     ***/
    selectAllProduct(e) {
        if (this.state.listView === false) {
            this.setState({ selectedProducytId: [] })
            let allproduct = this.state.filteredList
            // this.setState({selectedProducytId:[]})
            if (allproduct.length > 0) {
                allproduct.map((key, index) => {
                    this.handleIcon(e, index, key)
                    this.setState({ countItems: allproduct.length })
                })
            }
        } else {
            console.log("select all product###")
            this.checkedAllList(e)
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
                    let domSelectElement = document.getElementById(`listChecked${key.product_id}`)

                    domSelectElement.checked = false
                })
            }



        } catch (e) { console.log("error", e) }

    }

    change(e) {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    changeSearchValue3(e) {
        this.setState({
            searchValue3: e.target.value,
            //    searchValue1:'',
            //    searchValue2:''
        })
    }

    batchUpdate() {
        console.log('state on batch update----', this.state)
        var state = this.state
        var id = []
        let self = this
        state.selectedProducytId.length ? state.selectedProducytId.map((key) => {
            return id.push(key.product_id)
        }) : ''

        self.setState({
            Loading: true
        })


        var batchUpdate = {
            batchKey: state.batchKey,
            batchValue: state.batchValue,
            id: id
        }

        console.log('batchUpdate----', batchUpdate)
        axios.post("api/batchUpdate", batchUpdate).then(function (response) {
            // window.location.href = "/productList"
            // console.log('resposne from api==', product)
            if (response.data.product) {
                // self.setState({
                //  Loading:false   
                // })
                // window.location.href = "/productList"
                self.setState({ flashMessageSuccess: "Batch update has been done " })
                setTimeout(function () {
                    self.setState({
                        Loading: false,

                    })
                    window.location.href = "/productList"
                }, 3000);
            }

        }).catch(function (error) {

        })

    }
    /****
     * @param {event} 
     */
    compareProducts(e) {
        try {
            if (this.props.history !== undefined && this.state.routeToPage === false) {
                this.setState({ routeToPage: true })
                this.props.history.push(
                    {
                        pathname: '/compareProducts',
                        state: { compareProductsList: this.state.selectedProducytId }
                    }
                )
            }
        } catch(er) {console.log("erro",e)}
       

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
        var searchValue3 = this.state.searchValue3

        console.log('searchValue1--', searchValue1)
        console.log('searchValue2', searchValue2)
        var data = {
            searchValue1: this.state.searchValue1,
            searchValue2: e.target.value,
            searchValue3: this.state.searchValue3
        }
        let self = this
        console.log('dataaaaaa', data)
        axios.post("/api/searchFilterByValues", data).then(function (response) {
            console.log("product list ", response.data);
            if (response.data) {
                console.log('inside response========', response.data.products)
                self.setState({
                    filteredList: response.data.products,
                })
            }
        }).catch(function (error) {
            // self.setState({ Loading: false })
            console.log("error  login is ", error);
        })
    }

    selectAttrebute(index) {
        try {
            var flag = true;
            this.state.selectedArray.map((key) => {
                console.log('key----',key)
                if (key.key == index.key) {
                    flag = false;
                }
            })
            if (flag)
                this.state.selectedArray.push(index);
        } catch(e) {}
       
    }

    /**
     * Method for handle card view 
     */
    cardView(e) {
        console.log('console.log', this.state.selectedProducytId)
        try {
            let tableView = document.getElementsByClassName('tabtable')[0];
            let cardView = document.getElementById('row-view')
            console.log("ZZZZZZZ", tableView, cardView)
            let notShowlist = []
            tableView.style.display = 'none';
            cardView.style.display = 'block'
            let list = this.state.selectedProducytId
            let filtredlist = this.state.filteredList.map(list => {
                this.state.selectedProducytId.map(key => {
                    if (key.product_id !== list.product_id) {
                        notShowlist.push(list)
                    }
                })
            })
            /**try code */
        
            this.state.selectedProducytId.length>0 ? this.state.selectedProducytId.map(key=>{
                
                document.getElementById(`activebtn${key.product_id}`)!==null ? document.getElementById(`activebtn${key.product_id}`).style.display = 'block':void 0
                document.getElementById(`card-hover${key.product_id}`)!== null ? document.getElementById(`card-hover${key.product_id}`).style.visibility = 'hidden' : void 0
            }) 
            : this.state.filteredList.map(key=>{

                    document.getElementById(`activebtn${key.product_id}`).style.display = 'none'

                })

            this.setState({ listView: false, selectedProducytId: list })


        } catch (e) { console.log("erro", e) }

    }

    checkedAllList (e) {
       
        try {

            this.setState({selectedProducytId:[]})
            let tempSelectedList = []
            let allProduct  = this.state.filteredList
            allProduct.length > 0   ? allProduct.map(list=>{
                let domSelectElement  = document.getElementById(`listChecked${list.product_id}`)
                tempSelectedList.push(list)
                domSelectElement.checked  = true
            })
            :void 0
            this.setState({selectedProducytId:tempSelectedList})
        } catch(e) {

        } 
            
      
       
    }

    handleCheckbox (e,key) {   
        try {

            let selectedProduct  = this.state.selectedProducytId
            let newProduct = []
            if(e.target.checked) {

                selectedProduct.push(key)
                this.setState({selectedProducytId:selectedProduct})
                document.getElementById(`activebtn${key.product_id}`).style.display = 'block'
                document.getElementById(`card-hover${key.product_id}`).style.visibility = 'hidden'

                
              
            } else {

                document.getElementById(`card-hover${key.product_id}`).style.visibility = 'visible'
                document.getElementById(`activebtn${key.product_id}`).style.display = 'none'
                selectedProduct.splice(selectedProduct.indexOf(key),1)
            
                this.setState({selectedProducytId:selectedProduct})
    
            }
        } catch(e) {

        }
       

    }

    hideShowSearch() {
        try {
            if(this.state.isSearchHide) {
                document.getElementById('filtercustomeX').style.visibility = 'visible'
                this.setState({isSearchHide:false})
            } else {
                document.getElementById('filtercustomeX').style.visibility = 'hidden'
                this.setState({isSearchHide:true})
    
            }

        } catch(error) {console.log("error is happening",error)}
       
    }


    



    
    render() {


        console.log("porps in productlist", this.props)
        console.log("states in productlist", this.state)
        let { filteredList, attrebuteArray, selectedArray, product, pictures } = this.state;
        let data
        if (this.props.location.state !== undefined) {
            let status = this.props.location.state._complete
            if (status === "complete") {
                data = filteredList.filter((dat) => dat.product_completion === "100")
            } else if (status === "incomplete") {
                data = filteredList.filter((dat) => dat.product_completion !== "100")
            }

            product = data
            filteredList = data
        }
        let buff
        let base64data
        this.showhideSpan()
        let { dataPerPage } = this.state
        var list = filteredList ? filteredList.slice((this.state.pageactive - 1) * dataPerPage, (this.state.pageactive) * dataPerPage) : ''
        let batchUpdateSpan = '';
        if (this.state.flashMessageSuccess) {
            batchUpdateSpan = <Alert className='alertFont'>{this.state.flashMessageSuccess}</Alert>;
        }
        let flashSuceessMessageSpan = '';
        if (this.state.deleteSuccessMsg) {
            flashSuceessMessageSpan = <Alert className='alertFont'>{this.state.deleteSuccessMsg}</Alert>;
        } return (
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
                    <Aside active={"product"} />
                    <div className="page-wrapper">
                        <div className="container-fluid r-aside custome_container">
                            <div className="page-header">
                                <div className="row">
                                    <div className="col-md-6">
                                        <h2 className="page-title">Products</h2>
                                    </div>

                                    <div className="col-md-6">
                                        <center>
                                            {flashSuceessMessageSpan}
                                            {batchUpdateSpan}
                                        </center>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div  className="filter-panel filtercustome" style={{ 'visibility': 'hidden' }} id="filtercustomeX">
                                        <div className="panel panel-default">
                                            <div className="panel-body">
                                                <form>
                                                    <div className="row custom_row">
                                                        <div className="col-md-8">
                                                            <div className="row">
                                                                <div className="col-md-4">
                                                                    <div className="form-group">
                                                                        <select id="pref-perpage" className="form-control" name="searchValue3" onChange={e => this.changeSearchValue3(e)}>
                                                                            <option value={0}>Brand</option>
                                                                            <option value={"Colgate"}>Colgate</option>
                                                                            <option value={"Palmolive"}>Palmolive</option>
                                                                            <option value={"Hills"}>Hills</option>

                                                                        </select>
                                                                    </div>
                                                                </div>
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
                                <div className="col-md-3">
                                    <input className="content-search" type="text" name="search" placeholder="Filter Records" onChange={(e) => this.filterSearch(e)} />
                                </div>


                                <div className="filter float-right col-md-9">
                                    <div className="float-right">
                                        
                                            <Link className="new-product primary-button float-right" to="/newProduct"><i className="ti-plus"></i> NEW PRODUCT</Link>
                                  
                                        <a href="javscript:void(0);" onClick={this.openListView.bind(this)} className={`filter-btn list-view paginationshow ${this.state.listView===true?'list-viewactive':''}`}>filter</a>
                                        <a href="javscript:void(0);" className={`filter-btn ${this.state.listView === false ? 'card-view':'card-viewactive'} noactive`} onClick={(e) => { this.cardView(e) }}       >filter</a>
                                        
                                        {
                                            this.state.listView === true ?
                                                <a href="javscript:void(0);" className="filter-btn Setting_btn" data-toggle="modal" data-target="#setting"><i className="ti-settings" /></a>
                                                : void 0
                                        }


                                        <a href="javscript:void(0);" className="filter-btn filter droptoggle_custome" id="filter" >filter</a>
                                        <div className="selected-actions">
                                            <div className="option-box drop-option-link">
                                                <div className="nav-item dropdown dropcolgate">
                                                    <a className="nav-link custome_navlink" href="javascript:void(0);" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                                        <div className="option-box select-count selected"><span id="Counting">{this.state.selectedProducytId.length}</span> <span className="selected-text">Selected</span></div>
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
                                                                    {/* <div className="option-box import"><a href="javscript:void(0)"><i className="ti-import"></i>Product Import</a></div>
                                                                    <div className="option-box export"><a href="javscript:void(0)"><i className="ti-export"></i>Export Template</a></div> */}
                                                                    <div className="option-box compare batchUpdate" data-toggle="modal" data-target="#colgate">
                                                                        <a href="javscript:void(0)"><i className="ti-layout-column2"></i>Batch Update</a>
                                                                    </div>
                                                                    
                                                                    {
                                                                        this.state.selectedProducytId.length  > 0 &&  this.state.selectedProducytId.length===2 ?
                                                                    
                                                                    <div className="option-box compare">

                                                                        <a href="javscript:void(0)" onClick={(e) => { this.compareProducts(e) }}><i className="ti-layout-column2"></i>Compare Products</a></div>
                                                                       : 
                                                                       <div className="option-box compare">
                                                                        
                                                                       <a href="javscript:void(0)"><i className="ti-layout-column2"></i>Compare Products</a></div>
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <a className="dropdown-item" ><i className="ti-check" />Approve</a>
                                                        <a className="dropdown-item" ><i className="ti-close" />Reject</a>
                                                        <a className="dropdown-item" ><i className="fas fa-upload" />Publish</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <select name="example_length" aria-controls="example" value={this.state.dataPerPage} onChange={(e) => this.handleChange(e)} class="form-control form-control-sm" >
                                        <option value="5">5 per page</option>
                                        <option value="10">10 per page</option>
                                        <option value="25">25 per page</option>
                                        <option value="100">All</option>
                                    </select>
                                </div>
                            </div>
                            {/* card row start ---------------------------------------------------------------------*/}

                            <div className="table-view fullpageview tabtable">
                                <div className="row">
                                    <div className="col-md-12">

                                        <table id="example" className="table ">
                                            <thead>
                                                <tr className="starting">
                                                    <th scope="col">&nbsp;</th>
                                                    <th scope="col" >Main Image </th>
                                                    <th scope="col">SKU</th>
                                                    {selectedArray.map((keyinner, indexinner) => {
                                                        return (<th scope="col">{keyinner.value}</th>);

                                                    })
                                                    }
                                                    <th />
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    list.length > 0 ? list.map((key, index) => {
                                                        console.log("new pages ", key)
                                                        return <tr key={index}>
                                                            <td><input type="checkbox" name="" id={`listChecked${key.product_id}`} onClick={(e) => { this.handleCheckbox(e, key) }} /></td>
                                                            <td>
                                                                <div className="image-thumb">
                                                                    <a href="detailpage.html">
                                                                        {
                                                                            key.main_image !== null && key.main_image !== undefined && key.main_image.length > 0 ?
                                                                                <img src={key.main_image_asset} alt="" />
                                                                                :
                                                                                <ImageContainer src="1.png" />
                                                                        }
                                                                    </a>
                                                                </div>
                                                            </td>
                                                            <td><Link to={{ pathname: '/productDetailPage', state: { _data: key } }} >{key.product_id}</Link></td>
                                                            {selectedArray.map((keyinner, indexinner) => {
                                                                return (<td>{key[keyinner.key]}</td>);

                                                            })
                                                            }
                                                            <td><div className="row-hover">
                                                                <div className="row-link-options"> <Link className="icon edit-icon" to={{ pathname: '/editProduct', state: { _data: key } }}> <ImageContainer src="icons/edit.png" /></Link>
                                                                    <a className="icon delete-icon" href="javscript:void(0)" data-toggle="modal" data-target="#delete" onClick={(e) => this.setState({ deleteProductId: key.product_id })}> <ImageContainer src="icons/delete.png" />
                                                                    </a></div>
                                                            </div></td>
                                                        </tr>
                                                    }) : ''}

                                            </tbody>
                                        </table>
                                        <div className="pagebottompart">
                                            {/* <p className="float-left col-md-10 dataTables">Showing 1 to 5 of 8 entries</p> */}

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
                                </div>`
                            </div>
                            <div id="row-view">
                                <div className="row ">
                                    {
                                        list.length > 0 ? list.map((key, index) => {
                                            return <div className="col-xs-12 col-sm-4 col-md-3 card-block">
                                                <div className="card custome_img">
                                                    <div className="card-body text-center">
                                                        <a className="icon check-icon activebtn" href="javscript:void(0)" id={`activebtn${key.product_id}`} onClick={(e) => { this.handledeSelect(e, index, key) }}>
                                                            <ImageContainer src="icons/check.png" />
                                                        </a>

                                                        <p className="img">
                                                            {
                                                                key.main_image_asset !== null && key.main_image_asset !== undefined ?
                                                                    <img src={key.main_image_asset} alt="" />
                                                                    :
                                                                    <ImageContainer src="1.png" />
                                                            }

                                                            {/* <img src={base64data ? 'data:' + "image/png" + ';base64,' + base64data : ""} alt="" /> */}
                                                        </p>
                                                        <h4 className="card-title">{key.upc}</h4>
                                                        <p className="card-text">{key.product_name}<br /></p>
                                                    </div>
                                                    <div className="card-hover" id={`card-hover${key.product_id}`}>
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
                        </div>
                    </div>



                    {/* The Modal */}
                    <div className="modal fade allmodalcolgate" id="setting">
                        <div className="modal-dialog productlist_section">
                            <div className="modal-content">
                                {/* Modal Header */}
                                <div className="modal-header">
                                    <h4 className="modal-title title_modalheader col-md-7">Grid Configuration</h4>
                                    <div className="filtercustome col-md-4  batchU" >
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
                                                                return <li>{key.value}</li>
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
                                                <option value="Style">Style</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label>New Value</label>
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
                                    <h4 className="modal-title title_modalheader">Are you sure you want to delete?</h4>
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

            </div>


        )
    }
}


export default ProductList;