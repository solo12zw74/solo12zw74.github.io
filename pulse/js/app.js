d3.csv('data/dp.csv', function (data) {process_data(data, '#chart-dp-daily', '#chart-dp-summary')});
d3.csv('data/ifl.csv', function (data) {process_data(data, '#chart-ifl-daily', '#chart-ifl-summary')});
d3.csv('data/kasko.csv', function (data) {process_data(data, '#chart-kasko-daily', '#chart-kasko-summary')});

function process_data(data, dailyContainerId, summaryContainerId){

	var parseDate = d3.time.format("%Y-%m-%d %H:%M:%S").parse;

	data.forEach(function(d) {
		d.date = parseDate(d.date);
	});

	var ndx = crossfilter(data),
	dateDimension = ndx.dimension(function(d) {return d.date;}),
	dayGroup = dateDimension.group(function(d) {return d3.time.day(d);}),
	weekGroup = dateDimension.group(function(d) {return d3.time.week(d);});
	
	var minDate = dateDimension.bottom(1)[0].date;
	var maxDate = dateDimension.top(1)[0].date;

	var summaryChart = dc.barChart(summaryContainerId)	
	.width(748).height(240)
	.dimension(dateDimension)
	.group(dayGroup)
	.x(d3.time.scale().domain([minDate,maxDate]))
	.mouseZoomable(true)
	.xUnits(d3.time.days)
	.render();

	var dailyNumber = dc
	.numberDisplay(dailyContainerId)
	.group(dayGroup)
	.formatNumber(d3.format(".0s sss"))
	.render();
}