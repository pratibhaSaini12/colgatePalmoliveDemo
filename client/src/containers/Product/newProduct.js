import React, { Component } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Header from '../Header/index';
import Aside from '../SideBar/index';
import AssetJsonModel from '../ObjectJsonModel/assetStateToJson'
import axios from "axios";
import { Link } from "react-router-dom"
import ReactLoading from 'react-loading'
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
            product_completion: '',
            additional_image: '',
            pdfData: [],
            pdfFileArray:[],
            selectPdf:'',
            errorSpan : 'SKU number is required to upload Image',
            Loading:  false
        }
    }


    componentDidMount() {
        let self = this;
        self.setState({Loading : true})
        axios.get("api/fetchfile").then(function (response) {
            console.log('resposne from api fetchfile==', response.data)
            self.setState({
                pdfFileArray:response.data,
                Loading : false
            })
            console.log('vjhdvbhuvb',self.state.pdfFileArray);
        }).catch(function (error) {
            self.setState({Loading : false})
        })
    }


    change(e) {
        console.log("e.target.value", e.target.value)
        console.log("e.target.name", e.target.name)
        this.setState({
            [e.target.name]: e.target.value,
        })
    }
    handleChange(e) {
        var val = e.target.value
        console.log(val);
        let self = this
        self.setState({
            selectPdf: val
        })
    }
    createNewProduct() {
        console.log("state on save====", this.state);
        let state = this.state;
        this.setState({Loading : true})
        var completeArray=[state.brand,state.product_name,state.cost,state.category,state.upc]
        console.log('completeArray--',completeArray,completeArray[3])
         var percent=this.calculateComlpleteness(completeArray);
 
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
            main_image: '',
            workflow_state: state.workflow_state,
            brand: state.brand,
            product_completion: percent,
            additional_image: '',
            pdfFileArray:state.pdfFileArray
        }

        console.log('createProduct---',percent)


        axios.post("api/createProduct", createProduct).then(function (response) {
            console.log('resposne from api==', response)
            if (response.data.product) {
                window.location.href = "/productList"
            }
            this.setState({Loading : false})
        }).catch(function (error) {
            this.setState({Loading : false})
        })
    }

    //handeling image upload
    handleUploadAttachment(ev) {
        console.log("ev========", ev)
        let self = this
        var idCardBase64
        var assetBodyData
        ev.preventDefault()
        if(self.state.upc !== '') {
            var FileSize = self.uploadInput.files[0].size / 1024 / 1024;
            if (FileSize <= 5) {
                self.getBase64(self.uploadInput.files[0], (result) => {
                    var base64 = result.split(",");
                    idCardBase64 = base64[1]
                    assetBodyData = AssetJsonModel._getJsonDataFromAsset({ created_at : '', fileSize: FileSize, base64: idCardBase64, fileName: self.uploadInput.files[0].name, mimetype: self.uploadInput.files[0].type, id: this.state.upc })
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
    }
    handleUploadAttachmentAdditional(ev) {
        console.log("ev========additional_image", ev)
        let self = this
        var idCardBase64
        var assetBodyData
        ev.preventDefault()
        if(self.state.upc !== '') {
            var FileSize = self.uploadInputAdditional.files[0].size / 1024 / 1024;
        if (FileSize <= 5) {
            self.getBase64(self.uploadInputAdditional.files[0], (result) => {
                var base64 = result.split(",");
                idCardBase64 = base64[1]
                assetBodyData = AssetJsonModel._getJsonDataFromAsset({ created_at : '', fileSize: FileSize, base64: idCardBase64, fileName: self.uploadInputAdditional.files[0].name, mimetype: self.uploadInputAdditional.files[0].type, id: self.state.sku })
                console.log("===assetBodyData====additional_image", assetBodyData)
                self.setState({
                    additional_image: assetBodyData.data
                })
                axios.post("/api/upload/additional_image", assetBodyData).then((res) => {
                    console.log("error in response additional_image", res)
                    if (res.data) {
                        console.log("res in additional_image", res)
                        return
                    } else {
                        console.log("error in responseadditional_image", res)
                        return
                    }
                }).catch((err) => {
                    console.log("errorrrrrrrrrrrrrr in additional_image uploading", err)
                    return
                })
            });
        }
        else {
            console.log("fileSizeExceedMessage=======additional_image")
        }
        }
        
    }

    /*Upload PDF files 
    Author: Shashnak Saxena
    Date: June 12th 2019
    */
    UploadPDF() {
        var self = this;
        var assetBodyData = '{ pdfName :'+this.state.selectPdf+'}';
        console.log('hgvhbhbhhbvbh'+assetBodyData);
        axios.post("/api/readpdf",{pdfName:this.state.selectPdf}).then((res) => {
            console.log("error in response", res)
            if (res.data) {
                self.setState({
                    pdfData: res.data
                })
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
    resize(){
        var textArray = document.getElementsByClassName('textarea');
            for(var i=0;i<textArray.length;i++){
                textArray[i].style.height = 'auto';
                textArray[i].style.height = textArray[i].scrollHeight+'px';
            }
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
        let addImge = this.state.additional_image
        let { pdfData,pdfFileArray,selectPdf} = this.state
        let image = ''
        let additionalImage = ''
        if (img !== '') {
            image = "data:" + img.mimetype + ";base64," + img.data
        }
       
       var completeArray=[state.brand,state.product_name,state.cost,state.category,state.upc]
       console.log('completeArray--',completeArray,completeArray[3])
        var percent=this.calculateComlpleteness(completeArray);


       console.log('product_completion===', percent)
        if (addImge !== '') {
            additionalImage = "data:" + addImge.mimetype + ";base64," + addImge.data
        }
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
                                    <h2 className="page-title float-left">Create New Product</h2>
                                    <div className="float-right allmodalcolgate">
                                        <button type="button" className="btn btn-primary" onClick={(e) => this.createNewProduct(e)}>SAVE</button>
                                        <button type="button" className="btn btn-outline-primary"> <Link to="/productlist">CANCEL</Link></button>
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
                                             <span className="error_img">{this.state.errorSpan}</span>
                                                <div className="form-group">    
                                                    <label>Upload Image</label>
                                                    <div className="form-group img_uploadmain">
                                                        <input className="form-control" type="file" ref={(ref) => { this.uploadInput = ref }} onChange={(e)=>this.handleUploadAttachment(e)} style={{ display: 'none' }} />
                                                        <a onClick={(e) => this.uploadInput.click()} className="create-new-link uploadfile">Upload Files</a>
                                                        {image !== '' && image !== undefined ?
                                                            <img src={image} height="50px" width="50px" className="digital_img" />
                                                            : ''}
                                                    </div>
                                                </div>
                                                <hr></hr>
                                                {/* additional image */}
                                                <div className="form-group">
                                                    <label>Additional Image Upload</label>
                                                    <div className="form-group">
                                                        <input className="form-control" type="file" ref={(ref) => { this.uploadInputAdditional = ref }} onChange={this.handleUploadAttachmentAdditional.bind(this)} style={{ display: 'none' }} />
                                                        <a onClick={(e) => this.uploadInputAdditional.click()} className="create-new-link uploadfile">Upload Additioanl Files</a>
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
                                                        
                                                        <select name="example_length" aria-controls="example" onChange={(e) => this.handleChange(e)} >
                                                        <option value="">Select File</option>
                                                            {
                                                                pdfFileArray.length > 0 ? pdfFileArray.map(function(key,index){
                                                                    return (<option value={key}>{key}</option>)
                                                                }) : ''
                                                            
                                                            }
                                                        </select>
                                                        <a onClick={(e) => this.UploadPDF()} className="create-new-link uploadfile">Fetch Data</a>
                                                            <div class="tab-pane filtercustome tabsectionform custome_listfile active" id="settings3" role="tabpanel">
                                                                <ul class="nav nav-tabs datetab" id="myTab" role="tablist">
                                                            {
                                                                pdfData.length > 0 ? pdfData.map(function(key,index){
                                                                    return <li class="nav-item">
                                                                            <a className={index==0 ? 'nav-link active':'nav-link'} id="contact-tab" data-toggle="tab" href={`#contact${index}`} role="tab" aria-controls="contact" aria-selected="true">{key.lang}</a>
                                                                        </li>
                                                                }) : ''
                                                            }
                                                            </ul>
                                                            <div class="tab-content custome_content under_tabs" id="myTabContent">
                                                            {
                                                            pdfData.length > 0 ? pdfData.map(function(key,index){
                                                            return <div className={index==0 ? 'tab-pane fade show active':'tab-pane fade '} id={`contact${index}`} role="tabpanel" aria-labelledby="contact-tab">
                                                                <div class="row">
                                                                    <div class="col-md-6">
                                                                        <div class="form-group">
                                                                         {key.ques1}
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-md-6">
                                                                        <div class="form-group">
                                                                            <textarea class="textarea" style={{height:'100%',width:'100%'}} >{key.ans1}</textarea>
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-md-6">
                                                                        <div class="form-group">
                                                                        {key.ques2}
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-md-6">
                                                                        <div class="form-group">
                                                                        <textarea class="textarea" style={{height:'100%',width:'100%'}} >{key.ans2}</textarea>
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-md-6">
                                                                        <div class="form-group">
                                                                        {key.ques3}
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-md-6">
                                                                        <div class="form-group">
                                                                        <textarea  class="textarea" style={{height:'100%',width:'100%'}} >{key.ans3}</textarea>
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-md-6">
                                                                        <div class="form-group">
                                                                        {key.ques4}
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-md-6">
                                                                        <div class="form-group">
                                                                        <textarea  class="textarea" style={{height:'100%',width:'100%'}} >{key.ans4}</textarea>
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-md-6">
                                                                        <div class="form-group">
                                                                        {key.ques5}
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-md-6">
                                                                        <div class="form-group">
                                                                        <textarea class="textarea" style={{height:'100%',width:'100%'}} >{key.ans5}</textarea>
                                                                        </div>
                                                                </div>
                                                                </div> 
                                                            </div> }) : ''
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