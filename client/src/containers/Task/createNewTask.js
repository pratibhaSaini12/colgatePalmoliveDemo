import React, { Component } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Header from '../Header/index';
import Aside from '../SideBar/index';
import Footer from '../Footer/index';
import ImageContainer from "../../components/imageContainer"
import DatePicker from "react-datepicker"
import moment from "moment"
import UserModal from "./userModal"
import { Alert } from 'reactstrap';
import axios from "axios";
import ReactLoading from 'react-loading'
import "react-datepicker/dist/react-datepicker.css";
import Loading from "react-loading";
import ProductCompare from "../Product/productCompare";
import { Link } from "react-router-dom"

class NewTask extends Component {

    constructor(props) {
        super(props)
        this.state = {
            DueDate: moment(),
            userModalShow: false,
            UserList: [],
            ProductList: [],
            sortedUserList: [],
            showTable: false,
            UserName: '',
            assignedTo: '',
            subject: '',
            priority: 'Low',
            status: 'Open',
            assignedBy: '',
            related_to: '',
            Loading: false,
            userNameFilter: [],
            message: '',
        }
    }


    componentDidMount() {
    }

    handleChangeDate(date) {
        this.setState({
            DueDate: date
        })
    }
    componentWillReceiveProps(nextProps) {
        console.log("next", nextProps)
    }

    getData(e) {
        console.log('inside et data')
        e.preventDefault()

        this.setState({ userModalShow: true })
    }


    hideUserModal() {
        this.setState({
            userModalShow: false
        })
    }
    getUserName(user) {
        console.log('inside getusername')
    }

    status() {
        this.setState({
            userModalShow: false,

        });
    }

    getList() {

        let sortedList = []
        this.state.UserList.map((user, index) => {
            if (user.Name.toLowerCase().indexOf(this.state.UserName.toLowerCase()) !== -1) {
                sortedList.push(user)
            }
            else if (user.LastName.toLowerCase().indexOf(this.state.UserName.toLowerCase()) !== -1) {
                sortedList.push(user)
            }
            
            else {
                this.setState({
                    sortedUserList: sortedList,
                    showTable: false,
                })
            }
        })
        this.setState({
            sortedUserList: sortedList,
            showTable: true,
        })

    }

        // userFilter(e){
        //     console.log("evenet ",event.target.value)
        //     let UserList  = this.state.UserList
        //     let filterUser = []
        //     console.log("user list",UserList)


        //     filterUser = UserList.filter(user=>{
        //         console.log("user",user,"assignTo",user.assignedTo)
        //        return  user.Name.toLowerCase().includes(e.target.value.toLowerCase())
        //     })
        //     console.log("valuessssss",filterUser)
        //     this.setState({userNameFilter:filterUser})
        // }

    //     clickUser(e,name){
    //         var x = document.getElementsByName("Name")[0].tagName;
    //         document.getElementById("demo").innerHTML = x;
    // //this.state.assignedTo.Name
    //     }

    componentWillMount() {
        let self = this
        self.setState({ Loading: true })
        axios.get("/api/getAllUsers").then(function (response) {
            console.log("response issss ", response.data);
            if (response.data) {
                let userNameData = []
                response.data.users.map((user, index) => {

                    userNameData.push({
                        Name: user.first_name,
                        LastName: user.last_name,
                        id: user.id,
                        email: user.email
                    })
                })
                self.setState({
                    UserList: userNameData,
                    Loading: false,
                })
            }

        }).catch(function (error) {
            console.log("error  login is ", error);
        })

        axios.get("/api/getAllProducts").then(function (response) {
            console.log("response issss ", response.data);
            if (response.data) {
                self.setState({
                    ProductList: response.data.products,
                    Loading: false
                })
            }

        }).catch(function (error) {
            console.log("error  login is ", error);
        })

    }


    handleDoubleClickItem(user) {
        try {
            let self = this

            console.log('userrrrrrrrrrrrrr-------', user)
            this.setState({
                assignedTo: user.Name,
                sortedUserList: [],
                showTable: false,
                UserName: '',
                message:''

            })

        } catch (e) { }

    }

    clearList() {

        let sortedList = []
        this.setState({
            sortedUserList: sortedList,
            showTable: false,
            UserName: '',
        })
        this.handleDoubleClickItem()
    }

    createNewTask(event) {
        console.log("state on save====", this.state);
        let message = this.state.message
        let state = this.state;
        let self = this
        var val = event.target.value
        var relatedTo = {}
        state.ProductList.length ? state.ProductList.map((product) => {
            if (product.product_id == state.related_to) {
                console.log('save data', product)
                relatedTo = product
            }

        }) : {}

        let createTask = {
            due_date: moment(state.DueDate).format('YYYY/MM/DD'),
            assignedTo: state.assignedTo,
            subject: state.subject,
            priority: state.priority,
            status: state.status,
            assignedBy: 'Pratibha',
            related_to: state.related_to,
            task_id: state.task_id,
            images: '',
            // product_id:relatedTo?relatedTo.product_id:'',
            // product_name:relatedTo?relatedTo.product_name:'',
            workflow_state: relatedTo ? relatedTo.workflow_state : ''
        }
        console.log('createTask===', self)
        if (self.state.assignedTo == '' || self.state.related_to == '' ) {           
            
            this.setState({
                message: "Please fill all the required fields"
            })
        }
        else {
            axios.post("api/createNewTask", createTask).then(function (response) {
                console.log('resposne from api==', response)

                if (response.data.task) {
                    window.location.href = "/taskList"
                }


            }).catch(function (error) {

            })
        }
    }

    change(e) {
        console.log("e.target.value", e.target.value)
        console.log("e.target.name", e.target.name)
        this.setState({ errMessage: false })
        this.setState({
            [e.target.name]: e.target.value,
            showTable: false,
            message:''
        })
    }

    selectRelatedTo(e) {
        var product = e.target.value
        console.log('inside select related to---', e.target.value)
        this.setState({
            related_to: e.target.value,
            message:''
        })
    }

    render() {
        let message = '';
        if (this.state.message) {
            message = <Alert className='alertFont' color='danger'>{this.state.message}</Alert>;
        }
        console.log('state on render----', this.state)
        const style = this.state.showTable ? {} : { display: "none" }
        let filterUserList = this.state.userNameFilter
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
                        <ReactLoading type={'spinningBubbles'} color={'green'} className="reactLoader" />
                    </div>
                }
                <div id="main-wrapper">
                    <Header />
                    <Aside active={"Task"} />
                    <div className="page-wrapper channel">
                        <div className="container-fluid r-aside custome_container">
                            <div className="page-header">
                                <div className="row">
                                    <div className="col-md-12">
                                        <h2 className="page-title">New Task</h2>
                                    </div>
                                </div>
                            </div>
                            <div className="card mytask filtercustome">
                                <div className="col-md-5 align-self-center">
                                    <form className="row">
                                        {message}
                                        <div className="form-group col-md-12">
                                            <label>Due Date</label>
                                            <DatePicker className="form-control"
                                                selected={this.state.DueDate}
                                                onChange={this.handleChangeDate.bind(this)}
                                            />
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
                                            <input className="form-control" type="text" name placeholder="Assigned To" value={this.state.assignedTo ? this.state.assignedTo : ''} />
                                        </div>
                                        <div className="search_icon col-md-1" data-toggle="modal" data-target="#search_list"><i className="ti-search" /></div>
                                        <div className="form-group col-md-12">
                                            <label>Subject</label>
                                            <input className="form-control" type="text" name="subject" placeholder="Subject" onChange={e => this.change(e)} />
                                        </div>
                                        <div className="form-group col-md-12">
                                            <label>Priority</label>
                                            <select id="pref-perpage" className="form-control" name="priority" onChange={e => this.change(e)}>
                                                <option value={"Low"}>Low</option>
                                                <option value={"High"}>High</option>
                                                <option value={"Medium"}>Medium</option>
                                            </select>
                                        </div>
                                        <div className="form-group col-md-12">
                                            <label>Status</label>
                                            <select id="pref-perpage" className="form-control" name="status" onChange={e => this.change(e)}>
                                                <option value={"Open"}>Open</option>
                                                <option value={"Closed"}>Closed</option>
                                                <option value={"Pending"}>Pending</option>
                                            </select>
                                        </div>
                                        <div className="form-group col-md-12">
                                            <label>Related To</label>
                                            <select id="pref-perpage" className="form-control" name="related_to" onChange={e => this.selectRelatedTo(e)}>
                                                <option value={"Select"}>Select</option>
                                                {
                                                    this.state.ProductList.length ? this.state.ProductList.map((product, index) => {
                                                        return <option value={product.product_name}>{product.product_name}</option>


                                                    }) : ''
                                                }


                                            </select>
                                        </div>
                                        <div className="allmodalcolgate col-md-12">
                                            <button type="button" className="btn btn-primary" onClick={this.createNewTask.bind(this)}>Save</button>
                                            <button type="button" className="btn btn-outline-primary" ><Link to="/taskList">Cancel</Link></button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* The Modal */}

                    <div className="modal fade allmodalcolgate" id="search_list">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header search_header">
                                    <h4 className="modal-title title_modalheader">Search User</h4>
                                    <button type="button" className="close" data-dismiss="modal" onClick={this.clearList.bind(this)} >×</button>
                                </div>
                                <div className="modal-body filtercustome">
                                    <div className="search_user_section">
                                        <form>
                                            <div className="form-group filtercustome">
                                                <div className="row">
                                                    <label htmlFor="inputPassword" className="col-form-label col-sm-4">User Name</label>
                                                    <div className="col-sm-8">
                                                        <input id="user" className="form-control" type="text" name="search" />
                                                        {/*                                                         
                                                        { console.log("user name ",this.state.userNameFilter)}
                                                        {
                                                           
                                                            filterUserList.length > 0 ? filterUserList.map(list=>(<p onClick={(e)=> this.clickUser(e,list.Name)} >{`${list.Name} ${list.LastName}`}</p>))
                                                            :void 0
                                                       }  */}
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    <center>
                                        <button type="button" className="btn btn-primary" onClick={this.getList.bind(this)}>Go</button>
                                        <button type="button" className="btn btn-outline-primary" data-dismiss="modal" onClick={this.clearList.bind(this)}>Cancel</button>
                                    </center>
                                    <table className="table record-table" style={style}>
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
                    </div>
                </div>

                {/* <UserModal checkModal={this.state.userModalShow} modalClose={this.status} modalProps={this.state.UserList} quickCreateUserProps={this.getUserName.bind(this)}
                /> */}
            </div>

        )
    }
}


export default NewTask;
