function drawTimeSeries(element, height, width, times, values) {
  var margin = 20

  var chart = d3.select(element)
    .append('svg')
      .attr('width', width)
      .attr('height', height)
    .append('g')
      .attr('transform', 'translate(20,20)')

  var x = d3.time.scale()
    .domain(d3.extent(times))
    .range([0, width-2*margin])

  var y = d3.scale.linear()
    .domain([0, d3.max(values)])
    .range([height-2*margin, 0])

  var xaxis = d3.svg.axis()
    .scale(x)
    .ticks(d3.time.weeks, 2)
    .orient("bottom")

  var yaxis = d3.svg.axis()
    .scale(y)
    .ticks(10)
    .orient("left")

  chart.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + (height-2*margin) + ")")
    .call(xaxis)

  chart.append("g")
    .attr("class", "y axis")
    .call(yaxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")

  var bgrd = chart.selectAll('.y')
    .data(y.ticks(10))
    .enter().append('g')
      .attr('class', 'backline')
      .attr('transform', function (d) { return "translate(0, " + y(d) + ")" })

  bgrd.append("line")
      .attr("x1", 0)
      .attr("x2", width-2*margin)
      .style("stroke", "#000")

  chart.selectAll("path.line")
      .data([values])
    .enter().append("svg:path")
      .attr('class', 'tsline')
      .attr("d", d3.svg.line()
        .x(function(d,i) { return x(times[i]) })
        .y(function(d,i) { return y(d) }))

}

function drawBarGraph(element, height, width, data, names, hashes) {
  // var data = $.map(window.commData, function(arr) { return arr[1] })
  // var names = $.map(window.commData, function(arr) { return arr[0] })
  console.log('elem=',element);
  console.log('height=', height);
  console.log('data=', data);
  var x = d3.scale.linear().domain([0, d3.max(data)]).range([0, width])

  var chart = d3.select(element)
    .append('g')
      .attr('transform', 'translate(200,20)')

  var barHeight = 22
  var elementHeight = 30

  chart.selectAll("text")
    .data(data)
    .enter().append("text")
    .attr("x", 0)
    .attr("y", function (d,i) { return i * elementHeight + barHeight / 2 })
    .attr("dx", -barHeight / 2)
    .attr("dy", ".35em")
    .attr("text-anchor", "end")
    .text(function(d,i) { return names[i] })
    .on('click', function(d,i) { console.log(i); window.location.hash = hashes[i]; })

  var xaxis = d3.svg.axis()
    .scale(x)
    .ticks(5)
    .orient("bottom")

  chart.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + (elementHeight*data.length) + ")")
    .call(xaxis)

  var bgrd = chart.selectAll('.x')
    .data(x.ticks(5))
    .enter().append('g')
      .attr('class', 'backline')
      .attr('transform', function (d) { return "translate(" + x(d) + ",0)" })

  bgrd.append("line")
      .attr("y1", 0)
      .attr("y2", elementHeight * data.length)
      .style("stroke", "#000")

  chart.selectAll("rect")
    .data(data)
    .enter().append("rect")
      .attr("y", function(d,i) { return i * elementHeight })
      .attr("width", x)
      .attr("height", barHeight)

  chart.append("line")
    .attr("y1", 0)
    .attr("y2", elementHeight*data.length)
    .style("stroke", "#000")
}

var d3blend = {'drawBarGraph': drawBarGraph, 'drawTimeSeries': drawTimeSeries};
