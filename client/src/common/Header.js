import React, { Component } from "react"
import { Link } from "react-router-dom"
import cookie from "react-cookies"
import axios from "axios"
import Cookies from 'universal-cookie';
import * as HelperUtil from '../util/common-helper'
class Header extends Component {
	constructor(props)
	{
		super(props)
		this.state = {
			count: "",
			firstname:"",
			lastname :"",
			role:"",
			oo_id:"",
			image:"",
			account : false,
			opportunity:false,
			lead:false,
			contact:false,
			report:false,
			invoice:false,
			project:false,
			resource:false,
			active:true,
			email:"",
			togglestate: false
		}

	}
	componentWillReceiveProps(nextProps) {
		if(cookie.load("userData")==undefined)
			window.location.href = '/'
		 HelperUtil.updateCookieTime();
	}

	componentWillMount (){
		let self = this
		let userData = cookie.load("userData");
		if(!(cookie.load("userData")))
			window.location.href = '/'
		 HelperUtil.updateCookieTime();
		console.log("userData us ",userData);
		const cookies = new Cookies();
		console.log("eheheheheheh ",cookies.get('userrr'))
		let id = userData !=undefined?userData.user.oo_id:null
		axios.get("api/getNotification?UserId="+id).then(function (response) {

			if(response.status==200){

				self.setState({
					count: response.data.user
				})
			}
		}).catch(function (error) {

		})

		if(!(userData==undefined)){
			var user = userData.user

			if(!(user==undefined)){
				this.setState({
					firstname:user.FirstName==undefined?"":user.FirstName,
					lastname :user.LastName==undefined?"":user.LastName,
					role : user.Role==undefined?"":user.Role,
					oo_id:user.oo_id==undefined?"":user.oo_id,
					image:user.Image==undefined?'':user.Image,
					account : user.AccountObject==undefined ? false :(user.AccountObject.data==1?true:false),
					opportunity: user.OpportunityObject== undefined ? false: (user.OpportunityObject.data==1?true:false),
					contact: user.ContactObject== undefined ? false: (user.ContactObject.data==1?true:false),
					project: user.ProjectObject== undefined ? false: (user.ProjectObject.data==1?true:false),
					invoice: user.InvoiceObject== undefined ? false: (user.InvoiceObject.data==1?true:false),
					lead: user.LeadObject== undefined ? false: (user.LeadObject.data==1?true:false),
					resource: user.ResourceObject== undefined ? false: (user.ResourceObject.data==1?true:false),
					report: user.ReportObject== undefined ? false: (user.ReportObject.data==1?true:false),
					email : user.email==undefined?"":user.email,
					active : user.Active==undefined?false:(user.Active.data==1?true:false),
				})

			}
		}

	}

	getTaskInfo (){
		let self = this
		let userData={userId: cookie.load("userData").user.oo_id}
		axios.post("api/updateNotfication",userData).then(function (response) {
			if(response.status==200){
				window.location.href="/task"
			}
		}).catch(function (error) {

		})

	}

	signOutUser() {

		let userId = cookie.load("userId")
		cookie.remove("userId")
		cookie.remove("userData")
		window.location.href="/"
	}

	toogleClass() {
		this.setState({
			togglestate:!this.state.togglestate,
		})
		if(!this.state.togglestate) {
			document.getElementById("lgoutUl").style.display = "block"
		}else{
			document.getElementById("lgoutUl").style.display = "none"
		}
	}

	toogleOutClass() {
		document.getElementById("lgoutUl").style.display = "none"
	}



	render(){
		let firstName = this.state.firstname
		let lastName = this.state.lastname
		var charCode = '';
		if(firstName){
			 charCode = firstName[0].toUpperCase()
		}
		if(lastName){
			charCode = charCode+lastName[0].toUpperCase()
		}
		let image = this.state.image
		return (
			<header id="dashboard-header">
				<div className="header-top" id="header-top">
					<div className="container-fluid">
						<div className="row">
							<div className="col-md-4 col-sm-4 col-4">
								<a className="logo-dashboard pull-left"><img src="images/logo.png" alt="PIMCORE" /></a>
							</div>
							<div className="col-md-8 col-sm-8 col-8 ml-auto float-right">
								<div className="header-right pull-right">

									<ul className="header-user-menu">
										<li>
											<a href="/profile" className="header-user-avatar">
											<span className="d-none d-sm-block">{firstName+" "+lastName}</span>
											{image==''?<span className="user-initials">{charCode}</span>:
											<img src={image} height="50px" width="50px"/>}
											</a>
										</li>
									   <li><a className="header-notification" onClick={this.getTaskInfo.bind(this)}><span className={this.state.count==0?"":"notification-dot"}>{this.state.count==0 ? "":this.state.count}</span></a></li>

										{this.state.role=="Admin"?<li><a href="users" className="header-setting"></a></li>:""}

												<li><a onClick={this.signOutUser.bind(this)} className="logout-link">Log out</a></li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="header-navigation" id="header-navigation">
					<div className="container-fluid">
						<nav className="navbar navbar-expand-lg navbar-light">
							<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
								<span className="navbar-toggler-icon"></span>
							</button>

							<div className="collapse navbar-collapse" id="navbarSupportedContent">
								<ul id="menu" className="nav-menu mr-auto">
									<li className="nav-item"><Link to="/dashboard" className={this.props.active === "Home" ? "active" : ""}>Dashboard</Link></li>

									{this.state.lead?<li className="nav-item"><Link to="/leadlist" className={this.props.active === "Lead" ? "active" : ""} >Leads</Link></li>:""}
									{this.state.opportunity?<li className="nav-item"><Link to="/opportunitylist" className={this.props.active === "Opportunities" ? "active" : ""}>Opportunities</Link></li>:""}
									{this.state.account?<li className="nav-item"><Link to="/accountlist" className={this.props.active === "Accounts" ? "active" : ""}>Accounts</Link></li>:""}
									{this.state.contact?<li className="nav-item"><Link to="/contactlist" className={this.props.active === "Contacts" ? "active" : ""}>Contacts</Link></li>:""}
									{this.state.project ? <li className="nav-item"><Link to="/projectDetail" className={this.props.active == "Project" ? "active" : ""}>Projects</Link></li>:""}
									{this.state.resource ?<li className="dropdown nav-item">

										<button  className={this.props.active == "Resources" ? "dropbtn active" : "dropbtn"}>Resources</button>
										<div className="dropdown-content">
											{this.state.resource ?<li><Link to="/resourcedetailpage">Resource</Link></li>:""}
											{this.state.resource ?<li><Link to="/resourceallocationlist">Resource Allocation</Link></li>:""}
										</div>

									</li>:""}
									{this.state.invoice? <li className="nav-item"><Link to="/invoicelist" className={this.props.active == "invoiceList" ? "active" : ""}>Invoices</Link></li>:""}
									{this.state.report?<li className="nav-item"><Link to="/reportlist" className={this.props.active === "reportList" ? "active" : ""}>Reports</Link></li>:""}
									<li className="nav-item"><Link to="/task" className={this.props.active === "Task" ? "active" : ""}>Tasks</Link></li>

								</ul>
							</div>
						</nav>
					</div>
				</div>
			</header>
		)
	}
}
export default Header