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
import TaskPageByUserID from "./src/containers/Task/taskListByUser"
import UploadImage from "./src/containers/uploadImage"
import TaskList from "./src/containers/Task/taskList"
import EditTask from "./src/containers/Task/editTask"
import Search from "./src/containers/Dashboard/globalSearch"
import DigitalImagePage from "./src/containers/DigitalAssets/digitalImagePage"
import EditDigitalImage from "./src/containers/DigitalAssets/editdigitalImage"
import ComingSoon from "./src/containers/Task/comingSoon"
import ManageCollections from "./src/containers/StaticPages/manageCollections"
import Channels from "./src/containers/StaticPages/channels"
import DigitalVideos from "./src/containers/StaticPages/digitalVideos"
import Import from "./src/containers/StaticPages/imports"
import Workflow from "./src/containers/StaticPages/workflow"
import ChannelData from "./src/containers/StaticPages/channelData"

const history = createHistory()

export default class ProjectRouter extends React.Component {
	constructor(props) {
		super(props)
	
		this.state = {
			 userData :''
		}
		
	}
	componentWillMount() {
		if(sessionStorage.getItem('userData')!== null ) {

			let tempData = JSON.parse(sessionStorage.getItem('userData'))
		 	this.setState({userData:tempData.userData})
		}
	
	}
	
	render() {
		
		return (
			<Router history={history}>
				<Switch>
					
					<Route exact path='/' component={Login} />

					{

					}
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
					<Route exact path='/editTask' component={EditTask} />
					<Route exact path='/search' component={Search} />
					<Route exact path='/digitalImagePage' component={DigitalImagePage} />
					<Route exact path='/viewTask' component={TaskPageByUserID} />
					<Route exact path='/comingSoon' component={ComingSoon} />
					<Route exact path='/manageCollections' component={ManageCollections} />
					<Route exact path='/channels' component={Channels} />
					<Route exact path='/digitalVideo' component={DigitalVideos} />
					<Route exact path='/imports' component={Import} />
					<Route exact path='/workflow' component={Workflow} />
					<Route exact path='/channelData' component={ChannelData} />



				</Switch>
			</Router>
		)
	}
}
