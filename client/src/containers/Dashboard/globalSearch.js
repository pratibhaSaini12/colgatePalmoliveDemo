import React from 'react';
import axios from "axios";
import { Link } from "react-router-dom"
import moment from "moment"
import Header from '../Header/index';
import Aside from '../SideBar/index';
import ReactLoading from 'react-loading'
import ImageContainer from "../../components/imageContainer"


class Search extends React.Component {
    constructor(props) {
        super(props);
        this.filterSearch = this.filterSearch.bind(this);
        this.filterSearch1 = this.filterSearch1.bind(this);

        this.state = {
            product: [],
            taskList: [],
            searchValue: '',
            filteredProductList: [],
            filteredTaskList: [],
            Loading: false,
            userData: ''
        };
    }

    async componentWillMount() {
        var searchValue = this.props.location.state ? this.props.location.state._data : ''
        this.setState({
            searchValue: searchValue
        })
        let self = this
        if (sessionStorage.getItem('userData') !== null) {

            let tempData = JSON.parse(sessionStorage.getItem('userData'))
            //  let tempObj =  Object.assign(this.state.userData,tempData.userData)
            self.setState({ userData: tempData.userData })
        }
        await axios.get("/api/getAllProducts").then(function (response) {
            console.log("product list ", response.data);
            if (response.data) {
                self.setState({
                    product: response.data.products,
                })
            }

        }).catch(function (error) {
            console.log("error  login is ", error);
        })

        await axios.get("/api/getAllTasks").then(function (response) {
            console.log("getAllTasks list ", response.data);
            if (response.data) {
                self.setState({
                    taskList: response.data.tasks
                })

                self.filterSearch();
            }

        }).catch(function (error) {
            console.log("error  login is ", error);
        })



    }


    filterSearch() {
        console.log('inside filter search---', this.state)
        var newProductList = this.state.product
        var newTaskList = this.state.taskList
        var val = this.state.searchValue
        var newArr //for product
        var newArrPro //for task
        // if (val == "") {
        // 	this.setState({
        // 		opportunityList: this.state.totalOppList,
        // 		sheetData: this.state.totalOppList,
        // 		projectList: this.state.totalProList,
        // 		projectSheetData: this.state.totalProList,
        // 		sortCheck: false
        // 	})
        // }
        // else {
        newArr = newProductList.filter(function (searchResult) {
            if (
                ((typeof searchResult.category != "undefined" && searchResult.category != null && searchResult.category !== "") && searchResult.category.toLowerCase().includes(val.toLowerCase())) ||
                ((typeof searchResult.product_name != "undefined" && searchResult.product_name != null && searchResult.product_name !== "") && searchResult.product_name.toLowerCase().includes(val.toLowerCase())) ||
                ((typeof searchResult.product_status != "undefined" && searchResult.product_status != null && searchResult.product_status !== "") && searchResult.product_status.toLowerCase().includes(val.toLowerCase())) ||
                ((typeof searchResult.product_id != "undefined" && searchResult.product_id != null && searchResult.product_id !== "") && searchResult.product_id.toString().includes(val))
            ) {
                return searchResult
            }
        })

        newArrPro = newTaskList.filter(function (searchResult1) {
            if (
                ((typeof searchResult1.assignedBy != "undefined" && searchResult1.assignedBy != null && searchResult1.assignedBy !== "") && searchResult1.assignedBy.toLowerCase().includes(val.toLowerCase())) ||
                ((typeof searchResult1.priority != "undefined" && searchResult1.priority != null && searchResult1.priority !== "") && searchResult1.priority.toLowerCase().includes(val.toLowerCase())) ||
                ((typeof searchResult1.subject != "undefined" && searchResult1.subject != null && searchResult1.subject !== "") && searchResult1.subject.toLowerCase().includes(val.toLowerCase())) ||
                ((typeof searchResult1.task_id != "undefined" && searchResult1.task_id != null && searchResult1.task_id !== "") && searchResult1.task_id.toString().includes(val)) ||
                ((typeof searchResult1.status != "undefined" && searchResult1.status != null && searchResult1.status !== "") && searchResult1.status.toLowerCase().includes(val.toLowerCase())) ||
                ((typeof searchResult1.assignedTo != "undefined" && searchResult1.assignedTo != null && searchResult1.assignedTo !== "") && searchResult1.assignedTo.toLowerCase().includes(val.toLowerCase())) ||
                ((typeof searchResult1.related_to != "undefined" && searchResult1.related_to != null && searchResult1.related_to !== "") && searchResult1.related_to.toLowerCase().includes(val.toLowerCase()))
            ) {
                return searchResult1
            }
        })

        this.setState({
            filteredProductList: newArr,
            filteredTaskList: newArrPro
        })

    }


    filterSearch1(event) {
        console.log('inside filter search1---', this.state)
        var newProductList = this.state.product
        var newTaskList = this.state.taskList
        var val = event.target.value
        var newArr //for product
        var newArrPro //for task
        // if (val == "") {
        // 	this.setState({
        // 		opportunityList: this.state.totalOppList,
        // 		sheetData: this.state.totalOppList,
        // 		projectList: this.state.totalProList,
        // 		projectSheetData: this.state.totalProList,
        // 		sortCheck: false
        // 	})
        // }
        // else {
        newArr = newProductList.filter(function (searchResult) {
            if (
                ((typeof searchResult.category != "undefined" && searchResult.category != null && searchResult.category !== "") && searchResult.category.toLowerCase().includes(val.toLowerCase())) ||
                ((typeof searchResult.product_name != "undefined" && searchResult.product_name != null && searchResult.product_name !== "") && searchResult.product_name.toLowerCase().includes(val.toLowerCase())) ||
                ((typeof searchResult.product_status != "undefined" && searchResult.product_status != null && searchResult.product_status !== "") && searchResult.product_status.toLowerCase().includes(val.toLowerCase())) ||
                ((typeof searchResult.product_id != "undefined" && searchResult.product_id != null && searchResult.product_id !== "") && searchResult.product_id.toString().includes(val))
            ) {
                return searchResult
            }
        })

        newArrPro = newTaskList.filter(function (searchResult1) {
            if (
                ((typeof searchResult1.assignedBy != "undefined" && searchResult1.assignedBy != null && searchResult1.assignedBy !== "") && searchResult1.assignedBy.toLowerCase().includes(val.toLowerCase())) ||
                ((typeof searchResult1.priority != "undefined" && searchResult1.priority != null && searchResult1.priority !== "") && searchResult1.priority.toLowerCase().includes(val.toLowerCase())) ||
                ((typeof searchResult1.subject != "undefined" && searchResult1.subject != null && searchResult1.subject !== "") && searchResult1.subject.toLowerCase().includes(val.toLowerCase())) ||
                ((typeof searchResult1.task_id != "undefined" && searchResult1.task_id != null && searchResult1.task_id !== "") && searchResult1.task_id.toString().includes(val)) ||
                ((typeof searchResult1.status != "undefined" && searchResult1.status != null && searchResult1.status !== "") && searchResult1.status.toLowerCase().includes(val.toLowerCase())) ||
                ((typeof searchResult1.assignedTo != "undefined" && searchResult1.assignedTo != null && searchResult1.assignedTo !== "") && searchResult1.assignedTo.toLowerCase().includes(val.toLowerCase())) ||
                ((typeof searchResult1.related_to != "undefined" && searchResult1.related_to != null && searchResult1.related_to !== "") && searchResult1.related_to.toLowerCase().includes(val.toLowerCase()))
            ) {
                return searchResult1
            }
        })

        this.setState({
            filteredProductList: newArr,
            filteredTaskList: newArrPro
        })

    }

    componentDidMount() {
        console.log('inside filtersearch')
        if (this.state.taskList.length && this.state.product.length) {
            this.filterSearch();
        }
        else {
            return;
        }
    }

    change(e) {
        try {
            this.setState({
                [e.target.name]: e.target.value,
            })
        }
        catch (e) { }
    }

    logOutuser(event) {
        sessionStorage.clear();
        console.log("user list")
        window.location.href = '/'

    }


    submitOnEnter(event) {
        console.log('inside submit')
        if (event.which == 13 || event.keyCode == 13) {
            // this.setState({
            //     se: true
            // })

            this.filterSearch();

        }
    }

    render() {
        console.log('state on render====', this.state)
        const { filteredTaskList, filteredProductList } = this.state

        return (
            <div>

                {
                    this.state.Loading === true && <div className="loader-react">
                        <ReactLoading type={'spinningBubbles'} color={'#554b6c'} className="reactLoader" />
                    </div>
                }
                <div id="main-wrapper">
                    {/* <Header /> */}
                    <header className="topbar">
                        <nav className="navbar top-navbar navbar-expand-md navbar-light">
                            <div className="navbar-collapse container-fluid">
                                <ul class="navbar-nav col-md-9">
                                    {/* This is  */}
                                    <li className="nav-item"> <a className="nav-link nav-toggler hidden-md-up waves-effect waves-dark" href="javascript:void(0)"><i className="ti-menu" /></a> </li>
                                    <li className="nav-item"> <a className="nav-link sidebartoggler hidden-sm-down waves-effect waves-dark" href="javascript:void(0)"><i className="ti-menu" /></a> </li>
                                    <li className="nav-item hidden-sm-down">
                                        <span>  <Link to="/dashboard">
                                            <ImageContainer src="logo.png" alt="PIMCORE" />
                                        </Link> </span>
                                    </li>
                                    <li className="nav-item -xs-down search-box">
                                        <form className="app-search" style={{ display: 'block !important' }} >
                                            <input type="text" className="form-control" placeholder="Search Product, Task" name="searchValue" onChange={this.filterSearch1} />
                                            <i className="ti-search" />
                                        </form>
                                    </li>
                                </ul>

                                <ul className="navbar-nav">
                                    <li className="nav-item dropdown"> <a className="nav-link dropdown-toggle waves-effect waves-dark curser_auto" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i className="ti-bell all_iconsize" />
                                        <div className="notify" />
                                    </a> </li>
                                    <li className="nav-item dropdown">
                                        <Link className="nav-link dropdown-toggle waves-effect waves-dark" to="/comingSoon" onClick={this.logOutuser} aria-haspopup="true" aria-expanded="false"><span className="adminsection">
                                            {`${this.state.userData !== '' ? this.state.userData.first_name : ''} ${this.state.userData !== '' ? this.state.userData.last_name : ''}`}<br />
                                        </span>
                                            <ImageContainer src="profile.png" alt="user" className="profile-pic" />
                                            <i className="fas fa-caret-down all_iconsize caretdrop" /></Link>
                                    </li>

                                    <li className="nav-item dropdown"> <Link className="nav-link dropdown-toggle waves-effect waves-dark" onClick={this.logOutuser} to="#"><i class="fa fa-sign-out-alt"></i> </Link> </li>
                                </ul>
                            </div>
                        </nav>
                    </header>
                    <Aside />
                    <div className="page-wrapper">
                        <div className="container-fluid r-aside custome_container">
                            <div className="table-responsive martop_25">
                                <h2 className="page-title">
                                    <b>Search Page</b>
                                    <hr />
                                </h2>
                            </div>
                            <div className="table-responsive martop_25">

                                <h2 className="page-title">Product Search</h2>

                                <table className="table dashboard_table data_table_30 martop_25">
                                    <thead>
                                        <tr>
                                            <th>Product ID</th>
                                            <th>Product Name</th>
                                            <th>Sku</th>
                                            <th>Category</th>
                                            <th>Product Status</th>
                                            <th>Price ($)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            filteredProductList.length > 0 ? filteredProductList.map((key, index) => {
                                                return <tr>
                                                    <td><Link to={{ pathname: '/productDetailPage', state: { _data: key } }}>{key.product_id}</Link></td>
                                                    <td>{key.product_name}</td>
                                                    <td>{key.upc}</td>
                                                    <td>{key.category}</td>
                                                    <td>{key.product_status}</td>
                                                    <td>{key.cost}</td>
                                                </tr>
                                            }) : 'No record found'}
                                    </tbody>
                                </table>
                            </div>
                            <div className="table-responsive martop_25">


                                <h2 className="page-title">Task Search</h2>


                                <table className="table dashboard_table data_table_30 martop_25">
                                    <thead>
                                        <tr>
                                            <th>Task ID</th>
                                            <th>Due Date</th>
                                            <th>Subject</th>
                                            <th>Status</th>
                                            <th>Priority</th>
                                            <th>Assigned By</th>
                                            <th>Assigned To</th>
                                            <th>Related To</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            filteredTaskList.length > 0 ? filteredTaskList.map((key, index) => {
                                                return <tr>
                                                    <td><Link to={{ pathname: '/editTask', state: { _data: key } }}>{key.task_id}</Link></td>
                                                    <td>{key.due_date ? moment(key.due_date).format('YYYY/MM/DD') : ''}</td>
                                                    <td>{key.subject}</td>
                                                    <td>{key.status}</td>
                                                    <td>{key.priority}</td>
                                                    <td>{key.assignedBy}</td>
                                                    <td>{key.assignedTo}</td>
                                                    <td>{key.related_to}</td>
                                                </tr>
                                            }) : 'No record found'}
                                    </tbody>
                                </table>
                            </div>




                        </div>
                    </div>
                </div>
            </div>
        )
    }
}



export default Search;