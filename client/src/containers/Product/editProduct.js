import React, { Component } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Header from '../Header/index';
import ImageContainer from "../../components/imageContainer"
import Aside from '../Sidebar/index';
class EditProduct extends Component {

    constructor(props) {
        super(props)
        this.state = {
        }
    }


    componentDidMount() {
    }



    render() {
        const { list } = this.state;
        console.log(list);
        return (
            <div>
                <div className="preloader">
                    <div className="loader">
                        <div className="loader__figure" />
                        <p className="loader__label">Please Wait..</p>
                    </div>
                </div>
                <div id="main-wrapper">
                    <Header />
                    <Aside />
                    <div className="page-wrapper">
                        <div className="container-fluid r-aside">
                            <div className="row">
                                <div className="col-md-12 top_part20">
                                    <h2 className="page-title float-left">Edit Product</h2>
                                    <div className="float-right allmodalcolgate">
                                        <button type="button" className="btn btn-primary">SAVE</button>
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
                                                                <input className="form-control" type="text" name="search" placeholder={12345} />
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
                                                                <input className="form-control" type="text" name="search" placeholder="Product Name" />
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
                                                                <input className="form-control" type="text" name="search" placeholder={234567789} />
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
                                                                <input className="form-control" type="text" name="search" placeholder="Links" />
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
                                                                <input className="form-control" type="text" name="search" placeholder="Style" />
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
                                                                <input className="form-control" type="text" name="search" placeholder={12345} />
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
                                                                <input className="form-control pricedate_form" type="text" name="search" placeholder="$89.45" />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-1">
                                                        </div>
                                                    </li>
                                                    <li className="row">
                                                        <div className="col-md-11">
                                                            <div className="form-group">
                                                                <label>Formatted Base Wholesale Price</label>
                                                                <input className="form-control pricedate_form" type="text" name="search" placeholder="$110.45" />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-1">
                                                        </div>
                                                    </li>
                                                    <li className="row">
                                                        <div className="col-md-11">
                                                            <div className="form-group">
                                                                <label>Formatted Retail Price</label>
                                                                <input className="form-control pricedate_form" type="text" name="search" placeholder="$100.45" />
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


export default EditProduct;