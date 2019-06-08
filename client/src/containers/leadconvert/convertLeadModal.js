import React, { Component } from "react"
import axios from "axios"
import {Modal, Header, Button, FormGroup, FieldGroup, Radio, ControlLabel, FormControl} from "react-bootstrap"


export default class ConvertLeadModal extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			AccountName: this.props.AccountName,
			accountNameData: [],
			sortAccountList: [],
			showTable:false
		}
	}

	componentWillMount() {

		if (this.props.modalProps) {
			let accountNameData = []
			this.props.modalProps.map((accounts, index) => {

				accountNameData.push({
					AccountName: accounts.AccountName,
					AccountId: accounts.oo_id
				})

			})
			this.setState({
				accountNameData: accountNameData
			})
		}

	}

	componentDidMount() {
		console.log('this.state.AccountName>>>>>>>>>>>>>>>>>>>>>>>>>>',this.state.AccountName!=''? true: false);
		if(this.state.AccountName!=''){
			console.log('callinf inside oiffffffffffffffffffegetAccountlist');
			this.getAccountList()
		}
	}


	clearField() {

		this.setState({
			AccountName:""
		})

	}

	getAccountName(e) {

		this.setState({
			AccountName: e.target.value
		})
	}

	getAccountList(){
		console.log('method for displaying gg the accountlist detailslsslslslslsssssss',this.state.accountNameData);
		let sortAccountList= []
		this.state.accountNameData.map((account,index)=>{
			if(account.AccountName.toLowerCase().indexOf(this.state.AccountName.toLowerCase())!== -1){
				sortAccountList.push(account)
			}
		})
		this.setState({
			sortAccountList: sortAccountList,
			showTable:true
		})
	}



	handleDoubleClickItem(account) {
		let self = this

		if (account.AccountName) {
			self.props.quickCreateAccountProps(account)
		}
	}
	render(

	) {
		console.log('this.propssssss>>>>>>>>>>>>>>>>>>>>NNNNNNNNNN<<<<<<<<<<<<,',this.props.AccountName);
		const style=this.state.showTable ? {} : {display: "none"}

		return (
			<Modal
				{...this.props}
				bsSize="large"
				aria-labelledby="contained-modal-title-lg"
			>
				<Modal.Header closeButton>
				</Modal.Header>
				<Modal.Body>
					<form className="modal-form">
						<FormGroup
							controlId="formBasicText"
						>
							<ControlLabel>Account Name</ControlLabel>
							<div>
								<input type="text" required type="text" className="form-control" value={this.state.AccountName} name="AccountName"  onChange={e => this.getAccountName(e)}/>
								<div className="form-buttons form-buttons-modal">
									<button type="button"  onClick={this.getAccountList.bind(this)} className="">Go</button>
									<button type="button"  onClick={this.clearField.bind(this)} className="">Clear</button>
								</div>
							</div>

							<table className="table record-table" style={style}>
								<thead>
									<th>Account Name</th>
								</thead>
								<tbody>
									{
										this.state.sortAccountList.length ? this.state.sortAccountList.map((account,index)=>{
											return <tr onClick={()=>this.handleDoubleClickItem(account)} key={index}>
												<td>{account.AccountName}</td>
											</tr>
										}): <tr><td>NO AccountName Record Found</td></tr>
									}
								</tbody>
							</table>
						</FormGroup>
					</form>
				</Modal.Body>

			</Modal>
		)
	}
}
