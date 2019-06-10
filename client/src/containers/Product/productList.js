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
            product: [],
            deleteProductId: ''
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

    async deleteProductById (){
        console.log("this.stateeeeee", this.state)
        await axios.post("/api/deleteProductByID", {id:this.state.deleteProductId}).then(function (response) {
            console.log('resposne from Delete api==', response)
            if(response.data.product){
                this.setState({deleteProductId:''})
                window.location.href = "/productList"
            }

        }).catch(function (error) {
            this.setState({deleteProductId:''})
            console.log("error in delete product",error)
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
                                        return <div className="col-xs-12 col-sm-4 col-md-3 card-block">
                                            <div className="card">
                                                <div className="card-body text-center">
                                                    <a className="icon check-icon activebtn" href="javscript:void(0)">
                                                        <ImageContainer src="icons/check.png" />
                                                    </a>

                                                    <p className="img">
                                                        <ImageContainer src="5.png" alt="" />

                                                        {/* <img src={base64data ? 'data:' + "image/png" + ';base64,' + base64data : ""} alt="" /> */}
                                                    </p>
                                                    <h4 className="card-title">{key.product_id}</h4>
                                                    <p className="card-text">{key.product_name}<br />{key.product_name}</p>
                                                </div>
                                                <div className="card-hover">
                                                    <div className="card-link-options">
                                                        <Link className="icon view-icon" to={{ pathname: '/productDetailPage', state: { _data: key } }} >
                                                            <ImageContainer src="icons/view.png" />
                                                        </Link>
                                                        <Link className="icon edit-icon" to={{ pathname: '/editProduct', state: { _data: key } }}>
                                                            <ImageContainer src="icons/edit.png" />
                                                        </Link>
                                                        <a className="icon delete-icon" href="javscript:void(0)" data-toggle="modal" data-target="#delete" onClick={(e)=>this.setState({deleteProductId:key.product_id})}>
                                                            <ImageContainer src="icons/delete.png" />
                                                        </a>
                                                        <a className="icon check-icon select_box" href="javscript:void(0)">
                                                            <ImageContainer src="icons/check.png" />
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    }) : ''

                                }
                            </div>
                            {/* The product delete */}
                            <div className="modal fade allmodalcolgate" id="delete">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        {/* Modal Header */}
                                        <div className="modal-header">
                                            <h4 className="modal-title title_modalheader">Delete Product</h4>
                                            <button type="button" className="close" data-dismiss="modal" onClick={(e)=>this.setState({deleteProductId: ''})}>×</button>
                                        </div>
                                        {/* Modal body */}
                                        <div className="modal-body filtercustome">
                                            <h1 className="delete_product_list">Are you sure you want to delete</h1>
                                        </div>
                                        {/* Modal footer */}
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-primary removeproduct" data-dismiss="modal" onClick={(e)=>this.deleteProductById()}>Yes</button>
                                            <button type="button" className="btn btn-outline-primary" data-dismiss="modal" onClick={(e)=>this.setState({deleteProductId: ''})}>No</button>
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


export default ProductList;
