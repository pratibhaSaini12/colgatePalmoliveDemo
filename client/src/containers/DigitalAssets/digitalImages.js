import React, { Component } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Header from '../Header/index';
import Aside from '../SideBar/index';
import ImageContainer from "../../components/imageContainer"
class DigitalImages extends Component {

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
                                        <div className="counting-action-section">
                                            <div className="row">
                                            </div>
                                        </div>
                                        <h2 className="page-title">Digital Assets Management</h2>
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
                                                                            <option value={0}>Type</option>
                                                                            <option value="PNG">PNG</option>
                                                                            <option value="JPEG">JPEG</option>
                                                                            <option value="TIFF">TIFF</option>
                                                                            <option value="SVG">SVG</option>
                                                                            {/*                              <option value="7">7</option>
                              <option value="8">8</option>
                              <option value="9">9</option>*/}
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <div className="form-group">
                                                                        <select id="pref-perpage" className="form-control">
                                                                            <option value={0}>Size</option>
                                                                            <option value="Small">Small</option>
                                                                            <option value="Medium">Medium</option>
                                                                            <option value="Large">Large</option>
                                                                            {/*                              <option value="4">6</option>
                              <option value="7">7</option>
                              <option value="8">8</option>
                              <option value="9">9</option>*/}
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <div className="form-group">
                                                                        <select id="pref-perpage" className="form-control">
                                                                            <option value={0}>Status</option>
                                                                            <option value="New">New</option>
                                                                            <option value="In Approval">In Approval</option>
                                                                            <option value="Approved">Approved</option>
                                                                            <option value="Rejected">Rejected</option>
                                                                            {/*                              <option value="7">7</option>
                              <option value="8">8</option>
                              <option value="9">9</option>*/}
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <div className="form-group">
                                                                <input className="form-control search_filter" type="text" name="search" placeholder="Search by ID or Filename" />
                                                                <i className="ti-search filtersearch" /> </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* card row start ---------------------------------------------------------------------*/}
                            <div className="table-view digitalImage">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="filter float-right">
                                            <div className="float-right col-md-12">
                                                <button className="primary-button float-right"><a href="javscript:void(0);" data-toggle="modal" data-target="#colgate"> <span className="icon plus" />Upload Assets </a></button>
                                                <a href="javscript:void(0)" className="filter-btn list-view paginationshow">filter</a>
                                                <a href="javscript:void(0)" className="filter-btn card-view noactive">filter</a>
                                                <a href="javscript:void(0)" className="filter-btn filter droptoggle_custome" id="filter">filter</a>
                                                <div className="selected-actions">
                                                    <div className="option-box drop-option-link">
                                                        <div className="nav-item dropdown dropcolgate">
                                                            <a className="nav-link custome_navlink" href="javascript:void(0)" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                                                <div className="option-box select-count selected"><span id="Counting">0</span> <span className="selected-text">Selected</span></div>
                                                                <div className="dot-icon"><ImageContainer src="icons/option-all.png" /></div>
                                                            </a>
                                                            <div className="dropdown-menu drop_20">
                                                                <div className="counting-action-section">
                                                                    <div className="selections">
                                                                        <div className="group-selection">
                                                                            <div className="option-box select-all"><a onClick="selectAll()" href="javscript:void(0)">Select All</a></div>
                                                                            <div className="option-box clear-all"><a onClick="clearAll()" href="javscript:void(0)">Clear All</a></div>
                                                                        </div>
                                                                        <div className="group-action">
                                                                            <div className="option-box delete"><a href>Delete</a></div>
                                                                            <div className="option-box download"><a href="javscript:void(0)">Download</a></div>
                                                                            <div className="option-box move-folder"><a href="javscript:void(0)">Move to Folder</a></div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <a className="dropdown-item" href="javascript:void(0)"><i className="ti-check" />Approve</a>
                                                                <a className="dropdown-item" href="javascript:void(0)"><i className="ti-close" />Reject</a>
                                                                <a className="dropdown-item" href="javascript:void(0)"><i className="ti-reload" />Update Request</a>
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
                                                    <th scope="col">Name</th>
                                                    <th scope="col">Type</th>
                                                    <th scope="col">Details</th>
                                                    <th scope="col">Created At</th>
                                                    <th />
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td><input type="checkbox" /></td>
                                                    <td><div className="image-thumb"> <ImageContainer src="1.png" /> </div></td>
                                                    <td className="productlist_name">Palmolive-Camellia....jpg</td>
                                                    <td>image</td>
                                                    <td>2832 x 4256 2.74 MB</td>
                                                    <td>4/25/19 6:49 pm</td>
                                                    <td><div className="row-hover">
                                                        <div className="row-link-options"> <a className="icon edit-icon" href="#"> <ImageContainer src="icons/edit.png" /> </a> <a className="icon delete-icon" href="javscript:void(0)" data-toggle="modal" data-target="#delete"> <ImageContainer src="icons/delete.png" />
                                                        </a></div>
                                                    </div></td>
                                                </tr>
                                                <tr>
                                                    <td><input type="checkbox" /></td>
                                                    <td><div className="image-thumb"> <ImageContainer src="1.png" /> </div></td>
                                                    <td className="productlist_name">palmolive-aroma.png</td>
                                                    <td>image</td>
                                                    <td>2832 x 4256 2.74 MB</td>
                                                    <td>4/25/19 6:49 pm</td>
                                                    <td><div className="row-hover">
                                                        <div className="row-link-options"> <a className="icon edit-icon" href="#"> <ImageContainer src="icons/edit.png" /> </a> <a className="icon delete-icon" href="javscript:void(0)" data-toggle="modal" data-target="#delete"> <ImageContainer src="icons/delete.png" />
                                                        </a></div>
                                                    </div></td>
                                                </tr>
                                                <tr>
                                                    <td><input type="checkbox"  /></td>
                                                    <td><div className="image-thumb"> <ImageContainer src="1.png" /> </div></td>
                                                    <td className="productlist_name">widelogos_dubius.png</td>
                                                    <td>image</td>
                                                    <td>2832 x 4256 2.74 MB</td>
                                                    <td>4/25/19 6:49 pm</td>
                                                    <td><div className="row-hover">
                                                        <div className="row-link-options"> <a className="icon edit-icon" href="#"> <ImageContainer src="icons/edit.png" /> </a> <a className="icon delete-icon" href="javscript:void(0)" data-toggle="modal" data-target="#delete"> <ImageContainer src="icons/delete.png" />
                                                        </a></div>
                                                    </div></td>
                                                </tr>
                                                <tr>
                                                    <td><input type="checkbox"  /></td>
                                                    <td><div className="image-thumb"> <ImageContainer src="1.png" /> </div></td>
                                                    <td className="productlist_name">palmolive-aroma.png</td>
                                                    <td>image</td>
                                                    <td>2832 x 4256 2.74 MB</td>
                                                    <td>4/25/19 6:49 pm</td>
                                                    <td><div className="row-hover">
                                                        <div className="row-link-options"> <a className="icon edit-icon" href="#"> <ImageContainer src="icons/edit.png" /> </a> <a className="icon delete-icon" href="javscript:void(0)" data-toggle="modal" data-target="#delete"> <ImageContainer src="icons/delete.png" />
                                                        </a></div>
                                                    </div></td>
                                                </tr>
                                                <tr>
                                                    <td><input type="checkbox"  /></td>
                                                    <td><div className="image-thumb"> <ImageContainer src="1.png" /> </div></td>
                                                    <td className="productlist_name">widelogos_dubius.png</td>
                                                    <td>image</td>
                                                    <td>2832 x 4256 2.74 MB</td>
                                                    <td>4/25/19 6:49 pm</td>
                                                    <td><div className="row-hover">
                                                        <div className="row-link-options"> <a className="icon edit-icon" href="#"> <ImageContainer src="icons/edit.png" /> </a> <a className="icon delete-icon" href="javscript:void(0)" data-toggle="modal" data-target="#delete"> <ImageContainer src="icons/delete.png" />
                                                        </a></div>
                                                    </div></td>
                                                </tr>
                                                <tr>
                                                    <td><input type="checkbox"  /></td>
                                                    <td><div className="image-thumb"> <ImageContainer src="1.png" /> </div></td>
                                                    <td className="productlist_name">palmolive-aroma.png</td>
                                                    <td>image</td>
                                                    <td>2832 x 4256 2.74 MB</td>
                                                    <td>4/25/19 6:49 pm</td>
                                                    <td><div className="row-hover">
                                                        <div className="row-link-options"> <a className="icon edit-icon" href="#"> <ImageContainer src="icons/edit.png" /> </a> <a className="icon delete-icon" href="javscript:void(0)" data-toggle="modal" data-target="#delete"> <ImageContainer src="icons/delete.png" />
                                                        </a></div>
                                                    </div></td>
                                                </tr>
                                                <tr>
                                                    <td><input type="checkbox"  /></td>
                                                    <td><div className="image-thumb"> <ImageContainer src="1.png" /> </div></td>
                                                    <td className="productlist_name">palmolive-aroma.png</td>
                                                    <td>image</td>
                                                    <td>2832 x 4256 2.74 MB</td>
                                                    <td>4/25/19 6:49 pm</td>
                                                    <td><div className="row-hover">
                                                        <div className="row-link-options"> <a className="icon edit-icon" href="#"> <ImageContainer src="icons/edit.png" /> </a> <a className="icon delete-icon" href="javscript:void(0)" data-toggle="modal" data-target="#delete"> <ImageContainer src="icons/delete.png" />
                                                        </a></div>
                                                    </div></td>
                                                </tr>
                                                <tr>
                                                    <td><input type="checkbox"  /></td>
                                                    <td><div className="image-thumb"> <ImageContainer src="1.png" /> </div></td>
                                                    <td className="productlist_name">palmolive-aroma.png</td>
                                                    <td>image</td>
                                                    <td>2832 x 4256 2.74 MB</td>
                                                    <td>4/25/19 6:49 pm</td>
                                                    <td><div className="row-hover">
                                                        <div className="row-link-options"> <a className="icon edit-icon" href="#"> <ImageContainer src="icons/edit.png" /> </a> <a className="icon delete-icon" href="javscript:void(0)" data-toggle="modal" data-target="#delete"> <ImageContainer src="icons/delete.png" />
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
                            <div className="row digitalImage">
                                <div className="col-xs-12 col-sm-4 col-md-3 card-block">
                                    <div className="card document_list">
                                        <div className="card-body text-center">
                                            <span className="digitalImageIco">
                                                <ImageContainer src="icons/img.png" />
                                            </span>
                                            <a className="icon check-icon activebtn" href="javscript:void(0)"> <ImageContainer src="icons/check.png" /> </a>
                                            <p className="img"><ImageContainer className="img-fluid" src="1.png" alt="card image" /></p>
                                            <div className="card-info">
                                                <h4 className="card-title">Palmolive-Camellia....jpg</h4>
                                                <p className="card-text">4/25/19 6:49 pm</p>
                                                <p className="card-text">2832 x 4256  |  2.74 MB</p>
                                            </div>
                                        </div>
                                        <div className="card-hover">
                                            <div className="card-link-options"> <a className="icon view-icon" href="javscript:void(0)"> <ImageContainer src="icons/view.png" /> </a> <a className="icon edit-icon" href="javscript:void(0)"> <ImageContainer src="icons/edit.png" /> </a>  <a className="icon delete-icon" href="javscript:void(0)" data-toggle="modal" data-target="#delete"> <ImageContainer src="icons/delete.png" />
                                            </a>  <a className="icon check-icon select_box" href="javscript:void(0)"> <ImageContainer src="icons/check.png" /> </a> </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xs-12 col-sm-4 col-md-3 card-block">
                                    <div className="card document_list">
                                        <div className="card-body text-center">
                                            <span className="digitalImageIco">
                                                <ImageContainer src="icons/img.png" />
                                            </span>
                                            <a className="icon check-icon activebtn" href="javscript:void(0)"> <ImageContainer src="icons/check.png" /> </a>
                                            <p className="img"><ImageContainer className="img-fluid" src="1.png" alt="card image" /></p>
                                            <div className="card-info">
                                                <h4 className="card-title">Palmolive-Camellia....jpg</h4>
                                                <p className="card-text">4/25/19 6:49 pm</p>
                                                <p className="card-text">2832 x 4256  |  2.74 MB</p>
                                            </div>
                                        </div>
                                        <div className="card-hover">
                                            <div className="card-link-options"> <a className="icon view-icon" href="javscript:void(0)"> <ImageContainer src="icons/view.png" /> </a> <a className="icon edit-icon" href="javscript:void(0)"> <ImageContainer src="icons/edit.png" /> </a>  <a className="icon delete-icon" href="javscript:void(0)" data-toggle="modal" data-target="#delete"> <ImageContainer src="icons/delete.png" />
                                            </a>  <a className="icon check-icon select_box" href="javscript:void(0)"> <ImageContainer src="icons/check.png" /> </a> </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xs-12 col-sm-4 col-md-3 card-block">
                                    <div className="card document_list">
                                        <div className="card-body text-center"><span className="digitalImageIco">
                                            <ImageContainer src="icons/img.png" />
                                        </span> <a className="icon check-icon activebtn" href="javscript:void(0)"> <ImageContainer src="icons/check.png" /> </a>
                                            <p className="img"><ImageContainer className="img-fluid" src="2.png" alt="card image" /></p>
                                            <div className="card-info">
                                                <h4 className="card-title">Palmolive-Camellia....jpg</h4>
                                                <p className="card-text">4/25/19 6:49 pm</p>
                                                <p className="card-text">2832 x 4256  |  2.74 MB</p>
                                            </div>
                                        </div>
                                        <div className="card-hover">
                                            <div className="card-link-options"> <a className="icon view-icon" href="javscript:void(0)"> <ImageContainer src="icons/view.png" /> </a> <a className="icon edit-icon" href="javscript:void(0)"> <ImageContainer src="icons/edit.png" /> </a>  <a className="icon delete-icon" href="javscript:void(0)" data-toggle="modal" data-target="#delete"> <ImageContainer src="icons/delete.png" />
                                            </a>  <a className="icon check-icon select_box" href="javscript:void(0)"> <ImageContainer src="icons/check.png" /> </a> </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xs-12 col-sm-4 col-md-3 card-block">
                                    <div className="card document_list">
                                        <div className="card-body text-center"><span className="digitalImageIco">
                                            <ImageContainer src="icons/img.png" />
                                        </span> <a className="icon check-icon activebtn" href="javscript:void(0)"> <ImageContainer src="icons/check.png" /> </a>
                                            <p className="img"><ImageContainer className="img-fluid" src="3.png" alt="card image" /></p>
                                            <div className="card-info">
                                                <h4 className="card-title">Palmolive-Camellia....jpg</h4>
                                                <p className="card-text">4/25/19 6:49 pm</p>
                                                <p className="card-text">2832 x 4256  |  2.74 MB</p>
                                            </div>
                                        </div>
                                        <div className="card-hover">
                                            <div className="card-link-options"> <a className="icon view-icon" href="javscript:void(0)"> <ImageContainer src="icons/view.png" /> </a> <a className="icon edit-icon" href="javscript:void(0)"> <ImageContainer src="icons/edit.png" /> </a>  <a className="icon delete-icon" href="javscript:void(0)" data-toggle="modal" data-target="#delete"> <ImageContainer src="icons/delete.png" />
                                            </a>  <a className="icon check-icon select_box" href="javscript:void(0)"> <ImageContainer src="icons/check.png" /> </a> </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xs-12 col-sm-4 col-md-3 card-block">
                                    <div className="card document_list">
                                        <div className="card-body text-center"> <span className="digitalImageIco">
                                            <ImageContainer src="icons/img.png" />
                                        </span><a className="icon check-icon activebtn" href="javscript:void(0)"> <ImageContainer src="icons/check.png" /> </a>
                                            <p className="img"><ImageContainer className="img-fluid" src="4.png" alt="card image" /></p>
                                            <div className="card-info">
                                                <h4 className="card-title">Palmolive-Camellia....jpg</h4>
                                                <p className="card-text">4/25/19 6:49 pm</p>
                                                <p className="card-text">2832 x 4256  |  2.74 MB</p>
                                            </div>
                                        </div>
                                        <div className="card-hover">
                                            <div className="card-link-options"> <a className="icon view-icon" href="javscript:void(0)"> <ImageContainer src="icons/view.png" /> </a> <a className="icon edit-icon" href="javscript:void(0)"> <ImageContainer src="icons/edit.png" /> </a>  <a className="icon delete-icon" href="javscript:void(0)" data-toggle="modal" data-target="#delete"> <ImageContainer src="icons/delete.png" />
                                            </a>  <a className="icon check-icon select_box" href="javscript:void(0)"> <ImageContainer src="icons/check.png" /> </a> </div>
                                        </div>
                                    </div>
                                </div>
                                {/* row second ---------------------------------------------------------------------*/}
                                <div className="col-xs-12 col-sm-4 col-md-3 card-block">
                                    <div className="card document_list">
                                        <div className="card-body text-center"><span className="digitalImageIco">
                                            <ImageContainer src="icons/img.png" />
                                        </span> <a className="icon check-icon activebtn" href="javscript:void(0)"> <ImageContainer src="icons/check.png" /> </a>
                                            <p className="img"><ImageContainer className="img-fluid" src="1.png" alt="card image" /></p>
                                            <div className="card-info">
                                                <h4 className="card-title">Palmolive-Camellia....jpg</h4>
                                                <p className="card-text">4/25/19 6:49 pm</p>
                                                <p className="card-text">2832 x 4256  |  2.74 MB</p>
                                            </div>
                                        </div>
                                        <div className="card-hover">
                                            <div className="card-link-options"> <a className="icon view-icon" href="javscript:void(0)"> <ImageContainer src="icons/view.png" /> </a> <a className="icon edit-icon" href="javscript:void(0)"> <ImageContainer src="icons/edit.png" /> </a>  <a className="icon delete-icon" href="javscript:void(0)" data-toggle="modal" data-target="#delete"> <ImageContainer src="icons/delete.png" />
                                            </a>  <a className="icon check-icon select_box" href="javscript:void(0)"> <ImageContainer src="icons/check.png" /> </a> </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xs-12 col-sm-4 col-md-3 card-block">
                                    <div className="card document_list">
                                        <div className="card-body text-center"> <span className="digitalImageIco">
                                            <ImageContainer src="icons/img.png" />
                                        </span><a className="icon check-icon activebtn" href="javscript:void(0)"> <ImageContainer src="icons/check.png" /> </a>
                                            <p className="img"><ImageContainer className="img-fluid" src="2.png" alt="card image" /></p>
                                            <div className="card-info">
                                                <h4 className="card-title">Palmolive-Camellia....jpg</h4>
                                                <p className="card-text">4/25/19 6:49 pm</p>
                                                <p className="card-text">2832 x 4256  |  2.74 MB</p>
                                            </div>
                                        </div>
                                        <div className="card-hover">
                                            <div className="card-link-options"> <a className="icon view-icon" href="javscript:void(0)"> <ImageContainer src="icons/view.png" /> </a> <a className="icon edit-icon" href="javscript:void(0)"> <ImageContainer src="icons/edit.png" /> </a>  <a className="icon delete-icon" href="javscript:void(0)" data-toggle="modal" data-target="#delete"> <ImageContainer src="icons/delete.png" />
                                            </a>  <a className="icon check-icon select_box" href="javscript:void(0)"> <ImageContainer src="icons/check.png" /> </a> </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xs-12 col-sm-4 col-md-3 card-block">
                                    <div className="card document_list">
                                        <div className="card-body text-center"><span className="digitalImageIco">
                                            <ImageContainer src="icons/img.png" />
                                        </span> <a className="icon check-icon activebtn" href="javscript:void(0)"> <ImageContainer src="icons/check.png" /> </a>
                                            <p className="img"><ImageContainer className="img-fluid" src="3.png" alt="card image" /></p>
                                            <div className="card-info">
                                                <h4 className="card-title">Palmolive-Camellia....jpg</h4>
                                                <p className="card-text">4/25/19 6:49 pm</p>
                                                <p className="card-text">2832 x 4256  |  2.74 MB</p>
                                            </div>
                                        </div>
                                        <div className="card-hover">
                                            <div className="card-link-options"> <a className="icon view-icon" href="javscript:void(0)"> <ImageContainer src="icons/view.png" /> </a> <a className="icon edit-icon" href="javscript:void(0)"> <ImageContainer src="icons/edit.png" /> </a>  <a className="icon delete-icon" href="javscript:void(0)" data-toggle="modal" data-target="#delete"> <ImageContainer src="icons/delete.png" />
                                            </a>  <a className="icon check-icon select_box" href="javscript:void(0)"> <ImageContainer src="icons/check.png" /> </a> </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xs-12 col-sm-4 col-md-3 card-block">
                                    <div className="card document_list">
                                        <div className="card-body text-center"> <span className="digitalImageIco">
                                            <ImageContainer src="icons/img.png" />
                                        </span><a className="icon check-icon activebtn" href="javscript:void(0)"> <ImageContainer src="icons/check.png" /> </a>
                                            <p className="img"><ImageContainer className="img-fluid" src="4.png" alt="card image" /></p>
                                            <div className="card-info">
                                                <h4 className="card-title">Palmolive-Camellia....jpg</h4>
                                                <p className="card-text">4/25/19 6:49 pm</p>
                                                <p className="card-text">2832 x 4256  |  2.74 MB</p>
                                            </div>
                                        </div>
                                        <div className="card-hover">
                                            <div className="card-link-options"> <a className="icon view-icon" href="javscript:void(0)"> <ImageContainer src="icons/view.png" /> </a> <a className="icon edit-icon" href="javscript:void(0)"> <ImageContainer src="icons/edit.png" /> </a>  <a className="icon delete-icon" href="javscript:void(0)" data-toggle="modal" data-target="#delete"> <ImageContainer src="icons/delete.png" />
                                            </a>  <a className="icon check-icon select_box" href="javscript:void(0)"> <ImageContainer src="icons/check.png" /> </a> </div>
                                        </div>
                                    </div>
                                </div>
                                {/* row second ---------------------------------------------------------------------*/}
                                <div className="col-xs-12 col-sm-4 col-md-3 card-block">
                                    <div className="card document_list">
                                        <div className="card-body text-center"><span className="digitalImageIco">
                                            <ImageContainer src="icons/img.png" />
                                        </span> <a className="icon check-icon activebtn" href="javscript:void(0)"> <ImageContainer src="icons/check.png" /> </a>
                                            <p className="img"><ImageContainer className="img-fluid" src="1.png" alt="card image" /></p>
                                            <div className="card-info">
                                                <h4 className="card-title">Palmolive-Camellia....jpg</h4>
                                                <p className="card-text">4/25/19 6:49 pm</p>
                                                <p className="card-text">2832 x 4256  |  2.74 MB</p>
                                            </div>
                                        </div>
                                        <div className="card-hover">
                                            <div className="card-link-options"> <a className="icon view-icon" href="javscript:void(0)"> <ImageContainer src="icons/view.png" /> </a> <a className="icon edit-icon" href="javscript:void(0)"> <ImageContainer src="icons/edit.png" /> </a>  <a className="icon delete-icon" href="javscript:void(0)" data-toggle="modal" data-target="#delete"> <ImageContainer src="icons/delete.png" />
                                            </a>  <a className="icon check-icon select_box" href="javscript:void(0)"> <ImageContainer src="icons/check.png" /> </a> </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xs-12 col-sm-4 col-md-3 card-block">
                                    <div className="card document_list">
                                        <div className="card-body text-center"><span className="digitalImageIco">
                                            <ImageContainer src="icons/img.png" />
                                        </span> <a className="icon check-icon activebtn" href="javscript:void(0)"> <ImageContainer src="icons/check.png" /> </a>
                                            <p className="img"><ImageContainer className="img-fluid" src="2.png" alt="card image" /></p>
                                            <div className="card-info">
                                                <h4 className="card-title">Palmolive-Camellia....jpg</h4>
                                                <p className="card-text">4/25/19 6:49 pm</p>
                                                <p className="card-text">2832 x 4256  |  2.74 MB</p>
                                            </div>
                                        </div>
                                        <div className="card-hover">
                                            <div className="card-link-options"> <a className="icon view-icon" href="javscript:void(0)"> <ImageContainer src="icons/view.png" /> </a> <a className="icon edit-icon" href="javscript:void(0)"> <ImageContainer src="icons/edit.png" /> </a>  <a className="icon delete-icon" href="javscript:void(0)" data-toggle="modal" data-target="#delete"> <ImageContainer src="icons/delete.png" />
                                            </a>  <a className="icon check-icon select_box" href="javscript:void(0)"> <ImageContainer src="icons/check.png" /> </a> </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xs-12 col-sm-4 col-md-3 card-block">
                                    <div className="card document_list">
                                        <div className="card-body text-center"> <span className="digitalImageIco">
                                            <ImageContainer src="icons/img.png" />
                                        </span><a className="icon check-icon activebtn" href="javscript:void(0)"> <ImageContainer src="icons/check.png" /> </a>
                                            <p className="img"><ImageContainer className="img-fluid" src="3.png" alt="card image" /></p>
                                            <div className="card-info">
                                                <h4 className="card-title">Palmolive-Camellia....jpg</h4>
                                                <p className="card-text">4/25/19 6:49 pm</p>
                                                <p className="card-text">2832 x 4256  |  2.74 MB</p>
                                            </div>
                                        </div>
                                        <div className="card-hover">
                                            <div className="card-link-options"> <a className="icon view-icon" href="javscript:void(0)"> <ImageContainer src="icons/view.png" /> </a> <a className="icon edit-icon" href="javscript:void(0)"> <ImageContainer src="icons/edit.png" /> </a>  <a className="icon delete-icon" href="javscript:void(0)" data-toggle="modal" data-target="#delete"> <ImageContainer src="icons/delete.png" />
                                            </a>  <a className="icon check-icon select_box" href="javscript:void(0)"> <ImageContainer src="icons/check.png" /> </a> </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xs-12 col-sm-4 col-md-3 card-block">
                                    <div className="card document_list">
                                        <div className="card-body text-center"><span className="digitalImageIco">
                                            <ImageContainer src="icons/img.png" />
                                        </span> <a className="icon check-icon activebtn" href="javscript:void(0)"> <ImageContainer src="icons/check.png" /> </a>
                                            <p className="img"><ImageContainer className="img-fluid" src="4.png" alt="card image" /></p>
                                            <div className="card-info">
                                                <h4 className="card-title">Palmolive-Camellia....jpg</h4>
                                                <p className="card-text">4/25/19 6:49 pm</p>
                                                <p className="card-text">2832 x 4256  |  2.74 MB</p>
                                            </div>
                                        </div>
                                        <div className="card-hover">
                                            <div className="card-link-options"> <a className="icon view-icon" href="javscript:void(0)"> <ImageContainer src="icons/view.png" /> </a> <a className="icon edit-icon" href="javscript:void(0)"> <ImageContainer src="icons/edit.png" /> </a>  <a className="icon delete-icon" href="javscript:void(0)" data-toggle="modal" data-target="#delete"> <ImageContainer src="icons/delete.png" />
                                            </a>  <a className="icon check-icon select_box" href="javscript:void(0)"> <ImageContainer src="icons/check.png" /> </a> </div>
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
                                    <h4 className="modal-title title_modalheader">Upload Assets</h4>
                                    <button type="button" className="close" data-dismiss="modal">×</button>
                                </div>
                                {/* Modal body */}
                                <div className="modal-body filtercustome">
                                    <form>
                                        <div className="form-group">
                                            <label>Asset Id</label>
                                            <input className="form-control" type="text" name="search" placeholder={12345} />
                                        </div>
                                        <div className="form-group">
                                            <label>Asset Name</label>
                                            <input className="form-control" type="text" name="search" placeholder={12345} />
                                        </div>
                                        <div className="avatar-upload">
                                            <div className="avatar-preview">
                                                <div id="imagePreview"> </div>
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
                                    <button type="button" className="btn btn-outline-primary" data-dismiss="modal">CANCEL</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* The product delete */}
                    <div className="modal fade allmodalcolgate" id="delete">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                {/* Modal Header */}
                                <div className="modal-header">
                                    <h4 className="modal-title title_modalheader">Delete Assets</h4>
                                    <button type="button" className="close" data-dismiss="modal">×</button>
                                </div>
                                {/* Modal body */}
                                <div className="modal-body filtercustome">
                                    <h1 className="delete_product_list">Are you sure you want to delete</h1>
                                </div>
                                {/* Modal footer */}
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-primary removeproduct" data-dismiss="modal">Yes</button>
                                    <button type="button" className="btn btn-outline-primary" data-dismiss="modal">No</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default DigitalImages;