import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment'
import DatePicker from 'react-datepicker';
import * as HelperUtil from "../../util/common-helper"
import {properties} from '../../common/properties'

class ReportsDropDown extends Component{
  constructor(props){
    super(props);
     this.state = {
        completeLeadData: {},
        completeAccountData: {},
        completeContactData: {},
        completeOpportunityData: {},
        completeResourcesData: {},
        completeProjectData: {},
     }

     this.setDataInState = this.setDataInState.bind(this);
  }

  componentWillReceiveProps(nextProps){
      this.setDataInState(nextProps);

    }

    setDataInState(propsObj){
        var stateData = this.state[propsObj.stateName];
        var completeData = propsObj.comData;
        var path = completeData.report!=undefined?completeData.report.path:'';
        var data = completeData.data!=undefined?completeData.data:[];
          if(completeData!=undefined){
            stateData['startDate'] = completeData.startDate?completeData.startDate:'';
            stateData['reportList'] = completeData.dropdownData!=undefined?completeData.dropdownData:[];
            stateData['objectName'] = completeData.objectName?completeData.objectName:'';
            stateData['endDate'] = this.getToDateReport(completeData.toDate,completeData.filter);;
            stateData['toDate'] = completeData.toDate?completeData.toDate:'';
            stateData['fromDate'] = completeData.fromDate?completeData.fromDate:'';
            stateData['filter'] = completeData.filter?completeData.filter:'';
            stateData['field'] = propsObj.field;
            stateData['fieldData'] = completeData.report!=undefined?completeData.report.field:'';
            if(path!='')
                stateData['path'] =path;
            if(data.length>0){
                stateData['data'] = data;
                this.setState({[propsObj.stateName] : stateData});
            }
        }
    }

  componentDidMount(){
    this.setDataInState(this.props);
  }

  getToDateReport(toDate,filter){
    if(toDate && filter){
      var todate = '';
        if(filter=='week')
        todate = moment(toDate).endOf('isoWeek').toDate().getTime();
      else if(filter=='month')
        todate = moment(toDate).endOf('month').toDate().getTime();
      else if(filter=='quarter')
        todate = moment(toDate).endOf('quarter').toDate().getTime();
      return todate;
    }
    else 
      return '';
  }

  getReportPath(e){
        let reportPath= e.target.value;
        let id = e.target.childNodes[e.target.selectedIndex].id;
        var fieldData = reportPath ? ((id=='count' || id=='')?'count':id):'';
        let stateData = this.state[e.target.name];
          var tableName = properties[stateData.field].tableName
          stateData['tableName'] = tableName;
          stateData['path'] = reportPath;
          stateData['fieldData'] = fieldData;
          this.setState({
              [e.target.name]: stateData
          });
        //this.props.reportPath(reportPath,e.target.childNodes[e.target.selectedIndex].id,e.target.name);
  }

  getFilter(e){
    let stateData = this.state[e.target.name];
    stateData['filter'] = e.target.value;
    this.setState({[e.target.name]:stateData});
    //this.props.filter(e.target.value,e.target.name);        
  }

  getFromDate(stateName,date){
    let stateData = this.state[stateName];
    stateData['fromDate'] = date.toDate().getTime();
    this.setState({[stateName]:stateData});
    //this.props.fromDate(date.format('YYYY-MM-DD'),stateName)
  }

  getToDate(stateName,date){
      let stateData = this.state[stateName];
      stateData['toDate'] = date.toDate().getTime();
      this.setState({[stateName]:stateData});
      //this.props.toDate(date.format('YYYY-MM-DD'),stateName)
  }



  viewReport(e){
      var val = e.target.value;
      var stateData = this.state[val];
       var filter = stateData.filter;
      var _this = this;
      if(stateData.data!=undefined){
        var list = stateData.data != undefined?stateData.data : [];
        if (val.includes('Resource') || val.includes('Project'))
          list = HelperUtil. _getDashboardOppDashFilterList(list,stateData.startDate,stateData.endDate);
        else
          list = HelperUtil. _getDashboardFilterList(list,stateData.startDate,stateData.endDate);

        if( list.length>0){
          axios.post("api/update_report",{reportPath:stateData.path , list :stateData.data }).then(function (response) {
            _this.props.listprops.history.push({
              pathname : "/showreport",
              state : {data:list,stateName:val,dashboard:true,startDate:stateData.startDate,endDate:stateData.endDate,field:stateData.field,fieldData : stateData.fieldData,fromDate : stateData.fromDate,toDate:stateData.toDate}
            })

          }).catch(function (error) {
              console.log("err is ",error)
          })
        }
      }
  }

  showDashboard(e){
      let stateData = this.state[e.target.value];
      var tableName = properties[stateData.field].tableName
      this.props.showDashboard(e.target.value,stateData.path,stateData.fieldData,tableName,stateData.filter,stateData.fromDate,stateData.toDate)

  }

  render() {
    var stateName = this.props.stateName;
    const { reportList ,endDate,fromDate,filter,fieldData}=this.state[stateName];
    var filterData= filter?filter:'';
    var fromDateData = fromDate?moment(fromDate,'x'):moment();
    var toDate = endDate?moment(endDate,'x'):moment();
    return (
      <div className="dashboard-chart-filter">
        <div className="">
          <div className="dash-filter float-left">
            <div className="">
              <select className="salutation-select" name={stateName} onChange={(e)=>this.getReportPath(e)}>
                 <option value='None'>None</option>
                 {
                    reportList?reportList.map((reports,index)=>{
                      return (<option id={reports.field} value={reports.ReportPath} selected={reports.field=='' && fieldData=='count'?true:fieldData==reports.field}  key={index}>{reports.title}</option>)
                    }) : ''
                 }
              </select>
            </div>
          </div>
          <div className="dash-filter float-left">
            <div className="">
              <select className="salutation-select" name={stateName} onChange={(e)=>this.getFilter(e)}>
                  <option value=''>None</option>
                  <option value='week' selected={filterData=='week'}>Week</option>
                  <option value='month' selected={filterData=='month'}>Month</option>
                  <option value='quarter' selected={filterData=='quarter'}>Quarter</option>
              </select>
            </div>
          </div>
          <div className="startEndDate-contain float-left">
            <div className="dash-filter float-left">
              <div className="">
                 
                  <DatePicker
                             name={stateName}
                            selected={fromDateData}
                            inputProps={{readOnly:true}}
                            onChange={this.getFromDate.bind(this,stateName )} /> 
              </div>
            </div>
            <div className="dash-filter float-left">
              <div className="">
                    <DatePicker
                             name={stateName}
                            selected={toDate}
                            minDate={fromDateData} 
                            inputProps={{readOnly:true}}
                            onChange={this.getToDate.bind(this,stateName )} />
              </div>
            </div>
          </div>
          <div className="dashboard-btn-contain float-right">
            <button className="dashboard-detail-btn float-right" value={stateName} onClick={(e)=>this.viewReport(e)}>Detail</button>
            <button className="dashboard-detail-btn go float-right" value={stateName} onClick={(e)=>this.showDashboard(e)}>Go</button>
          </div>
        </div>
      </div>
    );
  }
}
export default ReportsDropDown