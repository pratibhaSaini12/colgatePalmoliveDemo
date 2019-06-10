import React, { Component } from "react";
import Header from '../Header/index';
import Aside from '../SideBar/index';
import { Link } from "react-router-dom"
import ImageContainer from "../../components/imageContainer"
import axios from "axios";


class ProductList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            product: []
        }
    }


    componentWillMount() {
        let self = this
        axios.get("/api/getAllProducts").then(function (response) {
            console.log("product list ", response.data);
            if (response.data) {
                self.setState({
                    product: response.data.products
                })
            }

        }).catch(function (error) {
            console.log("error  login is ", error);
        })
    }



    render() {
        const { product } = this.state;
        let buff
        let base64data

        return (
            <div>
                {/* <div className="preloader">
                    <div className="loader">
                        <div className="loader__figure"></div>
                        <p className="loader__label">Please Wait..</p>
                    </div>
                </div> */}
                <div id="main-wrapper">
                    <Header />
                    <Aside />
                    <div className="page-wrapper">
                        <div className="container-fluid r-aside custome_container">
                            <div className="page-header">
                                <div className="row">
                                    <div className="col-md-12">
                                        <h2 className="page-title">Products</h2>
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
                                                                            <option value={0}>Brand</option>
                                                                            <option value="Colgate Total TP">Colgate Total TP</option>
                                                                            <option value="Colgate 360 Bat TB">Colgate 360 Bat TB</option>
                                                                            <option value="Colgate 360 Man TB">Colgate 360 Man TB</option>
                                                                            <option value="Colgate Max Fresh TP">Colgate Max Fresh TP</option>
                                                                            <option value="Colgate Optic White TP">Colgate Optic White TP</option>
                                                                            <option value="Palmolive Essential Clean HD">Palmolive Essential Clean HD</option>
                                                                            <option value="Palmolive Antibacterial Ultra HD">Palmolive Antibacterial Ultra HD</option>
                                                                            <option value="Palmolive Sensorial Ultra HD">Palmolive Sensorial Ultra HD</option>
                                                                            <option value="Palmolive Soft Touch Ultra HD">Palmolive Soft Touch Ultra HD</option>
                                                                            <option value="Palmolive Pure + Ultra HD">Palmolive Pure + Ultra HD</option>
                                                                            <option value="Palmolive Ultra HD">Palmolive Ultra HD</option>
                                                                            <option value="Palmolive Oxy Plus Ultra HD">Palmolive Oxy Plus Ultra HD</option>
                                                                            <option value="Palmolive Eco+ AD">Palmolive Eco+ AD</option>
                                                                            <option value="Palmolive BS">Palmolive BS</option>
                                                                            <option value="Palmolive Aquarium LHW">Palmolive Aquarium LHW</option>
                                                                            <option value="Palmolive Shave Prep">Palmolive Shave Prep</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <div className="form-group">
                                                                        <select id="pref-perpage" className="form-control">
                                                                            <option value>Category</option>
                                                                            <option value="Toothpaste">Toothpaste</option>
                                                                            <option value="Bar Soap">Bar Soap</option>
                                                                            <option value="Liquid Hand Wash">Liquid Hand Wash</option>
                                                                            <option value="Shave Prep">Shave Prep</option>
                                                                            <option value="Shower Gel">Shower Gel</option>
                                                                            <option value="Manual TB">Manual TB</option>
                                                                            <option value="Battery TB">Battery TB</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <div className="form-group">
                                                                        <select id="pref-perpage" className="form-control">
                                                                            <option value>Collection</option>
                                                                            <option value="Oral Health">Oral Health</option>
                                                                            <option value="Foaming">Foaming </option>
                                                                            <option value="Maxfresh">Maxfresh</option>
                                                                            <option value="Strong Teeth">Strong Teeth</option>
                                                                            <option value="Naturals">Naturals</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <div className="form-group">
                                                                <input className="form-control search_filter" type="text" name="search" placeholder="Search Products" />
                                                                <i className="ti-search filtersearch" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* card row start ---------------------------------------------------------------------*/}
                            <div className="table-view fullpageview">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="filter float-right">
                                            <div className="float-right col-md-12">
                                                <button className="primary-button float-right">
                                                    <Link to="/newProduct"><span className="icon plus" />NEW PRODUCT</Link>
                                                </button>
                                                <a href="javscript:void(0)" className="filter-btn list-view paginationshow">filter</a>
                                                <a href="javscript:void(0)" className="filter-btn card-view noactive">filter</a>
                                                <a href="javscript:void(0)" className="filter-btn Setting_btn" data-toggle="modal" data-target="#setting"><i className="ti-settings" /></a>
                                                <a href="javscript:void(0)" className="filter-btn filter droptoggle_custome" id="filter">filter</a>
                                                <div className="selected-actions">
                                                    <div className="option-box drop-option-link">
                                                        <div className="nav-item dropdown dropcolgate">
                                                            <a className="nav-link custome_navlink" href="javascript:void(0)" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                                                <div className="option-box select-count selected"><span id="Counting">0</span> <span className="selected-text">Selected</span></div>
                                                                <div className="dot-icon">
                                                                    {/* <img src="img/icons/option-all.png" />src="img/icons/option-all.png" */}
                                                                    <ImageContainer src="icons/option-all.png" />
                                                                </div>
                                                            </a>
                                                            <div className="dropdown-menu drop_20">
                                                                <div className="counting-action-section">
                                                                    <div className="selections">
                                                                        <div className="group-selection">
                                                                            <div className="option-box clear-all"><a onClick="clearAll()" href="javscript:void(0)">Clear All</a></div>
                                                                        </div>
                                                                        <div className="group-action">
                                                                            <div className="option-box delete"><a href="#">Delete</a></div>
                                                                            <div className="option-box download"><a href="javscript:void(0)">Download</a></div>
                                                                            <div className="option-box move-folder"><a href="javscript:void(0)">Move to Folder</a></div>
                                                                            <div className="option-box import"><a href="javscript:void(0)">Product Import</a></div>
                                                                            <div className="option-box export"><a href="javscript:void(0)">Export Template</a></div>
                                                                            <div className="option-box compare batchUpdate" data-toggle="modal" data-target="#colgate">
                                                                                Batch Update
                                  </div>
                                                                            <div className="option-box compare"><a href="compair.html">Compare Products</a></div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <a className="dropdown-item" href="javascript:void(0)"><i className="ti-check" />Approve</a>
                                                                <a className="dropdown-item" href="javascript:void(0)"><i className="ti-close" />Reject</a>
                                                                <a className="dropdown-item" href="javascript:void(0)"><i className="fas fa-upload" />Publish</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <table id="example" className="table tabtable">
                                            <thead>
                                                <tr className="starting">
                                                    <th scope="col"><input type="checkbox" onClick="checkAll(this)" /></th>
                                                    <th scope="col" />
                                                    <th scope="col">Product ID</th>
                                                    <th scope="col">Product Name</th>
                                                    <th scope="col">SKU Number</th>
                                                    <th scope="col">Workflow State</th>
                                                    <th scope="col">Color (s)</th>
                                                    <th scope="col">Brand</th>
                                                    <th scope="col">Sub-Brand</th>
                                                    <th />
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td><input type="checkbox" name="" /></td>
                                                    <td><div className="image-thumb"><a href="detailpage.html">
                                                        <ImageContainer src="1.png" /> </a></div></td>
                                                    <td>102918</td>
                                                    <td className="product-name"><a href="detailpage.html">PALMOLIVE NATURALS CAMELLIA OIL &amp; ALMOND</a></td>
                                                    <td>22453331</td>
                                                    <td>New Product</td>
                                                    <td>Green</td>
                                                    <td>Palmolive</td>
                                                    <td>Palmolive</td>
                                                    <td><div className="row-hover">
                                                        <div className="row-link-options"> <a className="icon edit-icon" href="editProduct.html"> <ImageContainer src="icons/edit.png" /></a>  <a className="icon delete-icon" href="javscript:void(0)" data-toggle="modal" data-target="#delete"> <ImageContainer src="icons/delete.png" />
                                                        </a></div>
                                                    </div></td>
                                                </tr>
                                                <tr>
                                                    <td><input type="checkbox" name /></td>
                                                    <td><div className="image-thumb"><a href="detailpage.html">
                                                        <ImageContainer src="2.png" />
                                                    </a></div></td>
                                                    <td>102929</td>
                                                    <td className="product-name"><a href="detailpage.html">PALMOLIVE AROMA MOMENTS</a></td>
                                                    <td>22453232</td>
                                                    <td>New Product</td>
                                                    <td>Green</td>
                                                    <td>Palmolive</td>
                                                    <td>Palmolive</td>
                                                    <td><div className="row-hover">
                                                        <div className="row-link-options"> <a className="icon edit-icon" href="editProduct.html">
                                                            <ImageContainer src="icons/edit.png" /> </a>
                                                            <a className="icon delete-icon" href="javscript:void(0)" data-toggle="modal" data-target="#delete">
                                                                <ImageContainer src="icons/delete.png" />
                                                            </a></div>
                                                    </div></td>
                                                </tr>
                                                <tr>
                                                    <td><input type="checkbox" name /></td>
                                                    <td><div className="image-thumb"><a href="detailpage.html">
                                                        <ImageContainer src="3.png" /> </a></div></td>
                                                    <td>106545</td>
                                                    <td className="product-name"><a href="detailpage.html">PALMOLIVE GOURMET CHOCOLATE PASSION</a></td>
                                                    <td>22453331</td>
                                                    <td>New Product</td>
                                                    <td>Brown</td>
                                                    <td>Palmolive</td>
                                                    <td>Palmolive</td>
                                                    <td><div className="row-hover">
                                                        <div className="row-link-options"> <a className="icon edit-icon" href="editProduct.html">
                                                        </a>
                                                            <ImageContainer src="icons/edit.png" />
                                                            <a className="icon delete-icon" href="javscript:void(0)" data-toggle="modal" data-target="#delete">
                                                                <ImageContainer src="icons/delete.png" />
                                                            </a></div>
                                                    </div></td>
                                                </tr>
                                                <tr>
                                                    <td><input type="checkbox" name /></td>
                                                    <td><div className="image-thumb"><a href="detailpage.html"> <ImageContainer src="4.png" />  </a></div></td>
                                                    <td>102918</td>
                                                    <td className="product-name"><a href="detailpage.html">PALMOLIVE NATURALS CAMELLIA OIL &amp; ALMOND</a></td>
                                                    <td>2562311</td>
                                                    <td>New Product</td>
                                                    <td>Pink</td>
                                                    <td>Palmolive</td>
                                                    <td>Palmolive</td>
                                                    <td><div className="row-hover">
                                                        <div className="row-link-options"> <a className="icon edit-icon" href="editProduct.html"> <ImageContainer src="icons/edit.png" /></a>  <a className="icon delete-icon" href="javscript:void(0)" data-toggle="modal" data-target="#delete"> <ImageContainer src="icons/delete.png" />
                                                        </a></div>
                                                    </div></td>
                                                </tr>
                                                <tr>
                                                    <td><input type="checkbox" name /></td>
                                                    <td><div className="image-thumb"><a href="detailpage.html"> <img src="img/6.png" /> </a></div></td>
                                                    <td>102912</td>
                                                    <td className="product-name"><a href="detailpage.html"> colgate-essentials</a></td>
                                                    <td>13121114</td>
                                                    <td>New Product</td>
                                                    <td>Blue</td>
                                                    <td>Colgate</td>
                                                    <td>Colgate</td>
                                                    <td><div className="row-hover">
                                                        <div className="row-link-options"> <a className="icon edit-icon" href="editProduct.html"> <ImageContainer src="icons/edit.png" /></a>  <a className="icon delete-icon" href="javscript:void(0)" data-toggle="modal" data-target="#delete"> <ImageContainer src="icons/delete.png" />
                                                        </a></div>
                                                    </div></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <div className="pagebottompart">
                                            <p className="float-left col-md-10 dataTables">Showing 1 to 5 of 8 entries</p>
                                            <div className="col-md-2 pull-right">
                                                <ul className="pagination">
                                                    <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                                                    <li className="page-item"><a className="page-link" href="#">1</a></li>
                                                    <li className="page-item active"><a className="page-link" href="#">2</a></li>
                                                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                                                    <li className="page-item"><a className="page-link" href="#">Next</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                {
                                    product.length > 0 ? product.map((key, index) => {

                                        if (key.main_image.data) {
                                            // buff = new Buffer(key.main_image.data);
                                            var data = btoa(key.main_image.data)
                                            console.log('key.main_image.data--', data)
                                            // base64data = buff.toString('base64');
                                            base64data = "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"
                                            //console.log('base 64===',base64data)
                                        }
                                        return <div className="col-xs-12 col-sm-4 col-md-3 card-block">
                                            <div className="card">
                                                <div className="card-body text-center">
                                                    <a className="icon check-icon activebtn" href="javscript:void(0)">
                                                        <ImageContainer src="icons/check.png" />
                                                    </a>

                                                    <p className="img">
                                                        {/* <ImageContainer src="5.png" alt="" /> */}

                                                        <img src={base64data ? 'data:' + "image/png" + ';base64,' + base64data : ""} alt="" />
                                                    </p>
                                                    <h4 className="card-title">{key.product_id}</h4>
                                                    <p className="card-text">{key.product_name}<br />{key.product_name}</p>
                                                </div>
                                                <div className="card-hover">
                                                    <div className="card-link-options">
                                                        <Link className="icon view-icon" to="/productDetailPage" >
                                                            <ImageContainer src="icons/view.png" />
                                                        </Link>
                                                        <Link className="icon edit-icon" to="/editProduct">
                                                        <ImageContainer src="icons/edit.png" />
                                                        </Link>
                                                         <a className="icon delete-icon" href="javscript:void(0)" data-toggle="modal" data-target="#delete"> <ImageContainer src="icons/delete.png" />
                                                        </a>  <a className="icon check-icon select_box" href="javscript:void(0)">
                                                            <ImageContainer src="icons/check.png" /></a>
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



        )
    }
}


export default ProductList;
