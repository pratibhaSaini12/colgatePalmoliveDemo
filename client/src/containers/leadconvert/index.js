import React from "react"
import ConvertLeadModal from "./convertLeadModal"
import axios from "axios"
import Header from "../../common/Header"
import Footer from "../../common/Footer"
import { Link } from "react-router-dom"
import cookie from "react-cookies"
import RecentItems from "../../containers/LeadList/recentItems"
import ReactLoading from 'react-loading'

export default class ConvertLead extends React.Component{
	constructor(props) {
		super(props)


		this.setOppName=this.setOppName.bind(this)
		this.state = {
			AccountName: "",
			FirstName: "",
			AccountList: [],
			OpprtunityName:"",
			leadsList: [],
			oyaccountModalShow: false,
			ContactName: "",
			LastName: "",
			Salutation: "",
			Title: "",
			Industry: "",
			AnnualRevenue: "",
			Phone:"",
			Mobile: "",
			Fax: "",
			OtherPhone: "",
			email:"",
			Street: "",
			City: "",
			State: "",
			Country: "",
			Zip: "",
			Company: "",
			Website:"",
			NoOfEmployees:"",
			AnnualRevenue: "",
			Stage: "Qualified",
			Probability: "10",
			LeadSource: "",
			LeadStatus: "",
			Description: "",
			YearFounded: "",
			AttachmentList: [],
			Account_ooId: "",
			Owner: "",
			CurrentGenerator: "",
			inputAccountName: '',
			oo_id: '',
			Loading:true,
			Priority:""
		}
		this.getSelectedAccountName = this.getSelectedAccountName.bind(this)
		this.getData = this.getData.bind(this)

	}
	componentDidMount() {
		console.log("=====start componentDidMount in index page of leadconvert======")

		var _this = this
		_this.getLeadList()
		var convertProps = _this.props.location.state
		console.log("=====convertProps in index page of leadconvert======",convertProps.checked_data.AttachmentList)
		let userData = cookie.load("userData")
	  let token = userData?userData.token: null
	  let ownerName = userData?userData.user.FirstName: null
		if(convertProps!=undefined)
		{
			_this.setState({
				AccountName:convertProps.checked_data.Company,
				OpprtunityName : convertProps.checked_data.Company,
				ContactName : convertProps.checked_data.FirstName,
				LastName: convertProps.checked_data.LastName,
				FirstName: convertProps.checked_data.FirstName,
				Salutation: convertProps.checked_data.Salutation,
				Title: convertProps.checked_data.Title,
			    Industry: convertProps.checked_data.Industry,
			    AnnualRevenue: convertProps.checked_data.AnnualRevenue,
			    Phone: convertProps.checked_data.Phone,
			    Mobile: convertProps.checked_data.Mobile,
			    Fax: convertProps.checked_data.Fax,
			    OtherPhone: convertProps.checked_data.OtherPhone,
			    email:convertProps.checked_data.email,
			    Street: convertProps.checked_data.Street,
			    City: convertProps.checked_data.City,
			    State: convertProps.checked_data.State,
			    Country: convertProps.checked_data.Country,
			    Zip: convertProps.checked_data.Zip,
				Company: convertProps.checked_data.Company,
				Website: convertProps.checked_data.Website,
				NoOfEmployees: convertProps.checked_data.NoOfEmployees,
				YearFounded: convertProps.checked_data.YearFounded,
				AnnualRevenue: convertProps.checked_data.AnnualRevenue,
				LeadSource: convertProps.checked_data.LeadSource,
				LeadStatus: convertProps.checked_data.LeadStatus,
				Description: convertProps.checked_data.Description,
				CreatedBy: convertProps.checked_data.CreatedBy,
				Owner: ownerName,
				oo_id: convertProps.checked_data.oo_id,
				CurrentGenerator: convertProps.checked_data.CurrentGenerator,
                AttachmentList: convertProps.checked_data.AttachmentList,
                Priority: convertProps.checked_data.Priority
			})

		}

		axios.get("/api/accountlist?token="+token)
			.then(function(res) {

				_this.setState({
					AccountList: res.data.account,
					Loading:false
				})
			}).catch((err) => {

			})
        console.log("=====End componentDidMount======")
	}

	getLeadList() {
		    console.log("====start getLeadList======")
			var _this = this
			let userData = cookie.load("userData")
			let token = userData?userData.token: null
			axios.get("/api/leadlist?token="+token)
			.then(function(res){
			console.log("in responseeeee>>>>>>>>>>>>>>>>>>>>>>>.",res)
			if(res.status==200&& !res.data.error){
			_this.setState({
			leadsList: res.data.leads
			})
			}else{
			console.log("no responseeeeeeeeeeeeee")
			_this.props.listprops.history.push("/")
			}

			})
			.catch(function(err) {
			console.log("ERROR insideeeeeeeeeeeeeeee",err)
			})
        console.log("====End getLeadList======")
	}

	getData(e) {
		console.log("=====start getData========")

		e.preventDefault()
		this.setState({
			oyaccountModalShow: true
		})
     console.log("=====End getData========")
	}

	getAccountName(e) {
		console.log("=====start getAccountName========")
		console.log('e.targert.value>>>>>>>>>>>>>>>><<<<<<<<<<<<<<',e.target.value);
		this.setState({
			AccountName: e.target.value
		})
		console.log("====end getAccountName=======")
	}

	getSelectedAccountName(account) {
        console.log("=====start getSelectedAccountName======")
		this.setState({
			AccountName: account.AccountName,
			Account_ooId: account.AccountId,
			oyaccountModalShow: false
		})
		console.log("=====End getSelectedAccountName======")
	}

	convertLead() {
        console.log("=====start convertLead======",this.state.Loading)
        let _this = this
        _this.setState({
					Loading: true

				})
        let data_create_opportunity = this.state
		let lead_oo_id = {
			lead_oo_id: this.props.location.state.checked_data.oo_id
		}
		let data_create_opportunity_contact = Object.assign(data_create_opportunity, lead_oo_id)
		//    var o3 = { c: 3 };
		//
		// var obj = Object.assign(o1, o2, o3);
        console.log("==========1==data_create_opportunity=====",data_create_opportunity)
        console.log("==========2==data_create_opportunity_contact=====",data_create_opportunity_contact)
		axios.post("api/createOpportunityContactAccount", data_create_opportunity_contact).then(function(response) {
			if (response.data.status = 200) {
          console.log("Opp IDD in index.js of leadcovert page -- ",response.data.leads);
          console.log("Opp IDD data in index.js of leadcovert page -- ",response.data);
					_this.props.history.push({
						pathname : "/opportunity",
						state : {dispalyOpprtunityDisableMode: response.data.leads}
					})
			}
		}).catch(function(error) {

		})

    console.log("=====End convertLead======",this.state.Loading)
	}

	setOppName(e) {

		let opprtunityname= e.target.value
		this.setState({
			OpprtunityName: opprtunityname
		})
	}

	onCancel(){
		let self = this
		let data = {oo_id : self.state.oo_id}
			self.props.history.push({
				pathname : "/lead",
				state : {disableLeadProps: data}
			})
		}

	render() {


		let oyaccountModalClose = () => this.setState({
			oyaccountModalShow: false
		})
		let OpportunityModal
		if (this.state.oyaccountModalShow) {

			OpportunityModal = < ConvertLeadModal AccountName={this.state.AccountName} show = {
				this.state.oyaccountModalShow
			}
			modalProps = {
				this.state.AccountList
			}
			accountName = {
				this.state.AccountName
			}
			quickCreateAccountProps = {
				this.getSelectedAccountName
			}
			onHide = {
				oyaccountModalClose
			}
			/>
		}
		let array1 = []

		if (this.state.AccountList.length) {
			{
				this.state.AccountList.map((accounts, index) => {

					array1.push({
						"label": accounts.AccountName
					})

				})

			}
		}

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
									<RecentItems leadsList = {this.state.leadsList} recentProps={this.props}/>
							</nav>
							<section id="main-dashboard" className="main-dashboard col-md-10">
								<h2>Convert Lead<span className="pull-right required-info"><span className="aestrick">*</span> Required Information</span></h2>

								<form name="createform" className="lead-form" >
								<div className="form-buttons">
								<a onClick={this.convertLead.bind(this)} className="edit-btn btn">Save</a>
								<button type="button" onClick={this.onCancel.bind(this)} className="cancel-btn">Cancel</button>
								</div>
									<fieldset>
										<h3>Lead Information</h3>

										<div className="col-md-12">
											<div className="row">
												<div className="col-md-5 col-sm-5">
													<div className="form-group">
														<label>Opportunity Name</label>
														<input required type="text" value={this.state.OpprtunityName} onChange={e => this.setOppName(e)} />
													</div>
												</div>
												<div className="col-md-5 col-sm-5 ml-auto float-right">

                          	<div className="form-group form-group-account-opportunity-create form-group-account-create">
                          		<label>Account Name</label>
	                          	<div className="buttonInside">
	                 				<input required type="text" value={this.state.AccountName} onChange={(e)=>this.getAccountName(e)}/>
	                  				<button type="button" onClick={(e)=>this.getData(e)}></button>
	                   			</div>
	                   		</div>

												</div>
											</div>
										</div>
										<div className="form-buttons">
											<a onClick={this.convertLead.bind(this)} className="edit-btn btn">Save</a>
											<button type="button" onClick={this.onCancel.bind(this)} className="cancel-btn">Cancel</button>
										</div>
									</fieldset>


								</form>
							</section>
						</div>
					</div>

				</section>
				{OpportunityModal}

				<Footer/>
			</div>
		)
	}
}
