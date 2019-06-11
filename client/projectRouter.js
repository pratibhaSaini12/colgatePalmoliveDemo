import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import createHistory from "history/createBrowserHistory"

// import PageNotFound from './client/js/pageNotFound/pageNotFound'

import Login from "./src/containers/Login"

import Dashboard from "./src/containers/Dashboard/dashboard"
import ProductList from "./src/containers/Product/productList"
import NewProduct from "./src/containers/Product/newProduct"
import EditProduct from "./src/containers/Product/editProduct"
import DigitalImages from "./src/containers/DigitalAssets/digitalImages"
import DigitalDocuments from "./src/containers/DigitalAssets/digitalDocuments"
import NewDigitalAsset from "./src/containers/DigitalAssets/newDigitalAsset"
import ProductCompare from "./src/containers/Product/productCompare"
import ProductDetails from "./src/containers/Product/productDetails"
import NewTask from "./src/containers/Task/createNewTask"
import UploadImage from "./src/containers/uploadImage"
import TaskList from "./src/containers/Task/taskList"

const history = createHistory()

export default class ProjectRouter extends React.Component {
	render() {
		return (
			<Router history={history}>
				<Switch>
					<Route exact path='/' component={Login} />
					<Route exact path='/dashboard' component={Dashboard} />
					<Route exact path='/productList' component={ProductList} />
					<Route exact path='/newProduct' component={NewProduct} />
					<Route exact path='/editProduct' component={EditProduct} />
					<Route exact path='/compareProducts' component={ProductCompare} />
					<Route exact path='/productDetailPage' component={ProductDetails} />
					<Route exact path='/newDigitalAsset' component={NewDigitalAsset} />
					<Route exact path='/digitalImages' component={DigitalImages} />
					<Route exact path='/digitalDocuments' component={DigitalDocuments} />
					<Route exact path='/newTask' component={NewTask} />
					<Route exact path='/uploadImage' component={UploadImage} />
					<Route exact path='/taskList' component={TaskList} />
				</Switch>
			</Router>
		)
	}
}
