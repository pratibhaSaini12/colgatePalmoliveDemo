import React, { Component } from "react"
import axios from "axios"

class QuickCreate extends Component {

	constructor(props){
		super(props)
		this.state = {
			description: "",
		}
	}

	saveQuickForm(){
		/*let check = createform.reportValidity();
    if(!check)
    {
      return;
    }*/
		let data = {
			"FirstName": this.refs.fname.value,
			"LastName": this.refs.lname.value,
			"Company": this.refs.company_name.value,
			"Phone": this.refs.phone_num.value,
			"email": this.refs.email.value,
			"Campaign": this.refs.campain.value
		}
		let self = this

		axios.post("api/createlead",data).then(function (response) {
			if(response.data.status= 200){

				// window.location.href='/leadlist'
				window.location.href = "/leadlist"
				self.props.quickCreateProps.history.push({
					pathname : "/lead",
					state : {disableLeadProps: data}
				})
			}
		}).catch(function (error) {

		})
	}


	render(){
		return (
			<div className="dashboard-widget">
				<h3>Quick Create</h3>
				<div className="widget-content">
					<form className="create-new-form" name="createform">
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
								<input required type="text" className="form-control" name="phone" ref='phone_num' />
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
		)
	}
}
export default QuickCreate
