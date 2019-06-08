import React, { Component } from "react"
import axios from "axios"
import {Modal, Header, Button, FormGroup, FieldGroup, Radio, ControlLabel, FormControl} from "react-bootstrap"
import cookie from "react-cookies"

export default class ChangeLeadStatusModal extends React.Component {

	constructor(props){
		super(props)

		this.state = {
			FirstName: "",
			Company: "",
			State: "",
			email: "",
			LeadStatus: "",
			test: "",
			accountTextbox: false,
			accountDropDown: false,
			accountList: [],
			ContactName: "",
			AccountName: "",
			OpprtunityName: "",
			account_oo_id: "",
			lead_oo_id: "",
			show : false
		}
	}
	componentWillReceiveProps(nextprops)
	{


		this.setState({
			accountTextbox: false,
			accountDropDown: false,
			ContactName: nextprops.checked_data !=null ? nextprops.checked_data.FirstName : "",
			AccountName: "",
			OpprtunityName: "",
			show : false
		})
	}

	createOpportunityContactAccount(checkedData){
		if(!convert.reportValidity())
		{
			return
		}


		let data_create_opportunity = this.state
		let lead_oo_id = {lead_oo_id: checkedData.oo_id}
		let data_create_opportunity_contact = Object.assign(data_create_opportunity,lead_oo_id)
		//    var o3 = { c: 3 };
		//
		// var obj = Object.assign(o1, o2, o3);

		axios.post("api/createOpportunityContactAccount",data_create_opportunity_contact).then(function (response) {
			if(response.data.status= 200){

				window.location.href="/leadlist"
			}
		}).catch(function (error) {

		})
	}

	change(e){

		this.setState({
			[e.target.name]: e.target.value,
		})
	}



	getAccountInfo(e) {

		if(e.target.value == "Existing"){
			this.setState({
				accountDropDown: true,
				accountTextbox: false,
				show : true
			})
		}
		if(e.target.value == "New"){
			this.setState({
				accountTextbox: true,
				accountDropDown: false,
				show : true
			})
		}
	}

	componentDidMount() {
		// if(this.props.checked_data.oo_id){
		//
		// }
		this.getAccountDetails()
		// this.setState({
		//   lead_oo_id: this.props.checked_data == null ? '' : this.props.checked_data.oo_id
		// })
	}

	getAccountDetails() {
		let self = this
		let userData = cookie.load("userData")
		let token = userData?userData.token: null
		axios.get("api/accountlist?token="+token).then(function (response) {
			if(response.status==200&& !response.data.error){
				self.setState({
					accountList: response.data.account
				})
			}else{
				self.props.modalProps.history.push("/")
			}
		}).catch(function (error) {

		})
	}

	getAccountName(e) {

		let account_name = e.target.value.split(",")
		this.setState({
			AccountName: account_name[0],
			account_oo_id: account_name[1]
		})
	}
	checktick()
	{

	}
	render() {
		let account_info
		if(this.state.accountTextbox){
			account_info = <div className="form-group"><ControlLabel>AccountName</ControlLabel>
				<FormControl
					type="text" name="AccountName"
					required="true"
					value={this.state.AccountName}
					placeholder="Account Name"
					onChange={e => this.change(e)}
				/></div>
		}
		if(this.state.accountDropDown){
			account_info = <span><ControlLabel>Account Name</ControlLabel>
				<div className="select2">
					<select className="primary-select form-control" required="true" onChange= {e => this.getAccountName(e)}>
						<option value="">Select</option>
						{
							this.state.accountList.map((result,i)=>{
								return <option value={result.AccountName+","+result.oo_id}>{result.AccountName}</option>
							})
						}
					</select>
				</div></span>
		}
		return (
			<Modal
				{...this.props}
				bsSize="large"
				aria-labelledby="contained-modal-title-lg"
			>
				<Modal.Header closeButton>

				</Modal.Header>
				<Modal.Body>

					<form name="convert" className="modal-form">
						<h3>Account Information</h3>
						<FormGroup
							controlId="formBasicText"
						>

							<ControlLabel>Select</ControlLabel>
							<FormGroup className="form-group-radio">
								<Radio name="radioGroup" required="true" onChange={(e)=>this.getAccountInfo(e)} value="New" inline>
                New
								</Radio>{" "}
								<Radio name="radioGroup" onChange={(e)=>this.getAccountInfo(e)} value="Existing" inline>
                Existing
								</Radio>{" "}
							</FormGroup>
							{account_info}

							{this.state.show ? (<div className="form-group-existing"><h3>Opportunity Information</h3>
								<div className="form-group">
									<ControlLabel>Opportunity Name</ControlLabel>
									<FormControl
										type="text" name="OpprtunityName"
										value={this.state.OpprtunityName}
										placeholder="Opportunity Name"
										required="true"
										onChange={e => this.change(e)}
									/>
								</div>
								<div className="form-group">
									<h3>Contact Information</h3>
									<ControlLabel>Contact Name</ControlLabel>
									<ControlLabel>{this.state.ContactName}</ControlLabel>
								</div></div>) : ""}
						</FormGroup>
					</form>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick= {()=>this.createOpportunityContactAccount(this.props.checked_data)}>Save</Button>
				</Modal.Footer>
			</Modal>
		)
	}
}
