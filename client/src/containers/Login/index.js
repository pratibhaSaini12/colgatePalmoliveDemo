import React, { Component } from "react"
import PropTypes from "prop-types"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import axios from "axios"
import cookie from "react-cookies"

import { getAPIData } from "./actions"
import { selectApiData } from "./selectors"

// import logo from './images/logo.svg';
import ImageContainer from "../../components/imageContainer"

const getMyIp = (apiData) => (
	(apiData && apiData.origin) && apiData.origin.split(", ")[1]
)

class Login extends Component {

	constructor(props) {
		super(props)

		this.state = {
			userPwd: false,
			active: true,
		}
	}

	componentWillMount() {

		// let id=6
		// axios.get("/api/getProductByID?id="+id).then(function (response) {

		// console.log('response from getProductByID===',response)
		// }).catch(function (error) {

		// })

		// 		let createProduct = {
		// 			product_id: 8,
		// 			product_name: "adsd",
		// 			upc: "sdsa",
		// 			category: "fsdf",
		// 			link: "sfdfsd",
		// 			product_line: "fsfsd",
		// 			product_status: "fdsfdf",
		// 			cost: "dfsfsd",
		// 			wholesale_price: "fdsfdds",
		// 			msrp: "fdsdfsd",
		// 			retail_price: "fsdfs",
		// 			medium_description: "sffsd",
		// 			long_description: "sfsf",
		// 			tags: "fsdfsd",
		// 			warnings: "fsdfsd", 
		// 			material: "fddsfs", 
		// 			style: "sdffsd",
		// 			main_image:""
		// 		}
		// 		axios.post("api/createProduct",createProduct).then(function (response) {
		// console.log('resposne from api==',response)

		// 		}).catch(function (error) {

		// 		})





		// var id = 3
		// axios.post("/api/deleteProductByID",{id:id}).then(function (response) {
		// 	console.log("response from delete api ", response.data);

		// }).catch(function (error) {
		// 	console.log("error  login is ", error);
		// })


		// axios.get("/api/getAllProducts").then(function (response) {
		// 	console.log("response from all products ", response.data);

		// }).catch(function (error) {
		// 	console.log("error  login is ", error);
		// })



		// var id = [6,7]
		// axios.post("/api/bulkProductDelete", { id: id }).then(function (response) {
		// 	console.log("response from bulk delete api ", response.data);

		// }).catch(function (error) {
		// 	console.log("error  login is ", error);
		// })



		var id = [1, 4]
		axios.get("/api/compareProducts?id=" + id).then(function (response) {
			console.log("response from compare ", response.data);

		}).catch(function (error) {
			console.log("error  login is ", error);
		})
	}

	getLoginData(data) {
		let self = this
		this.setState({
			userPwd: false,
			active: true,
		});
		axios.post("api/login", data).then(function (response) {
			console.log("response issss ", response.data);
			if (response.status == 200) {
				cookie.save("userData", response.data, { maxAge: 600 })
				self.props.history.push({
					pathname: "/dashboard"
				})
			} else if (response.status == 201) {
				self.setState({
					userPwd: true
				})
			}
			else if (response.status == 202) {
				self.setState({
					active: false
				})
			}
		}).catch(function (error) {
			console.log("error  login is ", error);
		})
	}

	render() {
		var update = this.props.location.update == undefined ? false : true
		var forgot = this.props.location.forgot == undefined ? false : true
		return (
			<div>
				{/* <LoginPage onSubmit={this.getLoginData.bind(this)} userPwd={this.state.userPwd} active={this.state.active} loginProps={this.props} update={update} forgot={forgot}/> */}
				<div className="wrapper fadeInDown">
					<div id="formContent">
						{/* Tabs Titles */}
						{/* Icon */}
						<div className="fadeIn first">
							<ImageContainer src="logo2.png" id="login_logo" alt="User Icon" />
						</div>
						<div className="welcom_section">
							<h1> Welcome!</h1>
							<p>Please login to your account</p>
						</div>
						{/* Login Form */}
						<form className="login_page">
							<input type="text" id="login" className="fadeIn second" name="login" placeholder="Email" />
							<input type="text" id="password" className="fadeIn third" name="login" placeholder="Password" />
							<input type="submit" className="fadeIn fourth" defaultValue="Log In" />
						</form>
					</div>
				</div>
			</div>
		)
	}
}

Login.defaultProps = {
	apiData: {},
}

Login.propTypes = {
	actions: PropTypes.object.isRequired,
	apiData: PropTypes.object,
	children: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
	apiData: state,
})

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators({ getAPIData }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
