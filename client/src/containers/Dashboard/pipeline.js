import React, { Component } from 'react';
import Highcharts from 'highcharts';
import addHighchartsMore from 'highcharts/highcharts-more';
import addNoDataModule from 'highcharts/modules/no-data-to-display';
import moment from 'moment'
import * as HelperUtil from '../../util/common-helper'

// import ExampleCode from '../utils/ExampleCode';
// import code from './exampleCode';
addHighchartsMore(Highcharts);
import addHeatmapModule from 'highcharts/modules/funnel.src';
import addTreemapModule from 'highcharts/modules/treemap';
import {
  HighchartsChart, Chart, withHighcharts, XAxis, YAxis, Title, Legend, ColumnSeries, SplineSeries, PieSeries,Tooltip
} from 'react-jsx-highcharts';
addHeatmapModule(Highcharts);
addTreemapModule(Highcharts);
addNoDataModule(Highcharts);

class Pipeline extends Component {

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

    this.setDataInState = this.setDataInState.bind(this);
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
        stateData['label'] = completeData.label?completeData.label:'';
        stateData['fromDate'] = completeData.endDate?completeData.endDate:'';
        stateData['filter'] = completeData.filter?completeData.filter:'';
        stateData['field'] = completeData.report!=undefined?completeData.report.field:'';
        stateData['data'] = completeData.filteredPieList!=undefined?completeData.filteredPieList:[];
        this.setState({[propsObj.stateName] : stateData});
    }
  }

  render() {
       var completeData = this.state[this.props.stateName];
     
       var list = completeData.data!=undefined?completeData.data:[];
       var field = completeData.field?completeData.field:'';
       var filter = completeData.filter?completeData.filter : 'week';
      var label = completeData.label?completeData.label:'';
       const plotOptions = {
        series: {
          size:'100%',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b> ({point.y:,.0f})',
            softConnector: true
          },
          point: {
              events: {
                  legendItemClick: function () {
                      return false;
                  }
              }
          },

          
          showInLegend: false,
          allowPointSelect: true,
          center: ['50%', '50%'],
          size:'99%'
        }, 

        legend: {
          align: 'center',
          verticalAlign: 'bottom',
          layout: 'vertical',
          enabled: true
        },
        
        title: {
              text: 'No data in pie chart'
        }
      };
      var total = 0;
      list.forEach(function(e){
          total += e.y;
      })  
    return (
      <div className="">
          <HighchartsChart plotOptions={plotOptions}>
            <Chart />

           <Tooltip padding={0}  shape="square"  />


              <Legend />

              <YAxis>

                <PieSeries name="Total " data={list}  />
              </YAxis>
          </HighchartsChart>
          <div className="data-label-nodata">
          {label}
          
          </div>
          <span className="total-count">Count &#40;<span>{total}</span>&#41;</span>
          
        </div>
    );
  }
}

export default withHighcharts(Pipeline, Highcharts);
