import React, { Component } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Header from '../Header/index';
import Aside from '../SideBar/index';
import { Link } from "react-router-dom"
import ImageContainer from "../../components/imageContainer"
import moment from "moment"
import axios from "axios";


class ProductDetail extends Component {

    constructor(props) {
        super(props)
        this.state = {
            product: [],
            pdfData: ''
        }
    }


    // componentWillMount() {
    //     let self = this
    //     try {
    //         axios.get("/api/getAllProducts").then(function (response) {
    //             console.log("product list ", response.data);
    //             if (response.data) {
    //                 self.setState({
    //                     product: response.data.products
    //                 })
    //             }

    //         }).catch(function (error) {
    //             console.log("error  login is ", error);
    //         })
    //     } catch (e) { }
    // }
    componentDidMount() {
        console.log('product data on details==============',this.props.location.state._data)
        var pack_flats=this.props.location.state._data?this.props.location.state._data.pack_flats:''
        console.log('pack flat value on details---',pack_flats)
        try {
            let self = this
            if (pack_flats != '') {
                axios.post("/api/readpdf", { pdfName: pack_flats }).then((res) => {
                    console.log('response from pack flat api===================',res)
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


            
            self.setState({
                product: this.props.location.state._data
            })
        } catch (e) { console.log("errr", e) }
    }



    render() {
        let { product } = this.state
        let { pdfData } = this.state
       
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
                    <Aside active={"product"} />
                    <div className="page-wrapper">
                        <div className="container-fluid r-aside custome_container">
                            <div className="counting-action-section">
                                <div className="row">
                                    <div className="col-md-6 selections">
                                        <div className="option-box select-count selected"><span id="Counting">0</span> Selected</div>
                                        <div className="option-box select-all"><a onclick="selectAll()" href="javascript:void(0);">select All</a></div>
                                        <div className="option-box clear-all"><a onclick="clearAll()" href="javascript:void(0);">Clear All</a></div>
                                    </div>
                                    <div className="col-md-6 selected-actions">
                                        <div className="option-box drop-option-link float-right">
                                            <div className="nav-item dropdown dropcolgate"> <a className="nav-link custome_navlink" href="javascript:void(0);" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                                <ImageContainer src="icons/option-all.png" />
                                            </a>
                                                <div className="dropdown-menu drop_20"> <a className="dropdown-item" href="javascript:void(0);"><i className="ti-check" />Approve</a> <a className="dropdown-item" href="javascript:void(0);"><i className="ti-close" />Reject</a>
                                                    <a className="dropdown-item" href="javascript:void(0);"><i className="fas fa-upload" />Publish</a> </div>
                                            </div>
                                        </div>
                                        <div className="option-box delete float-right"><a href>Delete</a></div>
                                        <div className="option-box download float-right"><a href="javascript:void(0);">Download</a></div>
                                    </div>
                                </div>
                            </div>
                            <div className="page-header">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="breadcrumb">
                                            <ul>
                                                <li>
                                                    <a href="/productList">Product &gt;&gt; </a>
                                                </li>
                                                <li>  {product.product_id} {product.category}</li>
                                            </ul>
                                            <ul className="prevnext-btn">
                                            <Link className="new-product primary-button" to="/productlist">BACK</Link>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-md-12 detail-view-section">
                                        <div className="row">
                                            <div className="col-md-2">
                                                <div className="thumb">
                                                    {
                                                        product.main_image_asset !== null && product.main_image_asset !== undefined ? <img src={product.main_image_asset} /> : ''
                                                    }
                                                </div>
                                            </div>
                                            <div className="col-md-9">
                                                <h2 className="page-title productid approved">
                                                    {product.upc}</h2>
                                                <h4 className="productname">{product.product_name}</h4>
                                                <p className="date-time">{product.updated_at ? moment(product.updated_at).format('MM/DD/YYYY') : ''} </p>
                                            </div>
                                            <div className="col-md-1">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Detail page started */}
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
                                            <a className="nav-link" data-toggle="tab" href="#settings" role="tab" aria-controls="settings">Digital Images</a>
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
                                    </ul>
                                </div>


                                {/* Detail page Close */}


                                <div className="col-md-9">
                                    <div className="tab-content">
                                        <div className="tab-pane active  filtercustome tabsectionform" id="home" role="tabpanel">
                                            <form>
                                                <ul>
                                                    <li className="row">

                                                        <div className="col-md-1">

                                                        </div>
                                                    </li>
                                                    <li className="row">
                                                        <div className="col-md-11">
                                                            <div className="form-group">
                                                                <label>Product Name</label>
                                                                <input className="form-control" type="text" name="product_name" value={product.product_name} readonly />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-1">

                                                        </div>
                                                    </li>
                                                    <li className="row">
                                                        <div className="col-md-11">
                                                            <div className="form-group">
                                                                <label>SKU</label>
                                                                <input className="form-control" type="text" name="upc" value={product.upc} readonly />
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
                                                                    <input className="form-control" type="text" name="style" value={product.category} readonly />
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
                                                                    <input className="form-control" type="text" name="style" value={product.product_status} readonly />

                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-1">
                                                        </div>
                                                    </li>

                                                    <li className="row">
                                                        <div className="col-md-11">
                                                            <div className="form-group">
                                                                <div className="form-group">
                                                                    <label>Brand</label>
                                                                    <div className="form-group">
                                                                        <input className="form-control" type="text" name="style" value={product.brand} readonly />

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
                                                                <input className="form-control" type="text" name="style" value={product.style} readonly />
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
                                                                <input className="form-control" type="number" name="cost" value={product.cost} />
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
                                                                <input className="form-control pricedate_form" type="number" name="wholesale_price" value={product.wholesale_price} />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-1">
                                                        </div>
                                                    </li>
                                                    <li className="row">
                                                        <div className="col-md-11">
                                                            <div className="form-group">
                                                                <label>Formatted MSRP ($)</label>
                                                                <input className="form-control pricedate_form" type="number" name="msrp" value={product.msrp} />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-1">
                                                        </div>
                                                    </li>
                                                    <li className="row">
                                                        <div className="col-md-11">
                                                            <div className="form-group">
                                                                <label>Formatted Retail Price ($)</label>
                                                                <input className="form-control pricedate_form" type="number" name="retail_price" value={product.retail_price} readonly />
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
                                                    <label>Main Image</label>
                                                    <div className="form-group img_uploadmain">
                                                    {
                                                        product.main_image_asset !== null && product.main_image_asset !== undefined ? <img src={product.main_image_asset} /> : ''
                                                    }  
                                                    </div>
                                                </div>
                                                <hr></hr>
                                                {/* additional image */}
                                                <div className="form-group">
                                                    <label>Additional Image</label>
                                                    <div className="form-group img_uploadmain">
                                                    {
                                                        product.main_image_additional !== null && product.main_image_additional !== undefined ? <img src={product.main_image_additional} /> : ''
                                                    }
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

                                                        {pdfData ?
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
                                                            : ''
                                                        }

                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="tab-pane" id="settings2" role="tabpanel">
                                            <div className="tab-pane filtercustome " id="settings2" role="tabpanel">
                                                <div className="form-group">
                                                    <label>Workflow state</label>
                                                    <div className="form-group">
                                                        <input className="form-control pricedate_form" type="text" name="retail_price" value={product.workflow_state} readonly />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                        <div className="tab-pane" id="productQuality" role="tabpanel">
                                            <div className="tab-pane filtercustome " id="productQuality" role="tabpanel">
                                                <div className="form-group">
                                                    <label>Product Completeness (%) - Product Name, Sku, Cateogry, Brand,Price</label>
                                                    <div className="form-group">
                                                        <input className="form-control" value={product.product_completion} readonly />


                                                    </div>
                                                </div>
                                            </div>
                                        </div>
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


export default ProductDetail;
