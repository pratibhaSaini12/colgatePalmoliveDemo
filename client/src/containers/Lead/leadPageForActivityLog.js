import React, { Component } from "react"
import axios from "axios"
import RecentItems from "../LeadList/recentItems"
// import RecentItemsForOpportunity from "../../containers/OpportunityList/recentItems"
import ReactLoading from 'react-loading'
import {Modal, Header, Button, FormGroup, FieldGroup, Radio, ControlLabel, FormControl} from "react-bootstrap"
import cookie from "react-cookies"


export default class ActivityLog extends React.Component {

	constructor(props){
		super(props)

		this.state = {
        CallToLabel: "",
        NotesLabel: "",
        CallTo: "",
        ObjectId: "",
		ActivityType: "",
        Object: "",
		ObjectList: [],
  		Notes: "",
		Loading: false,
		AttachmentList: [],
		data:[],
		}

		this.insertActivity  = this.insertActivity.bind(this);
		this.insertAttachment = this.insertAttachment.bind(this);
	}



	componentWillMount() {
		 window.scrollTo(0, 0)
    if(this.props.activityData){

      let type = this.props.activityData[0].ActivityType
       if(type == "Phone")
       {
         this.setState({
           CallToLabel: "Phone Call To",
           NotesLabel: "Phone Call Notes",
           ActivityType: "Phone Call",
           ObjectId: this.props.activityData[0].object.oo_id,
           Object: this.props.activityData[0].ObjectType,
           ObjectList: this.props.activityData[0].ObjectList
         })
       }
       else if(type == "Email")
       {
         this.setState({
           CallToLabel: "Email To",
           NotesLabel: "Email Notes",
           ActivityType: "Email",
					 ObjectId: this.props.activityData[0].object.oo_id,
					 Object: this.props.activityData[0].ObjectType,
					 ObjectList: this.props.activityData[0].ObjectList
         })
       }
       else
       {
         this.setState({
           CallToLabel: "In-Person Meeting With",
           NotesLabel: "In-Person Meeting Notes",
           ActivityType: "Met In-Person",
					 ObjectId: this.props.activityData[0].object.oo_id,
					 Object: this.props.activityData[0].ObjectType,
					 ObjectList: this.props.activityData[0].ObjectList
         })
       }

    }

	}

	componentDidMount() {
		 window.scrollTo(0, 0)

	}


	getCallTo(e){

    this.setState({
      CallTo: e.target.value
    })
	}

  getNotes(e){

    this.setState({
      Notes: e.target.value
    })
	}

	onCancel(){
		let self=this
		if(self.state.Object =="Lead")
		{
			let data = {oo_id: self.props.activityData[0].object.oo_id}
			self.props.listprops.history.push({
				pathname : "/lead",
				state : {disableLeadProps: data}
			})
		}
		else {
			self.props.listprops.history.push({
				pathname : "/opportunity",
				state : {dispalyOpprtunityDisableMode: self.props.activityData[0].object.oo_id}
			})
		}
	}

  saveActivity(){

    let self = this
		let data = {oo_id: self.props.activityData[0].object.oo_id}
		self.state.Notes=self.state.Notes.replace("'","\ '")
    let check = activityform.reportValidity()
    if(!check)
    {
      return	
    }

    this.insertActivity(self.state,function(id){
    var dataList = self.state.data;
    if(dataList.length != 0)
    {
        dataList.forEach(function(obj,index){
    	obj.append("ObjectId", id);
    	self.insertAttachment(obj,function(obj,respp){
    	})
    	if(index==dataList.length-1){
		    if(self.state.Object =="Lead"){
				self.props.listprops.history.push({
					pathname : "/lead",
					state : {disableLeadProps: data}
				})
			}
			else{
				self.props.listprops.history.push({
					pathname : "/opportunity",
					state : {dispalyOpprtunityDisableMode: self.props.activityData[0].object.oo_id}
				})
			}
    	}
    })}
    else{
    	  if(self.state.Object =="Lead"){
				self.props.listprops.history.push({
					pathname : "/lead",
					state : {disableLeadProps: data}
				})
			}
			else{
				self.props.listprops.history.push({
					pathname : "/opportunity",
					state : {dispalyOpprtunityDisableMode: self.props.activityData[0].object.oo_id}
				})
			}

    }

    	
    })
}


	insertAttachment(data,callback){
		axios.post("api/uploadAttachmentFile",data).then(function (response) {
			if(response.status==200){
				callback(response.data)
			}
			else{
				callback(response.data)
			}
		 }).catch(function (error) {
			 console.log("ereeeeeeeeeor",error)
		 })
	}

	insertActivity(data,callback){
		let self = this
		axios.post("api/createActivity",data).then(function (response) {
			if(response.status== 200){
				callback(response.data.activity);
			}
		}).catch(function (error) {
			console.log("error is ",error)
		})
	}

	trimCallTo(data)
	{
		this.setState({
			CallTo: data.trim(),
		})
	}

	trimNotes(data)
	{
		this.setState({
			Notes: data.trim(),
		})
	}

	handleUploadImage(ev) {
 let self = this
 ev.preventDefault()
 var FileSize = self.uploadInput.files[0].size / 1024 / 1024;
if(FileSize <= 5)
{

	console.log("File Upload -- ",this.uploadInput.files[0].name);
	const data = new FormData()
	 data.append("file", this.uploadInput.files[0])
	 data.append("name", this.uploadInput.files[0].name)
	 data.append("ext", "." + this.uploadInput.files[0].name.split(".").pop())
	 data.append("Object", "Activity")
	 data.append("CreatedBy", cookie.load("userData").user.FirstName)

	 var datalist = this.state.data;
	 var AttachmentList = this.state.AttachmentList;

	 datalist.push(data);
	var obj = {};
	obj['AttachmentName'] = this.uploadInput.files[0].name;
	obj['CreatedBy'] = cookie.load("userData").user.FirstName;
	 AttachmentList.push(obj);
	self.setState({data:datalist,AttachmentList:AttachmentList})
	 

 }
 else {
	 alert("File Size exceeds 5 MB")
 }


}
	deleteAttachment(index){
		var datalist = this.state.data;
		var AttachmentList = this.state.AttachmentList;

		datalist.splice(index, 1);
		AttachmentList.splice(index,1);
		this.setState({data:datalist,AttachmentList:AttachmentList})
	}


	render() {
		var datalist = this.state.data;
		return (
	<div className="wrapper">
		<section id="main">
			<div className="container-fluid">
			{this.state.Loading== true &&  <div className="loader-react">
								 <ReactLoading type="spokes" color="#000"/>
								</div> }
				<div className="row">
					<nav className="left-navigation col-md-2">
					{this.state.Object == "Lead" &&  <RecentItems leadsList = {this.state.ObjectList} recentProps={this.props.listprops}/>}
					{/* {this.state.Object == "Opportunity" &&  <RecentItemsForOpportunity opportunityList = {this.state.ObjectList} recentProps={this.props.listprops}/>} */}
					</nav>
					<section id="main-dashboard" className="main-dashboard col-md-10">
						<h2><span className="pull-right required-info"><span className="aestrick">*</span> Required Information</span></h2>
						<form name="activityform" className="lead-form activity-form">
							<div className="form-buttons">
								<button type="button" ref="btn" className="submit-btn" onClick={this.saveActivity.bind(this)}>Save</button>
								<button type="button" onClick={this.onCancel.bind(this)} className="cancel-btn">Cancel</button>
							</div>
							<fieldset>
								<h3>Activity Information</h3>


								<div className="col-md-12">
									<div className="row">
										<div className="col-lg-5 col-md-12 col-sm-12">
											<div className="form-group">
												<label>{this.state.CallToLabel}<span className="aestrick">*</span></label>
	                  <input required type="text" name="CallTo" className="form-control" value={this.state.CallTo} onChange={e => this.getCallTo(e)} onBlur={() => this.trimCallTo(this.state.CallTo)}/>
											</div>
										</div>
									</div>
									<div className="row">
										<div className="col-lg-12 col-md-12 col-sm-12">
											<div className="form-group form-group-textarea">
												<label>{this.state.NotesLabel}<span className="aestrick">*</span></label>
												<textarea required className="form-control" name="Notes" placeholder="Notes"  width="" rows="2" cols="27" value={this.state.Notes} onChange={e => this.getNotes(e)} onBlur={(e) => this.trimNotes(this.state.Notes)}></textarea>

											</div>
										</div>

									</div>
								</div>

							</fieldset>
							<fieldset>
								<h3>Attachment
								<div className="buttons-activity">
								<input type="file" ref={(ref) => { this.uploadInput = ref }} onChange={this.handleUploadImage.bind(this)} style={{ display: 'none' }}/>
								<a onClick={(e) => this.uploadInput.click()} className="create-new-link">Upload Files</a>


								</div>

								</h3>
								<div className="col-md-12">
									<div className="row">
										<div className="task-management-wrap">
										<table className="table record-table">
											<thead>
												<th onClick={()=>this.getSortedListByKeyAtt("AttachmentName",this.state.AttachmentList)}>Attachment Name</th>
	            								<th onClick={()=>this.getSortedListByKeyAtt("CreatedBy",this.state.AttachmentList)}>Created By</th>
	            								<th style={{width:"100px"}}>Action</th>
											</thead>
											<tbody>
												{
													this.state.AttachmentList.length ? this.state.AttachmentList.map((attachment,index,result)=>{


														return <tr key={index}>
															<td ><span>{attachment.AttachmentName}</span></td>
															<td>{attachment.CreatedBy}</td>
															<td>
																<ul className="action-buttons">
																	<li><a href="JavaScript:void(0)" onClick={()=> this.deleteAttachment(index)} className="delete-record-button" ></a></li>
																</ul>
															</td>

														</tr>

													}): <tr><td colspan="6">No Record Found</td></tr>
												}
											</tbody>
										</table>
										</div>
									</div>
								</div>

							</fieldset>

							<div className="form-buttons">
								<button type="button" ref="btn" className="submit-btn" onClick={this.saveActivity.bind(this)}>Save</button>
							<button type="button" onClick={this.onCancel.bind(this)} className="cancel-btn">Cancel</button>
							</div>
						</form>
					</section>
				</div>
			</div>
		</section>
	</div>

		)
	}
}
