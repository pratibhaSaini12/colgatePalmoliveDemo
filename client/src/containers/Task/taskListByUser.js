import React, { Component } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Header from '../Header/index';
import Aside from '../SideBar/index';
import Footer from '../Footer/index';
import ImageContainer from "../../components/imageContainer"
import DatePicker from "react-datepicker"
import moment from "moment"
import UserModal from "./userModal"
import ReactLoading from 'react-loading'
import axios from "axios";

import "react-datepicker/dist/react-datepicker.css";
import { TaskPage } from "twilio/lib/rest/autopilot/v1/assistant/task";

class TaskPageByUserID extends Component {

    constructor(props) {
        super(props)
        this.state = {
            DueDate: moment(),
            userModalShow: false,
            UserList: [],
            ProductList: [],
            UserList: [],
            Loading : false,
            sortedUserList: [],
            showTable: false,
            UserName: '',
            assignedTo: {},
            subject: '',
            priority: 'Low',
            status: 'Open',
            assignedBy: '',
            related_to: '',
            task_id: ''
        }
    }

    componentWillMount() {
        let self = this
        self.setState({Loading : true})
        if( self.props.location.state !== undefined && this.props.location.state._data !== undefined) {
            let product = self.props.location.state._data
            self.setState({
                DueDate: product.due_date!==null ? moment(product.due_date):'',
                assignedTo: product.assignedTo,
                subject: product.subject,
                priority: product.priority,
                status: product.status,
                assignedBy: product.assignedBy,
                related_to: product.related_to,
                task_id: product.task_id,
                Loading : false
            })

        }
    }

    handleChangeDate(date) {
        this.setState({
            DueDate: date
        })
    }

    render() {
        console.log('state on render----', this.state)
        const style = this.state.showTable ? {} : { display: "none" }
        let { DueDate, assignedTo,subject,priority,status,assignedBy,related_to,task_id} = this.state
        let product = this.props.location.state._data
        console.log("due date",DueDate)
    //    let DueDate = moment(product.due_date)
    //    let assignedTo= product.assignedTo
    //    let subject= product.subject
    //    let priority= product.priority
    //    let status= product.status
    //    let assignedBy= product.assignedBy
    //    let related_to= product.related_to
    //    let task_id= product.task_id
            

        return (
            <div>
                {/* <div className="preloader">
                    <div className="loader">
                        <div className="loader__figure"></div>
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
                    <Aside active={"Task"}/>
                    <div className="page-wrapper">
                        <div className="container-fluid r-aside custome_container">
                            <div className="page-header">
                                <div className="row">
                                    <div className="col-md-12">
                                        <h2 className="page-title">Task Information</h2>
                                    </div>
                                </div>
                            </div>
                            <div className="card mytask filtercustome">
                                <div className="col-md-5 align-self-center">
                                    <form className="row">
                                        <div className="form-group col-md-12">
                                            <label>Due Date</label>
                                            <input value={DueDate === '' ? "Invalid Date" : DueDate} readOnly />
                                            {/* <DatePicker className="form-control"
                                                // selected={DueDate}
                                                onChange={(e)=>this.handleChangeDate(this)}
                                            /> */}
                                        </div>
                                        {/* <div className="form-group col-md-12">
                                            <label>Assign To<span className="aestrick">*</span></label>
                                            <div className="buttonInside">
                                                <input required type="text" id="assignedTo" name="assignedTo" onChange={(e) => this.getUser(e)} value={this.state.User} />
                                                <button type="button" onClick={this.getData.bind(this)}></button>
                                            </div>
                                        </div> */}
                                        <div className="form-group col-md-11">
                                            <label>Assigned To</label>
                                            <input className="form-control" type="text" name placeholder="Assigned To" value={assignedTo} />
                                        </div>
                                        <div className="search_icon col-md-1" data-toggle="modal" data-target="#search_list"><i className="ti-search" /></div>
                                        <div className="form-group col-md-12">
                                            <label>Subject</label>
                                            <input className="form-control" type="text" name="subject" placeholder="Subject" value={subject} />
                                        </div>
                                        <div className="form-group col-md-12">
                                            <label>Priority</label>
                                            <select id="pref-perpage" className="form-control" name="priority" value={priority} >
                                                <option value={"Low"}>Low</option>
                                                <option value={"High"}>High</option>
                                                <option value={"Medium"}>Medium</option>
                                            </select>
                                        </div>
                                        <div className="form-group col-md-12">
                                            <label>Status</label>
                                            <select id="pref-perpage" className="form-control" name="status" value={status} >
                                                <option value={"Open"}>Open</option>
                                                <option value={"Closed"}>Closed</option>
                                                <option value={"Pending"}>Pending</option>
                                            </select>
                                        </div>
                                        <div className="form-group col-md-12">
                                            <label>Related To</label>
                                            <select id="pref-perpage" className="form-control" name="related_to" value={related_to} >
                                                {
                                                    this.state.ProductList.length ? this.state.ProductList.map((product, index) => {
                                                        return <option value={product.product_name}>{product.product_name}</option>


                                                    }) : ''
                                                }


                                            </select>
                                        </div>
                                        {/* <div className="allmodalcolgate col-md-12">
                                            <button type="button" className="btn btn-primary" onClick={this.createNewTask.bind(this)}>Save</button>
                                            <button type="button" className="btn btn-outline-primary">Cancel</button>
                                        </div> */}
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* The Modal */}

                    {/* <div className="modal fade allmodalcolgate" id="search_list">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header search_header">
                                    <h4 className="modal-title title_modalheader">Search User</h4>
                                    <button type="button" className="close" data-dismiss="modal">×</button>
                                </div>
                                <div className="modal-body filtercustome">
                                    <div className="search_user_section">
                                        <form>
                                            <div className="form-group filtercustome">
                                                <div className="row">
                                                    <label htmlFor="inputPassword" className="col-form-label col-sm-4">User Name</label>
                                                    <div className="col-sm-8">
                                                        <input className="form-control" type="text" name="search" placeholder="Colget" />
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    <center>
                                        <button type="button" className="btn btn-primary" >Go</button>
                                        <button type="button" className="btn btn-outline-primary">Cancel</button>
                                    </center>
                                    <table className="table record-table" style={style}>
                                        <thead>
                                            <th>User Name</th>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.sortedUserList.length ? this.state.sortedUserList.map((user, index) => {
                                                    return <tr onClick={() => this.handleDoubleClickItem(user)} key={index} data-dismiss="modal">
                                                        <td>{user.Name + " " + user.LastName}</td>
                                                    </tr>
                                                }) : <tr><td>No User Record Found</td></tr>
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div> */}
                </div>

                {/* <UserModal checkModal={this.state.userModalShow} modalClose={this.status} modalProps={this.state.UserList} quickCreateUserProps={this.getUserName.bind(this)}
                /> */}
            </div>

        )
    }
}


export default TaskPageByUserID;