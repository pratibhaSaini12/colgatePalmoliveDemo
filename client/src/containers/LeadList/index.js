import React, { Component } from "react"
import PropTypes from "prop-types"
import cookie from "react-cookies"
import ListPage from "./listPage"


export default class List extends Component {

	render() {
  	let userData = cookie.load("userData")

		if(userData==undefined){
			window.location.href="/"
			return
		}

		else if(userData.user.Role!="Admin" && userData.user.LeadObject.data==0){
			window.location.href="/dashboard"
			return
		}
		else{
	    return (
	        <ListPage listprops={this.props}/>
	    )
		}
	}
}

List.defaultProps = {
	apiData: {},
}

List.propTypes = {
	actions: PropTypes.object.isRequired,
	apiData: PropTypes.object,
	children: PropTypes.object.isRequired
}
