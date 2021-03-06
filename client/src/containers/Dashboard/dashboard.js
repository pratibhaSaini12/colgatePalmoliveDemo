import React, { Component } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Header from '../Header/index';
import Aside from '../SideBar/index';
import { Chart } from "react-google-charts";
import ImageContainer from "../../components/imageContainer"
import { Link } from "react-router-dom"
import { PieChart } from 'react-chartkick'
import Highcharts from "highcharts"
import ReactLoading from 'react-loading'
// import Highcharts from "react-highcharts"
// import Highcharts from "react-jsx-highcharts": "^3.0.1"
// import Highcharts from "highcharts"
import 'chart.js'
import axios from "axios";
import moment from "moment"



class Dashboard extends Component {

    constructor(props) {
        super(props)
        this.state = {
            taskList: [],
            openTask: [],
            completeIncomplete: 0,
            updateProduct: [],
            Loading: false,
            workflow_task: [],
            filterdata: '',
            othercompleteIncomplete: 0,
            product: [],
            filteredList: [],
            listToFilter: [],
            stateUpdate: true,

        }
    }


    async componentDidMount() {
        let self = this
        self.setState({ Loading: true })
        let id = "Pratibha"
        await axios.get("/api/getTaskByUserID?id=" + id).then(function (response) {

            console.log('response from getTaskByUserID===', response)
            if (response.data) {
                self.setState({
                    taskList: response.data.tasks
                })
            }
        }).catch(function (error) {

        })

        await axios.get("/api/getAllOpenTask").then(function (response) {

            console.log('response from getAllOpenTask===', response)
            if (response.data) {
                let task = response.data.openTasks
                Highcharts.chart('columnchart_values', {
                    chart: {
                        type: 'column'
                    },
                    // title: {
                    //     text: 'Browser market shares. January, 2018'
                    // },
                    // subtitle: {
                    //     text: 'Click the columns to view versions. Source: <a href="http://statcounter.com" target="_blank">statcounter.com</a>'
                    // },
                    xAxis: {
                        categories: [task[0].assignedTo, task[1].assignedTo, task[2].assignedTo]
                    },
                    yAxis: {
                        title: {
                            text: ''
                        }

                    },
                    legend: {
                        enabled: false
                    },
                    plotOptions: {
                        series: {
                            borderWidth: 0,
                            dataLabels: {
                                enabled: true,
                                /* format: '{point.y:.1f}%' */
                            },
                            cursor: 'pointer',
                            events: {
                                click: function (event) {
                                    self.props.history.push({
                                        pathname: "/taskList",
                                        state: {
                                            _assignedTo : event.point.category
                                        }
                                    })
                                }
                            }
                        }
                    },

                    tooltip: {
                       // headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                        pointFormat: '<span style="color:{point.color}"></span>: <b>{point.y}</b> <br/>'
                    },

                    series: [
                        {
                            colorByPoint: true,
                            data: [
                                {
                                    name:task[0].assignedTo,
                                    y: task[0].count,
                                    drilldown: null
                                },
                                {
                                    name:task[1].assignedTo,
                                    y: task[1].count,
                                    drilldown: null
                                },
                                {
                                    name:task[2].assignedTo,
                                    y: task[2].count,
                                    drilldown: null
                                }
                            ]
                        }
                    ],
                    drilldown: {
                        series: [
                            {
                                name: "Chrome",
                                id: "Chrome",
                                data: [
                                    [
                                        "v65.0",
                                        0.1
                                    ],
                                    [
                                        "v64.0",
                                        1.3
                                    ],
                                    [
                                        "v63.0",
                                        53.02
                                    ],
                                    [
                                        "v62.0",
                                        1.4
                                    ],
                                    [
                                        "v61.0",
                                        0.88
                                    ],
                                    [
                                        "v60.0",
                                        0.56
                                    ],
                                    [
                                        "v59.0",
                                        0.45
                                    ],
                                    [
                                        "v58.0",
                                        0.49
                                    ],
                                    [
                                        "v57.0",
                                        0.32
                                    ],
                                    [
                                        "v56.0",
                                        0.29
                                    ],
                                    [
                                        "v55.0",
                                        0.79
                                    ],
                                    [
                                        "v54.0",
                                        0.18
                                    ],
                                    [
                                        "v51.0",
                                        0.13
                                    ],
                                    [
                                        "v49.0",
                                        2.16
                                    ],
                                    [
                                        "v48.0",
                                        0.13
                                    ],
                                    [
                                        "v47.0",
                                        0.11
                                    ],
                                    [
                                        "v43.0",
                                        0.17
                                    ],
                                    [
                                        "v29.0",
                                        0.26
                                    ]
                                ]
                            },

                        ]
                    }
                });
                self.setState({
                    openTask: response.data.openTasks
                })
            }

            axios.get("/api/getAllProducts").then(function (response) {
                console.log("product list ", response.data);
                if (response.data) {
                    self.setState({
                        product: response.data.products,
                        filteredList: response.data.products,
                        listToFilter: response.data.products,
                        stateUpdate: true,
                        Loading: false
                    })
                }
    
            }).catch(function (error) {
                self.setState({ Loading: false })
                console.log("error  login is ", error);
            })



        }).catch(function (error) {

        })

        await axios.get("/api/getProductCompletion").then(function (response) {

            console.log('response from getProductCompletion===', response)
            if (response.data) {
                let completeIncomplete = response.data.product[0].complete
                let othercompleteIncomplete = 100 - completeIncomplete
                
                Highcharts.chart('container', {
                    chart: {
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false,
                        type: 'pie'
                    },
                    plotOptions: {
                        pie: {
                            allowPointSelect: true,
                            cursor: 'pointer',
                            dataLabels: {
                                enabled: false
                            },
                            tooltip: {
                                pointFormat: '{series.name}: <b>{point.percentage:.2f}%</b>'
                            },
                            events: {
                                click: function (event) {
                                    self.props.history.push({
                                        pathname: "/productlist",
                                        state: {
                                            _complete : event.point.name.toLowerCase()
                                        }
                                    })
                                }
                            }

                        }
                    },
                    series: [{
                        name: 'Product',
                        colorByPoint: true,
                        data: [
                            {
                                name: 'Complete',
                                y: completeIncomplete ? completeIncomplete : 0,
                                selected: true
                            }, {
                                name: 'Incomplete',
                                y: othercompleteIncomplete ? othercompleteIncomplete : 0
                            }
                        ]
                    }]
                });
                self.setState({
                    completeIncomplete: completeIncomplete,
                    Loading: false,
                    othercompleteIncomplete: othercompleteIncomplete
                })
            }
        }).catch(function (error) {

        })

        await axios.get("/api/productContentUpdates").then(function (response) {

            console.log('response from productContentUpdates===', response)
            if (response.data) {
                self.setState({
                    updateProduct: response.data.product[0],
                })
            }
        }).catch(function (error) {

        })

        await axios.get("/api/getAllTasks").then(function (response) {

            console.log('response from workflowtask===', response)
            if (response.data) {
                self.setState({
                    workflow_task: response.data.tasks,
                })
            }
        }).catch(function (error) {

        })
    }
    redirectURL(e) {
        try {
            console.log("e=======", e)
            let self = this
            let page
            if (e == 1) {
                page = "/productlist"
            } else if (e == 3) {
                page = "/taskList"

            }
            // if (totalOrders) {

            // if (page = '/taskList') {
            //     self.props.history.push({
            //         pathname: page,
            //         state: {
            //             _data: 'Anuj'
            //         }
            //     })
            // }
            // else if (page = '/productlis') {
            self.props.history.push({
                pathname: page
            })
            // }
            // }
        } catch (e) { }

    }

    // searchResult(e){
    //     let self = this
    //     var val = e.target.value

    //     this.setState({
    //         filterdata : val,
    //     })

    // }
    latestWorkflowList (list) {
        let tempList = []
        list.sort(function(a, b) {
            a = new Date(a.updated_at);
            b = new Date(b.updated_at);
            return a>b ? -1 : a<b ? 1 : 0;
        });
        console.log("filtred Array######",list)
        if(list.length<10) {
            return list
        } else {
            tempList  = list.slice(0,10)
            return tempList
        }
            }

    render() {
        const { openTask, updateProduct,product } = this.state;
        console.log("states in dashbpard", this.state)
        console.log("props in dashbpard", this.props)
        var current_Date = new Date().toString()
        console.log('current_Date---',current_Date)
        console.log("this.state.workflow_task", this.state.workflow_task);
        let workFlowdata = this.state.workflow_task
        let renderWorkFlowList =  this.latestWorkflowList(product);
        console.log("renderWorkFlowList",renderWorkFlowList)
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
                        <ReactLoading type={'spinningBubbles'} color={'#554b6c'} className="reactLoader" />
                    </div>
                }
                <div id="main-wrapper">


                    <Header />
                    <Aside active={"dashboard"} />
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
                                                                <input className="form-control search_filter" type="text" name="search" value={this.state.filterdata} placeholder="Search for digital assets"  />
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
                                        {/* <div className="card dashboard_section" onClick={(e) => this.redirectURL(1)}> */}
                                            <div className="piechart_section">
                                                <h5>Product Completion</h5>
                                                <p>As of {moment(current_Date).format('MM/DD/YYYY')}</p>
                                            </div>
                                            <div id="container" style={{ minWidth: '240px', height: '400px', maxWidth: '600px', margin: '0 auto' }} />
                                            <div className="leg-div">
                                                <div className="leg-detail-1"><span />
                                                    {/* <Link to={{ pathname: '/productlist', state: { _data: "complete" } }}> */}
                                                        Complete:{this.state.completeIncomplete ? Number(this.state.completeIncomplete).toFixed(2) : 0}%
                                                    {/* </Link> */}
                                                </div>
                                                <div className="leg-detail-2"><span />
                                                    {/* <Link to={{ pathname: '/productlist', state: { _data: "incomplete" } }}> */}
                                                        Incomplete: {this.state.othercompleteIncomplete ? Number(this.state.othercompleteIncomplete).toFixed(2) : 0}%
                                                    {/* </Link> */}
                                                </div>
                                                {/* {this.state.othercompleteIncomplete > 0 ?
                                                    <div className="leg-detail-3"><span />Other: {this.state.othercompleteIncomplete}%</div>
                                                    : ''} */}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="card dashboard_section" onClick={(e) => this.redirectURL(1)}>
                                            <div className="piechart_section">
                                                <h5>Product Content Updates</h5>
                                                <p>As of {moment(current_Date).format('MM/DD/YYYY')}</p>
                                            </div>
                                            <div id="donutchart" style={{ width: '300px', height: '400px', margin: '0 auto' }} >
                                                <PieChart donut={true} data={[["Last 30 Days", updateProduct ? updateProduct.first : 0], ["30 - 90 Days", updateProduct ? updateProduct.second : 0], ["90+ Days", updateProduct ? updateProduct.third : 0]]} colors={["#3366cc", "#dc3912", "#ff9900"]} suffix="%" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="card dashboard_section" onClick={(e) => this.redirectURL(4)}>
                                            <div className="piechart_section">
                                                <h5>Open Tasks by Assignee</h5>
                                                <p>As of {moment(current_Date).format('MM/DD/YYYY')}</p>
                                            </div>

                                            {/* <div id="barchart_values" style={{ width: '550px', height: '400px' }} /> */}
                                            <div id="columnchart_values" style={{ width: "300px", height: "400px", margin: "auto" }}></div>

                                            {/* {openTask.length >= 2 ?
                                                <Chart
                                                    width={'350px'}
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


                                                        // ['Pratibha', 2, '#f6e490', null],
                                                        // ['Uday', 2, '#76bc5e', null],
                                                        // ['Anuj', 2, 'color: #70b7ed', null],

                                                        [openTask.length > 0 ? openTask[0].assignedTo : '', openTask.length > 0 ? openTask[0].count : 0, '#f6e490', null],
                                                        [openTask.length >= 1 ? openTask[1].assignedTo : '', openTask.length >= 1 ? openTask[1].count : 0, '#76bc5e', null],
                                                        [openTask.length >= 2 ? openTask[2].assignedTo : '', openTask.length >= 2 ? openTask[2].count : 0, 'color: #70b7ed', null]
                                                    ]}
                                                    options={{
                                                        // title: 'Density of Precious Metals, in g/cm^3',

                                                        width: 350,
                                                        height: 350,
                                                    
                                                        bar: { groupWidth: '60%' },
                                                        legend: { position: 'none' },
                                                    }}
                                                    // For tests
                                                    rootProps={{ 'data-testid': '6' }}
                                                />

                                                : ''} */}

                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-6 d-flex">
                                        <div className="card dashboard_section">
                                            <div className="card-body">
                                                <div className="piechart_section dashboard_table_heading">
                                                    <h5>Recently Added Product</h5>
                                                    <p>As of {moment(current_Date).format('MM/DD/YYYY')}</p>
                                                </div>
                                                <div className="table-responsive">
                                                    <table className="table dashboard_table">
                                                        <thead>
                                                            <tr>
                                                                <th>Sku</th>
                                                                <th>Product Name</th>
                                                                <th>Brand</th>
                                                                <th>Category</th>
                                                                <th>Completeness</th>
                                                                <th>Workflow Stage</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>

                                                            {
                                                               renderWorkFlowList.length > 0 ? renderWorkFlowList.map((key, index) => {
                                                                    return <tr>
                                                                        {/* <td>
                                                                            <ImageContainer src="11.png" alt="title" />
                                                                        </td> */}
                                                                        {/* <td><Link to={{ pathname: '/productDetailPage', state: { _data: key } }}>{key.product_id}</Link></td> */}
                                                                      
                                                                        <td><Link to={{ pathname: '/productDetailPage', state: { _data: key } }}>{key.upc !== undefined ? key.upc :''}</Link></td>
                                                                        
                                                                       
                                                                        <td>{key.product_name !==undefined ? key.product_name :'' }</td>
                                                                        <td>{key.brand !== undefined ? key.brand: '' }</td>
                                                                        <td>{key.category!==undefined?key.category:''}</td>
                                                                        <td>{key.product_completion !== undefined ? key.product_completion:''}</td>
                                                                        <td>{key.workflow_state !== undefined ? key.workflow_state:''}</td>


                                                                        {/* <td><span className="label label-comman">{key.workflow_state}</span></td> */}
                                                                    </tr>
                                                                }) : ''}

                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    

         <div className="col-lg-6 d-flex">
                                        <div className="card dashboard_section">
                                            <div className="card-body">
                                                <div className="piechart_section dashboard_table_heading">
                                                    <h5>My Notifications</h5>
                                                    <p>&nbsp;</p>
                                                </div>
                                                <div className="table-responsive">
                                                    <table className="table dashboard_table notification">
                                                        <thead>
                                                            <tr>
                                                                <th>Date</th>
                                                                <th>From</th>
                                                                <th>Subject</th>
                                                                <th>Description</th>
                                                                
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                          <tr>
                                                            <td>19/06/11</td>
                                                            <td>Richard</td>
                                                            <td>Price Mismatch</td>
                                                            <td>Please see pricing for sku # 245TUY</td>
                                                            </tr>
                                                            <tr>
                                                            <td>19/06/12</td>
                                                            <td>Grace</td>
                                                            <td>Image update</td>
                                                            <td>Please change the picture of sku #767TB</td>
                                                            </tr>
                                                            <tr>
                                                            <td>19/06/13</td>
                                                            <td>David</td>
                                                            <td>Recently added products</td>
                                                            <td>Please provide the list of all products added last month</td>
                                                            </tr>
                                                            <tr>
                                                            <td>19/06/13</td>
                                                            <td>Steve</td>
                                                            <td>Inactive Products</td>
                                                            <td>Please send me a list of all the inactive products</td>
                                                            </tr>
                                                                
                                                        </tbody>
                                                        {/* <tbody>
                                                            {
                                                                this.state.taskList.length > 0 ? this.state.taskList.map((key, index) => {
                                                                    return <tr>
                                                                        <td>{key.due_date ? moment(key.due_date).format('MM/DD/YYYYY') : ''}</td>
                                                                        <td>{key.subject}</td>
                                                                        <td>{key.status}</td>
                                                                        <td>{key.priority}</td>
                                                                        <td>{key.assignedBy}</td>
                                                                    </tr>
                                                                }) : ''}
                                                        </tbody> */}
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    {/* <div className="col-md-6">
                                        <div className="card dashboard_section">
                                            <div className="piechart_section">
                                                <h5>Completeness by Channels</h5>
                                                <p>As of 03/20/2019</p>
                                            </div>
                                            {<div id="columnchart_values" style={{ width: '790px', height: '490px' }} />}
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
                                                    ['Year', 'Sales', 'Expenses', 'Profit'],
                                                    ['2014', 1000],
                                                    ['2015', 1170],
                                                    ['2016', 660],
                                                    ['2017', 1030],
                                                ]}
                                                options={{
                                                  
                                                    chart: {
                                                    title: 'Company Performance',
                                                    subtitle: 'Sales, Expenses, and Profit: 2014-2017',
                                                    },
                                                }}
                                            
                                                rootProps={{ 'data-testid': '2' }}
                                                />

                                        </div>
                                    </div> */}
                                </div>
                                {/* <div className="row">
                               
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
                                </div> */}
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