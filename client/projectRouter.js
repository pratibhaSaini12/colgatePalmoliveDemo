import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import createHistory from "history/createBrowserHistory"

// import PageNotFound from './client/js/pageNotFound/pageNotFound'

import Login from "./src/containers/Login"
import LeadList from "./src/containers/LeadList"
import Lead from "./src/containers/Lead"
import Dashboard from "./src/containers/Dashboard/dashboard"
import ProductList from "./src/containers/Product/productList"
import NewProduct from "./src/containers/Product/newProduct"
import DigitalImages from "./src/containers/DigitalAssets/digitalImages"
import DigitalVideos from "./src/containers/DigitalAssets/digitalVideos"
import DigitalDocuments from "./src/containers/DigitalAssets/digitalDocuments"
import NewDigitalAsset from "./src/containers/DigitalAssets/newDigitalAsset"
import ProductCompare from "./src/containers/Product/productCompare"
import ProductDetails from "./src/containers/Product/productDetails"

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
					<Route exact path='/productList' component={ProductList} />
					<Route exact path='/newProduct' component={NewProduct} />
					<Route exact path='/digitalImages' component={DigitalImages} />
					<Route exact path='/digitalVideos' component={DigitalVideos} />
					<Route exact path='/digitalDocuments' component={DigitalDocuments} />
					<Route exact path='/newDigitalAsset' component={NewDigitalAsset} />		
					<Route exact path='/compareProducts' component={ProductCompare} />				
					<Route exact path='/productDetailPage' component={ProductDetails} />				
				</Switch>
			</Router>
		)
	}
}
