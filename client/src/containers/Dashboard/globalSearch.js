import React from 'react';
import axios from "axios";
import { Link } from "react-router-dom"
import moment from "moment"
import Header from '../Header/index';
import Aside from '../SideBar/index';
import ReactLoading from 'react-loading'


class Search extends React.Component {
    constructor(props) {
        super(props);
        this.filterSearch = this.filterSearch.bind(this);
        this.state = {
            product: [],
            taskList: [],
            searchValue: 'Namak',
            filteredProductList: [],
            filteredTaskList: [],
            Loading: false,
        };
    }

    async componentWillMount() {
        var searchValue = this.props.location.state._data
        this.setState({
            searchValue: searchValue
        })
        let self = this
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
        console.log('inside filter search---')
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
                ((typeof searchResult.link != "undefined" && searchResult.link != null && searchResult.link !== "") && searchResult.link.toLowerCase().includes(val.toLowerCase())) ||
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
                    <Header />
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