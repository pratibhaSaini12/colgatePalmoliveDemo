import React from "react"
import { Link } from "react-router-dom"

import ImageContainer from "../../components/imageContainer"
import EmailModal from "./emailModal"

export default class LoginPage extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			username: "",
			password: "",
			update:this.props.update,
			rememberMe: false,
			styleConst:[{display : this.props.update?"block":"none",color:"#007500"}],
			styleConstForgot:[{display : this.props.forgot?"block":"none",color:"#007500"}],
			userModalShow: false
		}
		if(this.props.update){
			this.setState({update:false})
		}

	}

	change(e){
		this.setState({
			[e.target.name]: e.target.value,
		})
	}

	onSubmit(e){
		e.preventDefault()
		if (this.props.onSubmit) {
			this.props.onSubmit(this.state)
		}
		this.setState({
			username: "",
			password: "",
		})
	}

	openEmailMOdal() {
		this.setState({
			userModalShow: true
		})
	}

	rememberCheck(){



		if(!this.state.rememberMe)
		{

			localStorage.clear()
			localStorage.setItem("username",this.state.username)
			localStorage.setItem("password",this.state.password)
			localStorage.setItem("chckbox",true)
		}
		else {
			localStorage.clear()
			}

		this.setState({
			rememberMe: !this.state.rememberMe
		})

	}

	componentWillMount(){

		if(localStorage.getItem("chckbox"))
		{
			this.setState({
				username: localStorage.getItem("username"),
				password: localStorage.getItem("password"),
				rememberMe: localStorage.getItem("chckbox")
			})
		}
		else {

		}
	}

	render() {

		var style = this.state.styleConst[0]
		var styleforgot = this.state.styleConstForgot[0]
		let styleWrngPasswordConst= [{display : this.props.userPwd?"block":"none",color:"#FF0000"}]
		let Inactive = this.props.active;
		let emailModal
		if(this.state.userModalShow){
			emailModal = <EmailModal show={this.state.userModalShow} loginProps = {this.props.loginProps} onHide={closeUserModel}/>
		}
		let closeUserModel = () => this.setState({ userModalShow: false })
		return (
			<div className="container-login">
				<div className="login-wrapper">
					<div className="row">
						<div className="login-box-left col-md-8 col-sm-8 col-12">
							<div className="box box-primary box-login">
								<Link className="logo" to="/"><ImageContainer src="logo.png" alt="PIMCORE" /></Link>

								<h2 className="tag-title">Welcome!</h2>
								<span style={style}>Your account has been activated...</span>
								<span style={styleforgot}>Your Password has been Changed...</span>
								<span style={styleWrngPasswordConst[0]}>Either Your Email or Password is Incorrect...</span>
								{Inactive ? '' : <span style={{color:'red'}}>Inactive User</span>}
								<p className="tag-line" >Please login to your account</p>
								<form className="form login-form" onSubmit={e => this.onSubmit(e)}>
									<fieldset>
										<div className="form-inputs">
											<div className="form-group">
												<input required type="text" name="username" placeholder="Email" value={this.state.username} onChange={e => this.change(e)}/>
											</div>
											<div className="form-group form-group-login-pass">
												<input required type="password" name="password" placeholder="Password" value={this.state.password} onChange={e => this.change(e)}/>
											</div>
											<div className="form-group form-group-remember">
												<input type='checkbox' name='thing' checked={this.state.rememberMe} id='thing' onClick={this.rememberCheck.bind(this)}/><label htmlFor="thing">Remember me</label>
											</div>
											<div className="form-submits">
												<button className="pull-left submit-btn" type="submit">Login</button>
												<a className="forgot-pass-link pull-right" onClick={this.openEmailMOdal.bind(this)}>Forgot Password?</a>
											</div>
										</div>
									</fieldset>
								</form>
							</div>
						</div>
						<div className="login-box-right col-md-4  col-sm-4 col-12">
							<p className="instruction-text-login">Own the digital world. That’s not only our claim, but the cornerstone of our vision and strategy. Because Digital is on the move and digital transformation is challenging leading companies around the globe.</p>
							<p className="instruction-text-login">Go Digital - </p>
							<ul className="instruction-list-login">
								<li>Any Data</li>
								<li>Any Channel</li>
								<li>Any Process</li>
								<li>Any One</li>
							</ul>
						</div>
					</div>
				</div>
				{emailModal}
			</div>
		)
	}
}
