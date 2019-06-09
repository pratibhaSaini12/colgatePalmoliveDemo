import React, { Component } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Header from '../Header/index';
import ImageContainer from "../../components/imageContainer"
import Aside from '../SideBar/index';
class ProductCompare extends Component {

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
                            <div className="page-header">
                                <div className="row">
                                    <div className="col-md-12">
                                        <h2 className="page-title">Compare Products</h2>
                                        <div className="breadcrumb">
                                            <ul>
                                                <li className="back-button">
                                                    <a href="productlist.html">Back</a>
                                                </li>
                                                <li>
                                                    <a href="#">Products &gt;&gt;</a>
                                                </li>
                                                <li>Compare Products</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="detail-page">
                                <div className="row">
                                    <div className="col-sm-12 ">
                                        <table className="comparison-table-image">
                                            <tbody><tr>
                                                <td />
                                                <td width="38%"><ImageContainer src="1.jpg" /></td>
                                                <td width="38%"><ImageContainer src="4.png" /></td>
                                            </tr>
                                            </tbody></table>
                                        <div className="accordion" id="accordionExample">
                                            <div className="card adnewcard">
                                                <div className="card-header" id="headingOne">
                                                    <h5 className="mb-0">
                                                        <button className="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                            <div className="heading">
                                                                <i className="fas fa-chevron-right" />General
                          </div>
                                                        </button>
                                                    </h5>
                                                </div>
                                            </div>
                                            <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                                                <div className>
                                                    <table className="comparison-table">
                                                        <thead>
                                                            <tr>
                                                                <th />
                                                                <th className="product-one product-td">Palmolive Naturals Camellia Oil &amp; Almond</th>
                                                                <th className="product-two product-td">PALMOLIVE Aroma Moments</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>Product ID</td>
                                                                <td className="product-one product-td">107814</td>
                                                                <td className="product-two product-td">102929</td>
                                                            </tr>
                                                            <tr>
                                                                <td>UPC</td>
                                                                <td className="product-one product-td">1432452212</td>
                                                                <td className="product-two product-td">1436343331</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Category</td>
                                                                <td className="product-one product-td">Luggage</td>
                                                                <td className="product-two product-td">Luggage</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Link</td>
                                                                <td className="product-one product-td" b>http://gmail.com</td>
                                                                <td className="product-two product-td">http://gmail.com</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Product Line</td>
                                                                <td className="product-one product-td">Jetsetter</td>
                                                                <td className="product-two product-td">Jetsetter</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Status</td>
                                                                <td className="product-one product-td">Active</td>
                                                                <td className="product-two product-td">Active</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="accordion" id="accordionExample">
                                            <div className="card adnewcard">
                                                <div className="card-header" id="headingTwo">
                                                    <h5 className="mb-0">
                                                        <button className="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                                                            <div className="heading">
                                                                <i className="fas fa-chevron-right" />Pricing
                          </div>
                                                        </button>
                                                    </h5>
                                                </div>
                                            </div>
                                            <div id="collapseTwo" className="collapse show" aria-labelledby="headingTwo" data-parent="#accordionExample">
                                                <div className>
                                                    <table className="comparison-table">
                                                        <tbody>
                                                            <tr>
                                                                <td>COST</td>
                                                                <td className="product-one product-td">43.2</td>
                                                                <td className="product-two product-td">41.22</td>
                                                            </tr>
                                                            <tr>
                                                                <td>FORMATTED BASE WHOLESALE PRICE</td>
                                                                <td className="product-one product-td">32411</td>
                                                                <td className="product-two product-td">324554</td>
                                                            </tr>
                                                            <tr>
                                                                <td>FORMATTED MSRP</td>
                                                                <td className="product-one product-td">43.2</td>
                                                                <td className="product-two product-td">41.22</td>
                                                            </tr>
                                                            <tr>
                                                                <td>FORMATTED RETAIL PRICE</td>
                                                                <td className="product-one product-td">32411</td>
                                                                <td className="product-two product-td">324554</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="accordion" id="accordionExample">
                                            <div className="card adnewcard">
                                                <div className="card-header" id="headingThree">
                                                    <h5 className="mb-0">
                                                        <button className="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="true" aria-controls="collapseThree">
                                                            <div className="heading">
                                                                <i className="fas fa-chevron-right" />Rich Content
                          </div>
                                                        </button>
                                                    </h5>
                                                </div>
                                            </div>
                                            <div id="collapseThree" className="collapse show" aria-labelledby="headingThree" data-parent="#accordionExample">
                                                <div className>
                                                    <table className="comparison-table">
                                                        <tbody>
                                                            <tr>
                                                                <td>MEDIUM DESCRIPTION</td>
                                                                <td className="product-one product-td">
                                                                    The 21" Spinner is part of the Jetsetter Collection. Pack away any travel worries and woes with the efficient design of the Jettsetter rolling bag. Features top and side carrying handles for easy lifting,
                            </td>
                                                                <td className="product-two product-td">
                                                                    The 21" Spinner is part of the Jetsetter Collection. Pack away any travel worries and woes with the efficient design of the Jettsetter rolling bag. Features top and side carrying handles for easy lifting,
                            </td>
                                                            </tr>
                                                            <tr>
                                                                <td>LONG DESCRIPTION</td>
                                                                <td className="product-one product-td">
                                                                    The 21" Spinner is part of the Jetsetter Collection. Pack away any travel worries and woes with the efficient design of the Jettsetter rolling bag. Features top and side carrying handles for easy lifting,
                            </td>
                                                                <td className="product-two product-td">
                                                                    The 21" Spinner is part of the Jetsetter Collection. Pack away any travel worries and woes with the efficient design of the Jettsetter rolling bag. Features top and side carrying handles for easy lifting,
                            </td>
                                                            </tr>
                                                            <tr>
                                                                <td>TAGS</td>
                                                                <td className="product-one product-td">
                                                                    <button className="compairbtn">air travel</button> <button className="compairbtn">TSA Approved</button>
                                                                </td>
                                                                <td className="product-two product-td" />
                                                            </tr>
                                                            <tr>
                                                                <td>WARNINGS</td>
                                                                <td className="product-one product-td">WARNING: To avoid danger of suffocation, keep inner plastic bag away from babies and children. Do not use bag in cribs, beds, carriages or play pens. This bag is not a toy.</td>
                                                                <td className="product-two product-td">WARNING: To avoid danger of suffocation, keep inner plastic bag away from babies and children. Do not use bag in cribs, beds, carriages or play pens. This bag is not a toy.</td>
                                                            </tr>
                                                            <tr>
                                                                <td>MATERIAL</td>
                                                                <td className="product-one product-td">Polycarbonate exterior, cloth-lined interior.</td>
                                                                <td className="product-two product-td">Polycarbonate exterior, cloth-lined interior.</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="accordion" id="accordionExample">
                                            <div className="card adnewcard">
                                                <div className="card-header" id="headingFour">
                                                    <h5 className="mb-0">
                                                        <button className="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseFour" aria-expanded="true" aria-controls="collapseFour">
                                                            <div className="heading">
                                                                <i className="fas fa-chevron-right" />Digital Assets
                          </div>
                                                        </button>
                                                    </h5>
                                                </div>
                                            </div>
                                            <div id="collapseFour" className="collapse show" aria-labelledby="headingFour" data-parent="#accordionExample">
                                                <div className>
                                                    <table className="comparison-table compair_section">
                                                        <tbody>
                                                            <tr>
                                                                <td>Main Image</td>
                                                                <td className="product-one product-td"><ImageContainer src="1.jpg" alt /></td>
                                                                <td className="product-two product-td"><ImageContainer src="2.jpg" alt /></td>
                                                            </tr>
                                                            <tr>
                                                                <td>Lifestyle Images</td>
                                                                <td className="product-one product-td"><ImageContainer src="11.png" alt /> <ImageContainer src="12.png" alt /> <ImageContainer src="13.png" alt /></td>
                                                                <td className="product-two product-td"><ImageContainer src="11.png" alt /> <ImageContainer src="12.png" alt /> <ImageContainer src="13.png" alt /></td>
                                                            </tr>
                                                            <tr>
                                                                <td>Main Style Image</td>
                                                                <td className="product-one product-td"><ImageContainer src="1.jpg" alt /></td>
                                                                <td className="product-two product-td"><ImageContainer src="2.jpg" alt /></td>
                                                            </tr>
                                                            <tr>
                                                                <td>Product Videos</td>
                                                                <td className="product-one product-td"><ImageContainer src="1.jpg" alt /></td>
                                                                <td className="product-two product-td"><ImageContainer src="2.jpg" alt /></td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
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


export default ProductCompare;