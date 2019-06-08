import React from "react"
import axios from "axios"
// import { Link, IndexLink } from 'react-router';
import { Link } from "react-router-dom"
import ImageContainer from "../../components/imageContainer"
import callApi from "../../util/apiCaller"


export default class Nav extends React.Component{

	constructor(props){
	    super(props)
	    this.state = {
	      description: "",
	    }
	 }

	saveQuickForm(){
		let check = quickform.reportValidity()
		if(!check)
		{
			return
		}
		let self = this
  	let data = {
  		"FirstName": this.refs.fname.value,
  		"LastName": this.refs.lname.value,
  		"Company": this.refs.company_name.value,
  		"Phone": this.refs.phone_num.value,
  		"email": this.refs.email.value,
  		"Campaign": this.refs.campain.value
  	}

		axios.post("api/createlead",data).then(function (response) {
			if(response.data.status= 200){

				// self.props.createNewContentProps.history.push("/leadlist");
				self.props.createNewContentProps.history.push({
					pathname : "/lead",
					state : {disableLeadProps: data}
				})
			}
		}).catch(function (error) {

		})
	}

	// componentDidMount() {
	// 	var headerHeight = document.getElementById('header-top').style.height + document.getElementById('header-navigation').style.height + document.getElementById('widget-title').style.height + 20;
	// 	console.log('headerHeight>>>>>>>>>>>>>>>>>>>>' + headerHeight);
	// 	document.getElementById('widget-content').style.height = (window.innerHeight-headerHeight)+'px' ;
	// }

	render() {

		return (
		<nav className="left-navigation col-md-2">

				<div className="dashboard-widget">
				  	<h3 id="widget-title">Recent Items</h3>
				  	<div className="widget-content" id="widget-content">
				        <ul className="widget-menu">

				        </ul>
				    </div>
		    	</div>
			    <div className="dashboard-widget">
				  <h3>Recycle Bin</h3>
				</div>
				<div className="dashboard-widget">
			  <h3>Quick Create</h3>
			  <div className="widget-content">

			    <form className="create-new-form" name="quickform">
			      <fieldset>
			        <div className="form-group">
			          <label className="control-label">First Name</label>
			          <input required type="text" className="form-control" ref='fname' name="first_name" />
			        </div>
			        <div className="form-group">
			          <label>Last Name</label>
			          <input required type="text" className="form-control" ref='lname' name="last_name" />
			        </div>
			        <div className="form-group">
			          <label>Company</label>
			          <input required type="text" className="form-control" ref='company_name' name="company" />
			        </div>
			        <div className="form-group">
			          <label>Phone</label>
			          <input required type="text" className="form-control" name="phone" ref='phone_num'/>
			        </div>
			        <div className="form-group">
			          <label>Email</label>
			          <input required type="email" className="form-control" ref='email' name="email" />
			        </div>
			        <div className="form-group">
			          <label>Campaign</label>
			          <input required type="text" className="form-control" ref='campain' name="campaign" />
			        </div>
			        <button type="button" className="submit-btn" onClick={this.saveQuickForm.bind(this)}>Save</button>
			      </fieldset>
		    </form>
					</div>
				</div>

			</nav>

		)

	}

}
