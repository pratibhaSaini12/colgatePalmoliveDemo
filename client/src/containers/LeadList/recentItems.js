import React, { Component } from "react"
import * as HelperUtil from "../../util/common-helper"

class RecentItems extends Component {

	constructor (props) {
		super(props)
		this.state = {
			isHidden: true,
			toggOnCondition: false
		}
	}

	componentWillMount() {
		this.setState({
			toggOnCondition: true
		})
	}

	toggleHidden () {
		this.setState({
			isHidden: !this.state.isHidden
		})
		setTimeout(function(){
			
			var headerHeight = document.getElementById('header-top').offsetHeight + document.getElementById('header-navigation').offsetHeight + document.getElementById('widget-title').offsetHeight + 25;
			console.log('headerHeight>>>>>>>>>>>>>>>>>>>>' + headerHeight);
			var dashboardHeight = document.getElementById('main-dashboard').offsetHeight;

			document.getElementById('widget-content').style.height = (dashboardHeight-40)+'px' ;
		},10)
	}

	showDetails(lead) {
		console.log('===in showDetails of RecentItems Lead====', lead);
		this.props.recentProps.history.push({
			pathname : "/lead",
			state : {disableLeadProps: lead}
		})
	}

	componentDidMount() {
		var headerHeight = document.getElementById('header-top').offsetHeight + document.getElementById('header-navigation').offsetHeight + document.getElementById('widget-title').offsetHeight + 20;


		var dashboardHeight = document.getElementById('main-dashboard').offsetHeight;

		document.getElementById('widget-content').style.height = (dashboardHeight-40)+'px' ;
	}

	render(){
		let toggCondition
		if(this.state.isHidden && this.state.toggOnCondition){
			toggCondition = false
		}else{
			toggCondition = true
		}

		const {leadsList} = this.props
		const {leadId} = this.props
		console.log("====leadId in RecentItems=====",leadId)
		console.log("====leadsList=====",leadsList)
		var creationdate = HelperUtil._getSortedRecentItemList(leadsList)
		console.log("====creationdate=====",creationdate)
		let breakCondition = false
		return (
			<div className="dashboard-widget">
				<h3 onClick={this.toggleHidden.bind(this)} className={this.state.isHidden?"":"closed-widget"} id="widget-title">Recent Items</h3>
				{this.state.isHidden &&         <div className="widget-content" id="widget-content">
					<ul className="widget-menu">{
						creationdate.length ? creationdate.map((leads,index)=>{
							if(index>9){
								return true
							}
							return <li className=""  className={leads.oo_id==leadId?"project-selected": ''}  onClick={()=>this.showDetails(leads)}>{leads.FirstName+" "+leads.LastName}</li>
						}): "NO Recent Items Found"
					}

					</ul>
				</div>}
			</div>
		)
	}
}
export default RecentItems
