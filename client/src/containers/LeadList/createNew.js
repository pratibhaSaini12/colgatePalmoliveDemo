import React, { Component } from "react"
import { Link } from "react-router-dom"

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

			<button ><Link to="/lead">Create New</Link></button>

		)
	}
}

export default CreateNew
