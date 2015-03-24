var d3data = undefined,
dateDimension = undefined,
sourceDimension = undefined,
productDimension = undefined,
countDimension = undefined,
dayGroup = undefined,
weekGroup = undefined,
minDate = undefined,
maxDate = undefined,
ndx = undefined;

d3.csv('data/pulse.csv', function(data){
	d3data = data;
	var format = d3.time.format.iso;

	d3data.forEach(function(d){
		d.date = format.parse(d.date);
	});

	ndx = crossfilter(d3data);
	dateDimension = ndx.dimension(function(d) {return d.date;});
	sourceDimension = ndx.dimension(function(d) {return d.source;});
	productDimension = ndx.dimension(function(d) {return d.product;});
	countDimension = ndx.dimension(function(d) {return d.count;});

	dayGroup = dateDimension.group(function(d) {return d3.time.day(d);});
	weekGroup = dateDimension.group(function(d) {return d3.time.week(d);});

	minDate = dateDimension.bottom(1)[0].date;
	maxDate = dateDimension.top(1)[0].date;

	var volumeChart = dc.barChart('#chart-dp-volume')
	.width(700).height(80)
	.dimension(dateDimension)
	.group(sourceDimension.filterAll('online'))
	.centerBar(true)
	.gap(1)
	.x(d3.time.scale().domain([minDate,maxDate]))
	.round(d3.time.week.round)
	.xUnits(d3.time.weeks);


	var summaryChart = dc.barChart('#chart-dp-summary')
	.width(700).height(160)
	.brushOn(false)
	.dimension(dateDimension)
	.group(dayGroup)
	.centerBar(true)
	.gap(1)
	.x(d3.time.scale().domain([minDate,maxDate]))
	.mouseZoomable(true)
	.rangeChart(volumeChart)
	.xUnits(d3.time.days);


	var marketVolumeChart = dc.barChart('#chart-dp-volume-market')
	.width(700).height(80)
	.dimension(dateDimension)
	.group(weekGroup)
	.centerBar(true)
	.gap(1)
	.x(d3.time.scale().domain([minDate,maxDate]))
	.round(d3.time.week.round)
	.xUnits(d3.time.weeks);


	var marketSummaryChart = dc.barChart('#chart-dp-market')
	.width(700).height(160)
	.brushOn(false)
	.dimension(dateDimension)
	.group(dayGroup)
	.centerBar(true)
	.gap(1)
	.x(d3.time.scale().domain([minDate,maxDate]))
	.mouseZoomable(true)
	.rangeChart(marketVolumeChart)
	.xUnits(d3.time.days);


	dc.renderAll();
});
