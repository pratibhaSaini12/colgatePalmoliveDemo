import React, { Component } from "react"
import axios from "axios"
import {Modal, Header, Button, FormGroup, FieldGroup, Radio, ControlLabel, FormControl} from "react-bootstrap"


export default class EmailModal extends React.Component {

	constructor(props){
		super(props)
		this.state = {
			email: "",
			linkSent: false,
			ifUser: false
		}
	}

	getEmail(e){

		this.setState({
			email: e.target.value
		})
	}

	sendForgotPassMail() {
		let check = emailform.reportValidity()
		if(!check)
		{
			return
		}

		axios.get("api/sendForgotPassLink?email="+this.state.email).then((res)=>{

			let _this = this
			if(res.status==200){

				let forgotlink = window.location.origin+"/forgotPassword/"+res.data.user.oo_id
				// let link = <a href={forgotlink}>click link for reset your password</a>;
				axios.get("api/sendFogotPassEmail?link="+forgotlink+"&email="+res.data.user.email).then((res)=>{

					if(res.status==200 && res.data.msg == "email send"){

						_this.setState({
							linkSent: true
						})
					}else{
					}
				})
			}else if(res.status==201){
				_this.setState({
					ifUser: true
				})
			}
		})
	}

	closeEmailModal(e) {

		// e.preventDefault()
		window.location.href="/"
	}


	render() {
		let styleConst = [{display : this.state.linkSent?"block":"none",color:"#007500"}]
		let styleUserConst = [{display : this.state.ifUser?"block":"none",color:"#007500"}]
		let styleforgot = styleConst[0]
		return (
			<Modal
				{...this.props}
				bsSize="large"
				aria-labelledby="contained-modal-title-lg"
			>
				<Modal.Header closeButton onClick={(e)=>this.closeEmailModal(e)}>
				</Modal.Header>
				<Modal.Body>
					<form  className="modal-form" name="emailform">
						<FormGroup
							controlId="formBasicText"
						>
							<span style={styleforgot}>A Link has been sent to your email Id</span>
							<span style={styleUserConst[0]}>User Does Not Exist</span>
							<ControlLabel>Enter Your Email</ControlLabel>

							<input type="email" required  className="form-control" name="email" value={this.state.email} onChange={(e) => this.getEmail(e)}/>
								
						</FormGroup>
						<div className="form-buttons form-buttons-modal">
							<button type="button" onClick={this.sendForgotPassMail.bind(this)} className="btn">Submit</button>
						</div>
					</form>
				</Modal.Body>
			</Modal>
		)
	}
}
