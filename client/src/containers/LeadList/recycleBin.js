import React, { Component } from "react"
import axios from "axios"

import * as HelperUtil from "../../util/common-helper"

class RecycleBin extends Component {

	constructor (props) {
		super(props)
		this.state = {
			isHidden: true
		}
	}

	toggleHidden () {
		this.setState({
			isHidden: !this.state.isHidden
		})
	}

	convertLead(leads) {

		var ready = window.confirm("Do you want to Restore the Lead")

		let self = this
		if(ready){
			axios.post("api/restorelead",leads).then(function (response) {
				if(response.status == 200){

					window.location.href="/leadlist"
				}
			}).catch(function (error) {

			})
		}else{
			self.props.recycleProps.history.push("/leadlist")
		}
	}

	render(){
		const {leadInactiveStatus} = this.props

		var creationdate = HelperUtil._getSortedLeadList(leadInactiveStatus)
		return (
		  <div className="dashboard-widget">
				<h3 onClick={this.toggleHidden.bind(this)}>Recycle Bin</h3>
				{this.state.isHidden &&        <div className="widget-content">
					<ul className="widget-menu">{
						creationdate.map((leads,index)=>{
							if(index>2){
								return true
							}
							return <li onClick={()=>this.convertLead(leads)}>{leads.FirstName}</li>
						})
					}

					</ul>
				</div>}
			</div>
		)
	}
}
export default RecycleBin
