// IN CLASS WORK REFERENCED 
// Class Material... 16 - D.3
// DAYS 1, 2 & 3 

// SVG parms 
var svgWidth = 960;
var svgHeight = 500;

// Margins
var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 50
};

// Charts area minus margins 
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG container 
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Shift everything over by the margins
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Importing data 
d3.csv("data.csv").then(function(CensusData) {
  CensusData.forEach(function(data) {
    data.age = +data.age;
    data.smokes = +data.smokes;
// TEST to make sure data prints out
//  console.log(data);
});

// Creating scales
// Reference Exercises D3-3/7
var xScale = d3.scaleLinear()
  .domain(d3.extent(CensusData, d => d.age))
  .range([0, width]);

var yScale = d3.scaleLinear()
  .domain([0, d3.max(CensusData, d => d.smokes)])
  .range([height, 0]);

// create axes
var xAxis = d3.axisBottom(xScale);
var yAxis = d3.axisLeft(yScale);

// Appending X & Y Axis
// X
chartGroup.append("g")
  .attr("transform", `translate(0, ${height})`)
  .call(xAxis);
// Y
  chartGroup.append("g")
  .call(yAxis);

// Making scatter plot 
// Reference Exercises D3-3/7, 3/9, 3/12
chartGroup.selectAll("circle")
.data(CensusData)
.enter()
.append("circle")
.attr("cx", d=>xScale(d.age))
.attr("cy", d=>yScale(d.smokes))
.attr("r", "11")
.classed("stateCircle", true)
.attr("fill", "green") // Cant seem to get the color to change :(
.attr("opacity", 0.60)

// // Making State Aberration in circles 
chartGroup.append("g")
  .selectAll('text')
  .data(CensusData)
  .enter()
  .append("text")
  .text(d=>d.abbr)
  .attr("x",d=>xScale(d.age))
  .attr("y",d=>yScale(d.smokes))
  .attr("fill", "white")
  .classed(".stateText", true)
  .attr("text-anchor", "middle")
  .attr("font-size", "10px")
  .attr("alignment-baseline", "central")
  
// Making X & Y tittles 
// Y Tittle
chartGroup.append("text")
  .attr("transform", `translate(${width / 2}, ${height + margin.top + 13})`)
  .attr("text-anchor", "middle")
  .attr("fill", "grey")
  .text("Age Groups");

// X Tittle 
chartGroup.append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 0 - margin.left)
  .attr("x", 0 - (height / 2))
  .attr("dy", "1em")
  .classed("axis-text", true)
  .attr("fill", "grey")

  .text("Percent of Smokers");
})
// When the browser loads, makeResponsive() is called.
makeResponsive();

// When the browser window is resized, makeResponsive() is called.
d3.select(window).on("resize", makeResponsive);