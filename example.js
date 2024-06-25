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