import React, { Component } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Header from '../Header/index';
import Aside from '../SideBar/index';
import axios from "axios";

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
            product_status: '',
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
            main_image: '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'

        }
    }


    componentDidMount() {
    }


    change(e) {
        this.setState({ errMessage: false })
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    createNewProduct() {
        console.log("state on save====", this.state);
        let state=this.state;
        let createProduct = {
            product_id:state.product_id ,
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
            main_image: state.main_image
        }
        axios.post("api/createProduct", createProduct).then(function (response) {
            console.log('resposne from api==', response)
            if(response.data.product){
                window.location.href = "/productList"
            }

        }).catch(function (error) {

        })
    }

    render() {

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
                                        <button type="button" className="btn btn-primary" onClick={this.createNewProduct.bind(this)}>SAVE</button>
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
                                            <a className="nav-link" data-toggle="tab" href="#messages" role="tab" aria-controls="messages">Rich Content</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" data-toggle="tab" href="#settings" role="tab" aria-controls="settings">Extended Product Details</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" data-toggle="tab" href="#settings" role="tab" aria-controls="settings">Digital Asset</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" data-toggle="tab" href="#settings" role="tab" aria-controls="settings">Status</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" data-toggle="tab" href="#settings" role="tab" aria-controls="settings">Unformatted from ERP</a>
                                        </li>
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
                                                            {/* <div class="rightpartedit_delete">
          <center>
      		<a href="javascript:void(0)"><i class="ti-trash align-middle"></i></a>
           
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
                                                            {/*<div class="rightpartedit_delete">
          <center>
            <a href="javascript:void(0)"><i class="ti-plus align-middle"></i></a>
      		<a href="javascript:void(0)"><i class="ti-trash align-middle"></i></a>
          
           
          </center>
          </div>*/}
                                                        </div>
                                                    </li>
                                                    <li className="row">
                                                        <div className="col-md-11">
                                                            <div className="form-group">
                                                                <label>UPC</label>
                                                                <input className="form-control" type="text" name="upc" value={this.state.upc} onChange={e => this.change(e)} />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-1">
                                                            {/*<div class="rightpartedit_delete">
          <center>
            <a href="javascript:void(0)"><i class="ti-plus align-middle"></i></a>
      		<a href="javascript:void(0)"><i class="ti-trash align-middle"></i></a>
          
           
          </center>
          </div>*/}
                                                        </div>
                                                    </li>
                                                    <li className="row">
                                                        <div className="col-md-11">
                                                            <div className="form-group">
                                                                <label>Category</label>
                                                                <div className="form-group">
                                                                    <select id="pref-perpage" className="form-control">
                                                                        <option value={0}>Category</option>
                                                                        <option value={1}>3</option>
                                                                        <option value={2}>4</option>
                                                                        <option value={3}>5</option>
                                                                        <option value={4}>6</option>
                                                                        <option value={7}>7</option>
                                                                        <option value={8}>8</option>
                                                                        <option value={9}>9</option>
                                                                    </select>
                                                                    <p className="value_ofcategory">Value inherited from parent product</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-1">
                                                            {/*<div class="rightpartedit_delete">
          <center>
            <a href="javascript:void(0)"><i class="ti-plus align-middle"></i></a>
      		<a href="javascript:void(0)"><i class="ti-trash align-middle"></i></a>
          
           
          </center>
          </div>*/}
                                                        </div>
                                                    </li>
                                                    <li className="row">
                                                        <div className="col-md-11">
                                                            <div className="form-group">
                                                                <label>Link</label>
                                                                <input className="form-control" type="text" name="link" value={this.state.link} onChange={e => this.change(e)} />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-1">
                                                            {/*<div class="rightpartedit_delete">
          <center>
            <a href="javascript:void(0)"><i class="ti-plus align-middle"></i></a>
      		<a href="javascript:void(0)"><i class="ti-trash align-middle"></i></a>
          
           
          </center>
          </div>*/}
                                                        </div>
                                                    </li>
                                                    <li className="row">
                                                        <div className="col-md-11">
                                                            <div className="form-group">
                                                                <label>Product Status</label>
                                                                <div className="form-group">
                                                                    <select id="pref-perpage" className="form-control">
                                                                        <option value={0}>Active</option>
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
                                                                <label>Cost</label>
                                                                <input className="form-control" type="text" name="cost" value={this.state.cost} onChange={e => this.change(e)} />
                                                                <p className="value_ofcategory">Value inherited from parent product</p>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-1">
                                                        </div>
                                                    </li>
                                                    <li className="row">
                                                        <div className="col-md-11">
                                                            <div className="form-group">
                                                                <label>Formatted Base Wholesale Price</label>
                                                                <input className="form-control pricedate_form" type="text" name="wholesale_price" value={this.state.wholesale_price} onChange={e => this.change(e)} />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-1">
                                                        </div>
                                                    </li>
                                                    <li className="row">
                                                        <div className="col-md-11">
                                                            <div className="form-group">
                                                                <label>Formatted MSRP</label>
                                                                <input className="form-control pricedate_form" type="text" name="msrp" value={this.state.msrp} onChange={e => this.change(e)} />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-1">
                                                        </div>
                                                    </li>
                                                    <li className="row">
                                                        <div className="col-md-11">
                                                            <div className="form-group">
                                                                <label>Formatted Retail Price</label>
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
                                                                <p className="value_ofcategory">Value inherited from parent product</p>
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
                                                                    <p className="value_ofcategory">Value inherited from parent product</p>
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
                                        <div className="tab-pane" id="settings" role="tabpanel">Comming Soon...</div>
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