// dc.min.js.map

var chart = dc.barChart("#test");

var counts = [
{date: "2015-04-01", name: "apple", cnt: 10},
{date: "2015-04-02", name: "apple", cnt: 20},
{date: "2015-04-03", name: "apple", cnt: 30},
{date: "2015-04-01", name: "orange", cnt: 15},
{date: "2015-04-02", name: "orange", cnt: 25},
{date: "2015-04-03", name: "orange", cnt: 35},
{date: "2015-04-01", name: "banana", cnt: 12},
{date: "2015-04-02", name: "banana", cnt: 22},
{date: "2015-04-03", name: "banana", cnt: 32},
{date: "2015-04-01", name: "grapefruit", cnt: 2},
{date: "2015-04-02", name: "grapefruit", cnt: 4},
{date: "2015-04-03", name: "grapefruit", cnt: 8}
];

var ndx            = crossfilter(counts),
fruitDimension = ndx.dimension(function(d) {return d.name;}),
sumGroup       = fruitDimension.group().reduceSum(function(d) {return d.cnt;});

chart

.x(d3.scale.ordinal())
.xUnits(dc.units.ordinal)
.xAxisLabel("Дата")
.yAxisLabel("Кол-во")
.dimension(fruitDimension)
.group(sumGroup);

chart.render();