import React, { Component } from "react"

class CreateNew extends Component {
	constructor(props) {
		super(props)
		this.state = {value: ""}

		this.handleChange = this.handleChange.bind(this)
	}
	handleChange(event) {
    
		//this.setState({value: event.target.value});
    
		if(event.target.value=="lead"){
        
			this.props.createNewContentProps.history.push("/lead")

		}
		if(event.target.value=="opportunity")
		{
      
			this.props.createNewContentProps.history.push("/opportunity")
		}
	}

	render(){
    
		return (
			<div className="select">
				<select className="create-new-select form-control" value={this.state.value} onChange={this.handleChange}>
					<option>Create New</option>
					<option value="lead">Lead</option>
					<option value="opportunity">Opportunity</option>
				</select> 
			</div>
		)
	}
}

export default CreateNew