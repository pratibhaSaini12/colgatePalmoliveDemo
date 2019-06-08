import React from "react"
import { Link } from "react-router-dom"
import RecentItems from "../LeadList/recentItems"
import ImageContainer from "../../components/imageContainer"
import Nav from "./nav"
import axios from "axios"
import cookie from "react-cookies"
import ChangeLeadStatusModal from "../../containers/LeadList/changeLeadStatusModal"
//import UserModal from "../../containers/Task/userModal"
import {validation} from '../../common/validation'
import moment from 'moment'
import DateTime from "react-datetime"
import ReactLoading from 'react-loading'


export default class LeadPage extends React.Component{

	constructor(props){
		super(props)
		this.state = {
			Salutation: "",
			FirstName: "",
			LastName: "",
			LeadOwner: cookie.load("userData").user.FirstName,
			CreatedBy: cookie.load("userData").user.FirstName,
			OwnerId: cookie.load("userData").user.oo_id,
			OwnerCheck: false,
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
			oo_id: "",
			ldstatusModalShow: false,
			userModalShow: false,
			checkedData : null,
			leadsList: [],
			leadInactiveStatus: [],
			UserList: [],
			fieldList:[],
			CountryList: [],
			isNumber : true,
			isOpen : null,
            Loading:true,
            Priority:""
		}
	}


	change(e){
		this.setState({
			[e.target.name]: e.target.value.replace("'",""),
		})
	}

	numberChange(e){
		if(this.state.isNumber){
			this.setState({
				[e.target.name]: e.target.value,
			})
		}
	}

	changeRequiredField(e){
		console.log("active>>>>trim>>>>>>>>>>>>>",e.target.value);
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	trimField(e){
		this.setState({
			[e.target.name]: e.target.value.trim().replace("'","")
		})

	}

	checkUrl(e){
		let string
		if (e.target.value !='' && e.target.value.indexOf("http") == -1) {
			console.log("No http");
	 string = "http://" + e.target.value.trim()

	 this.setState({
		 [e.target.name]: string
	 })
 }


	}

	onSubmit(){

		console.log("dddd - ",this.state)



		let check = createform.reportValidity()
		if(!check)
		{
			return
		}
		if(this.state.oo_id === ""){

	    	if(this.state.OwnerId == "")
			{
             this.setState({
							OwnerCheck: true
						})
			}
			else {
				let self = this
				axios.post("api/createlead",self.state).then(function (response) {
					if(response.status== 200){
						// self.props.listprops.history.push("/leadlist");
						self.props.listprops.history.push({
							pathname : "/lead",
							state : {disableLeadProps: response.data.lead}
						})
					}
				}).catch(function (error) {
					console.log("ereeeeeeeeeor",error)
				})
			}

		}else{
			let self = this

			axios.post("api/editlead",self.state).then(function (response) {
				if(response.data.status= 200){
					console.log("fdfsdffsdfs")
					// self.props.listprops.history.push("/leadlist");
					self.props.listprops.history.push({
						pathname : "/lead",
						state : {disableLeadProps: self.state}
					})
				}
			}).catch(function (error) {
				console.log("ereeeeeeeeeor",error)
			})
		}
	}

	onSaveNew(){
		let check = createform.reportValidity()
		if(!check)
		{
			return
		}

		if(this.state.OwnerId == "")
		{
					this.setState({
						OwnerCheck: true
					})
		}
		else {
			this.state.Description=this.state.Description.replace("'","\ '");
    		axios.post("api/createlead",this.state).then(function (response) {
			if(response.data.status= 200){
				console.log("fdfsdffsdfs")
				// self.props.history.push("/lead");
			}
		}).catch(function (error) {
			console.log("ereeeeeeeeeor",error)
		})


		this.setState({
			Salutation: "",
			FirstName: "",
			LastName: "",
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
			Priority:"",
			OwnerCheck: false,
			NoOfEmployees:"",
			Street: "",
			LeadOwner: cookie.load("userData").user.FirstName,
			OwnerId: cookie.load("userData").user.oo_id,
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
			userModalShow: false
		})

	}

	}



	getTitle (e){
		this.setState({
			Salutation: e.target.value.replace("/'\/g","\\'")
		})
	}

	getData(e){
		e.preventDefault()

		this.setState({ userModalShow: true })
	}

	getUserName(user) {

		this.setState({
			LeadOwner: user.Name,
			OwnerId: user.Id,
			OwnerCheck: false,
			userModalShow: false
		})
	}

	getIndustryType (e){
		this.setState({
			Industry: e.target.value
		})
	}



	getLeadStatus (e){
		this.setState({
			LeadStatus: e.target.value.replace("/'\/g","\\'")
		})
	}

	getLeadSource (e){
		console.log("daddasd ",e.target.value)
		this.setState({
			LeadSource: e.target.value.replace("/'\/g","\\'")
		})
	}
    
    getPriority (e){
		this.setState({
			Priority: e.target.value
		})
	}

	getProductInterest (e){
		this.setState({
			ProductInterest: e.target.value.replace("/'\/g","\\'")
		})
	}

	getPrimaryData (e){
		this.setState({
			Primary: e.target.value.replace("/'\/g","\\'")
		})
	}

	getCountryName (e){
		this.setState({
			Country: e.target.value.replace("/'\/g","\\'")
		})
	}

	checkbox (e){
		this.setState({
			Optional: e.target.checked
		})
	}

	confirm(){
		console.log("data received")
		this.setState({
			ldstatusModalShow : true,
			checked_data: this.state
		})

	}

	leadInactiveStatus(){

		console.log("hello aftererr deteteletetete")
		var _this = this
		axios.get("/api/leadlistinactivestatus")
			.then(function(res){
				_this.setState({
					leadInactiveStatus: res.data.leads
				})
			})
			.catch(function(e) {
				console.log("ERROR ",e)
			})
	}

	componentDidMount() {
		var _this = this
		_this.getUserList()
		_this.getCountryList()
		_this.getDropDowndata()
		let userData = cookie.load("userData")
		let token = userData?userData.token: null
		axios.get("/api/leadlist?token="+token)
			.then(function(res){
				console.log("in responseeeee>>>>>>>>>>>>>>>>>>>>>>>.",res)
				if(res.status==200&& !res.data.error){
					_this.setState({
						leadsList: res.data.leads,
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


	componentWillMount (){
   let self =this

		const {leadsDetail} = self.props
		console.log("props of edit lead is ",validation)
		console.log("leadsDetail is ",leadsDetail)
		if(leadsDetail === undefined){

		}else{
			axios.get('api/getLeadById?oo_id='+leadsDetail).then(function (response) {

					if(response.status == 200){


						let leadsDetails = response.data.lead[0]
								console.log('lead Detail  -- in will mountntnntntnnt', leadsDetails);
						self.setState({
							Salutation: leadsDetails.Salutation == "undefined" ? "": leadsDetails.Salutation,
							FirstName: leadsDetails.FirstName == "undefined" ? "":leadsDetails.FirstName,
							LastName: leadsDetails.LastName== "undefined" ? "": leadsDetails.LastName,
							LeadOwner: leadsDetails.LeadOwner== "undefined" ? "": leadsDetails.LeadOwner,
							Company: leadsDetails.Company== "undefined" ? "" : leadsDetails.Company,
							Title: leadsDetails.Title== "undefined" ? "" : leadsDetails.Title,
							OtherPhone: leadsDetails.OtherPhone== "undefined" ? "" : leadsDetails.OtherPhone,
							Industry: leadsDetails.Industry== "undefined" ? "" : leadsDetails.Industry,
							AnnualRevenue: leadsDetails.AnnualRevenue== "undefined" ? "" : leadsDetails.AnnualRevenue,
							Phone:leadsDetails.Phone== "undefined" ? "" : leadsDetails.Phone,
							Mobile: leadsDetails.Mobile== "undefined" ? "" : leadsDetails.Mobile,
							Fax: leadsDetails.Fax== "undefined" ? "" : leadsDetails.Fax,
							email:leadsDetails.email== "undefined" ? "" : leadsDetails.email,
							Website:leadsDetails.Website== "undefined" ? "" : leadsDetails.Website,
							LeadStatus: leadsDetails.LeadStatus== "undefined" ? "" : leadsDetails.LeadStatus,
							LeadSource: leadsDetails.LeadSource== "undefined" ? "" : leadsDetails.LeadSource,
							Priority: leadsDetails.Priority== "undefined" ? "" : leadsDetails.Priority,
							NoOfEmployees:leadsDetails.NoOfEmployees== "undefined" ? "" : leadsDetails.NoOfEmployees,
							Street: leadsDetails.Street== "undefined" ? "" : leadsDetails.Street,
							City: leadsDetails.City== "undefined" ? "" : leadsDetails.City,
							State: leadsDetails.State== "undefined" ? "" : leadsDetails.State,
							Country: leadsDetails.Country== "undefined" ? "" : leadsDetails.Country,
							Zip: leadsDetails.Zip== "undefined" ? "" : leadsDetails.Zip,
							YearFounded: leadsDetails.YearFounded== "undefined" ? "" : leadsDetails.YearFounded,
							Description: leadsDetails.Description== "undefined" ? "" : leadsDetails.Description,
							oo_id: leadsDetails.oo_id== "undefined" ? "" : leadsDetails.oo_id
						})

					}
				}).catch(function (error) {

					});

		}

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

 getCountryList(){
	 let self=this
	 axios.get("api/getCountryList").then(function (response) {
		 if(response.status==200){
			 self.setState({
				 CountryList:response.data.country
			 })
		 }
	 }).catch(function (error) {

	 })
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
					_this.props.listprops.history.push("/")
				}

			})
			.catch(function(err) {
				console.log("ERROR insideeeeeeeeeeeeeeee",err)
			})

	}



	getSalesOwner(e) {
		this.setState({
			LeadOwner: e.target.value,
			OwnerId: ""
		})
	}

	hideModal(hide) {
		console.log('hidemodalll clearrrrr callleddddddddddddddd',hide);
		this.setState({
			userModalShow: false
		})
	}

	onCancel(){
		let self = this
		let data = {oo_id: self.props.leadsDetail}
		if(self.state.oo_id){
			self.props.listprops.history.push({
				pathname : "/lead",
				state : {disableLeadProps: data}
			})
		}else{
			self.props.listprops.history.push("/leadlist")

		}
	}

	 isNumber(evt) {

	    var charCode = (evt.which) ? evt.which : evt.keyCode;
	    if ((charCode >= 48 &&  charCode <=57 ) || charCode == 43 || charCode==8 || charCode == 46) {
	    	this.setState({isNumber : true});
	        return true;
	    }
	    this.setState({isNumber : false});
	    return false;
	}

	yearChange(e){
		if(e._isAMomentObject){
			this.setState({
				YearFounded: e.format('YYYY'),
			})
		}
	}


	render() {
		var defaultDate = this.state.YearFounded?moment(this.state.YearFounded):'';
		var yesterday = moment().subtract( 1, 'day' );
var valid = function( current ){
    return current.isBefore( yesterday );
};
		let lgStatusModalClose = () => this.setState({ ldstatusModalShow: false })
		let modal = <ChangeLeadStatusModal show={this.state.ldstatusModalShow}  checked_data= {this.state.checked_data} modalProps = {this.props.listprops} onHide={lgStatusModalClose}/>
    let closeUserModel = () => this.setState({ userModalShow: false })
		let UserModel
		let styleWrngPasswordConst= [{display : this.state.OwnerCheck?"block":"none",color:"#FF0000"}]
		if(this.state.userModalShow){
			//UserModel = <UserModal LeadOwner={this.state.LeadOwner} show={this.state.userModalShow} modalProps = {this.state.UserList} quickCreateUserProps={this.getUserName.bind(this)} onHide={closeUserModel} hideModal={this.hideModal.bind(this)}/>
		}

		const industryArray = []
		const sourceArray = []
		const statusArray = []
		const priorityArray = []
		const industryIndexArray=[]
		const sourceIndexArray=[]
		const statusIndexArray=[]
		const priorityIndexArray=[]

		this.state.fieldList.map((result,i)=>{
			if(result.FieldName=="Industry"){
				industryArray.push(result)
			}if(result.FieldName=="LeadSource"){
				sourceArray.push(result)
			}if(result.FieldName=="LeadStatus"){
				statusArray.push(result)
			}
			if(result.FieldName=="Priority"){
				priorityArray.push(result)
			}
		})

		for(var i=0;i<industryArray.length;i++)
		{
			industryArray.map((result,index)=>{
				if(result.keyValue== i){
					var opt = document.createElement('option');
          opt.value = result.FieldValue;
					industryIndexArray.push(opt)
				}
			})
		}

		for(var i=0;i<sourceArray.length;i++)
		{
			sourceArray.map((result,index)=>{
				if(result.keyValue== i){
					var opt = document.createElement('option');
          opt.value = result.FieldValue;
					sourceIndexArray.push(opt)
				}
			})
		}

		for(var i=0;i<priorityArray.length;i++)
		{
			priorityArray.map((result,index)=>{
				if(result.keyValue== i){
					var opt = document.createElement('option');
          opt.value = result.FieldValue;
					priorityIndexArray.push(opt)
				}
			})
		}

		for(var i=0;i<statusArray.length;i++)
		{
			statusArray.map((result,index)=>{
				if(result.keyValue== i){
					var opt = document.createElement('option');
          opt.value = result.FieldValue;
					statusIndexArray.push(opt)
				}
			})
		}

		console.log('this.state.oo_id>>>>>>>>>>>>>>>idddddddddd',this.state);
		return (
			<div className="wrapper">
				<section id="main">
					<div className="container-fluid">
					{this.state.Loading== true &&	<div className="loader-react">
							<ReactLoading type="spokes" color="#000"/>
						</div> }
						<div className="row">
							<nav className="left-navigation col-md-2">
								<RecentItems leadsList = {this.state.leadsList} recentProps={this.props.listprops}/>
							</nav>
							<section id="main-dashboard" className="main-dashboard col-md-10">
								<h2><span className="pull-right required-info"><span className="aestrick">*</span> Required Information</span></h2>
								<form name="createform" className="lead-form" >
									<div className="form-buttons">
										<button type="button" id="save1" className="submit-btn" onClick={this.onSubmit.bind(this)}>{this.state.oo_id === "" ? "Save" : "Save"}</button>
										<button type="button" id="save_new1" className={this.state.oo_id === ""  ? "save-new-btn" : "d-none"  } onClick={this.onSaveNew.bind(this)}>{this.state.oo_id === "" ? "Save & New" : " "}</button>
										<button type="button" onClick={this.onCancel.bind(this)} className="cancel-btn">Cancel</button>
									</div>
									<fieldset>
										<h3>Lead Information</h3>


										<div className="col-md-12">
											<div className="row">
												<div className="col-lg-5 col-md-12 col-sm-12 col-12">
													<div className="form-group">
														<label>Salutations</label>
														<div className="">

															<select className="salutation-select form-control" value= {this.state.Salutation} onChange= {e => this.getTitle(e)}>
																<option vaue="None">None</option>
																<option vaue="Mr">Mr</option>
																<option vaue="Miss">Miss</option>
																<option vaue="Mrs">Mrs</option>
																<option vaue="Other">Other</option>
															</select>
														</div>
													</div>
												</div>

												<div className="col-lg-5 col-md-12 col-sm-12 col-12 ml-auto float-right">
													<div className="form-group form-group-account-opportunity-create form-group-account-create">
														<label>Sales Owner<span className="aestrick">*</span></label>
														<div className="buttonInside">
															<input required type="text" id="userName" name="User" onChange={(e)=>this.getSalesOwner(e)} value={this.state.LeadOwner}/>
															<button type="button" onClick={this.getData.bind(this)}></button>
															<span style={styleWrngPasswordConst[0]}>Please Select Sales Owner From Lookup</span>
														</div>
													</div>
												</div>




											</div>
										</div>
										<div className="col-md-12">
											<div className="row">
											<div className="col-lg-5 col-md-12 col-sm-12 col-12">
												<div className="form-group">
													<label>First Name<span className="aestrick">*</span></label>
													<input required type="text" name="FirstName" id="FirstName" className="form-control req" className="form-control" placeholder="First Name" value={this.state.FirstName} onChange={e => this.changeRequiredField(e)} onBlur={(e) => this.trimField(e)}/>
												</div>
											</div>

												<div className="col-lg-5 col-md-12 col-sm-12 col-12 ml-auto float-right">
													<div className="form-group">
														<label>Last Name<span className="aestrick">*</span></label>
														<input required type="text" name="LastName" id="LastName" className="form-control req" className="form-control" placeholder="Last Name" value={this.state.LastName} onChange={e => this.changeRequiredField(e)} onBlur={(e) => this.trimField(e)}/>
													</div>
												</div>


											</div>
										</div>
										<div className="col-md-12">
											<div className="row">
												<div className="col-lg-5 col-md-12 col-sm-12 col-12">
													<div className="form-group">
														<label>Title<span className="aestrick">*</span></label>
														<input required type="text" name="Title" id="Title" className="form-control req" className="form-control" placeholder="Title" value={this.state.Title} onChange={e => this.changeRequiredField(e)} onBlur={(e) => this.trimField(e)}/>
													</div>
												</div>

												<div className="col-lg-5 col-md-12 col-sm-12 col-12  ml-auto float-right">
													<div className="form-group">
														<label>Email<span className="aestrick">*</span></label>
														<input required type="email" name="email" id="email" className="form-control req" className="form-control" placeholder="email"  value={this.state.email} onChange={e => this.changeRequiredField(e)} onBlur={(e) => this.trimField(e)}/>
													</div>
												</div>
												</div>
										</div>
										<div className="col-md-12">
											<div className="row">
											<div className="col-lg-5 col-md-12 col-sm-12 col-12">
												<div className="form-group form-group-mail">
													<label>Office Phone</label>
													<input type="text" name="Phone" id="Phone" pattern={validation.number} className="form-control" placeholder="Phone" value={this.state.Phone} onChange={e => this.numberChange(e)} onKeyPress={event=> this.isNumber(event)} onKeyDown={event=> this.isNumber(event)}/>
												</div>
											</div>

											<div className="col-lg-5 col-md-12 col-sm-12 col-12 ml-auto float-right">
												<div className="form-group">
													<label>Mobile Phone</label>
													<input type="text" name="Mobile" id="Mobile" className="form-control" pattern={validation.number} placeholder="Mobile" value={this.state.Mobile} onChange={e => this.numberChange(e)} onKeyPress={event=> this.isNumber(event)} onKeyDown={event=> this.isNumber(event)}/>
												</div>
											</div>


										</div>
										</div>
										<div className="col-md-12">
											<div className="row">
											<div className="col-lg-5 col-md-12 col-sm-12 col-12">
												<div className="form-group">
													<label>Fax Number</label>
													<input type="text" name="Fax" id="Fax" className="form-control" pattern={validation.number} placeholder="Fax" value={this.state.Fax}  onChange={e => this.numberChange(e)} onKeyPress={event=> this.isNumber(event)} onKeyDown={event=> this.isNumber(event)}/>
												</div>
											</div>

											<div className="col-lg-5 col-md-12 col-sm-12 col-12 ml-auto float-right">
												<div className="form-group">
													<label>Other Phone</label>
													<input  type="text" id="OtherPhone" name="OtherPhone" pattern={validation.number} className="form-control" placeholder="OtherPhone" value={this.state.OtherPhone} onChange={e => this.numberChange(e)} onKeyPress={event=> this.isNumber(event)} onKeyDown={event=> this.isNumber(event)}/>
												</div>
											</div>
											</div>
										</div>
										<div className="col-md-12">
											<div className="row">
											<div className="col-lg-5 col-md-12 col-sm-12 col-12">
												<div className="form-group">
													<label>Company<span className="aestrick">*</span></label>
													<input required type="text" name="Company" id="Company" className="form-control req" className="form-control" placeholder="Company" value={this.state.Company} onChange={e => this.changeRequiredField(e)} onBlur={(e) => this.trimField(e)}/>
												</div>
											</div>
											<div className="col-lg-5 col-md-12 col-sm-12 col-12 ml-auto float-right">
												<div className="form-group">
													<label>Industry</label>
													<div className="">
														<select className="industry-select form-control" value = {this.state.Industry} onChange= {e => this.getIndustryType(e)}>
														<option value=''>Select</option>
														{
															industryIndexArray.map((result,i)=>{
																return <option  value={result.value} >{result.value}</option>
															})
														}

														</select>
													</div>
												</div>
											</div>

											</div>
										</div>
										<div className="col-md-12">
											<div className="row">
											<div className="col-lg-5 col-md-12 col-sm-12 col-12">
												<div className="form-group">
													<label>Year Founded</label>
													<DateTime inputProps={{readOnly:true}} onToggle={isOpen => this.setState({isOpen: isOpen})} open={this.state.isOpen} value={defaultDate} onChange={this.yearChange.bind(this)} isValidDate={ valid } viewMode = 'years' dateFormat = 'YYYY'/>
												</div>
											</div>

											<div className="col-lg-5 col-md-12 col-sm-12 col-12 ml-auto float-right">
												<div className="form-group">
													<label>Revenue last year</label>
													<input type="text" name="AnnualRevenue" pattern={validation.number} className="form-control" placeholder="Annual Revenue" value={this.state.AnnualRevenue} onChange={e => this.numberChange(e)} onKeyPress={event=> this.isNumber(event)} onKeyDown={event=> this.isNumber(event)}/>
												</div>
											</div>




											</div>
										</div>
										<div className="col-md-12">
											<div className="row">
											<div className="col-lg-5 col-md-12 col-sm-12 col-12">
												<div className="form-group">
													<label>Website</label>
													<input type="url" placeholder="www.example.com" name="Website" className="form-control" value={this.state.Website} onChange={e => this.change(e)} onBlur={(e) => this.checkUrl(e)}/>
												</div>
											</div>
											<div className="col-lg-5 col-md-12 col-sm-12 col-12 ml-auto float-right">
												<div className="form-group">
													<label>No. of Employees</label>
													<input type="text" pattern={validation.number} name="NoOfEmployees" className="form-control" placeholder="No. of Employees" value={this.state.NoOfEmployees} onChange={e => this.numberChange(e)} onKeyPress={event=> this.isNumber(event)} onKeyDown={event=> this.isNumber(event)}/>
												</div>
											</div>



											</div>
										</div>

										<div className="col-md-12">
											<div className="row">
											<div className="col-lg-5 col-md-12 col-sm-12 col-12">
												<div className="form-group">
													<label>Lead Source<span className="aestrick">*</span></label>

													<select className="industry-select form-control" required value = {this.state.LeadSource} onChange= {e => this.getLeadSource(e)}>
													<option value=''>Select</option>
													{
														sourceIndexArray.map((result,i)=>{
															return <option  value={result.value} >{result.value}</option>
														})
													}
													</select>

												</div>
											</div>

											<div className="col-lg-5 col-md-12 col-sm-12 col-12 ml-auto float-right">
												<div className="form-group">
													<label>Lead Status<span className="aestrick">*</span></label>
													<div className="">
														<select className="industry-select form-control" required value = {this.state.LeadStatus} onChange= {e => this.getLeadStatus(e)}>
														<option value=''>Select</option>
														{
															statusIndexArray.map((result,i)=>{
																return <option  value={result.value} >{result.value}</option>
															})
														}
														</select>
													</div>
												</div>
											</div>
											</div>
											</div>

                                            <div className="col-md-12">
												<div className="row">
													<div className="col-lg-5 col-md-12 col-sm-12">
														<div className="form-group">
															<label>Priority</label>
															<div className="">
																<select className="project-type-select form-control" value={this.state.Priority} onChange= {e => this.getPriority(e)}>
		                             								<option value=''>Select</option>
																	{
																		priorityIndexArray.map((result,i)=>{
															         	return <option  value={result.value} >{result.value}</option>
																		})
																	}
																</select>
															</div>
														</div>
													</div>
												</div>
											</div>
											<div className="col-md-12">
												<div className="row">
													<div className="col-md-12 col-sm-12">
														<div className="form-group form-group-textarea">
															<label>Description/Notes</label>
															<textarea className="form-control" name="Description" placeholder="Description"  width="" rows="2" cols="27" value={this.state.Description} onChange={e => this.change(e)} onBlur={(e) => this.trimField(e)}></textarea>

														</div>
													</div>
												</div>
											</div>
									</fieldset>
									<fieldset>
										<h3>Address Information</h3>
										<div className="col-md-12">
											<div className="row">
												<div className="col-lg-5 col-md-12 col-sm-12 col-12">
													<div className="form-group">
														<label>Street</label>
														<input type="text" name="Street" className="form-control" placeholder="Street" value={this.state.Street} onChange={e => this.change(e)} onBlur={(e) => this.trimField(e)}/>
													</div>
												</div>
												<div className="col-lg-5 col-md-12 col-sm-12 col-12 ml-auto float-right">
													<div className="form-group">
														<label>City</label>
														<input type="text" name="City" className="form-control" placeholder="City" value={this.state.City} onChange={e => this.change(e)} onBlur={(e) => this.trimField(e)}/>
													</div>
												</div>

											</div>
										</div>
										<div className="col-md-12">
											<div className="row">
												<div className="col-lg-5 col-md-12 col-sm-12 col-12">
													<div className="form-group">
														<label>State</label>
														<input type="text" name="State" className="form-control" placeholder="State" value={this.state.State} onChange={e => this.change(e)} onBlur={(e) => this.trimField(e)}/>
													</div>
												</div>
												<div className="col-lg-5 col-md-12 col-sm-12 col-12 ml-auto float-right">
													<div className="form-group">
														<label>Zip/Postal Code</label>
														<input type="text" name="Zip" className="form-control" placeholder="Zip/Postal Code" value={this.state.Zip} onChange={e => this.change(e)} onBlur={(e) => this.trimField(e)}/>
													</div>
												</div>
											</div>
										</div>
										<div className="col-md-12">
											<div className="row">
												<div className="col-lg-5 col-md-12 col-sm-12 col-12">
													<div className="form-group">
														<label>Country</label>
														<div className="">
															<select className="industry-select form-control" value = {this.state.Country} onChange= {e => this.getCountryName(e)}>
															<option value=''>Select</option>
															{
																this.state.CountryList.map((result,i)=>{
																	return <option value={result.country_name}>{result.country_name}</option>
																})
															}
															</select>
														</div>
													</div>
												</div>
											</div>
										</div>
									</fieldset>
									<div className="form-buttons">
										<button type="button" id="save2" className="submit-btn" onClick={this.onSubmit.bind(this)}>{this.state.oo_id === "" ? "Save" : "Save"}</button>
										<button type="button" id="save_new2" className={this.state.oo_id === ""  ? "save-new-btn" : "d-none"  } onClick={this.onSaveNew.bind(this)}>{this.state.oo_id === "" ? "Save & New" : " "}</button>
									<button type="button" onClick={this.onCancel.bind(this)} className="cancel-btn">Cancel</button>
									</div>
								</form>
							</section>
						</div>
					</div>
				</section>
				{modal}
				{UserModel}
			</div>

		)
	}

}
