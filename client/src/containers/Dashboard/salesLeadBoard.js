
import React, { Component } from 'react';
import moment from 'moment';
import * as HelperUtil from '../../util/common-helper'
import ReactHighcharts  from 'react-highcharts';
import Highcharts from 'highcharts';
import Highstock from 'highcharts/highstock';
import { NoDataToDisplay } from "react-highcharts-no-data-to-display";

const Charts = ReactHighcharts.withHighcharts(Highstock,NoDataToDisplay ( ReactHighcharts.Highcharts ));


export default class SalesLeadBoard extends Component {
   constructor(props){
      super(props);
      this.state={
      completeLeadData: {},
      completeAccountData: {},
      completeContactData: {},
      completeOpportunityData: {},
      completeResourcesData: {},
      completeProjectData: {},
      }
    }
    componentWillReceiveProps(nextProps){
      this.setDataInState(nextProps);
    }

    componentWillMount(){
      this.setDataInState(this.props);
    }

    setDataInState(propsObj){
      var stateData = this.state[propsObj.stateName];
      var completeData = propsObj.comData;
        if(completeData!=undefined){
          stateData['startDate'] = completeData.startDate?completeData.startDate:'';
          stateData['fromDate'] = completeData.endDate?completeData.endDate:'';
          stateData['filter'] = completeData.filter?completeData.filter:'';
          stateData['field'] = completeData.report!=undefined?completeData.report.field:'';
          stateData['data'] = completeData.filteredBarList!=undefined?completeData.filteredBarList:[];
          this.setState({[propsObj.stateName] : stateData});
      }
    }

    render() {
      var completeData = this.state[this.props.stateName];
      var list = completeData.data!=undefined?completeData.data:[];
      var field = completeData.field?completeData.field:'';
      var filter = completeData.filter?completeData.filter : 'week';
      var label = HelperUtil.lableForDashboard(filter,completeData.startDate,completeData.fromDate);
      var maxValue = list.length>4 ? 4:list.length-1;
      var config = {
        lang:{
  noData: 'no data!' //the text to be displayed
},
noData: {
  position: {
      fontWeight: 'bold',
            fontSize: '15px',
            color: '#303030'
      }
},
     chart: {
        type: 'column',
        marginLeft: 50,
        marginRight: 50,
        height: 200
    },
    title: {
        text: ''
    },
    xAxis: {
        type: 'category',
        title: {
            text: null
        },
        min: 0,
        max: maxValue,
        scrollbar: {
            enabled: true
        },
        tickLength: 0,
    },
    yAxis: {
        title: {
            text: 'Count',
            align: 'high'
        },
         allowDecimals: false,
    },
    plotOptions: {
        bar: {
            dataLabels: {
                enabled: true
            }
        }
    },
    legend: {
        enabled: false
    },
    credits: {
        enabled: false
    },
    series: [{
        name: 'Count',
        data:list,
    }]
}
      /*var data = [{
        label: 'somethingA',
        values: [{x: '12/02/2018', y: 6,y0:0}, {x: '12/04/2018', y: 4,y0:0}, {x: '12/05/2018', y: 3,y0:0}]
      }];*/
      var total = 0;
      list.forEach(function(e){
          total += e.y;
      })  
      var data =list.length>0?[{
        label: 'somethingA',
        values: list
    }]:{label: 'No data available', values: [{x: 'No data available', y: 0}]};
 
      

      return (
        <Charts isPureConfig={true} config = {config}/>

       

      );
    }

}

