import React, { Component } from "react"
import Header from '../Header/index';
import Aside from '../SideBar/index';
import axios from "axios";
class EditDigitalImage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            asset_data: "",
            asset_id: '',
            asset_name: "",
            asset_type: "",
            created_at: "",
            dimenssion: "",
            imageDoc: '',
            size: "",
            updated_at: "",
            errMessage: false
        }
    }


    componentDidMount() {
        try {
            let asset = this.props.location.state._data
            this.setState({
                asset_data: asset.asset_data,
                asset_id: asset.asset_id,
                asset_name: asset.asset_name,
                asset_type: asset.asset_type,
                created_at: asset.created_at,
                dimenssion: asset.dimenssion,
                imageDoc: asset.imageDoc,
                size: asset.size,
                updated_at: asset.updated_at
            })
        } catch (e) { console.log("errr", e) }
    }
    change(e) {
        this.setState({ errMessage: false })
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    updateasset() {
        console.log("state on update====", this.state);
        let state = this.state;
        let updateAssetByID = {
            asset_data: state.asset_data,
            asset_id: state.asset_id,
            asset_name: state.asset_name,
            asset_type: state.asset_type,
            created_at: state.created_at,
            dimenssion: state.dimenssion,
            imageDoc: state.imageDoc,
            size: state.size,
            updated_at: state.updated_at
        }
        //change update API
        // axios.post("/api/updateAssetByID", updateAssetByID).then(function (response) {
        //     console.log('resposne from updateAssetByID=========', response.data)
        //     if (response.data.asset) {
        //         window.location.href = "/assetList"
        //     }

        // }).catch(function (error) {

        // })
    }



    render() {
        console.log("props in asset Edit page", this.props)
        console.log("state in asset Edit page", this.state)
        let { asset } = this.state
        console.log("asset==========", asset)
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
                    <Aside active={"digital"} />
                    <div className="page-wrapper">
                        <div className="container-fluid r-aside">
                            <div className="row">
                                <div className="col-md-12 top_part20">
                                    <h2 className="page-title float-left">Edit asset</h2>
                                    <div className="float-right allmodalcolgate">
                                        <button type="button" className="btn btn-primary" onClick={this.updateasset.bind(this)}>Update</button>
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
                                            <a className="nav-link" data-toggle="tab" href="#settings" role="tab" aria-controls="settings">Digital Asset</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" data-toggle="tab" href="#settings" role="tab" aria-controls="settings">Status</a>
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
                                                                <label>asset ID</label>
                                                                <input className="form-control" type="text" name="asset_id" value={this.state.asset_id} onChange={e => this.change(e)} />
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
                                                                <label>asset Name</label>
                                                                <input className="form-control" type="text" name="asset_name" value={this.state.asset_name} onChange={e => this.change(e)} />
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
                                                                <label>SKU</label>
                                                                <input className="form-control" type="text"name="upc" value={this.state.upc} onChange={e => this.change(e)} />
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
                                                                <select id="pref-perpage" value={this.state.category} name="category" className="form-control" onChange={(e)=>this.change(e)}>
                                                                        <option value={0}>Category</option>
                                                                        <option value={"Toothpastes"}>Toothpastes</option>
                                                                        <option value={"Toothbrushes"}>Toothbrushes</option>
                                                                        <option value={"Mouthwashes"}>Mouthwashes</option>
                                                                        <option value={"Kids assets"}>Kids assets</option>
                                                                        <option value={"Toothpowder"}>Toothpowder</option>
                                                                        <option value={"Liquid handwash"}>Liquid handwash</option>
                                                                    </select>
                                                                    <p className="value_ofcategory">Value inherited from parent asset</p>
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
                                                                <label>asset Status</label>
                                                                <div className="form-group">
                                                                <select id="pref-perpage" name="asset_status" onChange={(e)=>this.change(e)} value={this.state.asset_status === '' ? '' : this.state.asset_status} className="form-control">
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
                                                                <p className="value_ofcategory">Value inherited from parent asset</p>
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
                                                                <p className="value_ofcategory">Value inherited from parent asset</p>
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
                                                                    <p className="value_ofcategory">Value inherited from parent asset</p>
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
                                                    <label>Workflow_state</label>
                                                    <div className="form-group">
                                                        <select id="pref-perpage" onChange={(e) => this.change(e)} name="workflow_state" className="form-control"
                                                            value={this.state.workflow_state === '' ? '' : this.state.workflow_state}>
                                                            <option value="In Review">In Review</option>
                                                            <option value="In Publish">In Publish</option>
                                                            <option value="Published">Published</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="tab-pane" id="settings" role="tabpanel">
                                            <div className="tab-pane filtercustome " id="settings" role="tabpanel">
                                            <div className="form-group">
                                                <label>Digital Asset</label>
                                                    <div className="form-group">
                                                        <input type="file" ref={(ref) => { this.uploadInput = ref }} onChange={this.handleUploadAttachment.bind(this)} style={{ display: 'none' }} />
                                                        <a onClick={(e) => this.uploadInput.click()} className="create-new-link">Upload Files</a>
                                                        {image !== '' && image !== undefined ?
                                                            <img src={image} height="50px" width="50px" className="digital_img"/>
                                                            : ''}
                                                    </div>
                                                </div>
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
                                    <h4 className="modal-title title_modalheader">Create New asset</h4>
                                    <button type="button" className="close" data-dismiss="modal">×</button>
                                </div>
                                {/* Modal body */}
                                <div className="modal-body filtercustome">
                                    <form>
                                        <div className="form-group">
                                            <label>asset Id</label>
                                            <input className="form-control" type="text" name="search" placeholder={12345} />
                                        </div>
                                        <div className="form-group">
                                            <label>asset Name</label>
                                            <input className="form-control" type="text" name="search" placeholder={12345} />
                                        </div>
                                        <div className="avatar-upload"> <span>asset Name</span>
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


export default EditDigitalImage;