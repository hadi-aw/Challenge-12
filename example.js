// U51313007

// Load and parse CSV data
d3.csv("mock_stock_data.csv").then(data => {
    const parsedData = data.map(d => ({
      date: d3.timeParse("%Y-%m-%d")(d.Date),
      stock: d.Stock,
      price: +d.Price
    }));
  
    // Function to filter by stock name
    function filterByStockName(data, stockName) {
      return data.filter(d => d.stock === stockName);
    }
  
    // Function to filter by date range
    function filterByDateRange(data, startDate, endDate) {
      return data.filter(d => d.date >= startDate && d.date <= endDate);
    }
  
    // Expose the filtering functions for later use
    window.filterByStockName = filterByStockName;
    window.filterByDateRange = filterByDateRange;
    window.parsedData = parsedData;
  });


// Visualization setup (to be placed at the end of the data processing part)
const svg = d3.select("svg");
const margin = {top: 20, right: 20, bottom: 30, left: 50};
const width = +svg.attr("width") - margin.left - margin.right;
const height = +svg.attr("height") - margin.top - margin.bottom;
const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

const xScale = d3.scaleTime().rangeRound([0, width]);
const yScale = d3.scaleLinear().rangeRound([height, 0]);

const line = d3.line()
  .x(d => xScale(d.date))
  .y(d => yScale(d.price));

xScale.domain(d3.extent(window.parsedData, d => d.date));
yScale.domain(d3.extent(window.parsedData, d => d.price));

g.append("g")
  .attr("transform", `translate(0,${height})`)
  .call(d3.axisBottom(xScale))
  .select(".domain")
  .remove();

g.append("g")
  .call(d3.axisLeft(yScale))
  .append("text")
  .attr("fill", "#000")
  .attr("transform", "rotate(-90)")
  .attr("y", 6)
  .attr("dy", "0.71em")
  .attr("text-anchor", "end")
  .text("Price ($)");

g.append("path")
  .datum(window.parsedData)
  .attr("fill", "none")
  .attr("stroke", "steelblue")
  .attr("stroke-linejoin", "round")
  .attr("stroke-linecap", "round")
  .attr("stroke-width", 1.5)
  .attr("d", line);