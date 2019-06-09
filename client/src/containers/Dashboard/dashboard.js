import React, { Component } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Header from '../Header/index';
import Footer from '../Footer/index';
import { Chart } from "react-google-charts";
import ImageContainer from "../../components/imageContainer"

class Dashboard extends Component {

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

                    <aside className="left-sidebar">
                        {/* Sidebar scroll*/}
                        <div className="scroll-sidebar">
                            {/* Sidebar navigation*/}
                            <nav className="sidebar-nav">
                                <ul id="sidebarnav">
                                    <li> <a className="has-arrow waves-effect waves-dark" href="index.html" aria-expanded="false"> <i className="sprite_icon dashboard" /><span className="hide-menu">Dashboard </span></a></li>
                                    <li> <a className="has-arrow waves-effect waves-dark" href="javscript:void(0)" aria-expanded="false"> <i className="sprite_icon product" /><span className="hide-menu">Products </span></a>
                                        <ul aria-expanded="false" className="collapse">
                                            <li><a href="productlist.html">View All</a></li>
                                            <li><a href="table-layout.html">Manage Collections</a></li>
                                        </ul>
                                    </li>
                                    <li> <a className="has-arrow waves-effect waves-dark" href="javscript:void(0)" aria-expanded="false"><i className="sprite_icon digital" /><span className="hide-menu">Digital Assets</span></a>
                                        <ul aria-expanded="false" className="collapse">
                                            <li><a href="digitalImage.html">Images</a></li>
                                            <li><a href="digitalVideo.html">Videos</a></li>
                                            <li><a href="digitalDocuments.html"> Documents</a></li>
                                        </ul>
                                    </li>
                                    <li> <a className="has-arrow waves-effect waves-dark" href="javscript:void(0)" aria-expanded="false"><i className="sprite_icon more_icon" /><span className="hide-menu">More</span></a>
                                        <ul aria-expanded="false" className="collapse">
                                            <li><a href="channels.html">Channels</a></li>
                                            <li><a href="javascript:void(0)">Catalogs</a></li>
                                            <li><a href="javascript:void(0)">Imports</a></li>
                                            <li><a href="javascript:void(0)">Tasks</a></li>
                                            <li><a href="javascript:void(0)">Workflow</a></li>
                                        </ul>
                                    </li>
                                </ul>
                            </nav>
                            {/* End Sidebar navigation */}
                        </div>
                        {/* End Sidebar scroll*/}
                    </aside>
                    <div className="page-wrapper">
                        <div className="container-fluid r-aside custome_container">
                            <div className="page-header">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="counting-action-section">
                                            <div className="row"> </div>
                                        </div>
                                        <h2 className="page-title">Dashboard</h2>
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
                            {/* card row start ---------------------------------------------------------------------*/}
                            <div className="table-view digitalImage">
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="card dashboard_section">
                                            <div className="piechart_section">
                                                <h5>Product Completion</h5>
                                                <p>As of 03/20/2019</p>
                                            </div>
                                            <div id="container" style={{ minWidth: '240px', height: '400px', maxWidth: '600px', margin: '0 auto' }} />
                                            <div className="leg-div">
                                                <div className="leg-detail-1"><span />Complete: 70%</div>
                                                <div className="leg-detail-2"><span />Incomplete: 30%</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="card dashboard_section">
                                            <div className="piechart_section">
                                                <h5>Product Content Updates</h5>
                                                <p>As of 03/20/2019</p>
                                            </div>
                                            <div id="donutchart" style={{ width: '530px', height: '400px', margin: '0 auto' }} />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="card dashboard_section">
                                            <div className="piechart_section">
                                                <h5>Open Tasks by Assignee</h5>
                                                <p>As of 03/20/2019</p>
                                            </div>
                                            {/* <div id="barchart_values" style={{ width: '550px', height: '400px' }} /> */}
                                            <Chart
                                                width={'500px'}
                                                height={'400px'}
                                                chartType="BarChart"
                                                loader={<div>Loading Chart</div>}
                                                data={[
                                                    [
                                                    'Element',
                                                    'Density',
                                                    { role: 'style' },
                                                    {
                                                        sourceColumn: 0,
                                                        role: 'annotation',
                                                        type: 'string',
                                                        calc: 'stringify',
                                                    },
                                                    ],
                                                    ['Silver', 50, '#f6e490', null],
                                                    ['Gold', 30, '#76bc5e', null],
                                                    ['Platinum', 20, 'color: #70b7ed', null],
                                                ]}
                                                options={{
                                                    // title: 'Density of Precious Metals, in g/cm^3',
                                                   
                                                    width: 500,
                                                    height: 350,
                                                    bar: { groupWidth: '60%' },
                                                    legend: { position: 'none' },
                                                }}
                                                // For tests
                                                rootProps={{ 'data-testid': '6' }}
                                                />

                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="card dashboard_section">
                                            <div className="card-body">
                                                <div className="piechart_section dashboard_table_heading">
                                                    <h5>My Workflow Tasks</h5>
                                                    <p>As of 03/20/2019</p>
                                                </div>
                                                <div className="table-responsive">
                                                    <table className="table dashboard_table">
                                                        <thead>
                                                            <tr>
                                                                <th>Images</th>
                                                                <th>ID</th>
                                                                <th>Name</th>
                                                                <th>Article No</th>
                                                                <th>Task</th>
                                                                <th>Workflow State</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>
                                                                    <ImageContainer src="1.jpg" alt="title" />
                                                                </td>
                                                                <td><a href="#">1095</a></td>
                                                                <td>Palmolove Natural</td>
                                                                <td>189891</td>
                                                                <td>In Review the Product</td>
                                                                <td><span className="label label-comman">In Review</span></td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <ImageContainer src="11.png" alt="title" /></td>
                                                                <td><a href="#">1502</a></td>
                                                                <td>Colgate White</td>
                                                                <td>554235 </td>
                                                                <td>Content is Ready to Publish</td>
                                                                <td><span className="label label-comman comman2">In Publish</span></td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <ImageContainer src="1.jpg" alt="title" /></td>
                                                                <td><a href="#">1095</a></td>
                                                                <td>Palmolove Natural</td>
                                                                <td>189891</td>
                                                                <td>Pictures in Review</td>
                                                                <td><span className="label label-comman">In Review</span></td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <ImageContainer src="11.png" alt="title" />
                                                                </td>
                                                                <td><a href="#">1012</a></td>
                                                                <td>Colgate White</td>
                                                                <td>554235</td>
                                                                <td>Product Published</td>
                                                                <td><span className="label label-comman comman2">Published</span></td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <ImageContainer src="1.jpg" alt="title" />
                                                                </td>
                                                                <td><a href="#">1095</a></td>
                                                                <td>Palmolove Natural</td>
                                                                <td>189891</td>
                                                                <td>Content in Review</td>
                                                                <td><span className="label label-comman">In Review</span></td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <ImageContainer src="11.png" alt="title" />
                                                                </td>
                                                                <td><a href="#">1044</a></td>
                                                                <td>Colgate White</td>
                                                                <td>1834591</td>
                                                                <td>Published the Product</td>
                                                                <td><span className="label label-comman comman2">Published</span></td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="card dashboard_section">
                                            <div className="piechart_section">
                                                <h5>Completeness by Channels</h5>
                                                <p>As of 03/20/2019</p>
                                            </div>
                                            {/* <div id="columnchart_values" style={{ width: '790px', height: '490px' }} /> */}
                                            <Chart
                                                width={'500px'}
                                                height={'300px'}
                                                chartType="Bar"
                                                loader={<div>Loading Chart</div>}
                                                data={[
                                                    ["Element", "Density", { role: "style" }],
                                                    ["Amazon", 60, "#5269ae"],
                                                    ["Walmart", 100, "#f7c381"],
                                                    ["Ebay", 40, "#8addd8"],
                                                    ["Website", 80., "#dd8a8a"],
                                                    ["Wayfair", 60, "color: #639a68"]
                                                    // ['Year', 'Sales', 'Expenses', 'Profit'],
                                                    // ['2014', 1000],
                                                    // ['2015', 1170],
                                                    // ['2016', 660],
                                                    // ['2017', 1030],
                                                ]}
                                                options={{
                                                    // Material design options
                                                    chart: {
                                                    title: 'Company Performance',
                                                    subtitle: 'Sales, Expenses, and Profit: 2014-2017',
                                                    },
                                                }}
                                                // For tests
                                                rootProps={{ 'data-testid': '2' }}
                                                />

                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-4 d-flex">
                                        <div className="card dashboard_section">
                                            <div className="card-body">
                                                <div className="piechart_section dashboard_table_heading">
                                                    <h5>My Notifications</h5>
                                                </div>
                                                <div className="table-responsive">
                                                    <table className="table dashboard_table notification">
                                                        <thead>
                                                            <tr>
                                                                <th>Date</th>
                                                                <th>Subject</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>05-06-2019</td>
                                                                <td><a href="#">Approval Required !</a></td>
                                                            </tr>
                                                            <tr>
                                                                <td>05-06-2019</td>
                                                                <td><a href="#">Latest Project Details</a></td>
                                                            </tr>
                                                            <tr>
                                                                <td>05-06-2019</td>
                                                                <td><a href="#">Regarding New Products</a></td>
                                                            </tr>
                                                            <tr>
                                                                <td>05-06-2019</td>
                                                                <td><a href="#">Product Update Request!</a></td>
                                                            </tr>
                                                            <tr>
                                                                <td>05-06-2019</td>
                                                                <td><a href="#">Notification</a></td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 d-flex">
                                        <div className="card dashboard_section">
                                            <div className="card-body">
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 d-flex">
                                        <div className="card dashboard_section">
                                            <div className="card-body">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
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


export default Dashboard;