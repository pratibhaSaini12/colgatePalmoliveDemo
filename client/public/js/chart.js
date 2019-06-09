// Build the chart
Highcharts.chart('container', {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
 
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: false
            },
           
        }
    },
    series: [{
        name: 'Product',
        colorByPoint: true,
        data: [{
            name: 'Complete',
            y: 70.41,
            sliced: true,
            selected: true
        }, {
            name: 'Incomplete',
            y: 29.59
        },]
    }]
});

google.charts.load("current", {packages:["corechart"]});
      google.charts.setOnLoadCallback(drawChart);
      function drawChart() {
        var data = google.visualization.arrayToDataTable([
          ['Task', 'Hours per Day'],
          ['30 - 90 Days', 50,],
          ['90+ Days', 20],
          ['Last 30 Days',30]

        ]);

        var options = {
          pieHole: 0.4,
        };

        var chart = new google.visualization.PieChart(document.getElementById('donutchart'));
        chart.draw(data, options);
      }

       

       



