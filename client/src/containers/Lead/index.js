import React, { Component } from "react"
import PropTypes from "prop-types"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import axios from "axios"

import cookie from "react-cookies"
// import logo from './images/logo.svg';
import LeadPage from "./leadPage"
import LeadDisablePage from "./leadPaageEditMode"
import ActivityPage from "./leadPageForActivityLog"
import Header from "../../common/Header"



export default class Lead extends Component {
	constructor(props) {
		super(props)
		this.state = {
			editLeadsData: {}
		}
	}

	// makeEditable(editLeadsData) {
	//   this.setState({editLeadsData:editLeadsData})
	// }

	render() {
		var leads
		//
		let userData = cookie.load("userData")

		if(userData==undefined){
			window.location.href="/"
			return
		}
		else if(userData.user.Role!="Admin"&& userData.user.LeadObject.data==0){
			window.location.href="/dashboard"
			return
		}
		else{
			if(this.props.location.state === undefined){
				leads = <LeadPage listprops={this.props} />
			}else if(this.props.location.state.editleadprops != undefined || this.props.location.state.editleadprops != null){
				let {editleadprops} = this.props.location.state

				leads = <LeadPage listprops={this.props} leadsDetail = {editleadprops}/>
			}else if(this.props.location.state.activityLog != undefined || this.props.location.state.activityLog != null){
				let {activityLog} = this.props.location.state
				console.log("Activity Data - ", activityLog);

				leads = <ActivityPage listprops={this.props} activityData = {activityLog}/>
			}else{

				let {disableLeadProps} = this.props.location.state
				leads = <LeadDisablePage listprops={this.props} leadsDetail = {disableLeadProps.oo_id}/>
			}

			return (
				<div className="wrapper">
					<Header active="Lead"
						username ="John dee"/>
					{leads}
				</div>
			)
		}
	}
}

Lead.defaultProps = {

}

Lead.propTypes = {
	actions: PropTypes.object.isRequired,
	apiData: PropTypes.object,
	children: PropTypes.object.isRequired
}
