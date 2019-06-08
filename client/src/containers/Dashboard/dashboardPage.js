import React, { Component } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import Highcharts from "highcharts"
import cookie from "react-cookies"
import ImageContainer from '../../components/imageContainer';
import Header from '../../common/Header'
import Footer from '../../common/Footer'
import Pipeline from './pipeline'
import SalesLeadBoard from './salesLeadBoard'
import ReportsDropDown from './reportsDropdown'
import * as HelperUtil from '../../util/common-helper'
import moment from 'moment'
import DateDiff from 'date-diff'
import {properties} from '../../common/properties'
import ReactLoading from 'react-loading'

class DashboardPage extends Component{
  constructor(props) {
    super(props);
    this.state = {
        completeLeadData: {},
        completeAccountData: {},
        completeContactData: {},
        completeOpportunityData: {},
        completeResourcesData: {},
        completeProjectData: {},
        userId : '',
        Loading:true

    }
    this.defaultValues = this.defaultValues.bind(this);
    this.calculationOnDate = this.calculationOnDate.bind(this);
}


async componentDidMount() {
    let _this = this
    let userId = cookie.load('userId');
    let userData = cookie.load('userData');
    let token = userData ? userData.token : null
    axios.get("api/reportlist?token=" + token).then((res) => {
        if (res.status == 200 && !res.data.error) {

        } else {

            _this.props.dashboardprops.history.push("/")
        }
    }).catch(function(e) {
        console.log("err is ", e)
    })

    var stateArray = [{
        key: 'Lead',
        value: 'completeLeadData'
    }, {
        key: 'Account',
        value: 'completeAccountData'
    }, {
        key: 'Contact',
        value: 'completeContactData'
    }, {
        key: 'Opportunity',
        value: 'completeOpportunityData'
    }, {
        key: 'Project',
        value: 'completeProjectData'
    }, {
        key: 'Resource',
        value: 'completeResourcesData'
    }];


    this.setState({
        userId: userData.user.oo_id
    });

    for (var i = 0; i < stateArray.length; i++) {
        var leadList = [];
        var tableName = properties[stateArray[i].key].tableName;
        await axios.post('api/report_for_dashboard', {
            object: tableName
        }).then(function(response) {
            if (response.status == 200) {
                leadList = response.data.reports;
            }
        }).catch(function(error) {
            console.log("err is ", error)
        });
        var leadHistory = [];
        await axios.post('api/dashboard_history', {
            object: stateArray[i].key,
            userId: userData.user.oo_id
        }).then(function(response) {
            if (response.status == 200) {
                leadHistory = response.data.result;
            }

        }).catch(function(error) {
            console.log("err is ", error)
        });
        var leadObj = {
            dropdownData: properties[stateArray[i].key].filterDropdown,
            data: leadList,
            inc_count: 0,
            objectName: stateArray[i].key
        };
        if (leadHistory.length > 0) {
            leadHistory[0].filter == null ? '' : leadObj['filter'] = leadHistory[0].filter;
            leadHistory[0].fromdate == null ? '' : leadObj['fromDate'] = leadHistory[0].fromdate;
            leadHistory[0].todate == null ? '' : leadObj['toDate'] = leadHistory[0].todate;
            leadHistory[0].field == null ? '' : leadObj['report'] = {
                field: leadHistory[0].field
            };
        }
        _this.setState({
            [stateArray[i].value]: leadObj
        });

    }
    this.defaultValues();


}


defaultValues() {
    var stateArray = ['completeLeadData', 'completeAccountData', 'completeContactData', 'completeOpportunityData', 'completeResourcesData', 'completeProjectData']

    for (var i = 0; i < stateArray.length; i++) {
        var completeLeadData = this.state[stateArray[i]];
        if (completeLeadData.filter == undefined || completeLeadData.fromDate == undefined || completeLeadData.toDate == undefined || completeLeadData.report == undefined) {
            completeLeadData['filter'] = 'week';
            completeLeadData['fromDate'] = moment().startOf('isoWeek').toDate().getTime();
            completeLeadData['toDate'] = moment().endOf('isoWeek').toDate().getTime();
            completeLeadData['report'] = {
                path: '/lead/LeadByCount.csv',
                field: ''
            };
            this.setState({
                [stateArray[i]]: completeLeadData
            });
           
            
            //showDashboard(stateName,path,field,tableName,filter,fromDate,toDate) {

        } 
         var  tableName = properties[completeLeadData.objectName]?properties[completeLeadData.objectName].tableName:'';
         if(tableName!='')
        this.showDashboard(stateArray[i],completeLeadData.report.path,completeLeadData.report.field,tableName,completeLeadData.filter,completeLeadData.fromDate,completeLeadData.toDate);

    }

}





showDashboard(stateName,path,field,tableName,filter,fromDate,toDate) {
    var completeData = this.state[stateName];
    var {
        data,
        objectName,
    } = completeData;
    var userId = this.state.userId;
    var toDateTime = moment(toDate).toDate().getTime();
    completeData['tableName'] = tableName;
    completeData['report'] = {
        path: path,
        field: field
    };
    completeData['filter'] = filter;
    completeData['fromDate'] = moment(fromDate).toDate().getTime();
    completeData['toDate'] = moment(toDate).toDate().getTime();
    this.setState({

    })
    if (filter != undefined  && fromDate && toDate) {
         
        axios.post('api/update_fromdate', {
            object: objectName,
            userId: userId,
            fromDate: fromDate,
            toDate:toDate,
            filter : filter,
            field :field
        }).then(function(response) {
            if (response.status == 200) {
                console.log("done ")
            }

        }).catch(function(error) {
            console.log("err is ", error)
        });



        if (path == 'None' || filter == '') {
            completeData['filteredPieList'] = [];
            completeData['filteredBarList'] = [];
            completeData['inc_count'] = 1;
            this.setState({
                [stateName]: completeData
            });
        } else {
            var startDate = '';
            var endDate = '';
            if (filter == 'week') {
                startDate = moment(fromDate).startOf('isoWeek').toDate().getTime();
                endDate = moment(fromDate).endOf('isoWeek').toDate().getTime();
                fromDate = moment(fromDate).startOf('isoWeek').toDate().getTime();
                toDateTime = moment(toDateTime).endOf('isoWeek').toDate().getTime();
                var diffObj = Date.diff(moment(toDateTime, 'x').toDate(), moment(fromDate, 'x').toDate());
                var diff = diffObj.weeks();
                completeData['count'] = (Math.ceil(diff) == '') ? 0 : Math.ceil(diff);
            } else if (filter == 'month') {
                startDate = moment(fromDate).startOf('month').toDate().getTime();
                endDate = moment(fromDate).endOf('month').toDate().getTime();
                fromDate = moment(fromDate).startOf('month').toDate().getTime();
                toDateTime = moment(toDateTime).endOf('month').toDate().getTime();
                var diffObj = Date.diff(moment(toDateTime, 'x').toDate(), moment(fromDate, 'x').toDate());
                var diff = diffObj.months();
                completeData['count'] = (Math.ceil(diff) == '') ? 0 : Math.ceil(diff);
            } else if (filter == 'quarter') {
                startDate = moment(fromDate).startOf('quarter').toDate().getTime();
                endDate = moment(fromDate).endOf('quarter').toDate().getTime();
                fromDate = moment(fromDate).startOf('quarter').toDate().getTime();
                toDateTime = moment(toDateTime).endOf('quarter').toDate().getTime();
                var diff = moment(toDateTime, 'x').endOf('quarter').diff(moment(fromDate, 'x').startOf('quarter'), 'months') / 3;
                completeData['count'] = (Math.ceil(diff) == '') ? 0 : Math.ceil(diff);
            }

           
            var completeList = [];
            if (stateName.includes('Resource') || stateName.includes('Project'))
                completeList = HelperUtil._getDashboardOppDashFilterList(data, fromDate, toDateTime);
            else
                completeList = HelperUtil._getDashboardFilterList(data, fromDate, toDateTime);
            var forCurrentMonthList = [];
            if (stateName.includes('Resource') || stateName.includes('Project'))
                forCurrentMonthList = HelperUtil._getFilterListForOpportunityProject(completeList, field, startDate, endDate, completeData.filter);
            else
                forCurrentMonthList = HelperUtil._getFilterList(completeList, field, startDate, endDate, completeData.filter);
            var pieData = [];
            var barData = [];


            for (var k in forCurrentMonthList) {
                if (k != 'undefined') {
                    pieData.push({
                        name: k,
                        y: forCurrentMonthList[k]
                    })
                    barData.push([
                         k,
                    forCurrentMonthList[k]
                    ])
                }
            }
            completeData['filteredPieList'] = pieData;
            completeData['filteredBarList'] = barData;
            completeData['inc_count'] = 1;
            completeData['startDate'] = startDate;
            completeData['endDate'] = endDate;
            var label = HelperUtil.lableForDashboard(filter,startDate,endDate)
            completeData['label'] = label;
        }
    }
    this.setState({
        Loading: false,
        [stateName]: completeData
    });
}




getChartName(stateName, chartName) {
    var completeData = this.state[stateName];
    var pie = chartName == 'pie' ? true : false;

    completeData['pie'] = pie;
    this.setState({
        [stateName]: completeData,
    });

}

calculationOnDate(filter , dateInTime , valueType,startOfType){
    var subtract = filter=='week' ? 'days' : (filter=='month' ?'months' : 'quarter');
    var startOf = filter=='week' ? 'isoWeek' : filter;
    var days = filter=='week' ? 7 : 1;
    var resultDate = '';
    if(valueType=='prev')
        if(startOfType==true)
            resultDate = moment(dateInTime, 'x').subtract(days, subtract).startOf(startOf).toDate().getTime();
        else
            resultDate = moment(dateInTime, 'x').subtract(days, subtract).endOf(startOf).toDate().getTime();
    else 
        if(startOfType==true)
            resultDate = moment(dateInTime, 'x').add(days, subtract).startOf(startOf).toDate().getTime();
        else
            resultDate = moment(dateInTime, 'x').add(days, subtract).endOf(startOf).toDate().getTime();
    console.log("Result date is ",resultDate);
}

prevChart(e, stateName) {
    var completeData = this.state[stateName];
    var {
        count,
        inc_count,
        data,
        startDate,
        endDate,
        fromDate,
        toDate,
        filter,
        report
    } = completeData;
    if ((inc_count >= 0 && inc_count <= count) && startDate != undefined && endDate != undefined && filter != undefined && report != undefined) {
        var newStartDate = '';
        var newEndDate = '';
        if (filter == 'week') {
            newStartDate = moment(startDate, 'x').subtract(7, 'days').startOf('isoWeek').toDate().getTime();
            newEndDate = moment(startDate, 'x').subtract(7, 'days').endOf('isoWeek').toDate().getTime();
            fromDate = moment(fromDate).startOf('isoWeek').toDate().getTime();
            toDate = moment(toDate).endOf('isoWeek').toDate().getTime();
        } else if (filter == 'month') {
            newStartDate = moment(startDate, 'x').subtract(1, 'months').startOf('month').toDate().getTime();
            newEndDate = moment(startDate, 'x').subtract(1, 'months').endOf('month').toDate().getTime();
            fromDate = moment(fromDate).startOf('month').toDate().getTime();
            toDate = moment(toDate).endOf('month').toDate().getTime();
        } else if (filter == 'quarter') {
            newStartDate = moment(startDate, 'x').subtract(1, 'quarter').startOf('quarter').toDate().getTime();
            newEndDate = moment(startDate, 'x').subtract(1, 'quarter').endOf('quarter').toDate().getTime();
            fromDate = moment(fromDate).startOf('quarter').toDate().getTime();
            toDate = moment(toDate).endOf('quarter').toDate().getTime();
        }

        if (fromDate > startDate) fromDate = newStartDate
        if (toDate < endDate) toDate = newEndDate

        var completeList = [];
        var forCurrentMonthList = [];
        if (stateName.includes('Resource') || stateName.includes('Project')) {
            completeList = HelperUtil._getDashboardOppDashFilterList(data, fromDate, toDate, completeData);
            forCurrentMonthList = HelperUtil._getFilterListForOpportunityProject(completeList, report.field, newStartDate, newEndDate, completeData.filter);
        } else {
            completeList = HelperUtil._getDashboardFilterList(data, fromDate, toDate);
            forCurrentMonthList = HelperUtil._getFilterList(completeList, report.field, newStartDate, newEndDate, completeData.filter);
        }


        var pieData = [];
        var barData = [];
        for (var k in forCurrentMonthList) {
            if (k != 'undefined') {
                pieData.push({
                    name: k,
                    y: forCurrentMonthList[k]
                })
                barData.push([
                     k,
                    forCurrentMonthList[k]
                ])
            }
        }
        completeData['filteredPieList'] = pieData;
        completeData['filteredBarList'] = barData;
        completeData['inc_count'] = inc_count;
        completeData['startDate'] = newStartDate;
        completeData['endDate'] = newEndDate;
        inc_count--;
        var label = HelperUtil.lableForDashboard(filter,newStartDate,newEndDate)
        completeData['label'] = label;
        completeData['inc_count'] = inc_count;
        this.setState({
            [stateName]: completeData
        });
    }
}
nextChart(e, stateName) {
    var completeData = this.state[stateName];
    var {
        count,
        inc_count,
        data,
        startDate,
        endDate,
        fromDate,
        toDate,
        filter,
        report
    } = completeData;
    inc_count++;
    if ((inc_count >= 0 && inc_count <= count) && startDate != undefined && endDate != undefined && filter != undefined && report != undefined) {

        var newStartDate = '';
        var newEndDate = '';
        if (filter == 'week') {
            newStartDate = moment(startDate, 'x').add(7, 'days').startOf('isoWeek').toDate().getTime();
            newEndDate = moment(startDate, 'x').add(7, 'days').endOf('isoWeek').toDate().getTime();
            fromDate = moment(fromDate).startOf('isoWeek').toDate().getTime();
            toDate = moment(toDate).endOf('isoWeek').toDate().getTime();
        } else if (filter == 'month') {
            newStartDate = moment(startDate, 'x').add(1, 'months').startOf('month').toDate().getTime();
            newEndDate = moment(startDate, 'x').add(1, 'months').endOf('month').toDate().getTime();
            fromDate = moment(fromDate).startOf('month').toDate().getTime();
            toDate = moment(toDate).endOf('month').toDate().getTime();
        } else if (filter == 'quarter') {
            newStartDate = moment(startDate, 'x').add(1, 'quarter').startOf('quarter').toDate().getTime();
            newEndDate = moment(startDate, 'x').add(1, 'quarter').endOf('quarter').toDate().getTime();
            fromDate = moment(fromDate).startOf('quarter').toDate().getTime();
            toDate = moment(toDate).endOf('quarter').toDate().getTime();
        }

        if (fromDate > startDate) fromDate = newStartDate
        if (toDate < endDate) toDate = newEndDate

        var completeList = [];
        var forCurrentMonthList = [];
        if (stateName.includes('Resource') || stateName.includes('Project')) {
            completeList = HelperUtil._getDashboardOppDashFilterList(data, fromDate, toDate);
            forCurrentMonthList = HelperUtil._getFilterListForOpportunityProject(completeList, report.field, newStartDate, newEndDate, completeData.filter);
        } else {
            completeList = HelperUtil._getDashboardFilterList(data, fromDate, toDate);
            forCurrentMonthList = HelperUtil._getFilterList(completeList, report.field, newStartDate, newEndDate, completeData.filter);
        }


        var pieData = [];
        var barData = [];
        for (var k in forCurrentMonthList) {
            if (k != 'undefined') {
                pieData.push({
                    name: k,
                    y: forCurrentMonthList[k]
                })
                barData.push([
                    k,
                    forCurrentMonthList[k]
                ])
            }
        }


        completeData['filteredPieList'] = pieData;
        completeData['filteredBarList'] = barData;
        completeData['inc_count'] = inc_count;
        completeData['startDate'] = newStartDate;
        completeData['endDate'] = newEndDate;
        var label = HelperUtil.lableForDashboard(filter,newStartDate,newEndDate)
        completeData['label'] = label;
        completeData['inc_count'] = inc_count;
        this.setState({
            [stateName]: completeData
        });
    }
}


render() {

        var leadPie = this.state.completeLeadData.pie == undefined ? true : this.state.completeLeadData.pie;
        var prevLeadDisabled = this.state.completeLeadData.inc_count <= 1 ? true : false;
        var nextLeadDisabled = this.state.completeLeadData.count == undefined ? true : (this.state.completeLeadData.inc_count >= 0 && this.state.completeLeadData.inc_count < this.state.completeLeadData.count ? false : true);


        var accountPie = this.state.completeAccountData.pie == undefined ? true : this.state.completeAccountData.pie;
        var prevAccountDisabled = this.state.completeAccountData.inc_count <= 1 ? true : false;
        var nextAccountDisabled = this.state.completeAccountData.count == undefined ? true : (this.state.completeAccountData.inc_count >= 0 && this.state.completeAccountData.inc_count < this.state.completeAccountData.count ? false : true);


        var opportunityPie = this.state.completeOpportunityData.pie == undefined ? true : this.state.completeOpportunityData.pie;
        var prevOpportunityDisabled = this.state.completeOpportunityData.inc_count <= 1 ? true : false;
        var nextOpportunityDisabled = this.state.completeOpportunityData.count == undefined ? true : (this.state.completeOpportunityData.inc_count >= 0 && this.state.completeOpportunityData.inc_count < this.state.completeOpportunityData.count ? false : true);


        var contactPie = this.state.completeContactData.pie == undefined ? true : this.state.completeContactData.pie;
        var prevContactDisabled = this.state.completeContactData.inc_count <= 1 ? true : false;
        var nextContactDisabled = this.state.completeContactData.count == undefined ? true : (this.state.completeContactData.inc_count >= 0 && this.state.completeContactData.inc_count < this.state.completeContactData.count ? false : true);


        var resourcesPie = this.state.completeResourcesData.pie == undefined ? true : this.state.completeResourcesData.pie;
        var prevResourcesDisabled = this.state.completeResourcesData.inc_count <= 1 ? true : false;
        var nextResourcesDisabled = this.state.completeResourcesData.count == undefined ? true : (this.state.completeResourcesData.inc_count >= 0 && this.state.completeResourcesData.inc_count < this.state.completeResourcesData.count ? false : true);



        var projectPie = this.state.completeProjectData.pie == undefined ? true : this.state.completeProjectData.pie;
        var prevProjectDisabled = this.state.completeProjectData.inc_count <= 1 ? true : false;
        var nextProjectDisabled = this.state.completeProjectData.count == undefined ? true : (this.state.completeProjectData.inc_count >= 0 && this.state.completeProjectData.inc_count < this.state.completeProjectData.count ? false : true);

        var completeLeadData = this.state.completeLeadData;
        var completeContactData = this.state.completeContactData;
        var completeAccountData = this.state.completeAccountData;
        var completeOpportunityData = this.state.completeOpportunityData;
        var completeResourcesData = this.state.completeResourcesData;
        var completeProjectData = this.state.completeProjectData;

    return (
      <div className="wrapper">
      <Header active="Home"/>
        <section id="main">
          <div className="container-fluid">
            <div className="row">
              <section className="dashboard-dashboard col-md-12">
                <div className="row dashboard-charts">


                    <div className="col-md-6">
                      <ReportsDropDown comData={completeLeadData}  listprops={this.props.dashboardprops}  stateName='completeLeadData'   field='Lead'  showDashboard = {this.showDashboard.bind(this)}/>
                      <div className="dashboard-widget-charts">
                       {this.state.Loading== true && <div className="loader-react">
                         <ReactLoading type="spokes" color="#000"/>
                        </div> }
                          <h1>Lead</h1>
                          <div className="chart-switch-links">
                              
                            <a href="javascript:void(0)" className="pie-chart-link" onClick={data=>this.getChartName('completeLeadData','pie')}></a>
                            <a href="javascript:void(0)" className="bar-chart-link" onClick={data=>this.getChartName('completeLeadData','bar')}></a>
                          </div>
                          <div className="next-prev-switch">
                            <button className="prev-btn" onClick={(e)=>this.prevChart(e,'completeLeadData')} disabled={prevLeadDisabled}></button>
                            <button className="next-btn" href="javascript:void(0)" onClick={(e)=>this.nextChart(e,'completeLeadData')} disabled={nextLeadDisabled}></button>
                          </div>
                          <div className="chartDashboard">
                              {leadPie ?<Pipeline comData={completeLeadData}  stateName='completeLeadData' />:<SalesLeadBoard comData={completeLeadData}  stateName='completeLeadData'/>}
                          </div>
                      </div>
                    </div>


                    <div className="col-md-6">
                      <ReportsDropDown comData={completeOpportunityData} stateName='completeOpportunityData'   listprops={this.props.dashboardprops}  field='Opportunity'  showDashboard = {this.showDashboard.bind(this)} />
                      <div className="dashboard-widget-charts">
                       {this.state.Loading== true && <div className="loader-react">
                         <ReactLoading type="spokes" color="#000"/>
                        </div> }
                        <h1>Opportunity</h1>
                        <div className="chart-switch-links">
                            
                          <a href="javascript:void(0)" className="pie-chart-link" onClick={data=>this.getChartName('completeOpportunityData','pie')}></a>
                          <a href="javascript:void(0)" className="bar-chart-link" onClick={data=>this.getChartName('completeOpportunityData','bar')}></a>
                        </div>
                        <div className="next-prev-switch">
                          <button className="prev-btn" onClick={(e)=>this.prevChart(e,'completeOpportunityData')} disabled={prevOpportunityDisabled}></button>
                          <button className="next-btn" href="javascript:void(0)" onClick={(e)=>this.nextChart(e,'completeOpportunityData')} disabled={nextOpportunityDisabled}></button>
                          </div>
                        <div className="chartDashboard">
                            {opportunityPie ?<Pipeline comData={completeOpportunityData} stateName='completeOpportunityData' />:<SalesLeadBoard comData={completeOpportunityData} stateName='completeOpportunityData' />}
                        </div>
                      </div>
                    </div>


                    <div className="col-md-6">
                    <ReportsDropDown comData={completeAccountData}  stateName='completeAccountData'    listprops={this.props.dashboardprops}  field='Account'  showDashboard = {this.showDashboard.bind(this)} />
                      <div className="dashboard-widget-charts">
                       {this.state.Loading== true && <div className="loader-react">
                         <ReactLoading type="spokes" color="#000"/>
                        </div> }
                        <h1>Account</h1>
                        <div className="chart-switch-links">
                          
                          <a href="javascript:void(0)" className="pie-chart-link" onClick={data=>this.getChartName('completeAccountData','pie')}></a>
                          <a href="javascript:void(0)" className="bar-chart-link" onClick={data=>this.getChartName('completeAccountData','bar')}></a>
                        </div>
                        <div className="next-prev-switch">
                          <button className="prev-btn" onClick={(e)=>this.prevChart(e,'completeAccountData')} disabled={prevAccountDisabled}></button>
                          <button className="next-btn" href="javascript:void(0)" onClick={(e)=>this.nextChart(e,'completeAccountData')} disabled={nextAccountDisabled}></button>
                        </div>
                          <div className="chartDashboard">
                            {accountPie ?<Pipeline comData={completeAccountData} stateName='completeAccountData'/>:<SalesLeadBoard  comData={completeAccountData} stateName='completeAccountData' />}
                          </div>
                      </div>
                    </div>


                    <div className="col-md-6">
                    <ReportsDropDown comData={completeContactData}  stateName='completeContactData'  listprops={this.props.dashboardprops}  field='Contact'  showDashboard = {this.showDashboard.bind(this)} />
                      <div className="dashboard-widget-charts">
                       {this.state.Loading== true && <div className="loader-react">
                         <ReactLoading type="spokes" color="#000"/>
                        </div> }
                        <h1>Contact</h1>
                        <div className="chart-switch-links">
                            
                          <a href="javascript:void(0)" className="pie-chart-link" onClick={data=>this.getChartName('completeContactData','pie')}></a>
                          <a href="javascript:void(0)" className="bar-chart-link" onClick={data=>this.getChartName('completeContactData','bar')}></a>
                        </div>
                        <div className="next-prev-switch">
                          <button className="prev-btn" onClick={(e)=>this.prevChart(e,'completeContactData')} disabled={prevContactDisabled}></button>
                          <button className="next-btn" href="javascript:void(0)" onClick={(e)=>this.nextChart(e,'completeContactData')} disabled={nextContactDisabled}></button>
                          </div>
                        <div className="chartDashboard">
                            {contactPie ?<Pipeline comData={completeContactData} stateName='completeContactData'/>:<SalesLeadBoard  comData={completeContactData} stateName='completeContactData'/>}
                        </div>
                      </div>
                    </div>

                    
                    <div className="col-md-6">
                      <ReportsDropDown comData={completeProjectData}  stateName='completeProjectData'   listprops={this.props.dashboardprops}  field='Project'  showDashboard = {this.showDashboard.bind(this)} />
                      <div className="dashboard-widget-charts">
                       {this.state.Loading== true && <div className="loader-react">
                         <ReactLoading type="spokes" color="#000"/>
                        </div> }
                        <h1>Projects</h1>
                        <div className="chart-switch-links">
                        
                            <a href="javascript:void(0)" className="pie-chart-link" onClick={data=>this.getChartName('completeProjectData','pie')}></a>
                          <a href="javascript:void(0)" className="bar-chart-link" onClick={data=>this.getChartName('completeProjectData','bar')}></a>
                        </div>
                        <div className="next-prev-switch">
                          <button className="prev-btn" onClick={(e)=>this.prevChart(e,'completeProjectData')} disabled={prevProjectDisabled}></button>
                          <button className="next-btn" href="javascript:void(0)" onClick={(e)=>this.nextChart(e,'completeProjectData')} disabled={nextProjectDisabled}></button>
                        </div>
                        <div className="chartDashboard">
                            {projectPie ?<Pipeline comData={completeProjectData} stateName='completeProjectData' />:<SalesLeadBoard  comData={completeProjectData} stateName='completeProjectData' />}
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6">
                        <ReportsDropDown comData={completeResourcesData}  stateName='completeResourcesData'  listprops={this.props.dashboardprops}   field='Resource'  showDashboard = {this.showDashboard.bind(this)} />
                      <div className="dashboard-widget-charts">
                       {this.state.Loading== true && <div className="loader-react">
                         <ReactLoading type="spokes" color="#000"/>
                        </div> }
                        <h1>Resources</h1>
                        <div className="chart-switch-links">
                         
                         <a href="javascript:void(0)" className="pie-chart-link" onClick={data=>this.getChartName('completeResourcesData','pie')}></a>
                          <a href="javascript:void(0)" className="bar-chart-link" onClick={data=>this.getChartName('completeResourcesData','bar')}></a>
                        </div>
                        <div className="next-prev-switch">
                          <button className="prev-btn" onClick={(e)=>this.prevChart(e,'completeResourcesData')} disabled={prevResourcesDisabled}></button>
                          <button className="next-btn" href="javascript:void(0)" onClick={(e)=>this.nextChart(e,'completeResourcesData')} disabled={nextResourcesDisabled}></button>
                        </div>
                        <div className="chartDashboard">
                            {resourcesPie ?<Pipeline comData={completeResourcesData} stateName='completeResourcesData' />:<SalesLeadBoard comData={completeResourcesData} stateName='completeResourcesData'/>}
                        </div>
                      </div>
                    </div>

                    
                </div>
              </section>
            </div>
          </div>
        </section>
        <Footer/>
      </div>
    );
  }
}
export default DashboardPage