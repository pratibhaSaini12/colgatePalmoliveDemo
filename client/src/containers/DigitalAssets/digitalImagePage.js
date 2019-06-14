import React, { Component } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Header from '../Header/index';
import Aside from '../SideBar/index';
import { Link } from "react-router-dom"
import ImageContainer from "../../components/imageContainer"
import ReactLoading from 'react-loading'
class DigitalImagePage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            asset: [],
            Loading: false
        }
    }


    componentWillMount() {
        let self = this
        try {
            // self.setState({ Loading: true })
    //         axios.get("/api/getAllassets").then(function (response) {
    //             console.log("asset list ", response.data);
    //             if (response.data) {
    //                 self.setState({
    //                     asset: response.data.assets
    //                 })
    //             }

    //         }).catch(function (error) {
    //             console.log("error  login is ", error);
    //         })
        } catch (e) { }
    }
    componentDidMount() {
        let self = this
        try {
            self.setState({
                asset: this.props.location.state._data,
                Loading: false
            })
        } catch (e) { console.log("errr", errr) }
    }



    render() {
        console.log("props in asset detail page", this.props)
        console.log("state in asset detail page", this.state)
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
                {
                    this.state.Loading === true && <div className="loader-react">
                        <ReactLoading type={'spinningBubbles'} color={'green'} className="reactLoader" />
                    </div>
                }
                <div id="main-wrapper">


                    <Header />
                    <Aside active={"digital"} />
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
                                                    <Link to="/digitalImages"> Asset &gt;&gt; </Link>
                                                </li>
                                                <li>  {asset.asset_id}</li>
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
                                                    {asset.path !== null && asset.path !== undefined?
                                                        <img src={asset.path} />
                                                        : '' }
                                                </div>
                                            </div>
                                            <div className="col-md-9">
                                                <h2 className="page-title assetid approved"><i className="fas fa-check-circle" />
                                                    {asset.asset_id}</h2>
                                                <h4 className="assetname">{asset.asset_name}</h4>
                                                <p className="date-time">{asset.created_at}</p>
                                            </div>
                                            <div className="col-md-1">
                                                <div className="nav-item dropdown dropcolgate"> <a className="nav-link custome_navlink" href="javascript:void(0)" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                                    <ImageContainer src="icons/option-all.png" />
                                                    {/* <img src="img/icons/option-all.png" /> */}
                                                </a>
                                                    <div className="dropdown-menu drop_20"> <a className="dropdown-item" href="javascript:void(0)"><i className="ti-check" />Approve</a> <a className="dropdown-item" href="javascript:void(0)"><i className="ti-close" />Reject</a>
                                                    <a className="dropdown-item" href="javascript:void(0)"><i className="fas fa-upload" />Publish</a> </div>
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
                                                {/* <div className="card-header" id="headingOne">
                                                    <h5 className="mb-0">
                                                        <button className="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                            <div className="heading">
                                                                <i className="fas fa-chevron-right" />
                                                                General
                              </div>
                                                        </button>
                                                    </h5>
                                                </div> */}
                                                <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                                                    <div className="card-body">
                                                        <table>
                                                            <tbody><tr>
                                                                <td width="20%">asset Name</td>
                                                                <td width="80%">{asset.asset_name}</td>
                                                            </tr>
                                                                <tr>
                                                                    <td>asset ID</td>
                                                                    <td>{asset.asset_id}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>SKU</td>
                                                                    <td>{asset.upc}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Category</td>
                                                                    <td>{asset.category}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Link</td>
                                                                    <td>{asset.link}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>asset Line</td>
                                                                    <td>{asset.asset_line}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>asset Status </td>
                                                                    <td>{asset.asset_status}</td>
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


export default DigitalImagePage;
