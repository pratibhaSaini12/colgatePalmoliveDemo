import React, { Component } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Header from '../Header/index';
import Aside from '../Sidebar/index';
import ImageContainer from "../../components/imageContainer"
class ProductDetail extends Component {

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
                                                <div className="dropdown-menu drop_20"> <a className="dropdown-item" href="javascript:void(0)"><i className="ti-check" />Approve</a> <a className="dropdown-item" href="javascript:void(0)"><i className="ti-close" />Reject</a> <a className="dropdown-item" href="javascript:void(0)"><i className="ti-reload" />Update Request</a> <a className="dropdown-item" href="javascript:void(0)"><i className="fas fa-upload" />Publish</a> </div>
                                            </div>
                                        </div>
                                        <div className="option-box delete float-right"><a href>Delete</a></div>
                                        <div className="option-box download float-right"><a href="javscript:void(0)">Download</a></div>
                                        <div className="option-box move-folder float-right"><a href="javscript:void(0)">Move to folder</a></div>
                                    </div>
                                </div>
                            </div>
                            <div className="page-header">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="breadcrumb">
                                            <ul>
                                                <li>
                                                    <a href="#">Product &gt;&gt; </a>
                                                </li>
                                                <li>  102918 Palmolive</li>
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
                                                    <ImageContainer src="1.jpg" />
                                                </div>
                                            </div>
                                            <div className="col-md-9">
                                                <h2 className="page-title productid approved"><i className="fas fa-check-circle" />
                                                    102918</h2>
                                                <h4 className="productname">PALMOLIVE NATURALS CAMELLIA OIL &amp; ALMOND</h4>
                                                <p className="date-time">May 8, 2019, 6:05:33 PM </p>
                                                <button className="primary-button" style={{ marginLeft: 0 }}><a href="javascript:void(0)">6 variants Available</a></button>
                                            </div>
                                            <div className="col-md-1">
                                                <div className="nav-item dropdown dropcolgate"> <a className="nav-link custome_navlink" href="javascript:void(0)" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                                    <ImageContainer src="icons/option-all.png" />
                                                    {/* <img src="img/icons/option-all.png" /> */}
                                                </a>
                                                    <div className="dropdown-menu drop_20"> <a className="dropdown-item" href="javascript:void(0)"><i className="ti-check" />Approve</a> <a className="dropdown-item" href="javascript:void(0)"><i className="ti-close" />Reject</a> <a className="dropdown-item" href="javascript:void(0)"><i className="ti-reload" />Update Request</a> <a className="dropdown-item" href="javascript:void(0)"><i className="fas fa-upload" />Publish</a> </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="detail-page">
                                <div className="row">
                                    <div className="col-sm-12 ">
                                        <div className="accordion" id="accordionExample">
                                            <div className="card adnewcard">
                                                <div className="card-header" id="headingOne">
                                                    <h5 className="mb-0">
                                                        <button className="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                            <div className="heading">
                                                                <i className="fas fa-chevron-right" />
                                                                General
                              </div>
                                                        </button>
                                                    </h5>
                                                </div>
                                                <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                                                    <div className="card-body">
                                                        <table>
                                                            <tbody><tr>
                                                                <td width="20%">Product Name</td>
                                                                <td width="80%">Palmolive Naturals Camellia Oil &amp; Almond</td>
                                                            </tr>
                                                                <tr>
                                                                    <td>Product ID</td>
                                                                    <td>102918</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>UPC</td>
                                                                    <td>143287212918</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Category</td>
                                                                    <td>Luggage</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Link</td>
                                                                    <td>http://gmail.com</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Product Line</td>
                                                                    <td>Jetsetter</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Product Status </td>
                                                                    <td>Active</td>
                                                                </tr>
                                                            </tbody></table>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card adnewcard">
                                                <div className="card-header" id="headingTwo">
                                                    <h5 className="mb-0">
                                                        <button className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                                            <i className="fas fa-chevron-right" />
                                                            <div className="heading">Pricing</div>
                                                        </button>
                                                    </h5>
                                                </div>
                                                <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                                                    <div className="card-body">
                                                        <table>
                                                            <tbody><tr>
                                                                <td width="20%">Cost</td>
                                                                <td width="80%">Jetsetter Carry On Roller - Purple</td>
                                                            </tr>
                                                                <tr>
                                                                    <td>Formatted Base Wholesale Price </td>
                                                                    <td>102918</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Formatted MSRP</td>
                                                                    <td>143287212918</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Formatted Retail Price</td>
                                                                    <td>Luggage</td>
                                                                </tr>
                                                            </tbody></table>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card adnewcard">
                                                <div className="card-header" id="headingThree">
                                                    <h5 className="mb-0">
                                                        <button className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                                            <i className="fas fa-chevron-right" />
                                                            <div className="heading">Rich Content</div>
                                                        </button>
                                                    </h5>
                                                </div>
                                                <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
                                                    <div className="card-body">
                                                        <table>
                                                            <tbody><tr>
                                                                <td width="20%">Medium Description</td>
                                                                <td width="80%">The 21" Spinner is part of the Jetsetter Collection. Pack away any travel worries and woes with the efficient design of the Jettsetter rolling bag. Features top and side carrying handles for easy lifting, dual-tube handle with push-button extension. Maneuvers easily on four 360 degree wheels. Easy upright rolling for minimal arm strain. Jetset in style!</td>
                                                            </tr>
                                                                <tr>
                                                                    <td>Long Description </td>
                                                                    <td>The 21" Spinner is part of the Jetsetter Collection. Pack away any travel worries and woes with the efficient design of the Jettsetter rolling bag. Features top and side carrying handles for easy lifting, dual-tube handle with push-button extension. Maneuvers easily on four 360 degree wheels. Easy upright rolling for minimal arm strain. Jetset in style!
                                                                      Constructed of 100% polycarbonate material.
                                                                      Four spinner wheels provide a silent and smooth roll.
                                    Fully-lined interior with two compartments for organized packing.</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Tags</td>
                                                                    <td>air travel        </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Warnings</td>
                                                                    <td>WARNING: To avoid danger of suffocation, keep inner plastic bag away from babies and children. Do not use bag in cribs, beds, carriages or play pens. This bag is not a toy.</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Material</td>
                                                                    <td>Polycarbonate exterior, cloth-lined interior.
                                  </td>
                                                                </tr>
                                                            </tbody></table>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card adnewcard">
                                                <div className="card-header" id="headingFour">
                                                    <h5 className="mb-0">
                                                        <button className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseFour" aria-expanded="false" aria-controls="collapseThree">
                                                            <i className="fas fa-chevron-right" />
                                                            <div className="heading">Digital Assets </div>
                                                        </button>
                                                    </h5>
                                                </div>
                                                <div id="collapseFour" className="collapse" aria-labelledby="headingFour" data-parent="#accordionExample">
                                                    <div className="card-body">
                                                        <table className="compair_section">
                                                            <tbody><tr>
                                                                <td width="20%">Main Image</td>
                                                                <td width="30%">
                                                                    <ImageContainer src="1.jpg" />
                                                                    {/* <img src="img/1.jpg" alt /> */}
                                                                </td>
                                                            </tr>
                                                                <tr>
                                                                    <td>Lifestyle Images</td>
                                                                    <td><span><ImageContainer src="11.png" />
                                                                        {/* <img src="img/11.png" alt /> */}
                                                                    </span> <span>
                                                                            <ImageContainer src="12.png" />
                                                                            {/* <img src="img/12.png" alt /> */}
                                                                        </span> <span>
                                                                            <ImageContainer src="4.png" />
                                                                            {/* <img src="img/4.png" alt /> */}
                                                                        </span></td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Main Style Image</td>
                                                                    <td>
                                                                        <ImageContainer src="1.png" />
                                                                        {/* <img src="img/1.jpg" alt /> */}
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Product Videos</td>
                                                                    <td>
                                                                        <ImageContainer src="14.png" />

                                                                        {/* <img src="img/14.png" alt /> */}
                                                                    </td>
                                                                </tr>
                                                            </tbody></table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Detail page Close */}
                            <div className=" search-filter" style={{ display: 'none' }}>
                                <div className="row">
                                    <div className="col-md-6 search"> </div>
                                    <div className="col-md-6 filter">
                                        <div className="float-right "> <a href="javscript:void(0)" className="filter-btn list-view">filter</a> <a href="javscript:void(0)" className="filter-btn card-view noactive">filter</a> <a href="javscript:void(0)" className="filter-btn filter" id="filter">filter</a> </div>
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
                                                                        <select id="pref-perpage" className="form-control">
                                                                            <option value={0}>Property</option>
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
                                                                <div className="col-md-4">
                                                                    <div className="form-group">
                                                                        <select id="pref-perpage" className="form-control">
                                                                            <option value={0}>System Property</option>
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
                                                                <div className="col-md-4">
                                                                    <div className="form-group">
                                                                        <select id="pref-perpage" className="form-control">
                                                                            <option value={0}>File Property</option>
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
                                                        </div>
                                                        <div className="col-md-4">
                                                            <div className="form-group">
                                                                <input className="form-control search_filter" type="text" name="search" placeholder="Search for digital assets" />
                                                                <i className="ti-search filtersearch" /> </div>
                                                        </div>
                                                    </div>
                                                </form>
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
