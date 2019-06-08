import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import createHistory from "history/createBrowserHistory"

// import PageNotFound from './client/js/pageNotFound/pageNotFound'

import Login from "./src/containers/Login"
import LeadList from "./src/containers/LeadList"
import Lead from "./src/containers/Lead"
import Dashboard from "./src/containers/Dashboard"


const history = createHistory()

export default class ProjectRouter extends React.Component {
	render () {
		return (
			<Router history={history}>
				<Switch>
					<Route exact path='/' component={Login} />
					<Route exact path='/leadlist' component={LeadList} />
					<Route exact path='/lead' component={Lead} />
					<Route exact path='/dashboard' component={Dashboard} />
					
				</Switch>
			</Router>
		)
	}
}
