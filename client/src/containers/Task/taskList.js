import React, { Component } from "react";
import Header from '../Header/index';
import Aside from '../SideBar/index';
import { Link } from "react-router-dom"
import ImageContainer from "../../components/imageContainer"
import axios from "axios";
import moment from "moment"


class TaskList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            taskList: [],
            filteredList: [],
            listToFilter: [],
           
        }
    }


    componentWillMount() {
        let self = this
        axios.get("/api/getAllTasks").then(function (response) {
            console.log("getAllTasks list ", response.data);
            if (response.data) {
                self.setState({
                    taskList: response.data.tasks,
                    filteredList: response.data.tasks,
                    listToFilter: response.data.tasks,
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

    filterSearch(event) {
        console.log('state on filtersearcch===', this.state)
        var newList = this.state.listToFilter
        var searchString = event.target.value

        console.log('product to be search---', searchString)

        var newFilteredList = newList.filter(function (searchResult) {
            if (
                ((typeof searchResult.assignedBy != "undefined" && searchResult.assignedBy != null && searchResult.assignedBy !== "") && searchResult.assignedBy.toLowerCase().includes(searchString.toLowerCase())) ||
                ((typeof searchResult.priority != "undefined" && searchResult.priority != null && searchResult.priority !== "") && searchResult.priority.toLowerCase().includes(searchString.toLowerCase())) ||
                ((typeof searchResult.subject != "undefined" && searchResult.subject != null && searchResult.subject !== "") && searchResult.subject.toLowerCase().includes(searchString.toLowerCase())) ||
                ((typeof searchResult.task_id != "undefined" && searchResult.task_id != null && searchResult.task_id !== "") && searchResult.task_id.toString().includes(searchString)) ||
                ((typeof searchResult.status != "undefined" && searchResult.status != null && searchResult.status !== "") && searchResult.status.toLowerCase().includes(searchString.toLowerCase())) ||
                ((typeof searchResult.assignedTo != "undefined" && searchResult.assignedTo != null && searchResult.assignedTo !== "") && searchResult.assignedTo.toLowerCase().includes(searchString.toLowerCase())) ||
                ((typeof searchResult.related_to != "undefined" && searchResult.related_to != null && searchResult.related_to !== "") && searchResult.related_to.toLowerCase().includes(searchString.toLowerCase()))
                ) {
                    return searchResult
                }
            })

    
            this.setState({
                filteredList: newFilteredList,
                listToFilter: this.state.listToFilter
            })
            console.log("valueeeee",filteredList)
        }

    render() {
        const { filteredList } = this.state;
        
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
                                        <h2 className="page-title">Task List</h2>
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
                            <div className="row mar_bt_30">
                                    <div className="col-md-6">
                                    <input class="content-search" type="text" name="search" placeholder="Filter Records" onChange={(e)=>this.filterSearch(e)} />
                                    </div>
                                    <div className="col-md-6">
                                    <button className="primary-button float-right">
                                                    <Link to="/newTask"><span className="icon plus" />NEW Task</Link>
                                                </button>
                                    </div>
                            
                            </div>
                            <div className="table-view fullpageview">
                                <div className="row">
                                    <div className="col-md-12">
                                    
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
                            <div className="table-responsive">
                                                    <table className="table dashboard_table data_table_30">
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
                                                                filteredList.length > 0 ? filteredList.map((key, index) => {
                                                                    return <tr>
                                                                        <td><Link to={{ pathname: '/editTask', state: { _data: key } }}>{key.task_id}</Link></td>
                                                                        <td>{key.due_date?moment(key.due_date).format('YYYY/MM/DD'):''}</td>
                                                                        <td>{key.subject}</td>
                                                                        <td>{key.status}</td>
                                                                        <td>{key.priority}</td>
                                                                        <td>{key.assignedBy}</td>
                                                                        <td>{key.assignedTo}</td>
                                                                        <td>{key.related_to}</td>
                                                                    </tr>
                                                                }) : ''}
                                                        </tbody>
                                                    </table>
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


export default TaskList;