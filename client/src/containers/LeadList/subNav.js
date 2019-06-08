import React, { Component } from "react"
import { Link } from "react-router-dom"
import axios from "axios"

import ChangeLeadStatusModal from "./changeLeadStatusModal"
import MyLargeModal from "./editLead"

const LeadStatus = ['New','In Progress','On Hold','Inactive']

class SubNav extends Component {

	constructor(props){
		super(props)

		this.state = {
			ischecked : this.props.ischecked,
			ldstatusModalShow: false,
			checkedData : null,
			checked_data : null,
			leadList:[],
			leadFilter: '',
			myLeadFilter: 'AllLead',
			UserList: [],
			fieldList: []
		}
	}

	confirm(){

		if(this.state.checkedData == null)
		{
			return
		}
		if(this.state.checkedData.oo_id){
			this.props.tableContentProps.history.push({
				pathname : "/convert",
				state : {checked_data: this.state.checkedData,
					leadList:this.props.leadsList        }
			})


		}
		else{

		}
	}

	deleteBulkLead() {
		this.props.deleteBulkLead('delete')
	}

	getMyLeads(e) {
		if(e.target.value=='MyLead'){
			this.props.getMyLeads('getLeads')
		}else{

			this.props.refresh('AllLeads')
		}

		this.setState({
			myLeadFilter: e.target.value,
			leadFilter: '',
		})

	}

	componentWillReceiveProps(nextProps) {

		//if(nextProps.checkboxData){
		this.setState({
			checkedData: nextProps.checkboxData
		})
		//}
	}

	componentDidMount(){

		this.getDropDowndata()
	}

	componentWillMount(){



	}
	getDropDowndata(){
		var _this = this
		axios.get("/api/getFields?fieldType=Lead")
			.then(function(res){
				console.log("in responseeeee>>>>>>>>>>>>>>>>>>>>>>>.",res)
				if(res.status==200&& !res.data.error){
          _this.setState({
						fieldList: res.data.fieldList
					})

				}else{
					console.log("no responseeeeeeeeeeeeee")
					_this.props.tableContentProps.history.push("/")
				}

			})
			.catch(function(err) {
				console.log("ERROR insideeeeeeeeeeeeeeee",err)
			})

	}

	leadFilter(e) {
		console.log('e valueueueeeeeeeeeeeeeeee',e.target.value);
		if(e.target.value=='LeadStatus'){
			this.setState({
				leadFilter: e.target.value
			})
		}
		else if(e.target.value=='None')
		{
			 if(this.state.myLeadFilter == "MyLead")
			 {
				 this.props.getMyLeads('getLeads')
			 }
			 else {
			 	this.props.refresh('AllLeads')
			 }

			 this.setState({
	 			leadFilter: ''
	 		})
		}
		else{
			this.getUserList(e.target.value)
		}

	}

	getUserList(selectedValue){
		let self=this
		axios.get("api/getUserList").then(function (response) {
			if(response.status==200){
				self.setState({
					UserList:response.data.user,
					leadFilter: selectedValue
				})
			}
		}).catch(function (error) {

		})
	}

	getValueForFilter(e) {
		console.log('seletedd value for filtererer',e.target.value);
		let keyValueForFilter= {
			Key_value: e.target.value,
			search_key: this.state.leadFilter,
		  leadData: this.state.myLeadFilter
		}
		this.props.selectedDataFilterProps(keyValueForFilter)
	}

	refresh(obj){
		this.setState({
			leadFilter: '',
			myLeadFilter : '',
		})
		this.props.refresh(obj);
	}

	render(){
		let lgStatusModalClose = () => this.setState({ ldstatusModalShow: false })
		const statusArray = []
		this.state.fieldList.map((result,i)=>{
			if(result.FieldName=="LeadStatus"){
				statusArray.push(result.FieldValue)
			}
		})


		return (
			<div className="dashboard-options-container col-md-12 clearfix">
				<div className="row">
					<ul className="dashboard-options col-md-10 pull-left">
						<li><Link to="/lead">New Lead</Link></li>
						<li><a onClick={this.deleteBulkLead.bind(this)}>Delete Lead</a></li>
						<li>
							<select className="tasks-select" value = {this.state.myLeadFilter} onChange={(e)=>this.getMyLeads(e)}>
								<option value="AllLead">All Leads</option>
								<option value="MyLead">My Leads</option>
							</select>
						</li>
						<li>
							<select className="tasks-select" value = {this.state.leadFilter} onChange={(e)=>this.leadFilter(e)}>
								<option value="None">None</option>
								<option value="LeadStatus">Lead Status</option>
								<option value="LeadOwner">Sales Owner</option>
							</select>
						</li>
						{this.state.leadFilter=='LeadStatus'&&						<li>
													<select className="tasks-select" value = {this.props.filterValue} onChange={(e)=>this.getValueForFilter(e)}>
														<option value="None">None</option>
														{
															statusArray.map((result,i)=>{
																return <option value={result}>{result}</option>
															})

													}
													</select>
												</li>}
						{this.state.leadFilter=='LeadOwner'&&						<li>
													<select className="tasks-select" value = {this.props.filterValue} onChange={(e)=>this.getValueForFilter(e)}>
													<option value="None">None</option>
													{
													 this.state.UserList.map((result,index)=>{
															return <option value={result.FirstName}>{result.FirstName}</option>
													})
												}

													</select>
												</li>}

						<li><a href="javascript:void(0)" className="refresh-link" onClick={this.refresh.bind(this)}></a></li>
					</ul>

				</div>
				<ChangeLeadStatusModal show={this.state.ldstatusModalShow}  checked_data= {this.state.checked_data} modalProps = {this.props.tableContentProps} onHide={lgStatusModalClose}/>
			</div>
		)
	}
}

export default SubNav
