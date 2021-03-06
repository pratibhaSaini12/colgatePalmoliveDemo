import React, { Component } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Header from '../Header/index';
import Aside from '../SideBar/index';
import AssetJsonModel from '../ObjectJsonModel/assetStateToJson'
import axios from "axios";
import { Link } from "react-router-dom"
import ReactLoading from 'react-loading'
import { Alert } from 'reactstrap';


class NewProduct extends Component {

    constructor(props) {
        super(props)
        this.state = {
            product_id: '',
            product_name: '',
            upc: '',
            category: '',
            link: '',
            product_line: '',
            product_status: 'Active',
            cost: '',
            wholesale_price: '',
            msrp: '',
            retail_price: '',
            medium_description: '',
            long_description: '',
            tags: '',
            warnings: '',
            material: '',
            style: '',
            workflow_state: 'In Review',
            main_image: '',
            asset_id: 99999,
            image: '',
            brand: 'Colgate',
            product_completion: '',
            additional_image: '',
            pdfData: [],
            pdfFileArray: [],
            selectPdf: '',
            errorSpan: 'SKU number is required to upload Image',
            Loading: false,
            flashMessageSuccess: '',
            requiredFieldError: ''
        }

    }


    componentDidMount() {
        let self = this;
        self.setState({ Loading: true })
        axios.get("api/fetchfile").then(function (response) {
            self.setState({
                pdfFileArray: response.data,
                Loading: false
            })
        }).catch(function (error) {
            self.setState({ Loading: false })

        })
    }


    change(e) {
        this.setState({
            [e.target.name]: e.target.value,
            requiredFieldError: ''
        })
    }
    handleChange(e) {
        var val = e.target.value
        let self = this
        self.setState({
            selectPdf: val
        })
    }
    createNewProduct() {
        let state = this.state;
        let self = this
        if (state.product_name == '' || state.upc == '') {
            console.log('please fill all the mandatory fileds---')
            self.setState({
                requiredFieldError: 'Please fill all the required  product data'
            })
            return
        }
        self.setState({
            Loading: true
        })
        var completeArray = [state.brand, state.product_name, state.cost, state.category, state.upc]
        var percent = this.calculateComlpleteness(completeArray);

        let createProduct = {
            //  product_id: state.product_id,
            product_name: state.product_name,
            upc: state.upc,
            category: state.category,
            link: state.link,
            product_line: state.product_line,
            product_status: state.product_status,
            cost: state.cost,
            wholesale_price: state.wholesale_price,
            msrp: state.msrp,
            retail_price: state.retail_price,
            medium_description: state.medium_description,
            long_description: state.long_description,
            tags: state.tags,
            warnings: state.warnings,
            material: state.material,
            style: state.style,
            main_image: state.main_image,
            additionalImage: '',
            workflow_state: state.workflow_state,
            brand: state.brand,
            product_completion: percent,
            additional_image: state.additional_image,
            pdfFileArray: state.selectPdf
        }


        axios.post("api/createProduct", createProduct).then(function (response) {
            self.setState({ flashMessageSuccess: "Product has been created successfully!" })
            setTimeout(function () {
                self.setState({
                    Loading: false,

                })
                window.location.href = "/productList"
            }, 3000);
        }).catch(function (error) {
            this.setState({ Loading: false })
        })

    }

    //handeling image upload
    handleUploadAttachment(ev) {
        let self = this
        ev.preventDefault()
        self.setState({
            Loading: true
        })
        var FileSize = self.uploadInput.files[0].size / 1024 / 1024;
        if (FileSize <= 5) {
            var file = this.uploadInput.files[0];
            const data = new FormData();
            data.append('file', file);
            if (sessionStorage.getItem('userData') !== null) {
                let tempData = JSON.parse(sessionStorage.getItem('userData'))
                data.append('username', tempData.userData.first_name);
            }
            data.append('filename', file.name);
            axios.post("/api/upload/image", data).then((res) => {
                console.log('res----upload product Image', res);
                if (res.data) {
                    self.setState({
                        image: res.data.path,
                        main_image: res.data.id,
                        Loading: false
                    })
                    return
                } else {
                    return
                }
            }).catch((err) => {
                self.setState({
                    Loading: false
                })
                return
            })

        }
        else {
            console.log("fileSizeExceedMessage=======")
        }

    }
    handleUploadAttachmentAdditional(ev) {
        let self = this
        ev.preventDefault()
        self.setState({
            Loading: true
        })
        var FileSize = self.uploadInputAdditional.files[0].size / 1024 / 1024;
        if (FileSize <= 5) {
            var file = this.uploadInputAdditional.files[0];
            const data = new FormData();
            data.append('file', file);
            data.append('filename', file.name);
            if (sessionStorage.getItem('userData') !== null) {
                let tempData = JSON.parse(sessionStorage.getItem('userData'))
                data.append('username', tempData.userData.first_name);
            }
            axios.post("/api/upload/additional_image", data).then((res) => {
                if (res.data) {
                    self.setState({
                        additionalImage: res.data.path,
                        additional_image: res.data.id,
                        Loading: false
                    })
                    return
                } else {
                    return
                }
            }).catch((err) => {
                self.setState({
                    Loading: false
                })
                return
            })
        }
        else {
            console.log("fileSizeExceedMessage=======additional_image")
        }

    }
    UploadPDF() {
        var self = this;
        var assetBodyData = '{ pdfName :' + this.state.selectPdf + '}';
        self.setState({
            Loading: true
        })
        axios.post("/api/readpdf", { pdfName: this.state.selectPdf }).then((res) => {
            if (res.data) {
                self.setState({
                    pdfData: res.data,
                    Loading: false
                })
                return
            } else {
                $(".pdfData").html('Can not read the file !!');
                return
            }
        }).catch((err) => {
            console.log("errorrrrrrrrrrrrrr in uploading", err)
            return
        })

    }
    resize() {
        var textArray = document.getElementsByClassName('textarea custome_text');
        for (var i = 0; i < textArray.length; i++) {
            textArray[i].style.height = 'auto';
            textArray[i].style.height = textArray[i].scrollHeight + 'px';
        }
    }

    calculateComlpleteness(completeArray) {
        let count = 0
        let percent = 0
        let percentUnit = 20
        completeArray.map(list => {

            if (list !== "") {
                count++
            }
        })
        percent = percentUnit * count

        return percent;
    }

    render() {
        let img = this.state.image
        var state = this.state
        let addImge = this.state.additional_image
        let { pdfData, pdfFileArray, selectPdf } = this.state
        let image = img;
        let additionalImage = this.state.additionalImage
        let flashSuceessMessageSpan = '';
        if (this.state.flashMessageSuccess) {
            flashSuceessMessageSpan = <Alert className='alertFont'>{this.state.flashMessageSuccess}</Alert>;
        }
        let requiredFieldErrorSpan = '';
        if (this.state.requiredFieldError) {
            requiredFieldErrorSpan = <Alert className='alertFont' color='danger'>{this.state.requiredFieldError}</Alert>;
        }
        var completeArray = [state.brand, state.product_name, state.cost, state.category, state.upc]
        var percent = this.calculateComlpleteness(completeArray);
        return (

            <div>
                {/* <div className="preloader">
                <div className="loader">
                    <div className="loader__figure" />
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
                        <div className="container-fluid r-aside">
                            <div className="row">
                                <div className="col-md-12 top_part20">
                                    <div className="row">
                                        <div className="col-md-3">
                                            <h2 className="page-title float-left">Create Product</h2>
                                        </div>
                                        <div className="col-md-6">
                                            <center>
                                                {flashSuceessMessageSpan}
                                                {requiredFieldErrorSpan}
                                            </center>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="float-right allmodalcolgate">
                                                <button type="button" className="btn btn-primary" onClick={(e) => this.createNewProduct(e)}>SAVE</button>
                                                <button type="button" className="btn btn-outline-primary"> <Link to="/productlist">CANCEL</Link></button>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-3">
                                    <ul className="nav nav-tabs custometab" id="myTab" role="tablist">
                                        <li className="nav-item">
                                            <a className="nav-link active" data-toggle="tab" href="#home" role="tab" aria-controls="home">General</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" data-toggle="tab" href="#profile" role="tab" aria-controls="profile">Pricing</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" data-toggle="tab" href="#settings" role="tab" aria-controls="settings">Upload Image</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" data-toggle="tab" href="#uploadPDF" role="tab" aria-controls="uploadPDF">Pack Flats</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" data-toggle="tab" href="#settings2" role="tab" aria-controls="settings2">Workflow State</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" data-toggle="tab" href="#productQuality" role="tab" aria-controls="productQuality">Product Quality</a>
                                        </li>
                                        {/* <li className="nav-item">
                                        <a className="nav-link" data-toggle="tab" href="#settings3" role="tab" aria-controls="settings2">Language</a>
                                    </li> */}
                                    </ul>
                                </div>
                                <div className="col-md-9">
                                    <div className="tab-content">
                                        <div className="tab-pane active  filtercustome tabsectionform" id="home" role="tabpanel">
                                            <form>
                                                <ul>
                                                    <li className="row">
                                                        {/* <div className="col-md-11">
                                                        <div className="form-group">
                                                            <label>Product ID</label>
                                                            <input className="form-control" type="text" name="product_id" value={this.state.product_id} onChange={e => this.change(e)} />
                                                        </div>
                                                    </div> */}
                                                        <div className="col-md-1">
                                                            {/* <div className="rightpartedit_delete">
        <center>
        <a href="javascript:void(0)"><i className="ti-trash align-middle"></i></a>
        
        </center>
        </div> */}
                                                        </div>
                                                    </li>
                                                    <li className="row">
                                                        <div className="col-md-11">
                                                            <div className="form-group">
                                                                <label>Product Name<span style={{ color: 'red' }}>*</span></label>
                                                                <input className="form-control" type="text" name="product_name" value={this.state.product_name} onChange={e => this.change(e)} />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-1">
                                                        </div>
                                                    </li>
                                                    <li className="row">
                                                        <div className="col-md-11">
                                                            <div className="form-group">
                                                                <label>SKU<span style={{ color: 'red' }}>*</span></label>
                                                                <input className="form-control" type="text" name="upc" value={this.state.upc} onChange={e => this.change(e)} />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-1">
                                                        </div>
                                                    </li>
                                                    <li className="row">
                                                        <div className="col-md-11">
                                                            <div className="form-group">
                                                                <label>Category</label>
                                                                <div className="form-group">
                                                                    <select id="pref-perpage" value={this.state.category === '' ? '' : this.state.category} name="category" className="form-control" onChange={(e) => this.change(e)}>
                                                                        <option value={0}>Category</option>
                                                                        <option value={"Toothpastes"}>Toothpastes</option>
                                                                        <option value={"Toothbrushes"}>Toothbrushes</option>
                                                                        <option value={"Mouthwashes"}>Mouthwashes</option>
                                                                        <option value={"Kids Products"}>Kids Products</option>
                                                                        <option value={"Toothpowder"}>Toothpowder</option>
                                                                        <option value={"Liquid handwash"}>Liquid handwash</option>
                                                                        <option value={"Science Diet"}>Science Diet</option>
                                                                        <option value={"Prescription Diet"}>Prescription Diet</option>
                                                                        <option value={"Cat Food"}>Cat Food</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-1">
                                                        </div>
                                                    </li>
                                                    <li className="row">
                                                        <div className="col-md-11">
                                                            <div className="form-group">
                                                                <label>Product Status</label>
                                                                <div className="form-group">
                                                                    <select id="pref-perpage" name="product_status" onChange={(e) => this.change(e)} value={this.state.product_status === '' ? '' : this.state.product_status} className="form-control">
                                                                        <option value={"Active"}>Active</option>
                                                                        <option value={"Inactive"}>Inactive</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-1">
                                                        </div>
                                                    </li>

                                                    <li className="row">
                                                        <div className="col-md-11">
                                                            <div className="form-group">
                                                                {/* <label>Brand</label> */}
                                                                <div className="form-group">
                                                                    <label>Brand</label>
                                                                    <div className="form-group">
                                                                        <select id="pref-perpage" name="brand" onChange={(e) => this.change(e)} value={this.state.brand} className="form-control">
                                                                            <option value={"Colgate"}>Colgate</option>
                                                                            <option value={"Palmolive"}>Palmolive</option>
                                                                            <option value={"Hills"}>Hills</option>

                                                                        </select>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-1">
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li className="row">
                                                        <div className="col-md-11">
                                                            <div className="form-group">
                                                                <label>Style</label>
                                                                <input className="form-control" type="text" name="style" value={this.state.style} onChange={e => this.change(e)} />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-1">
                                                        </div>
                                                    </li>
                                                </ul>
                                            </form>
                                        </div>
                                        <div className="tab-pane filtercustome tabsectionform" id="profile" role="tabpanel">
                                            <form>
                                                <ul>
                                                    <li className="row">
                                                        <div className="col-md-11">
                                                            <div className="form-group">
                                                                <label>Price ($)</label>
                                                                <input className="form-control" type="number" name="cost" value={this.state.cost} onChange={e => this.change(e)} />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-1">
                                                        </div>
                                                    </li>
                                                    <li className="row">
                                                        <div className="col-md-11">
                                                            <div className="form-group">
                                                                <label>Formatted Base Wholesale Price ($)</label>
                                                                <input className="form-control pricedate_form" type="number" name="wholesale_price" value={this.state.wholesale_price} onChange={e => this.change(e)} />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-1">
                                                        </div>
                                                    </li>
                                                    <li className="row">
                                                        <div className="col-md-11">
                                                            <div className="form-group">
                                                                <label>Formatted MSRP ($)</label>
                                                                <input className="form-control pricedate_form" type="number" name="msrp" value={this.state.msrp} onChange={e => this.change(e)} />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-1">
                                                        </div>
                                                    </li>
                                                    <li className="row">
                                                        <div className="col-md-11">
                                                            <div className="form-group">
                                                                <label>Formatted Retail Price ($)</label>
                                                                <input className="form-control pricedate_form" type="number" name="retail_price" value={this.state.retail_price} onChange={e => this.change(e)} />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-1">
                                                        </div>
                                                    </li>
                                                </ul>
                                            </form>
                                        </div>
                                        <div className="tab-pane filtercustome tabsectionform" id="messages" role="tabpanel">
                                            <form>
                                                <ul>
                                                    <li className="row">
                                                        <div className="col-md-11">
                                                            <div className="form-group">
                                                                <label>Medium Description</label>
                                                                <div id="editor" contentEditable="false">
                                                                    <section id="toolbar">
                                                                        <div id="bold" className="icon_custome fa fa-bold" />
                                                                        <div id="italic" className="icon_custome fa fa-italic" />
                                                                        <div id="createLink" className="icon_custome fa fa-underline" />
                                                                        <div id="insertUnorderedList" className="icon_custome fa fa-list" />
                                                                        <div id="insertOrderedList" className="icon_custome fa fa-list-ol" />
                                                                    </section>
                                                                    <div id="page" contentEditable="true">
                                                                        <p id="page-content" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-1">
                                                        </div>
                                                    </li>
                                                    <li className="row">
                                                        <div className="col-md-11">
                                                            <div className="form-group">
                                                                <label>Long Description</label>
                                                                <div id="editor" contentEditable="false">
                                                                    <section id="toolbar">
                                                                        <div id="bold" className="icon_custome fa fa-bold" />
                                                                        <div id="italic" className="icon_custome fa fa-italic" />
                                                                        <div id="createLink" className="icon_custome fa fa-underline" />
                                                                        <div id="insertUnorderedList" className="icon_custome fa fa-list" />
                                                                        <div id="insertOrderedList" className="icon_custome fa fa-list-ol" />
                                                                    </section>
                                                                    <div id="page" contentEditable="true">
                                                                        <p id="page-content" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-1">
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className="form-group">
                                                            <label>Long Description</label>
                                                            <div className="clearfix">
                                                                <button className="tagbtn">Air travel<i className="ti-close" /></button>
                                                                <button className="tagbtn">TSA Approved<i className="ti-close" /></button>
                                                                <button className="tagbtn admore"><i className="ti-plus" /></button>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li className="row">
                                                        <div className="col-md-11">
                                                            <div className="form-group">
                                                                <label>Warnings</label>
                                                                <div id="editor" contentEditable="false">
                                                                    <section id="toolbar">
                                                                        <div id="bold" className="icon_custome fa fa-bold" />
                                                                        <div id="italic" className="icon_custome fa fa-italic" />
                                                                        <div id="createLink" className="icon_custome fa fa-underline" />
                                                                        <div id="insertUnorderedList" className="icon_custome fa fa-list" />
                                                                        <div id="insertOrderedList" className="icon_custome fa fa-list-ol" />
                                                                    </section>
                                                                    <div id="page" contentEditable="true">
                                                                        <p id="page-content" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-1">
                                                        </div>
                                                    </li>
                                                    <li className="row">
                                                        <div className="col-md-11">
                                                            <div className="form-group">
                                                                <label>Material</label>
                                                                <div className="form-group">
                                                                    <select id="pref-perpage" className="form-control">
                                                                        <option value={0}>Links</option>
                                                                        <option value={1}>3</option>
                                                                        <option value={2}>4</option>
                                                                        <option value={3}>5</option>
                                                                        <option value={4}>6</option>
                                                                        <option value={7}>7</option>
                                                                        <option value={8}>8</option>
                                                                        <option value={9}>9</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-1">
                                                        </div>
                                                    </li>
                                                    <li className="row">
                                                        <div className="col-md-11">
                                                            <div className="form-group">
                                                                <label>Fabric Care</label>
                                                                <div id="editor" contentEditable="false">
                                                                    <section id="toolbar">
                                                                        <div id="bold" className="icon_custome fa fa-bold" />
                                                                        <div id="italic" className="icon_custome fa fa-italic" />
                                                                        <div id="createLink" className="icon_custome fa fa-underline" />
                                                                        <div id="insertUnorderedList" className="icon_custome fa fa-list" />
                                                                        <div id="insertOrderedList" className="icon_custome fa fa-list-ol" />
                                                                    </section>
                                                                    <div id="page" contentEditable="true">
                                                                        <p id="page-content" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-1">
                                                        </div>
                                                    </li>
                                                    <li className="row">
                                                        <div className="col-md-11">
                                                            <div className="form-group">
                                                                <label>HTMl Description</label>
                                                                <div id="editor" contentEditable="false">
                                                                    <ul className="listofsection">
                                                                        <li>1</li>
                                                                        <li>2</li>
                                                                        <li>3</li>
                                                                        <li>4</li>
                                                                        <li>5</li>
                                                                        <li>6</li>
                                                                    </ul>
                                                                    <div className="htmldescription" id="page" contentEditable="true">
                                                                        <p id="page-content" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-1">
                                                        </div>
                                                    </li>
                                                </ul>
                                            </form>
                                        </div>
                                        <div className="tab-pane" id="settings" role="tabpanel">
                                            <div className="tab-pane filtercustome " id="settings" role="tabpanel">
                                                <div className="form-group">
                                                    <label>Main Image</label>
                                                    <div className="form-group">
                                                        <input className="form-control" type="file" ref={(ref) => { this.uploadInput = ref }} onChange={(e) => this.handleUploadAttachment(e)} style={{ display: 'none' }} />
                                                        <a onClick={(e) => this.uploadInput.click()} className="create-new-link uploadfile">Upload</a>
                                                        {image !== '' && image !== undefined ?
                                                            <img src={image} height="50px" width="50px" className="digital_img" />
                                                            : ''}
                                                    </div>
                                                </div>
                                                <hr></hr>
                                                {/* additional image */}
                                                <div className="form-group">
                                                    <label>Additional Image</label>
                                                    <div className="form-group">
                                                        <input className="form-control" type="file" ref={(ref) => { this.uploadInputAdditional = ref }} onChange={this.handleUploadAttachmentAdditional.bind(this)} style={{ display: 'none' }} />
                                                        <a onClick={(e) => this.uploadInputAdditional.click()} className="create-new-link uploadfile">Upload</a>
                                                        {additionalImage !== '' && additionalImage !== undefined ?
                                                            <img src={additionalImage} height="50px" width="50px" className="digital_img" />
                                                            : ''}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                        {/* Panel for pdf upload in specification panel*/}
                                        <div className="tab-pane" id="uploadPDF" role="tabpanel">
                                            <div className="tab-pane filtercustome " id="uploadPDF" role="tabpanel">
                                                <div className="form-group">
                                                    <label>Pack Flats</label>
                                                    <div className="form-group">

                                                        <select className="form-control onselect" name="example_length" aria-controls="example" onChange={(e) => this.handleChange(e)} >
                                                            <option value="">Select File</option>
                                                            {
                                                                pdfFileArray.length > 0 ? pdfFileArray.map(function (key, index) {
                                                                    return (<option value={key}>{key}</option>)
                                                                }) : ''

                                                            }
                                                        </select>
                                                        <a onClick={(e) => this.UploadPDF()} className="create-new-link uploadfile delete">Fetch Data</a>
                                                        <div class="tab-pane filtercustome tabsectionform custome_listfile active" id="settings3" role="tabpanel">
                                                            <ul class="nav nav-tabs datetab" id="myTab" role="tablist">
                                                                {
                                                                    pdfData.length > 0 ? pdfData.map(function (key, index) {
                                                                        return <li class="nav-item">
                                                                            <a className={index == 0 ? 'nav-link active' : 'nav-link'} id="contact-tab" data-toggle="tab" href={`#contact${index}`} role="tab" aria-controls="contact" aria-selected="true">{key.lang}</a>
                                                                        </li>
                                                                    }) : ''
                                                                }
                                                            </ul>
                                                            <div class="tab-content custome_content under_tabs" id="myTabContent">
                                                                {
                                                                    pdfData.length > 0 ? pdfData.map(function (key, index) {
                                                                        return <div className={index == 0 ? 'tab-pane fade show active' : 'tab-pane fade '} id={`contact${index}`} role="tabpanel" aria-labelledby="contact-tab">
                                                                            <div class="row">
                                                                                <div class="col-md-6">
                                                                                    <div class="form-group all_list_details">
                                                                                        {key.ques1}
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-md-6">
                                                                                    <div class="form-group">
                                                                                        <textarea class="textarea custome_text" style={{ height: '100%', width: '100%' }} disabled>{key.ans1}</textarea>
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-md-6">
                                                                                    <div class="form-group all_list_details">
                                                                                        {key.ques2}
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-md-6">
                                                                                    <div class="form-group">
                                                                                        <textarea class="textarea custome_text" style={{ height: '100%', width: '100%' }} disabled>{key.ans2}</textarea>
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-md-6">
                                                                                    <div class="form-group all_list_details">
                                                                                        {key.ques3}
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-md-6">
                                                                                    <div class="form-group">
                                                                                        <textarea class="textarea custome_text" style={{ height: '100%', width: '100%' }} disabled>{key.ans3}</textarea>
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-md-6">
                                                                                    <div class="form-group all_list_details">
                                                                                        {key.ques4}
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-md-6">
                                                                                    <div class="form-group">
                                                                                        <textarea class="textarea custome_text" style={{ height: '100%', width: '100%' }} disabled>{key.ans4}</textarea>
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-md-6">
                                                                                    <div class="form-group all_list_details">
                                                                                        {key.ques5}
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-md-6">
                                                                                    <div class="form-group">
                                                                                        <textarea class="textarea custome_text" style={{ height: '100%', width: '100%' }} disabled>{key.ans5}</textarea>
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
                                            </div>
                                        </div>
                                        <div className="tab-pane" id="settings2" role="tabpanel">
                                            <div className="tab-pane filtercustome " id="settings2" role="tabpanel">
                                                <div className="form-group">
                                                    <label>Workflow state</label>
                                                    <div className="form-group">

                                                        <select id="pref-perpage" onChange={(e) => this.change(e)} name="workflow_state" className="form-control workflow"
                                                            value={this.state.workflow_state === '' ? '' : this.state.workflow_state}>
                                                            <option value={"In Review"}>In Review</option>
                                                            <option value={"In Publish"}>In Publish</option>
                                                            <option value={"Published"}>Published</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="tab-pane" id="productQuality" role="tabpanel">
                                            <div className="tab-pane filtercustome " id="productQuality" role="tabpanel">
                                                <div className="form-group">
                                                    <label>Product Completeness (%) - Product Name, Sku, Cateogry, Brand,Price</label>
                                                    <div className="form-group">
                                                        <input className="form-control" value={percent} readonly />


                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="tab-pane filtercustome tabsectionform  custome_listfile" id="settings3" role="tabpanel">
                                            <ul className="nav nav-tabs datetab" id="myTab" role="tablist">


                                                <li className="nav-item">
                                                    <a className="nav-link active" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false">En</a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className="nav-link" id="download-tab" data-toggle="tab" href="#download" role="tab" aria-controls="download" aria-selected="false">Es</a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className="nav-link" id="download-tab" data-toggle="tab" href="#download" role="tab" aria-controls="download" aria-selected="false">Us</a>
                                                </li>

                                            </ul>
                                            <div className="tab-content custome_content under_tabs" id="myTabContent">

                                                <div className="tab-pane fade show active" id="contact" role="tabpanel" aria-labelledby="contact-tab">
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label>text</label>
                                                                <input className="form-control" type="text" name="text1" />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label>text</label>
                                                                <input className="form-control" type="text" name="text1" />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label>text</label>
                                                                <input className="form-control" type="text" name="text1" />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label>text</label>
                                                                <input className="form-control" type="text" name="text1" />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label>text</label>
                                                                <input className="form-control" type="text" name="text1" />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label>text</label>
                                                                <input className="form-control" type="text" name="text1" />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label>text</label>
                                                                <input className="form-control" type="text" name="text1" />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label>text</label>
                                                                <input className="form-control" type="text" name="text1" />
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                                <div className="tab-pane fade" id="download" role="tabpanel" aria-labelledby="download-tab">sadsadd2</div>
                                            </div>


                                        </div>
                                    </div>




                                </div>
                            </div>
                        </div>
                    </div>
                    {/* The Modal */}
                    <div className="modal fade allmodalcolgate" id="colgate">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                {/* Modal Header */}
                                <div className="modal-header">
                                    <h4 className="modal-title title_modalheader">Create New Product</h4>
                                    <button type="button" className="close" data-dismiss="modal">×</button>
                                </div>
                                {/* Modal body */}
                                <div className="modal-body filtercustome">
                                    <form>
                                        <div className="form-group">
                                            <label>Product Id</label>
                                            <input className="form-control" type="text" name="search" placeholder={12345} />
                                        </div>
                                        <div className="form-group">
                                            <label>Product Name</label>
                                            <input className="form-control" type="text" name="search" placeholder={12345} />
                                        </div>
                                        <div className="avatar-upload"> <span>Product Name</span>
                                            <div className="avatar-preview">
                                                <div id="imagePreview" style={{ backgroundImage: 'url(http://i.pravatar.cc/500?img=7)' }}> </div>
                                            </div>
                                            <div className="avatar-edit">
                                                <input type="file" id="imageUpload" accept=".png, .jpg, .jpeg" />
                                                <label htmlFor="imageUpload">Select images</label>
                                            </div>
                                        </div>
                                        <p><span className="label label-danger label-rounded">NOTE!</span> Attached images thumbnail is supported in latest firefox chrome,
                Opera,Safari and Internet Explore 10 only</p>
                                    </form>
                                </div>
                                {/* Modal footer */}
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-primary" data-dismiss="modal">CREATE</button>
                                    <button type="button" className="btn btn-outline-primary">CANCEL</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default NewProduct;