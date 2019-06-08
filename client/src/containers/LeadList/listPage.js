import React, { Component } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import cookie from "react-cookies"

import ImageContainer from "../../components/imageContainer"
//import Section from './section'
import Header from "../../common/Header"
import Footer from "../../common/Footer"
import RecentItems from "./recentItems"
import OpenLeads from "./openLeads"
import Pagination from "./pagination"
import SubNav  from "./subNav"
import TableContent from "./tableContent"
import * as HelperUtil from "../../util/common-helper"
import ReactLoading from 'react-loading'

class ListPage extends Component{
	constructor(props){
		super(props)
		this.filterSearch = this.filterSearch.bind(this)
		this.state = {
			leadsList: [],ischecked : false,pageactive:1,leadId: [],
			recentList : [],getMyLeadList:[], filteredLeadsList:[],
			checkBoxCheck: false,
			listToFilter:[],
			Loading:true

		}
	}


	filterSearch(event) {
		console.log("rhey")
		console.log("event fired" + event)
		var newLeadsList = this.state.listToFilter
		var val = event.target.value
		console.log("data is ", newLeadsList)
		var newArr = newLeadsList.filter(function(e) {
			if (
				((typeof e.FirstName != "undefined" && e.FirstName != null && e.FirstName !== "") && e.FirstName.toLowerCase().includes(val.toLowerCase())) ||
        ((typeof e.LastName != "undefined" && e.LastName != null && e.LastName !== "") && e.LastName.toLowerCase().includes(val.toLowerCase())) ||
        ((typeof e.Company != "undefined" && e.Company != null && e.Company !== "") && e.Company.toLowerCase().includes(val.toLowerCase())) ||
        ((typeof e.LeadSource != "undefined" && e.LeadSource != null && e.LeadSource !== "") && e.LeadSource.toLowerCase().includes(val.toLowerCase())) ||
        ((typeof e.AnnualRevenue != "undefined" && e.AnnualRevenue != null && e.AnnualRevenue !== "") && e.AnnualRevenue.includes(val)) ||
        ((typeof e.Phone != "undefined" && e.Phone != null && e.Phone !== "") && e.Phone.includes(val)) ||
        ((typeof e.Mobile != "undefined" && e.Mobile != null && e.Mobile !== "") && e.Mobile.includes(val)) ||
        ((typeof e.email != "undefined" && e.email != null && e.email !== "") && e.email.toLowerCase().includes(val.toLowerCase())) ||
        ((typeof e.LeadStatus != "undefined" && e.LeadStatus != null && e.LeadStatus !== "") && e.LeadStatus.toLowerCase().includes(val.toLowerCase()))
			) {
				return e
			}
		})
		console.log("new array", newArr)
		this.setState({
			filteredLeadsList: newArr
		})
	}

	RefreshTable()
	{
		var _this = this
		_this.setState({
			filteredLeadsList : this.state.leadsList,
			 pageactive : 1,
			 checkBoxCheck: false

		})

	}

componentDidMount() {
		var _this = this
		let userData = cookie.load("userData")
		let token = userData?userData.token: null
		axios.get("/api/leadlist?token="+token)
		.then(function(res){
		console.log("in responseeeee>>>>>>>>>>>>>>>>>>>>>>>.",res)
		if(res.status==200&& !res.data.error){
		_this.setState({
		leadsList: res.data.leads,
		recentList : res.data.leads,
		filteredLeadsList: res.data.leads,
		listToFilter:res.data.leads,
		Loading:false
		})
		}else{
		console.log("no responseeeeeeeeeeeeee")
		_this.props.listprops.history.push("/")
		}

		})
		.catch(function(err) {
		console.log("ERROR insideeeeeeeeeeeeeeee",err)
		})

}


	changeactive(page)
	{
		this.setState({
			pageactive : page
		})
	}

	// method for deleteing the lead in the Bulk
	deleteBulkLead(datatoDelete) {
		let self = this;
		if(this.state.leadId.length>0){
			let confirm = window.confirm("Are you sure you want to delete?")
			if(confirm){
				axios.get('/api/removeSelectedLead?id='+this.state.leadId).then(function (response) {
					if(response.status==200){
						window.location.href='leadlist'
					}
					}).catch(function (error) {
						console.log('ereeeeeeeeeor',error);
				});
			}
		}
	}

	getMyLeads() {
		let self = this;

		let userName = cookie.load("userData")?cookie.load("userData").user.FirstName:null
    axios.get('/api/getMyLeads?name='+userName).then(function (response) {
					if(response.status==200){
						self.setState({
						filteredLeadsList: response.data.leads,
						getMyLeadList: response.data.leads,
						pageactive : 1,
						checkBoxCheck: false
						})
					}
					}).catch(function (error) {
						console.log('ereeeeeeeeeor',error);
				});
	}

	removeLead(oo_id,index) {
		let self = this
		let array = self.state.filteredLeadsList
		axios.get("/api/removeleadlist?oo_id="+oo_id).then(function (response) {
			if(response.data){
				array.splice(index, 1)
				self.setState({
					filteredLeadsList: array,
					checkBoxCheck: false
				})

				if(array.length%10==0 && self.state.pageactive>((array.length)/10))
				{
					self.changeactive((array.length)/10)
				}


			}
		}).catch(function (error) {
			console.log("ereeeeeeeeeor",error)
		})

	}

	updateLeadList(id)
	{
     this.state.leadsList.map((result,index)=>{

			 if(result.oo_id == id)
			 {
				 this.state.leadsList.splice(index,1)
				 this.state.recentList.splice(index,1)
			 }
	 })


	}

	selectedCheckboxData(checkboxdata){
		console.log("checkboxdata in list page is >>>>> "  + checkboxdata )
		this.setState({
			leadId: checkboxdata,
			checkBoxCheck: true
		})
	}

	selectedDataFilterProps(seletedValue) {
		let List

    if(seletedValue.leadData == "MyLead")
    {
    List = this.state.getMyLeadList
    }
    else {
      List = this.state.leadsList
    }
		let filteredLeadList = HelperUtil._getFilteredLeadList(List,seletedValue)
		this.setState({
			filteredLeadsList: filteredLeadList,
			checkBoxCheck: false
		})
	}

	render() {
console.log("LeadData -- ",this.state.leadsList);
		var newList = this.state.recentList;
		return (
			<div className="wrapper">
				<Header active="Lead"/>
				<section id="main">
					<div className="container-fluid">
					 {this.state.Loading== true &&	<div className="loader-react">
							<ReactLoading type="spokes" color="#000"/>
						</div> }
						<div className="row">
							<nav className="left-navigation col-md-2">
								<RecentItems leadsList = {newList} recentProps={this.props.listprops}/>
							</nav>
							<section id="main-dashboard" className="main-dashboard col-md-10">


								<div className="dashboard-filter clearfix">
									<div className="">
										<div className="col-md-8">
											<div className="row">
												<div className="search-resource-container">
													<form className="search-resource-form">
														<div className="searchbox-input pull-left">
															<input type="text" onChange={this.filterSearch} placeholder="Search..." />
														</div>
														<div className="searchbox-submit pull-left">
															<button value="Search" disabled="disabled">Search</button>
														</div>
													</form>
												</div>
											</div>
										</div>
										<div className="col-md-4">

										</div>
									</div>
								</div>

								{ /* <OpenLeads/> */ }
								<div className="dashboard-table-section">
									<SubNav tableContentProps={this.props.listprops} selectedDataFilterProps={this.selectedDataFilterProps.bind(this)} leadsList = {this.state.leadsList} deleteBulkLead={this.deleteBulkLead.bind(this)} getMyLeads={this.getMyLeads.bind(this)} checkboxData={this.state.checkboxData} refresh={this.RefreshTable.bind(this)}/>
									<TableContent tableContentProps={this.props.listprops} leadsList = {this.state.filteredLeadsList} checkBoxStatus={this.state.checkBoxCheck} deleteLead = {this.removeLead.bind(this)} selectedCheckboxData={this.selectedCheckboxData.bind(this)} pageactive={this.state.pageactive}/>

								</div>
								<Pagination leadsList = {this.state.filteredLeadsList} changeactive={this.changeactive.bind(this)} pageactive={this.state.pageactive}/>
							</section>
						</div>
					</div>
				</section>
				<Footer/>
			</div>
		)
	}
}
export default ListPage
