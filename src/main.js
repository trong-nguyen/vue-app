import Vue from 'vue'
import App from './App.vue'

new Vue({
  el: '#app',
  render: h => h(App)
})

import Highcharts from 'highcharts'
import HighchartsMore from 'highcharts/highcharts-more'
import HighchartsExporting from 'highcharts/modules/exporting'
HighchartsMore(Highcharts)
HighchartsExporting(Highcharts)

import data from './data.json'
import $ from 'jquery'

var series_data = [], outlier_data = [], categories = [];
$.each(data.benchmarks, function(idx, bm) {
	var stats = bm.stats;
	categories.push(bm.name);
	series_data.push([
		stats.min,
		stats.q1,
		stats.median,
		stats.q3,
		stats.max
		]);
	outlier_data.push([
		stats.iqr_outliers,
		stats.stddev_outliers
		]);
});

// console.log(series_data);
// console.log(outlier_data);
// console.log(categories);

var chart = Highcharts.chart('plot-container', {
	chart: {
		type: 'boxplot',
		style: {
			fontSize: '20px'
		}
	},

	title: {
		text: 'Sorting Algorithm Benchmarks'
	},

	legend: {
		enabled: true
	},

	xAxis: {
		categories: categories,
		title: {
			text: 'Algorithm'
		},
		labels: {
			rotation: -90
		}
	},

	series: [{
		name: 'Observations',
		// pointWidth: 8,
		data : series_data,
		tooltip: {
			headerFormat: '<em>{point.key}</em><<br/>'
		}
	}
	// , {
	// 	name: 'Outlier',
 //        color: Highcharts.getOptions().colors[0],
 //        type: 'scatter',
 //        data: outlier_data,
 //        marker: {
 //            fillColor: 'white',
 //            lineWidth: 1,
 //            lineColor: Highcharts.getOptions().colors[0]
 //        },
 //        tooltip: {
 //            pointFormat: 'Observation: {point.y}'
 //        }
	// }
	]
});