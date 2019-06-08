import React, { Component } from "react"
import axios from "axios"
import {Modal, Header, Button, FormGroup, FieldGroup, Radio, ControlLabel, FormControl} from "react-bootstrap"


export default class MyLargeModal extends React.Component {

	constructor(props){
		super(props)

		this.state = {
			FirstName: "",
			Company: "",
			State: "",
			email: "",
			LeadStatus: ""
		}
	}

	componentWillReceiveProps(nextProps){


		this.setState({
			FirstName: nextProps.currentLeadDetail.FirstName,
			Company: nextProps.currentLeadDetail.Company,
			State: nextProps.currentLeadDetail.State,
			email: nextProps.currentLeadDetail.email,
			LeadStatus: nextProps.currentLeadDetail.LeadStatus,
			oo_id: nextProps.currentLeadDetail.oo_id
		})
	}

	change(e){

		this.setState({
			[e.target.name]: e.target.value,
		})
	}

	onSubmit(){
		let self = this

		axios.post("api/editlead",this.state).then(function (response) {
			if(response.data.status= 200){

				// self.props.modalProps.history.push("/leadlist");
				window.location.href="/leadlist"
			}
		}).catch(function (error) {

		})

	}

	getPrimaryData(e) {

		this.setState({
			LeadStatus: e.target.value
		})
	}

	render() {
  	//
  	//


		const {currentLeadDetail } = this.props
		return (
			<Modal
				{...this.props}
				bsSize="large"
				aria-labelledby="contained-modal-title-lg"
			>
				<Modal.Header closeButton>
					<Modal.Title id="contained-modal-title-lg">Edit Lead</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<form>
						<FormGroup
							controlId="formBasicText"
						>
							<ControlLabel>Name</ControlLabel>
							<FormControl
								type="text" name="FirstName"
								value={this.state.FirstName}
								placeholder="Enter text"
								onChange={e => this.change(e)}
							/>
							<ControlLabel>Company</ControlLabel>
							<FormControl
								type="text" name="Company"
								value={this.state.Company}
								placeholder="Enter text"
								onChange={e => this.change(e)}
							/>
							<ControlLabel>State/Providence</ControlLabel>
							<FormControl
								type="text" name="State"
								value={this.state.State}
								placeholder="Enter text"
								onChange={e => this.change(e)}
							/>
							<ControlLabel>Email</ControlLabel>
							<FormControl
								type="text" name="email"
								value={this.state.email}
								placeholder="Enter text"
								onChange={e => this.change(e)}
							/>
							<ControlLabel>Lead Status</ControlLabel>
							<div className="select2">
								<select className="primary-select form-control" onChange= {e => this.getPrimaryData(e)}>
									<option value="Open-Not Contacted">Open-Not Contacted</option>
									<option value="Working-Contacted">Working-Contacted</option>
									<option value="Closed-Converted">Closed-Converted</option>
									<option value="Closed-Not Converted">Closed-Not Converted</option>
								</select>
							</div>
						</FormGroup>
					</form>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick= {this.onSubmit.bind(this)}>Save</Button>
				</Modal.Footer>
			</Modal>
		)
	}
}

// onClick={this.props.onHide}
// <FormControl
//   type="text" name="LeadStatus"
//   value={this.state.LeadStatus}
//   placeholder="Enter text"
//   onChange={e => this.change(e)}
// />
