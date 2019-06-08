import React from "react"
import { Link } from "react-router-dom"
import RecentItems from "../LeadList/recentItems"
import ImageContainer from "../../components/imageContainer"
import ActivityModal from "./leadPageForActivityLog"
import * as HelperUtil from "../../util/common-helper"
import Nav from "./nav"
import axios from "axios"
import cookie from "react-cookies"
import moment from "moment"
import DatePicker from "react-datepicker"
import ReactLoading from 'react-loading'

export default class LeadPageEditMode extends React.Component{

	constructor(props){
		super(props)
		this.state = {
			Salutation: "",
			FirstName: "",
			LastName: "",
			LeadOwner: "",
			CreatedBy: "",
			CreatedDate: moment(),
			Company: "",
			Title: "",
			OtherPhone: "",
			Industry: "",
			AnnualRevenue: "",
			Phone:"",
			Mobile: "",
			Fax: "",
			email:"",
			Website:"",
			LeadStatus: "",
			LeadSource: "",
			NoOfEmployees:"",
			Street: "",
			City: "",
			State: "",
			Country: "",
			Zip: "",
			ProductInterest: "",
			YearFounded: "",
			NoOfLocation: "",
			CurrentGenerator: "",
			Primary: "",
			Description: "",
			Optional: "",
			Priority:"",
			oo_id: "",
			leadsList: [],
			ActivityList: [],
			AttachmentList: [],
			ActivityType: "",
			ObjectType: "",
			taskList: [],
			UserList: [],
			Loading:true,
			sortOrder:'',
			sortOrderTask:'',
			sortOrderAtt:'',
			TaskList:[]
		}
	}


	change(e){
		this.setState({
			[e.target.name]: e.target.value,
		})
	}

	getTitle (e){
		this.setState({
			Salutation: e.target.value
		})
	}

	getIndustryType (e){
		this.setState({
			Industry: e.target.value
		})
	}



	getLeadStatus (e){
		this.setState({
			LeadStatus: e.target.value
		})
	}

	getLeadSource (e){
		this.setState({
			LeadSource: e.target.value
		})
	}
	getPriority (e){
		this.setState({
			Priority: e.target.value
		})
	}


	getProductInterest (e){
		this.setState({
			ProductInterest: e.target.value
		})
	}

	getPrimaryData (e){
		this.setState({
			Primary: e.target.value
		})
	}

	checkbox (e){
		this.setState({
			Optional: e.target.checked
		})
	}

	componentWillReceiveProps (nextProps)
	{
        console.log("====start componentWillReceiveProps====1")
		console.log("fdddd  -  ", nextProps);
   let self =this
		const {leadsDetail} = nextProps
		//console.log('leadsDetail in willmount disavbbleeeeeeeeeee',leadsDetail);
		if(leadsDetail === undefined){

		}else{
			axios.get('api/getLeadById?oo_id='+leadsDetail).then(function (response) {

					if(response.status == 200){


						let leadsDetail = response.data.lead[0]
								console.log('Oppp Detail  -- in did mountntnntntnnt', leadsDetail);
						self.setState({
							Salutation: leadsDetail.Salutation == "undefined" ? "": leadsDetail.Salutation,
							FirstName: leadsDetail.FirstName == "undefined" ? "":leadsDetail.FirstName,
							LastName: leadsDetail.LastName== "undefined" ? "": leadsDetail.LastName,
							LeadOwner: leadsDetail.LeadOwner== "undefined" ? "": leadsDetail.LeadOwner,
							CreatedBy: leadsDetail.CreatedBy== "undefined" ? "": leadsDetail.CreatedBy,
							CreatedDate:  leadsDetail.o_creationDate== 'undefined' ? "": moment(HelperUtil._getFormatedDate(leadsDetail.o_creationDate).toString()),
							Company: leadsDetail.Company== "undefined" ? "" : leadsDetail.Company,
							Title: leadsDetail.Title== "undefined" ? "" : leadsDetail.Title,
							OtherPhone: leadsDetail.OtherPhone== "undefined" ? "" : leadsDetail.OtherPhone,
							Industry: leadsDetail.Industry== "undefined" ? "" : leadsDetail.Industry,
							AnnualRevenue: leadsDetail.AnnualRevenue== "undefined" ? "" : leadsDetail.AnnualRevenue,
							Phone:leadsDetail.Phone== "undefined" ? "" : leadsDetail.Phone,
							Mobile: leadsDetail.Mobile== "undefined" ? "" : leadsDetail.Mobile,
							Fax: leadsDetail.Fax== "undefined" ? "" : leadsDetail.Fax,
							email:leadsDetail.email== "undefined" ? "" : leadsDetail.email,
							Website:leadsDetail.Website== "undefined" ? "" : leadsDetail.Website,
							LeadStatus: leadsDetail.LeadStatus== "undefined" ? "" : leadsDetail.LeadStatus,
							LeadSource: leadsDetail.LeadSource== "undefined" ? "" : leadsDetail.LeadSource,
							Priority: leadsDetail.Priority== "undefined" ? "" : leadsDetail.Priority,
							NoOfEmployees:leadsDetail.NoOfEmployees== "undefined" ? "" : leadsDetail.NoOfEmployees,
							Street: leadsDetail.Street== "undefined" ? "" : leadsDetail.Street,
							City: leadsDetail.City== "undefined" ? "" : leadsDetail.City,
							State: leadsDetail.State== "undefined" ? "" : leadsDetail.State,
							Country: leadsDetail.Country== "undefined" ? "" : leadsDetail.Country,
							Zip: leadsDetail.Zip== "undefined" ? "" : leadsDetail.Zip,
							YearFounded: leadsDetail.YearFounded== "undefined" ? "" : leadsDetail.YearFounded,
							Description: leadsDetail.Description== "undefined" ? "" : leadsDetail.Description,
							oo_id: leadsDetail.oo_id== "undefined" ? "" : leadsDetail.oo_id,
							Loading:false
						})
						self.getList(leadsDetail.oo_id)
						self.getActivityList(leadsDetail.oo_id)
						self.getAttachmentList(leadsDetail.oo_id)

					}
				}).catch(function (error) {

					});

		}
		 console.log("====End componentWillReceiveProps====1")
	}

	componentDidMount() {
		console.log("====start componentDidMount====2")
		var _this = this
		let userData = cookie.load("userData")
		let token = userData?userData.token: null
		axios.get("/api/leadlist?token="+token)
			.then(function(res){
				//console.log("in responseeeee>>>>>>>>>>>>>>>>>>>>>>>.",res)
				if(res.status==200&& !res.data.error){
					_this.setState({
						leadsList: res.data.leads,
						filteredLeadsList: res.data.leads
					})
				}else{
					//console.log("no responseeeeeeeeeeeeee")
					_this.props.listprops.history.push("/")
				}

			})
			.catch(function(err) {
				//console.log("ERROR insideeeeeeeeeeeeeeee",err)
			})

		console.log("====End componentDidMount====2")
	}

	componentWillMount (){
		console.log("====Start componentWillMount====3")
		let self=this
		const {leadsDetail} = this.props
		//console.log('leadsDetail in willmount disavbbleeeeeeeeeee',leadsDetail);
		if(leadsDetail === undefined){

		}else{

			axios.get('api/getLeadById?oo_id='+leadsDetail).then(function (response) {

					if(response.status == 200){


						let leadsDetail = response.data.lead[0]
								console.log('Oppp Detail  -- in did mountntnntntnnt', leadsDetail);
						self.setState({
							Salutation: leadsDetail.Salutation == "undefined" ? "": leadsDetail.Salutation,
							FirstName: leadsDetail.FirstName == "undefined" ? "":leadsDetail.FirstName,
							LastName: leadsDetail.LastName== "undefined" ? "": leadsDetail.LastName,
							LeadOwner: leadsDetail.LeadOwner== "undefined" ? "": leadsDetail.LeadOwner,
							CreatedBy: leadsDetail.CreatedBy== "undefined" ? "": leadsDetail.CreatedBy,
							CreatedDate:  leadsDetail.o_creationDate== 'undefined' ? "": moment(HelperUtil._getFormatedDate(leadsDetail.o_creationDate).toString()),
							Company: leadsDetail.Company== "undefined" ? "" : leadsDetail.Company,
							Title: leadsDetail.Title== "undefined" ? "" : leadsDetail.Title,
							OtherPhone: leadsDetail.OtherPhone== "undefined" ? "" : leadsDetail.OtherPhone,
							Industry: leadsDetail.Industry== "undefined" ? "" : leadsDetail.Industry,
							AnnualRevenue: leadsDetail.AnnualRevenue== "undefined" ? "" : leadsDetail.AnnualRevenue,
							Phone:leadsDetail.Phone== "undefined" ? "" : leadsDetail.Phone,
							Mobile: leadsDetail.Mobile== "undefined" ? "" : leadsDetail.Mobile,
							Fax: leadsDetail.Fax== "undefined" ? "" : leadsDetail.Fax,
							email:leadsDetail.email== "undefined" ? "" : leadsDetail.email,
							Website:leadsDetail.Website== "undefined" ? "" : leadsDetail.Website,
							LeadStatus: leadsDetail.LeadStatus== "undefined" ? "" : leadsDetail.LeadStatus,
							LeadSource: leadsDetail.LeadSource== "undefined" ? "" : leadsDetail.LeadSource,
							Priority: leadsDetail.Priority== "undefined" ? "" : leadsDetail.Priority,
							NoOfEmployees:leadsDetail.NoOfEmployees== "undefined" ? "" : leadsDetail.NoOfEmployees,
							Street: leadsDetail.Street== "undefined" ? "" : leadsDetail.Street,
							City: leadsDetail.City== "undefined" ? "" : leadsDetail.City,
							State: leadsDetail.State== "undefined" ? "" : leadsDetail.State,
							Country: leadsDetail.Country== "undefined" ? "" : leadsDetail.Country,
							Zip: leadsDetail.Zip== "undefined" ? "" : leadsDetail.Zip,
							YearFounded: leadsDetail.YearFounded== "undefined" ? "" : leadsDetail.YearFounded,
							Description: leadsDetail.Description== "undefined" ? "" : leadsDetail.Description,
							oo_id: leadsDetail.oo_id== "undefined" ? "" : leadsDetail.oo_id
						})
						self.getUserList()
						self.getList(leadsDetail.oo_id)
						self.getActivityList(leadsDetail.oo_id)
						self.getAttachmentList(leadsDetail.oo_id)

					}
				}).catch(function (error) {

					});


		}
        console.log("====End componentWillMount====3")
	}

	getAttachmentList(id){
		let _this = this
		let userData = cookie.load("userData")
		let token = userData?userData.token: null
		let UserId = userData?userData.user.oo_id: null
		axios.get("api/getAttachmentList?ObjectId="+id+"&Object=Lead").then((res)=>{
			if(res.status==200&& !res.data.error){
				_this.setState({
					AttachmentList : res.data.attachment,
					Loading: false

				})
			}else{

				_this.props.listprops.history.push("/")
			}
		}).catch(function(e) {

			})
	}

	editData(currentData) {
		//console.log('currentData>>>>>>>>>>>>>>>>>>>>>>>>>..',currentData);
		if(currentData){
			this.props.listprops.history.push({
				pathname : "/lead",
				state : {editleadprops: currentData.oo_id}
			})
		}
	}

	convertLead(currentData){
		console.log("===start convertLead=======")
		if(currentData){
			let requestData={
			 Salutation: currentData.Salutation,
 			 FirstName: currentData.FirstName,
 			 LastName: currentData.LastName,
 			 LeadOwner: currentData.LeadOwner,
 			 CreatedBy: cookie.load("userData").user.FirstName,
 			 Company: currentData.Company,
 			 Title: currentData.Title,
 			 OtherPhone: currentData.OtherPhone,
 			 Industry: currentData.Industry,
 			 AnnualRevenue: currentData.AnnualRevenue,
 			 Phone:currentData.Phone,
 			 Mobile: currentData.Mobile,
 			 Fax: currentData.Fax,
 			 email:currentData.email,
 			 Website:currentData.Website,
 			 LeadStatus: currentData.LeadStatus,
 			 LeadSource: currentData.LeadSource,
 			 Priority: currentData.Priority,
 			 NoOfEmployees:currentData.NoOfEmployees,
 			 Street: currentData.Street,
 			 City: currentData.City,
 			 State: currentData.State,
 			 Country: currentData.Country,
 			 Zip: currentData.Zip,
 			 YearFounded: currentData.YearFounded,
			 oo_id: currentData.oo_id,
 			 Description: currentData.Description,
 			 AttachmentList:currentData.AttachmentList
	 	 }
           console.log("===AttachmentList in leadpageEditMode=====",this.state.AttachmentList)
			this.props.listprops.history.push({
				pathname : "/convert",
				state : {checked_data: requestData},
				Loading:true
			})
		}
		console.log("===End convertLead=======")
	}
	deleteData(currentData) {
		var ready = window.confirm("Are you sure want to delete this Lead?")


		if(ready && currentData){
			let self = this
			axios.get("/api/removeleadlist?oo_id="+currentData.oo_id).then(function (response) {
				if(response.status == 200){
					self.props.listprops.history.push("/leadlist")
				}
			}).catch(function (error) {
				//console.log("ereeeeeeeeeor",error)
			})
		}
	}

	getList(id){
		console.log("====start in getList====")
		let _this = this
		let userData = cookie.load("userData")
		let token = userData?userData.token: null
		let UserId = userData?userData.user.oo_id: null
		axios.get("api/taskList?token="+token+"&Id="+id+"&Object=Lead").then((res)=>{
			if(res.status==200&& !res.data.error){
				_this.setState({
					taskList : res.data.tasks,
					showTaskData : res.data.tasks,

				})

				self.getUserList();
			}else{

				_this.props.taskprops.history.push("/")
			}
		}).catch(function(e) {

			})
		console.log("====end in getList====")
	}

	getActivityList(id)
	{
		console.log("====start in getActivityList====",id)
		let _this = this
		let userData = cookie.load("userData")
		let token = userData?userData.token: null
		let UserId = userData?userData.user.oo_id: null
		axios.get("api/getActivityList?ObjectId="+id+"&Object=Lead").then((res)=>{
			if(res.status==200&& !res.data.error){
				_this.setState({
					ActivityList : res.data.activity,
					Loading: false

				})
			}else{

				_this.props.taskprops.history.push("/")
			}
		}).catch(function(e) {

			})
		console.log("====End in getActivityList====")
	}



	getActivityPhoneCall() {

		this.props.listprops.history.push({
			pathname : "/lead",
			state : {activityLog: [{ActivityType:"Phone",ObjectType: "Lead",object: {oo_id: this.state.oo_id},ObjectList: this.state.leadsList}]}
		})
	}

	getActivityEmail() {
		this.props.listprops.history.push({
			pathname : "/lead",
			state : {activityLog: [{ActivityType:"Email",ObjectType: "Lead",object: {oo_id: this.state.oo_id},ObjectList: this.state.leadsList}]}
		})
	}

	getActivityMetPerson() {
		this.props.listprops.history.push({
			pathname : "/lead",
			state : {activityLog: [{ActivityType:"MetInPerson",ObjectType: "Lead",object: {oo_id: this.state.oo_id},ObjectList: this.state.leadsList}]}
		})
	}

	getInfo(task)
	{
		let self = this
 	 self.props.listprops.history.push({
 		 pathname : "/task",
 		 state : {taskViewProps: {data: task,taskList:[]}}
 	 })
	}

	getUserList(){
		let self=this
		axios.get("api/getUserList").then(function (response) {
			if(response.status==200){
				self.setState({
					UserList:response.data.user
				})
			}
		}).catch(function (error) {

		})
	}

	viewActivity(activity,_this){
	    console.log("activity is ",activity);
	    this.props.listprops.history.push({
	      pathname: "/activity",
	      state: { activity: activity,objectList:this.state.leadsList}
	    });

	 }

	 handleUploadImage(ev) {
 	let self = this
	ev.preventDefault()
	var FileSize = self.uploadInput.files[0].size / 1024 / 1024;
if(FileSize <= 5)
{
	self.setState({
		Loading:true
	})

     console.log("File Upload -- ",this.uploadInput.files[0].name);
		 const data = new FormData()
	 	data.append("file", this.uploadInput.files[0])
	 	data.append("name", this.uploadInput.files[0].name)
	 	data.append("ext", "." + this.uploadInput.files[0].name.split(".").pop())
		data.append("Object", "Lead")
		data.append("ObjectId", this.state.oo_id)
		data.append("CreatedBy", cookie.load("userData").user.FirstName)

		axios.post("api/uploadAttachmentFile",data).then(function (response) {
			console.log('response at this pagegegegegeg>>>>>>>>>>>>>>>> image saveddddd',response);

				console.log("fdfsdffsdfs",response)

       self.getAttachmentList(self.state.oo_id)


		}).catch(function (error) {
			console.log("ereeeeeeeeeor",error)
		})

	}
	else {
		alert("File Size exceeds 5 MB")
	}


 }

 deleteAttachment(id,path)
 {
 	console.log("Delete Attaaa");
   let self =this

 	let data={ProjectFile:path,id:id}
   var ready = window.confirm("Are you sure want to delete this Attachment?")

   if(ready)
   {

		 self.setState({
			 Loading:true
		 })



 	axios.post("api/deleteAttachmentObject",data).then(function (response) {

 		 console.log("fdfsdffsdfs",response)
 		 self.getAttachmentList(self.state.oo_id	)

  }).catch(function (error) {
 	 console.log("ereeeeeeeeeor",error)
  })
  }
 }


	getSortedListByKey(Name, dataList) {
		let sortedResourceAllocationList = []
		if (this.state.sortOrder == 'asc') {
			console.log('before sorting list',dataList)
			//sortedResourceAllocationList = HelperUtil._getSortedByKey(Name, dataList)
			//console.log('after sorting list',sortedResourceAllocationList)
			sortedResourceAllocationList = dataList.reverse()
			console.log('after reverse',sortedResourceAllocationList)
			/*sortedResourceAllocationList =sortedResourceAllocationList.reverse()
			console.log('after sec reverse',sortedResourceAllocationList)*/
			
			
			this.setState({
				ActivityList: sortedResourceAllocationList,
				sortOrder: 'desc'
			})

		}else if(this.state.sortOrder == 'desc') {
			console.log('desc order before sort---',dataList)
			sortedResourceAllocationList = dataList.reverse()
			console.log('desc order after sort---',sortedResourceAllocationList)
			
			this.setState({
				ActivityList: sortedResourceAllocationList,
				sortOrder: 'asc'
			})
		}
		else {
			sortedResourceAllocationList = HelperUtil._getSortedByKey(Name, dataList)
			this.setState({
				ActivityList: sortedResourceAllocationList,
				sortOrder: 'asc'
			})
		}
	}


	getSortedListByKeyForTask(Name, dataList) {
		let sortedResourceAllocationList = []
		if (this.state.sortOrderTask == 'asc') {
			console.log('before sorting list',dataList)
			//sortedResourceAllocationList = HelperUtil._getSortedByKey(Name, dataList)
			//console.log('after sorting list',sortedResourceAllocationList)
			sortedResourceAllocationList = dataList.reverse()
			console.log('after reverse',sortedResourceAllocationList)
			/*sortedResourceAllocationList =sortedResourceAllocationList.reverse()
			console.log('after sec reverse',sortedResourceAllocationList)*/
			
			
			this.setState({
				taskList: sortedResourceAllocationList,
				sortOrderTask: 'desc'
			})

		}else if(this.state.sortOrderTask == 'desc') {
			console.log('desc order before sort---',dataList)
			sortedResourceAllocationList = dataList.reverse()
			console.log('desc order after sort---',sortedResourceAllocationList)
			
			this.setState({
				taskList: sortedResourceAllocationList,
				sortOrderTask: 'asc'
			})
		}
		else {
			sortedResourceAllocationList = HelperUtil._getSortedByKey(Name, dataList)
			this.setState({
				taskList: sortedResourceAllocationList,
				sortOrderTask: 'asc'
			})
		}
	}


	getSortedListByKeyAtt(Name, dataList) {
   let sortedResourceAllocationList = []
		if (this.state.sortOrderAtt == 'asc') {
			console.log('before sorting list',dataList)
			//sortedResourceAllocationList = HelperUtil._getSortedByKey(Name, dataList)
			//console.log('after sorting list',sortedResourceAllocationList)
			sortedResourceAllocationList = dataList.reverse()
			console.log('after reverse',sortedResourceAllocationList)
			/*sortedResourceAllocationList =sortedResourceAllocationList.reverse()
			console.log('after sec reverse',sortedResourceAllocationList)*/
			
			
			this.setState({
				AttachmentList: sortedResourceAllocationList,
				sortOrderAtt: 'desc'
			})

		}else if(this.state.sortOrderAtt == 'desc') {
			console.log('desc order before sort---',dataList)
			sortedResourceAllocationList = dataList.reverse()
			console.log('desc order after sort---',sortedResourceAllocationList)
			
			this.setState({
				AttachmentList: sortedResourceAllocationList,
				sortOrderAtt: 'asc'
			})
		}
		else {
			sortedResourceAllocationList = HelperUtil._getSortedByKey(Name, dataList)
			this.setState({
				AttachmentList: sortedResourceAllocationList,
				sortOrderAtt: 'asc'
			})
		}
  }


	render() {
		let amount
		amount=0
			if(this.state.AnnualRevenue !="" && this.state.AnnualRevenue != undefined)
			{
				amount = HelperUtil._getAmountCommaSeparator(this.state.AnnualRevenue).toString()
			}
		  let newTaskList=[]

		  console.log('TaskList',this.state.TaskList)
		/*if(this.state.sortOrderTask==''){
			newTaskList=[]
		}
		else{
			newTaskList=this.state.TaskList
		}
		console.log('newTaskList',newTaskList)*/


		this.state.taskList.map((task,taskindex)=>{
			let newData=task
	    this.state.UserList.map((user,userindex)=>{

		    if(task.UserId == user.oo_id){
                 newData.UserName = user.FirstName
		    }
		    if(task.AssignedBy == user.oo_id){
                 newData.AssignedName = user.FirstName

		    }

		})
		newTaskList.push(newData)
		})

    	return (
			<div className="wrapper">
				<section id="main">
					<div className="container-fluid">

                     {this.state.Loading== true &&	<div className="loader-react">
							<ReactLoading type="spokes" color="#000"/>
						</div> }
						<div className="row">
							<nav className="left-navigation col-md-2">
								<RecentItems leadsList = {this.state.leadsList} leadId = {this.state.oo_id} recentProps={this.props.listprops}/>
							</nav>
							<section id="main-dashboard" className="main-dashboard col-md-10">
								<h2><span className="pull-right required-info"><span className="aestrick">*</span> Required Information</span></h2>
								<form name="createform" className="lead-form" >
									<div className="form-buttons">
										<a onClick={state=>this.editData(this.state)} className="edit-btn btn">Edit</a>
										<a onClick={state=>this.convertLead(this.state)} className="delete-btn btn">Convert</a>

										<a onClick={state=>this.deleteData(this.state)} className="delete-btn btn">Delete</a>


									{/*	<Link to="/leadlist"><button type="button" className="cancel-btn">Cancel</button></Link>   */}
									</div>
									<fieldset>
										<h3>Lead Information</h3>

										<div className="col-md-12">
											<div className="row">

												<div className="col-lg-5 col-md-12 col-sm-12">
													<div className="form-group">
														<label>Salutation</label>
														<span className="lead-owner-name oppn-name">{this.state.Salutation}</span>

													</div>
												</div>

												<div className="col-lg-5 col-md-12 col-sm-12 ml-auto float-right">
													<div className="form-group">
														<label>Sales Owner<span className="aestrick">*</span></label>
														<span className="lead-owner-name oppn-name">{this.state.LeadOwner}</span>
													</div>
												</div>




											</div>
										</div>
										<div className="col-md-12">
											<div className="row">

											<div className="col-lg-5 col-md-12 col-sm-12">
												<div className="form-group">
													<label>First Name<span className="aestrick">*</span></label>
													<span className="lead-owner-name oppn-name">{this.state.FirstName}</span>

												</div>
											</div>

												<div className="col-lg-5 col-md-12 col-sm-12 ml-auto float-right">
													<div className="form-group">
														<label>Last Name<span className="aestrick">*</span></label>
														<span className="lead-owner-name oppn-name">{this.state.LastName}</span>

													</div>
												</div>


											</div>
										</div>
										<div className="col-md-12">
											<div className="row">

												<div className="col-lg-5 col-md-12 col-sm-12">
													<div className="form-group">
														<label>Title<span className="aestrick">*</span></label>
														<span className="lead-owner-name oppn-name">{this.state.Title}</span>

													</div>
												</div>

												<div className="col-lg-5 col-md-12 col-sm-12 ml-auto float-right">
												 <div className="form-group">
													 <label>Email<span className="aestrick">*</span></label>
													 <span className="lead-owner-name oppn-name">{this.state.email}</span>

												 </div>
											 </div>



											</div>
										</div>
										<div className="col-md-12">
											<div className="row">

											<div className="col-lg-5 col-md-12 col-sm-12">
												<div className="form-group">
													<label>Office Phone</label>
													<span className="lead-owner-name oppn-name">{this.state.Phone}</span>

												</div>
											</div>

											<div className="col-lg-5 col-md-12 col-sm-12 ml-auto float-right">
												<div className="form-group">
													<label>Mobile Phone</label>
													<span className="lead-owner-name oppn-name">{this.state.Mobile}</span>

												</div>
											</div>





											</div>
										</div>
										<div className="col-md-12">
											<div className="row">

											<div className="col-lg-5 col-md-12 col-sm-12">
												<div className="form-group">
													<label>Fax Number</label>
													<span className="lead-owner-name oppn-name">{this.state.Fax}</span>

												</div>
											</div>

											<div className="col-lg-5 col-md-12 col-sm-12 ml-auto float-right">
												<div className="form-group">
													<label>Other Phone</label>
													<span className="lead-owner-name oppn-name">{this.state.OtherPhone}</span>

												</div>
											</div>



											</div>
										</div>
										<div className="col-md-12">
											<div className="row">

											<div className="col-lg-5 col-md-12 col-sm-12">
												<div className="form-group">
													<label>Company<span className="aestrick">*</span></label>
													<span className="lead-owner-name oppn-name">{this.state.Company}</span>

												</div>
											</div>

											<div className="col-lg-5 col-md-12 col-sm-12 ml-auto float-right">
												<div className="form-group">
													<label>Industry</label>
													<span className="lead-owner-name oppn-name">{this.state.Industry}</span>

												</div>
											</div>

											</div>
										</div>
										<div className="col-md-12">
											<div className="row">

											<div className="col-lg-5 col-md-12 col-sm-12">
												<div className="form-group">
													<label>Year Founded</label>
													<span className="lead-owner-name oppn-name">{this.state.YearFounded}</span>

												</div>
											</div>

											<div className="col-lg-5 col-md-12 col-sm-12 ml-auto float-right">
												<div className="form-group">
													<label>Revenue last year</label>
													<span className="lead-owner-name oppn-name">{amount?'$'+amount:''}</span>

												</div>
											</div>




											</div>
										</div>
										<div className="col-md-12">
											<div className="row">

											<div className="col-lg-5 col-md-12 col-sm-12">
												<div className="form-group">
													<label>Website</label>
													<span className="lead-owner-name oppn-name">{this.state.Website}</span>

												</div>
											</div>

											<div className="col-lg-5 col-md-12 col-sm-12 ml-auto float-right">
												<div className="form-group">
													<label>No. of Employees</label>
													<span className="lead-owner-name oppn-name">{this.state.NoOfEmployees}</span>

												</div>
											</div>



											</div>
										</div>

										<div className="col-md-12">
											<div className="row">
											<div className="col-lg-5 col-md-12 col-sm-12">
												<div className="form-group">
													<label>Lead Source<span className="aestrick">*</span></label>
													<span className="lead-owner-name oppn-name">{this.state.LeadSource}</span>

												</div>
											</div>
												<div className="col-lg-5 col-md-12 col-sm-12 ml-auto float-right">
													<div className="form-group">
														<label>Lead Status<span className="aestrick">*</span></label>
														<span className="lead-owner-name oppn-name">{this.state.LeadStatus}</span>

													</div>
												</div>
 											</div>
											</div>

                                           
                                           	<div className="col-md-12">
											<div className="row">
											<div className="col-lg-5 col-md-12 col-sm-12">
												<div className="form-group">
													<label>Priority</label>
													<span className="lead-owner-name oppn-name">{this.state.Priority}</span>

												</div>
											  </div>
											  <div className="col-lg-5 col-md-12 col-sm-12 ml-auto float-right">
														<div className="form-group">
															<label>Created Date</label>
															<DatePicker className="form-control" disabled="true"
																	selected={this.state.CreatedDate}

															/>


														</div>
													</div>
 											</div>
											</div>
											<div className="col-md-12">
												<div className="row">
												<div className="col-lg-5 col-md-12 col-sm-12">
													<div className="form-group">
														<label>Created By</label>
														<span className="lead-owner-name oppn-name">{this.state.CreatedBy}</span>

													</div>
												</div>
													
	 											</div>
												</div>

											<div className="col-md-12">
											 <div className="row">
											<div className="col-lg-12 col-md-12 col-sm-12">
												<div className="form-group description-group">
													<label>Description/Notes</label>
													<span className="lead-owner-name oppn-name">{this.state.Description}</span>

												</div>
											</div>
											</div>
											</div>
									</fieldset>
									<fieldset>
										<h3>Address Information</h3>
										<div className="col-md-12">
											<div className="row">
												<div className="col-lg-5 col-md-12 col-sm-12">
													<div className="form-group">
														<label>Street</label>
														<span className="lead-owner-name oppn-name">{this.state.Street}</span>

													</div>
												</div>
												<div className="col-lg-5 col-md-12 col-sm-12 ml-auto float-right">
													<div className="form-group">
														<label>City</label>
														<span className="lead-owner-name oppn-name">{this.state.City}</span>

													</div>
												</div>

											</div>
										</div>
										<div className="col-md-12">
											<div className="row">
												<div className="col-lg-5 col-md-12 col-sm-12">
													<div className="form-group">
														<label>State</label>
														<span className="lead-owner-name oppn-name">{this.state.State}</span>
													</div>
												</div>
												<div className="col-lg-5 col-md-12 col-sm-12 ml-auto float-right">
													<div className="form-group">
														<label>Zip/Postal Code</label>
														<span className="lead-owner-name oppn-name">{this.state.Zip}</span>
													</div>
												</div>
											</div>
										</div>
										<div className="col-md-12">
											<div className="row">
												<div className="col-lg-5 col-md-12 col-sm-12">
													<div className="form-group">
														<label>Country</label>
														<span className="lead-owner-name oppn-name">{this.state.Country}</span>
													</div>
												</div>
											</div>
										</div>
									</fieldset>
									<fieldset>
										<h3>Activity Log
										<div className="buttons-activity">

											<a className="create-new-link"  onClick={this.getActivityPhoneCall.bind(this)}>Phone Call</a>
											<a className="create-new-link"  onClick={this.getActivityEmail.bind(this)}>Email</a>
											<a className="create-new-link"  onClick={this.getActivityMetPerson.bind(this)}>Met In-Person</a>

										</div>
										</h3>

										<div className="col-md-12">
											<div className="row">
												<table className="table record-table">
													<thead>
														<th onClick={()=>this.getSortedListByKey("ActivityType",this.state.ActivityList)} width="200">Category</th>
														<th onClick={()=>this.getSortedListByKey("CallTo",this.state.ActivityList)} width="200">Contact Person</th>
														<th onClick={()=>this.getSortedListByKey("Notes",this.state.ActivityList)}>Notes</th>
													</thead>
													<tbody>
														{
															this.state.ActivityList.length ? this.state.ActivityList.map((activity,index,result)=>{


																return <tr key={index}>
																	<td className="opportunity-link" onClick={this.viewActivity.bind(this,activity)}>{activity.ActivityType}</td>
																	<td>{activity.CallTo}</td>
																	<td>{activity.Notes}</td>

																</tr>

															}): <tr><td colspan="6">No Activity Record Found</td></tr>
														}
													</tbody>
												</table>
											</div>
										</div>

									</fieldset>

									<fieldset>
										<h3>Task Management
										<div className="buttons-activity">
											<Link className="create-new-link" to={{ pathname: "/task", state: { leadtaskprops: {FirstName:this.state.FirstName,origin:'lead',RelatedToId:this.state.oo_id,RelatedToObject:'Lead'}}} }>New</Link>
										</div>

										</h3>
										<div className="col-md-12">
											<div className="row">
												<div className="task-management-wrap">
												<table className="table record-table">
													<thead>
														<th onClick={()=>this.getSortedListByKeyForTask("DueDate",this.state.taskList)}>Due Date</th>
														<th onClick={()=>this.getSortedListByKeyForTask("Subject",this.state.taskList)}>Subject</th>
														<th onClick={()=>this.getSortedListByKeyForTask("RelatedToObject",this.state.taskList)}>Related To</th>
														<th onClick={()=>this.getSortedListByKeyForTask("RelatedTo",this.state.taskList)}>Name</th>
														<th onClick={()=>this.getSortedListByKeyForTask("AssignedName",this.state.taskList)}>Assigned By</th>
														<th onClick={()=>this.getSortedListByKeyForTask("UserName",this.state.taskList)}>Assigned To</th>
														<th onClick={()=>this.getSortedListByKeyForTask("Priority",this.state.taskList)}>Priority</th>
														<th onClick={()=>this.getSortedListByKeyForTask("Status",this.state.taskList)}>Status</th>
													</thead>
													<tbody>
														{
															newTaskList.length ? newTaskList.map((newTaskList,index,result)=>{
																var DueDate = HelperUtil._getFormatedDate(newTaskList.DueDate).toString()


																return <tr key={index}>
																	<td>{DueDate}</td>
																	<td onClick={()=> this.getInfo(newTaskList)}><span className="opportunity-link">{newTaskList.Subject}</span></td>
																	<td>{newTaskList.RelatedToObject}</td>
																	<td>{newTaskList.RelatedTo}</td>
																	<td>{newTaskList.AssignedName}</td>
																	<td>{newTaskList.UserName}</td>
																	<td>{newTaskList.Priority}</td>
																	<td>{newTaskList.Status}</td>
																</tr>

															}): <tr><td colspan="6">No Task Record Found</td></tr>
														}
													</tbody>
												</table>
												</div>
											</div>
										</div>

									</fieldset>
									<fieldset>
										<h3>Attachment
										<div className="buttons-activity">
										<input type="file" ref={(ref) => { this.uploadInput = ref }} onChange={this.handleUploadImage.bind(this)} style={{ display: 'none' }}/>
										<a onClick={(e) => this.uploadInput.click()} className="create-new-link">Upload Files</a>


										</div>

										</h3>
										<div className="col-md-12">
											<div className="row">
												<div className="task-management-wrap">
												<table className="table record-table">
													<thead>
														<th onClick={()=>this.getSortedListByKeyAtt("AttachmentName",this.state.AttachmentList)}>Attachment Name</th>
                        								<th onClick={()=>this.getSortedListByKeyAtt("CreatedBy",this.state.AttachmentList)}>Created By</th>
                        								<th style={{width:"100px"}}>Action</th>
													</thead>
													<tbody>
														{
															this.state.AttachmentList.length ? this.state.AttachmentList.map((attachment,index,result)=>{


																return <tr key={index}>
																	<td ><span className="opportunity-link"><a href={attachment.AttachmentPath} target="_blank">{attachment.AttachmentName}</a></span></td>
																	<td>{attachment.CreatedBy}</td>
																	<td>
																		<ul className="action-buttons">
																			<li><a href="JavaScript:void(0)" onClick={()=> this.deleteAttachment(attachment.oo_id,attachment.AttachmentPath)} className="delete-record-button" ></a></li>
																		</ul>
																	</td>

																</tr>

															}): <tr><td colspan="6">No Record Found</td></tr>
														}
													</tbody>
												</table>
												</div>
											</div>
										</div>

									</fieldset>
									<div className="form-buttons">
										<a onClick={state=>this.editData(this.state)} className="edit-btn btn">Edit</a>
										<a onClick={state=>this.convertLead(this.state)} className="delete-btn btn">Convert</a>
										<a onClick={state=>this.deleteData(this.state)} className="delete-btn btn">Delete</a>


								{/*		<Link to="/leadlist"><button type="button" className="cancel-btn">Cancel</button></Link>     */}
									</div>
								</form>
							</section>


						</div>
					</div>
				</section>
			</div>

		)
	}

}
