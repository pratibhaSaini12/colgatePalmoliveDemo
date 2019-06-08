import React, { Component } from "react"
import PropTypes from "prop-types"
import cookie from "react-cookies"
import DashboardPage from "./dashboardPage"


export default class Dashboard extends Component {

	render() {
		return (
			<span><DashboardPage dashboardprops={this.props}/></span>
		)
	}
}

Dashboard.defaultProps = {
	apiData: {},
}

Dashboard.propTypes = {
	actions: PropTypes.object.isRequired,
	apiData: PropTypes.object,
	children: PropTypes.object.isRequired
}
