import React, { Component } from "react"
import axios from "axios"
import Modal from 'react-responsive-modal';

export default class UserModal extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            UserName: '',
            UserList: [],
            sortedUserList: [],
            showTable: false
        }
    }



    componentWillMount() {
        console.log('this.props.modalProps', this.props.modalProps)

        if (this.props.modalProps) {
            let userNameData = []
            this.props.modalProps.map((user, index) => {

                userNameData.push({
                    Name: user.first_name,
                    LastName: user.last_name,
                    id: user.id,
                    email: user.email
                })

            })
            this.setState({
                UserList: userNameData
            })
        }

    }

    // componentDidMount() {
    //     if (this.state.UserName != '') {
    //         this.getList()
    //     }
    // }


    getUserName(e) {

        this.setState({
            UserName: e.target.value
        })
    }

    handleKeyPress(target) {
        if (target.charCode == 13) {
            alert('Enter clicked!!!');
        }

    }

    clearField() {

        this.setState({
            UserName: "",
            sortedUserList: []
        })
        //this.props.hideModal('hide')
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

        })

        console.log('sortedList----', sortedList)
        this.setState({
            sortedUserList: sortedList,
            showTable: true
        })
    }

    handleDoubleClickItem(user) {
        let self = this

        if (user.Name) {
            self.props.quickCreateUserProps(user)
        }
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

        })
        this.setState({
            sortedUserList: sortedList,

        })
    }

    showTable() {
        this.setState({
            showTable: true
        })
    }

    render() {
        const style = this.state.showTable ? {} : { display: "none" }
        console.log('inside render of usermodal', this.props)
        return (
            <Modal open={this.props.checkModal} onClose={this.onCloseModal} center>

                {/* <div className="modal fade allmodalcolgate" id="search_list"> */}
                <div className="modal-dialog">
                    <div className="modal-content">
                        {/* Modal Header */}
                        <div className="modal-header search_header">
                            <h4 className="modal-title title_modalheader">Search User</h4>
                            <button type="button" className="close" data-dismiss="modal">×</button>
                        </div>
                        {/* Modal body */}
                        <div className="modal-body filtercustome">
                            <div className="search_user_section">
                                <form>
                                    <div className="form-group filtercustome">
                                        <div className="row">
                                            <label htmlFor="inputPassword" className="col-form-label col-sm-4" name="UserName" value={this.state.UserName} onChange={e => this.getUserName(e)}>User Name</label>
                                            <div className="col-sm-8">
                                                <input className="form-control" type="text" name="search" placeholder="Colget" />
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <center>
                                <button type="button" className="btn btn-primary" onClick={this.showTable.bind(this)}>Go</button>
                                <button type="button" className="btn btn-outline-primary">Cancel</button>
                            </center>
                            <table className="table record-table" style={style}>
                                <thead>
                                    <th>User Name</th>
                                </thead>
                                <tbody>
                                    {
                                        this.state.sortedUserList.length ? this.state.sortedUserList.map((user, index) => {
                                            return <tr onClick={() => this.handleDoubleClickItem(user)} key={index}>
                                                <td>{user.Name + " " + user.LastName}</td>
                                            </tr>
                                        }) : <tr><td>No User Record Found</td></tr>
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                {/* </div> */}
            </Modal>
        )
    }
}
