import React, { Component } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Header from '../Header/index';
import Aside from '../SideBar/index';
import { Link } from "react-router-dom"
import ImageContainer from "../../components/imageContainer"
import moment from "moment"

class ProductDetail extends Component {

    constructor(props) {
        super(props)
        this.state = {
            product: []
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
        try {
            this.setState({
                product: this.props.location.state._data
            })
        } catch (e) { console.log("errr", e) }
    }



    render() {
        let { product } = this.state
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
                                        <div className="option-box select-all"><a onclick="selectAll()" href="javscript:void(0)">select All</a></div>
                                        <div className="option-box clear-all"><a onclick="clearAll()" href="javscript:void(0)">Clear All</a></div>
                                    </div>
                                    <div className="col-md-6 selected-actions">
                                        <div className="option-box drop-option-link float-right">
                                            <div className="nav-item dropdown dropcolgate"> <a className="nav-link custome_navlink" href="javascript:void(0)" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                                <ImageContainer src="icons/option-all.png" />
                                            </a>
                                                <div className="dropdown-menu drop_20"> <a className="dropdown-item" href="javascript:void(0)"><i className="ti-check" />Approve</a> <a className="dropdown-item" href="javascript:void(0)"><i className="ti-close" />Reject</a>
                                                    <a className="dropdown-item" href="javascript:void(0)"><i className="fas fa-upload" />Publish</a> </div>
                                            </div>
                                        </div>
                                        <div className="option-box delete float-right"><a href>Delete</a></div>
                                        <div className="option-box download float-right"><a href="javscript:void(0)">Download</a></div>
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
                                                <li className="btn-icon prev">
                                                    <a href="#">
                                                        <ImageContainer src="icons/prev.png" />
                                                    </a>
                                                </li>
                                                <li className="btn-icon next">
                                                    <a href="#">
                                                        <ImageContainer src="icons/next.png" />
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-md-12 detail-view-section">
                                        <div className="row">
                                            <div className="col-md-2">
                                                <div className="thumb">
                                                    {
                                                        product.main_image !== null && product.main_image !== undefined ? <img src={product.main_image} /> : ''
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
                                        {/* <li className="nav-item">
                                            <a className="nav-link" data-toggle="tab" href="#uploadPDF" role="tab" aria-controls="uploadPDF">Pack Flats</a>
                                        </li> */}
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
