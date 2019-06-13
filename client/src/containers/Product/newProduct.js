import React, { Component } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Header from '../Header/index';
import Aside from '../SideBar/index';
import AssetJsonModel from '../ObjectJsonModel/assetStateToJson'
import axios from "axios";
//import { boxShadow } from "html2canvas/dist/types/css/property-descriptors/box-shadow";

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
            workflow_state: '',
            main_image: '',
            asset_id: 99999,
            image: '',
            brand: 'Colgate',
            product_completion: ''

        }
    }


    componentDidMount() {

    }


    change(e) {
        console.log("e.target.value", e.target.value)
        console.log("e.target.name", e.target.name)
        this.setState({ errMessage: false })
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    createNewProduct() {
        console.log("state on save====", this.state);
        let state = this.state;
        let createProduct = {
            product_id: state.product_id,
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
            main_image: '',
            workflow_state: state.workflow_state,
            brand: state.brand,
            product_completion: state.product_completion
        }
        axios.post("api/createProduct", createProduct).then(function (response) {
            console.log('resposne from api==', response)
            if (response.data.product) {
                window.location.href = "/productList"
            }

        }).catch(function (error) {

        })
    }

    //handeling image upload
    handleUploadAttachment(ev) {
        console.log("ev========", ev)
        let self = this
        var idCardBase64
        var assetBodyData
        ev.preventDefault()
        var FileSize = self.uploadInput.files[0].size / 1024 / 1024;
        if (FileSize <= 5) {
            self.getBase64(self.uploadInput.files[0], (result) => {
                var base64 = result.split(",");
                idCardBase64 = base64[1]
                assetBodyData = AssetJsonModel._getJsonDataFromAsset({ base64: idCardBase64, fileName: self.uploadInput.files[0].name, mimetype: self.uploadInput.files[0].type, id: this.state.product_id === '' ? this.state.asset_id : this.state.product_id })
                console.log("===assetBodyData====", assetBodyData)
                self.setState({
                    image: assetBodyData.data
                })
                axios.post("/api/upload/image", assetBodyData).then((res) => {
                    console.log("error in response", res)
                    if (res.data) {
                        console.log("res in uploading", res)
                        return
                    } else {
                        console.log("error in response", res)
                        return
                    }
                }).catch((err) => {
                    console.log("errorrrrrrrrrrrrrr in uploading", err)
                    return
                })
            });
        }
        else {
            console.log("fileSizeExceedMessage=======")
        }
    }


    /*Upload PDF files 
    Author: Shashnak Saxena
    Date: June 12th 2019
    */
    UploadPDF(ev) {
        let self = this
        var idCardBase64
        var assetBodyData
        ev.preventDefault()
        var FileSize = self.uploadInputFile.files[0].size / 1024 / 1024;
        axios.get("/api/readpdf", assetBodyData).then((res) => {
            console.log("error in response", res)
            if (res.data) {


                var box = '<div class="tab-pane filtercustome tabsectionform custome_listfile active" id="settings3" role="tabpanel">' +
                    '<ul class="nav nav-tabs datetab" id="myTab" role="tablist">';
                for (var i = 0; i < res.data.length; i++) {
                    var classActive = '';
                    if (i == 0)
                        classActive = 'active';
                    box = box + '<li class="nav-item">' +
                        '<a class="nav-link ' + classActive + '" id="contact-tab" data-toggle="tab" href="#contact' + i + '" role="tab" aria-controls="contact" aria-selected="true">' + res.data[i].lang + '</a>' +
                        '</li>';
                }

                box = box + '</ul>' +
                    '<div class="tab-content custome_content under_tabs" id="myTabContent">';
                for (var i = 0; i < res.data.length; i++) {
                    var classActive = '';
                    if (i == 0)
                        classActive = 'show active';
                    box = box + '<div class="tab-pane fade ' + classActive + '" id="contact' + i + '" role="tabpanel" aria-labelledby="contact-tab">' +
                        '<div class="row">' +
                        '<div class="col-md-6">' +
                        '<div class="form-group">' +
                        res.data[i].ques1
                        + '</div>' +
                        '</div>' +
                        '<div class="col-md-6">' +
                        '<div class="form-group">' +
                        res.data[i].ans1
                        + '</div>' +
                        '</div>' +
                        '<div class="col-md-6">' +
                        '<div class="form-group">' +
                        res.data[i].ques2
                        + '</div>' +
                        '</div>' +
                        '<div class="col-md-6">' +
                        '<div class="form-group">' +
                        res.data[i].ans2
                        + '</div>' +
                        '</div>' +
                        '<div class="col-md-6">' +
                        '<div class="form-group">' +
                        res.data[i].ques3
                        + '</div>' +
                        '</div>' +
                        '<div class="col-md-6">' +
                        '<div class="form-group">' +
                        res.data[i].ans3
                        + '</div>' +
                        '</div>' +
                        '<div class="col-md-6">' +
                        '<div class="form-group">' +
                        res.data[i].ques4
                        + '</div>' +
                        '</div>' +
                        '<div class="col-md-6">' +
                        '<div class="form-group">' +
                        res.data[i].ans4
                        + '</div>' +
                        '</div>' +
                        '<div class="col-md-6">' +
                        '<div class="form-group">' +
                        res.data[i].ques5
                        + '</div>' +
                        '</div>' +
                        '<div class="col-md-6">' +
                        '<div class="form-group">' +
                        res.data[i].ans5
                        + '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>';
                }


                box = box + '</div>' +
                    '</div>';
                document.getElementById("pdfData").innerHTML = box;





                //  $(".pdfData").html(JSON.stringify(res.data)); 
                console.log("res in uploading", res)
                return
            } else {
                $(".pdfData").html('Can not read the file !!');
                console.log("error in response", res)
                return
            }
        }).catch((err) => {
            console.log("errorrrrrrrrrrrrrr in uploading", err)
            return
        })



        //if (FileSize <= 5) {
        // self.getBase64(self.uploadInputFile.files[0], (result) => {
        // 	var base64 = result.split(",");
        // 	idCardBase64 = base64[1]
        // 	assetBodyData = AssetJsonModel._getJsonDataFromAsset({ base64: idCardBase64, fileName: self.uploadInputFile.files[0].name, mimetype: self.uploadInputFile.files[0].type, id: this.state.product_id === '' ? this.state.asset_id : this.state.product_id })
        //     console.log("===assetBodyData====",assetBodyData)
        //     self.setState({
        //         image: assetBodyData.data
        //     })
        //     axios.post("/api/readpdf",assetBodyData).then((res)=>{
        //         console.log("error in response",res)
        //         if(res.data){
        // 			console.log("res in uploading",res)
        // 			return 
        //         } else {
        // 			console.log("error in response",res)
        // 			return						
        //         }
        //     }).catch((err)=>{
        // 		console.log("errorrrrrrrrrrrrrr in uploading",err)
        // 		return
        //     })
        // });
        //}
        // else {
        // 	console.log("fileSizeExceedMessage=======")
        // }
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

    calculateComlpleteness(completeArray){
        let count = 0
        let percent = 0
        let percentUnit = 20
        completeArray.map(list=>{
            
            if(list!=="") {
                count++
            } 
        })
        percent = percentUnit*count
    
        return percent;
    }

    render() {
        console.log("statessss in newProduct", this.state)
        let img = this.state.image
        var state = this.state
        let image = ''
        if (img !== '') {
            image = "data:" + img.mimetype + ";base64," + img.data
        }
       
       var completeArray=[state.product_id,state.product_name,state.cost,state.category,state.upc]
       console.log('completeArray--',completeArray,completeArray[3])
        var percent=this.calculateComlpleteness(completeArray);


       console.log('product_completion===', percent)

        return (
            <div>
                {/* <div className="preloader">
                    <div className="loader">
                        <div className="loader__figure" />
                        <p className="loader__label">Please Wait..</p>
                    </div>
                </div> */}
                <div id="main-wrapper">
                    <Header />
                    <Aside />
                    <div className="page-wrapper">
                        <div className="container-fluid r-aside">
                            <div className="row">
                                <div className="col-md-12 top_part20">
                                    <h2 className="page-title float-left">Create New Product</h2>
                                    <div className="float-right allmodalcolgate">
                                        <button type="button" className="btn btn-primary" onClick={(e) => this.createNewProduct(e)}>SAVE</button>
                                        <button type="button" className="btn btn-outline-primary">NEXT</button>
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
                                                        <div className="col-md-11">
                                                            <div className="form-group">
                                                                <label>Product ID</label>
                                                                <input className="form-control" type="text" name="product_id" value={this.state.product_id} onChange={e => this.change(e)} />
                                                            </div>
                                                        </div>
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
                                                                <label>Product Name</label>
                                                                <input className="form-control" type="text" name="product_name" value={this.state.product_name} onChange={e => this.change(e)} />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-1">
                                                            {/*<div className="rightpartedit_delete">
          <center>
            <a href="javascript:void(0)"><i className="ti-plus align-middle"></i></a>
      		<a href="javascript:void(0)"><i className="ti-trash align-middle"></i></a>
          
           
          </center>
          </div>*/}
                                                        </div>
                                                    </li>
                                                    <li className="row">
                                                        <div className="col-md-11">
                                                            <div className="form-group">
                                                                <label>SKU</label>
                                                                <input className="form-control" type="text" name="upc" value={this.state.upc} onChange={e => this.change(e)} />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-1">
                                                            {/*<div className="rightpartedit_delete">
          <center>
            <a href="javascript:void(0)"><i className="ti-plus align-middle"></i></a>
      		<a href="javascript:void(0)"><i className="ti-trash align-middle"></i></a>
          
           
          </center>
          </div>*/}
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
                                                                    </select>
                                                                    {/* <p className="value_ofcategory">Value inherited from parent product</p> */}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-1">
                                                            {/*<div className="rightpartedit_delete">
          <center>
            <a href="javascript:void(0)"><i className="ti-plus align-middle"></i></a>
      		<a href="javascript:void(0)"><i className="ti-trash align-middle"></i></a>
          
           
          </center>
          </div>*/}
                                                        </div>
                                                    </li>
                                                    {/* <li className="row">
                                                        <div className="col-md-11">
                                                            <div className="form-group">
                                                                <label>Link</label>
                                                                <input className="form-control" type="text" name="link" value={this.state.link} onChange={e => this.change(e)} />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-1">
                                                            {/*<div className="rightpartedit_delete">
          <center>
            <a href="javascript:void(0)"><i className="ti-plus align-middle"></i></a>
      		<a href="javascript:void(0)"><i className="ti-trash align-middle"></i></a>
          
           
          </center>
          </div>
                                                        </div>
                                                    </li> */}
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
                                                                <label>Brand</label>
                                                                <div className="form-group">
                                                                    <select id="pref-perpage" name="brand" onChange={(e) => this.change(e)} value={this.state.product_status === '' ? '' : this.state.product_status} className="form-control">
                                                                        <option value={"Colgate"}>Colgate</option>
                                                                        <option value={"Palmolive"}>Palmolive</option>
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
                                                                <input className="form-control" type="text" name="cost" value={this.state.cost} onChange={e => this.change(e)} />
                                                                {/* <p className="value_ofcategory">Value inherited from parent product</p> */}
                                                            </div>
                                                        </div>
                                                        <div className="col-md-1">
                                                        </div>
                                                    </li>
                                                    <li className="row">
                                                        <div className="col-md-11">
                                                            <div className="form-group">
                                                                <label>Formatted Base Wholesale Price ($)</label>
                                                                <input className="form-control pricedate_form" type="text" name="wholesale_price" value={this.state.wholesale_price} onChange={e => this.change(e)} />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-1">
                                                        </div>
                                                    </li>
                                                    <li className="row">
                                                        <div className="col-md-11">
                                                            <div className="form-group">
                                                                <label>Formatted MSRP ($)</label>
                                                                <input className="form-control pricedate_form" type="text" name="msrp" value={this.state.msrp} onChange={e => this.change(e)} />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-1">
                                                        </div>
                                                    </li>
                                                    <li className="row">
                                                        <div className="col-md-11">
                                                            <div className="form-group">
                                                                <label>Formatted Retail Price ($)</label>
                                                                <input className="form-control pricedate_form" type="text" name="retail_price" value={this.state.retail_price} onChange={e => this.change(e)} />
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
                                                                {/* <p className="value_ofcategory">Value inherited from parent product</p> */}
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
                                                                    {/* <p className="value_ofcategory">Value inherited from parent product</p> */}
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
                                                    <label>Upload Image</label>
                                                    <div className="form-group">
                                                        <input className="form-control" type="file" ref={(ref) => { this.uploadInput = ref }} onChange={this.handleUploadAttachment.bind(this)} style={{ display: 'none' }} />
                                                        <a onClick={(e) => this.uploadInput.click()} className="create-new-link uploadfile">Upload Files</a>
                                                        {image !== '' && image !== undefined ?
                                                            <img src={image} height="50px" width="50px" className="digital_img" />
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
                                                        <input className="form-control" type="file" ref={(ref) => { this.uploadInputFile = ref }} onChange={this.UploadPDF.bind(this)} style={{ display: 'none' }} />
                                                        <a onClick={(e) => this.uploadInputFile.click()} className="create-new-link uploadfile">Upload Files</a>
                                                        {image !== '' && image !== undefined ?
                                                            <img src={image} height="50px" width="50px" className="digital_img" />
                                                            : ''}

                                                        <div id="pdfData"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>



                                        <div className="tab-pane" id="settings2" role="tabpanel">
                                            <div className="tab-pane filtercustome " id="settings2" role="tabpanel">
                                                <div className="form-group">
                                                    <label>Workflow state</label>
                                                    <div className="form-group">

                                                        <select id="pref-perpage" onChange={(e) => this.change(e)} name="workflow_state" className="form-control"
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
                                                    <label>Product Completeness</label>
                                                    <div className="form-group">
                                                        <input className="form-control" readonly />


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