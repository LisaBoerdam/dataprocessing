window.onload = function () {
  worldwide()
};

/*
* draw worldwide scatterplot (default)
*/
function worldwide(){
  // clear out svg
  var svg = d3.select("body").transition();
  d3.selectAll("svg").remove();
  // request data from URL
  var data = "https://stats.oecd.org/SDMX-JSON/data/BLI/AUS+AUT+BEL+CAN+CHL+CZE+DNK+EST+FIN+FRA+DEU+GRC+HUN+ISL+IRL+ISR+ITA+JPN+KOR+LVA+LUX+MEX+NLD+NZL+NOR+POL+PRT+SVK+SVN+ESP+SWE+CHE+TUR+GBR+USA.IW_HNFW+SW_LIFS.L.TOT/all?"
  d3.request(data)
  .get(conversion)
  var jsonList = []

  /*
  * store requested data into a jsonlist
  */
  function conversion(error, response) {
    if (error) throw error;

    dataBLI = JSON.parse(response.responseText);
    nrCountries = dataBLI.structure.dimensions.observation[0].values.length;

    for (i = 0; i < nrCountries; i++) {
      var countries = dataBLI.structure.dimensions.observation[0].values[i].name;
      var wealth = dataBLI.dataSets[0].observations[i+':0:0:0'][0];
      var satisfaction = dataBLI.dataSets[0].observations[i+':1:0:0'][0];
      var jasonStr = ""
      jsonStr = JSON.parse('{'
          + '"id": '
                  + '"' + Number(i) + '"'
                  + ", "
                  + '"country": '
                  + '"' + countries + '"'
                  + ", "
                  + '"household net wealth": '
                  + + Number(wealth) + ''
                  + ", "
                  + '"satisfaction": '
                  + + Number(satisfaction) + ''
                  + ", "
                  + '"continent": '
                  + + "" + ''
                  + ' }');

      jsonList.push(jsonStr)
    };
    makeGraph(jsonList);
  }; 
};

/*
* draw scatterplot for europe
*/
function europe(){
  // clear out svg
  var svg = d3.select("body").transition();
  d3.selectAll("svg").remove();
  // request data from URL
  var data = "https://stats.oecd.org/SDMX-JSON/data/BLI/AUS+AUT+BEL+CAN+CHL+CZE+DNK+EST+FIN+FRA+DEU+GRC+HUN+ISL+IRL+ISR+ITA+JPN+KOR+LVA+LUX+MEX+NLD+NZL+NOR+POL+PRT+SVK+SVN+ESP+SWE+CHE+TUR+GBR+USA.IW_HNFW+SW_LIFS.L.TOT/all?"
  d3.request(data)
  .get(conversion)
  var jsonList = []

  /*
  * store requested data into a jsonlist
  */
  function conversion(error, response) {
    if (error) throw error;

    dataBLI = JSON.parse(response.responseText);
    nrCountries = dataBLI.structure.dimensions.observation[0].values.length;

    for (i = 0; i < nrCountries; i++) {
      var countries = dataBLI.structure.dimensions.observation[0].values[i].name;
      var wealth = dataBLI.dataSets[0].observations[i+':0:0:0'][0];
      var satisfaction = dataBLI.dataSets[0].observations[i+':1:0:0'][0];
      var jasonStr = ""
      jsonStr = JSON.parse('{'
          + '"id": '
                  + '"' + Number(i) + '"'
                  + ", "
                  + '"country": '
                  + '"' + countries + '"'
                  + ", "
                  + '"household net wealth": '
                  + + Number(wealth) + ''
                  + ", "
                  + '"satisfaction": '
                  + + Number(satisfaction) + ''
                  + ", "
                  + '"continent": '
                  + + "" + ''
                  + ' }');

      jsonList.push(jsonStr)
    };
    addContinents(jsonList)
    function addContinents(jsonList) {
    // was niet de bedoeling om dit te hardcoden maar kon nergens meer makkelijk verkrijgbare data vinden om mn lijst uit te breiden!!
    // gewoon gedaan zodat ik mijn scatterplot interactief kon maken!
      jsonList[1]["continent"] = 1
      jsonList[2]["continent"] = 1
      for (i = 4; i < 14; i++){
        jsonList[i]["continent"] = 1
      };  
      jsonList[16]["continent"] = 1
      jsonList[18]["continent"] = 1
      for (i = 20; i < 29; i++){
        jsonList[i]["continent"] = 1
      };
      for (i = 31; i < 35; i++){
        jsonList[i]["continent"] = 1
      };
    };
    var europe = jsonList.filter(function(jsonList) { 
        return jsonList.continent == 1;  });
    makeGraph(europe);
  }; 
};

/*
* draw scatterplot for asia
*/
function asia(){
  // clear out svg
  var svg = d3.select("body").transition();
  d3.selectAll("svg").remove();
  // request data from URL
  var data = "https://stats.oecd.org/SDMX-JSON/data/BLI/AUS+AUT+BEL+CAN+CHL+CZE+DNK+EST+FIN+FRA+DEU+GRC+HUN+ISL+IRL+ISR+ITA+JPN+KOR+LVA+LUX+MEX+NLD+NZL+NOR+POL+PRT+SVK+SVN+ESP+SWE+CHE+TUR+GBR+USA.IW_HNFW+SW_LIFS.L.TOT/all?"
  d3.request(data)
  .get(conversion)
  var jsonList = []

  /*
  * store requested data into a jsonlist
  */
  function conversion(error, response) {
    if (error) throw error;

    dataBLI = JSON.parse(response.responseText);
    nrCountries = dataBLI.structure.dimensions.observation[0].values.length;

    for (i = 0; i < nrCountries; i++) {
      var countries = dataBLI.structure.dimensions.observation[0].values[i].name;
      var wealth = dataBLI.dataSets[0].observations[i+':0:0:0'][0];
      var satisfaction = dataBLI.dataSets[0].observations[i+':1:0:0'][0];
      var jasonStr = ""
      jsonStr = JSON.parse('{'
          + '"id": '
                  + '"' + Number(i) + '"'
                  + ", "
                  + '"country": '
                  + '"' + countries + '"'
                  + ", "
                  + '"household net wealth": '
                  + + Number(wealth) + ''
                  + ", "
                  + '"satisfaction": '
                  + + Number(satisfaction) + ''
                  + ", "
                  + '"continent": '
                  + + "" + ''
                  + ' }');

      jsonList.push(jsonStr)
    };
    addContinents(jsonList)
    function addContinents(jsonList) {
    // was niet de bedoeling om dit te hardcoden maar kon nergens meer makkelijk verkrijgbare data vinden om mn lijst uit te breiden!!
    // gewoon gedaan zodat ik mijn scatterplot interactief kon maken!
      jsonList[14]["continent"] = 2
      jsonList[15]["continent"] = 2
    };
    var asia = jsonList.filter(function(jsonList) { 
        return jsonList.continent == 2;  });
    makeGraph(asia);
  }; 
};

/*
* draw scatterplot for america
*/
function america(){
  // clear out svg
  var svg = d3.select("body").transition();
  d3.selectAll("svg").remove();
  // request data from URL
  var data = "https://stats.oecd.org/SDMX-JSON/data/BLI/AUS+AUT+BEL+CAN+CHL+CZE+DNK+EST+FIN+FRA+DEU+GRC+HUN+ISL+IRL+ISR+ITA+JPN+KOR+LVA+LUX+MEX+NLD+NZL+NOR+POL+PRT+SVK+SVN+ESP+SWE+CHE+TUR+GBR+USA.IW_HNFW+SW_LIFS.L.TOT/all?"
  d3.request(data)
  .get(conversion)
  var jsonList = []

  /*
  * store requested data into a jsonlist
  */
  function conversion(error, response) {
    if (error) throw error;

    dataBLI = JSON.parse(response.responseText);
    nrCountries = dataBLI.structure.dimensions.observation[0].values.length;

    for (i = 0; i < nrCountries; i++) {
      var countries = dataBLI.structure.dimensions.observation[0].values[i].name;
      var wealth = dataBLI.dataSets[0].observations[i+':0:0:0'][0];
      var satisfaction = dataBLI.dataSets[0].observations[i+':1:0:0'][0];
      var jasonStr = ""
      jsonStr = JSON.parse('{'
          + '"id": '
                  + '"' + Number(i) + '"'
                  + ", "
                  + '"country": '
                  + '"' + countries + '"'
                  + ", "
                  + '"household net wealth": '
                  + + Number(wealth) + ''
                  + ", "
                  + '"satisfaction": '
                  + + Number(satisfaction) + ''
                  + ", "
                  + '"continent": '
                  + + "" + ''
                  + ' }');

      jsonList.push(jsonStr)
    };
    addContinents(jsonList)
    function addContinents(jsonList) {
    // was niet de bedoeling om dit te hardcoden maar kon nergens meer makkelijk verkrijgbare data vinden om mn lijst uit te breiden!!
    // gewoon gedaan zodat ik mijn scatterplot interactief kon maken!
      jsonList[3]["continent"] = 3
      jsonList[17]["continent"] = 3
      jsonList[29]["continent"] = 3
      jsonList[30]["continent"] = 3
    };
    var america = jsonList.filter(function(jsonList) { 
        return jsonList.continent == 3;  });
    makeGraph(america);
  }; 
};

/*
* draw scatterplot for oceania
*/
function oceania(){
  // clear out svg
  var svg = d3.select("body").transition();
  d3.selectAll("svg").remove();
  // request data from URL
  var data = "https://stats.oecd.org/SDMX-JSON/data/BLI/AUS+AUT+BEL+CAN+CHL+CZE+DNK+EST+FIN+FRA+DEU+GRC+HUN+ISL+IRL+ISR+ITA+JPN+KOR+LVA+LUX+MEX+NLD+NZL+NOR+POL+PRT+SVK+SVN+ESP+SWE+CHE+TUR+GBR+USA.IW_HNFW+SW_LIFS.L.TOT/all?"
  d3.request(data)
  .get(conversion)
  var jsonList = []

  /*
  * store requested data into a jsonlist
  */
  function conversion(error, response) {
    if (error) throw error;

    dataBLI = JSON.parse(response.responseText);
    nrCountries = dataBLI.structure.dimensions.observation[0].values.length;

    for (i = 0; i < nrCountries; i++) {
      var countries = dataBLI.structure.dimensions.observation[0].values[i].name;
      var wealth = dataBLI.dataSets[0].observations[i+':0:0:0'][0];
      var satisfaction = dataBLI.dataSets[0].observations[i+':1:0:0'][0];
      var jasonStr = ""
      jsonStr = JSON.parse('{'
          + '"id": '
                  + '"' + Number(i) + '"'
                  + ", "
                  + '"country": '
                  + '"' + countries + '"'
                  + ", "
                  + '"household net wealth": '
                  + + Number(wealth) + ''
                  + ", "
                  + '"satisfaction": '
                  + + Number(satisfaction) + ''
                  + ", "
                  + '"continent": '
                  + + "" + ''
                  + ' }');

      jsonList.push(jsonStr)
    };
    addContinents(jsonList)
    function addContinents(jsonList) {
    // was niet de bedoeling om dit te hardcoden maar kon nergens meer makkelijk verkrijgbare data vinden om mn lijst uit te breiden!!
    // gewoon gedaan zodat ik mijn scatterplot interactief kon maken!
      jsonList[0]["continent"] = 4
      jsonList[19]["continent"] = 4
    };
    var oceania = jsonList.filter(function(jsonList) { 
        return jsonList.continent == 4;  });
    makeGraph(oceania);
  }; 
};

/*
* draws svg element
*/ 
function makeGraph(jsonList){
  // create svg element
  var margin = {top: 20, right: 100, bottom: 30, left: 40},
      width = 1040 - margin.left - margin.right,
      height = 450 - margin.top - margin.bottom;

  var svg = d3.select("body").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // add the tooltip area to the webpage
  var tooltip = d3.select("body").append("div")
      .attr("class", "tooltip")
      .style("opacity", 0)

  // create y scale
  var yscale = d3.scaleLinear()
    .domain([10, 0])
    .range([0, height])

  // create x scale
  var xscale = d3.scaleLinear()
    .domain([0, 200000])
    .range([0, width])

  // create y axis
  var yaxis = d3.axisLeft(yscale)
    .ticks(10)
    .tickSize(2)
  svg.append("g")
    .attr("transform", "translate(" + margin.left + ",0)")
    .call(yaxis)
    .append("text")
    .attr("class", "label")
    .attr("transform", "rotate(-90)")
    .attr("x", -110)
    .attr("y", -30)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .style("fill", "black")
    .style("font-weight", "bold")
    .text("SATISFACTION SCORE")

  // create x axis
  var xaxis = d3.axisBottom(xscale)
    .ticks(10)
    .tickSize(2)
  svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + height + ")")
    .call(xaxis)
    .append("text")
    .attr("class", "label")
    .attr("x", 550)
    .attr("y", +30)
    .style("text-anchor", "end")
    .style("font-weight", "bold")
    .style("fill", "black")
    .text("NET HOUSEHOLD WEALTH (USD)");
  
  var colors = ["#000000", "#FFFF00", "#1CE6FF", "#FF34FF", "#FF4A46", "#008941", "#006FA6", "#A30059",
    "#FFDBE5", "#7A4900", "#0000A6", "#63FFAC", "#B79762", "#004D43", "#8FB0FF", "#997D87", "#5A0007", 
    "#809693", "#FEFFE6", "#1B4400", "#4FC601", "#3B5DFF", "#4A3B53", "#FF2F80", "#61615A", "#BA0900", 
    "#6B7900", "#00C2A0", "#FFAA92", "#FF90C9", "#B903AA", "#D16100", "#DDEFFF", "#000035", "#7B4F4B"];

  var dots = svg.selectAll("circle")
    .data(jsonList)
    .enter()
    .append("circle")
    .attr("cx", function(d){return (xscale(d["household net wealth"]) + margin.left)})
    .attr("cy", function(d){return (yscale(d["satisfaction"]) + margin.top)})
    .attr("r", 5)
    .style("fill", function(d){return d3.rgb(colors[d["id"]])})
    .on("mouseover", function(d) {      
      tooltip.transition()        
        .duration(200)      
        .style("opacity", .9);      
      tooltip.html(d["country"] + "<br/>"  )  
        .style("left", (d3.event.pageX + 10) + "px")     
        .style("top", (d3.event.pageY - 40) + "px");    
    })                  
    .on("mouseout", function(d) {       
      tooltip.transition()        
        .duration(500)      
        .style("opacity", 0); 
    });  

    // based on https://bl.ocks.org/mbostock/3887118
  var legend = svg.selectAll(".legend")
    .data(jsonList)
    .enter().append("g")
    .attr("class", "legend")
    .attr("transform", function(d, i) { return "translate(45," + i * 11 + ")"; });
  legend.append("rect")
    .attr("x", width - 18)
    .attr("width", 10)
    .attr("height", 10)
    .style("fill",  function(d){return d3.rgb(colors[d["id"]])});
  legend.append("text")
    .attr("x", width - 24)
    .attr("y", 5)
    .attr("dy", ".35em")
    .style("text-anchor", "end")
    .style("font-size", "10px")
    .style("font-family", "sans-serif")
    .text(function(d) { return d["country"]; });
};
