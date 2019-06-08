import React, { Component } from "react"
import { Link } from "react-router-dom"

import MyLargeModal from "./editLead"
import * as HelperUtil from "../../util/common-helper"

class TableContent extends Component {

	constructor(props){
		super(props)
		this.state = {
			lgShow: false,
			cureent_lead: {},
			isChecked: false,
			pageactive : this.props.pageactive,
			sortedLeadListByKey: [],
			leadId: [],
			sortOrder: ''
		}
	}


	deleteLead(oo_id,index)
	{

		var ready = window.confirm("Are you sure want to delete this lead?")

		if(ready && oo_id){
			this.props.deleteLead(oo_id,index)
		}
	}

	getLeadInfo(leadData)
	{
		let self = this
		self.props.tableContentProps.history.push({
			pathname : "/lead",
			state : {disableLeadProps: leadData}
		})

	}

	openEditLeadModal(leads) {
		this.setState({ lgShow: true, cureent_lead:leads })
	}

	openChangeStatusModal(leads) {
		this.setState({ lgShow: true, cureent_lead:leads })
	}

	// checkbox (e,index,result){
	//
	// 	if(document.getElementById(e.target.id).checked)
	// 	{
	// 		for (var i = 0;i < 10; i++)
	// 		{
	// 			if(document.getElementById(i)==null)
	// 			{
	// 				continue
	// 			}
	// 			document.getElementById(i).checked = false
	// 		}
	// 		document.getElementById(e.target.id).checked = true
	// 		this.props.selectedCheckboxData(result[index])
	// 	}
	// 	else {
	// 		for (var i = 0;i < 10; i++)
	// 		{
	// 			if(document.getElementById(i)==null)
	// 			{
	// 				continue
	// 			}
	// 			document.getElementById(i).checked = false
	// 		}
	// 		this.props.selectedCheckboxData(null)
	// 	}
	//
	//
	//
	// }

	checkbox (e,index,result){
		if(document.getElementById(e.target.id).checked)
		{
				this.state.leadId.push(e.target.value)
			this.props.selectedCheckboxData(this.state.leadId)
		}else {
			var index = this.state.leadId.indexOf(e.target.value);
			if (index > -1) {
				this.state.leadId.splice(index, 1);
			}
			this.props.selectedCheckboxData(this.state.leadId)
		}
	}

	componentWillReceiveProps(nextprops)
	{
		console.log("Recieve Mount  - ",nextprops);
		this.setState({
			pageactive:nextprops.pageactive,
			sortedLeadListByKey :[]
		})

		if(this.state.pageactive!=nextprops.pageactive)
		{
			for (var i = 0;i < 10; i++)
			{
				if(document.getElementById(i)==null)
				{
					continue
				}
				document.getElementById(i).checked = false
			}
		}
   if(!nextprops.checkBoxStatus)
	 {
		 for (var i = 0;i < 10; i++)
		 {
			 if(document.getElementById(i)==null)
			 {
				 continue
			 }
			 document.getElementById(i).checked = false
		 }
	 }


	}
/*
	sortData() {
		if (this.state.sortDirection === 'descending') {
			this.setState({
				sortDirection: 'ascending',
				data: this.props.payYears.sort(sortAscending)
			});
		} else {
			this.setState({
				sortDirection: 'descending',
				data: this.props.payYears.sort(sortDescending)
			});
		}
	}*/


	/*getSortedListByKey(Name,leadsList) {
		let sortedLeadList=[]
		if(this.state.sortOrder=='asc'){
			sortedLeadList = HelperUtil._getSortedLeadByListByKey(Name,leadsList.slice((this.state.pageactive-1)*15,(this.state.pageactive)*15))
			sortedLeadList=sortedLeadList.reverse()
			console.log('sortedLeadList',sortedLeadList)
			this.setState({
			sortedLeadListByKey: sortedLeadList,
			sortOrder:'desc'
		})

		}
		else if(this.state.sortOrder=='desc'){
			sortedLeadList = HelperUtil._getSortedLeadByListByKey(Name,leadsList.slice((this.state.pageactive-1)*15,(this.state.pageactive)*15))
			sortedLeadList=sortedLeadList.sort()
			console.log('sortedLeadList',sortedLeadList)
			this.setState({
			sortedLeadListByKey: sortedLeadList,
			sortOrder:'asc'
		})
		}
		else {
		sortedLeadList = HelperUtil._getSortedLeadByListByKey(Name,leadsList.slice((this.state.pageactive-1)*15,(this.state.pageactive)*15))
		console.log('sortedLeadList',sortedLeadList)
		this.setState({
			sortedLeadListByKey: sortedLeadList,
			sortOrder:'asc'
		})

		}
	}*/
	getSortedListByKey(Name, opportunityList) {
		let sortedLeadList = []
		if (this.state.sortOrder == 'asc') {
			sortedLeadList = HelperUtil._getSortedByKey(Name, opportunityList.slice((this.state.pageactive - 1) * 15, (this.state.pageactive) * 15))
			sortedLeadList = sortedLeadList.reverse()
			this.setState({
				sortedLeadListByKey: sortedLeadList,
				sortOrder: 'desc'
			})

		} else {
			sortedLeadList = HelperUtil._getSortedByKey(Name, opportunityList.slice((this.state.pageactive - 1) * 15, (this.state.pageactive) * 15))
			this.setState({
				sortedLeadListByKey: sortedLeadList,
				sortOrder: 'asc'
			})
		}
	}

	render(){
		const {leadsList} = this.props
		let sortedLeadList
		if(this.state.sortedLeadListByKey.length>0){
			sortedLeadList = this.state.sortedLeadListByKey
		}else{
			sortedLeadList = HelperUtil._getSortedLeadList(leadsList)
			sortedLeadList = sortedLeadList.slice((this.state.pageactive-1)*15,(this.state.pageactive)*15)
		}

		let lgClose = () => this.setState({ lgShow: false })
		let leadEditModal
		if(this.state.cureent_lead){
			leadEditModal = <MyLargeModal show={this.state.lgShow}  modalProps = {this.props.tableContentProps} onHide={lgClose} currentLeadDetail = {this.state.cureent_lead}/>
		}
		return (
			<div className="reports-scroll">
			<table className="table record-table">
				<thead>
					<th></th>
					<th onClick={()=>this.getSortedListByKey("FirstName",leadsList)}>Name</th>
					<th onClick={()=>this.getSortedListByKey("Company",leadsList)}>Company</th>
					<th onClick={()=>this.getSortedListByKey("Country",leadsList)}>Country</th>
					<th onClick={()=>this.getSortedListByKey("email",leadsList)}>Email</th>
					<th onClick={()=>this.getSortedListByKey("Priority",leadsList)}>Priority</th>
					<th onClick={()=>this.getSortedListByKey("LeadStatus",leadsList)}>Lead Status</th>
					<th onClick={()=>this.getSortedListByKey("o_creationDate",leadsList)}>Created Date</th>
					<th onClick={()=>this.getSortedListByKey("LeadOwner",leadsList)}>Owner Alias</th>
					<th>Action</th>
				</thead>
				<tbody>
					{
						sortedLeadList.length ? sortedLeadList.map((leads,index,result)=>{
							var creationdate = HelperUtil._getFormatedDate(leads.o_creationDate).toString()
							return <tr key={index} >
								<td>
									<input type='checkbox'  onChange={e => this.checkbox(e,index,result)} className="check-record check2" name={index} value={leads.oo_id} id={index}/><label htmlFor={index}></label>
								</td>
								<td onClick={()=> this.getLeadInfo(leads)}><span className="opportunity-link">{leads.FirstName+' '+leads.LastName}</span></td>
								<td>{leads.Company}</td>
								<td>{leads.Country == "undefined" ? "":leads.Country}</td>
								<td><a href={"mailto:"+leads.email}>{leads.email}</a></td>
								<td>{leads.Priority == "undefined" ? "":leads.Priority}</td>
								<td>{leads.LeadStatus == "undefined" ? "":leads.LeadStatus}</td>
								<td>{creationdate}</td>
								<td>{leads.LeadOwner}</td>

								<td>
									<ul className="action-buttons">
										<li><Link to={{ pathname: "/lead", state: { editleadprops: leads.oo_id} }} className="edit-record-button"></Link></li>
										<li><a href="JavaScript:void(0)" className="delete-record-button" onClick={()=> this.deleteLead(leads.oo_id,index + (this.state.pageactive-1)*15)}></a></li>
									</ul>
								</td>
							</tr>
						}): <tr><td colspan="10">NO Leads Record Found</td></tr>
					}
					{leadEditModal}
				</tbody>
			</table>
			</div>
		)
	}
}
export default TableContent
