window.onload = function () {
	// request data from URL
	var data = "http://stats.oecd.org/SDMX-JSON/data/BLI/AUS+AUT+BEL+CAN+CHL+CZE+DNK+EST+FIN+FRA+DEU+GRC+HUN+ISL+IRL+ISR+ITA+JPN+KOR+LVA+LUX+MEX+NLD+NZL+NOR+POL+PRT+SVK+SVN+ESP+SWE+CHE+TUR+GBR+USA.IW_HNFW+SW_LIFS.L.TOT/all?"
	d3.request(data)
	.get(conversion)

	var jsonList = []
/*
* store requested data into a list
*/
function conversion(error, response) {
	if (error) throw error;

	dataBLI = JSON.parse(response.responseText);
	nrCountries = dataBLI.structure.dimensions.observation[0].values.length;

	for (i = 0; i < nrCountries; i++) {
		var countries = dataBLI.structure.dimensions.observation[0].values[i].name;
		var wealth = dataBLI.dataSets[0].observations[i+':0:0:0'][0];
		var satisfaction = dataBLI.dataSets[0].observations[i+':1:0:0'][0];

		//var list = JSON.parse('{"country":"' + countries + '", "household net wealth":"' + wealth + '", "satisfaction":"' + satisfaction'}');

		var jasonStr = ""
		jsonStr = JSON.parse('{'
                  + '"country": '
                  + '"' + countries + '"'
                  + ", "
                  + '"household net wealth": '
                  + + Number(wealth) + ''
                  + ", "
                  + '"satisfaction": '
                  + + Number(satisfaction) + ''
                  + ' }');

		jsonList.push(jsonStr)
	};
	makeGraph(jsonList);
	//console.log(d3.values(jsonList[5])[2])
}; 

function makeGraph(jsonList){
		// create svg element
	var margin = {top: 20, right: 20, bottom: 30, left: 40},
    	width = 960 - margin.left - margin.right,
    	height = 500 - margin.top - margin.bottom;

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
    	.call(yaxis);

    // create x axis
    var xaxis = d3.axisBottom(xscale)
	    .ticks(10)
	    .tickSize(2)
	svg.append("g")
	   	.attr("transform", "translate(" + margin.left + "," + height + ")")
	   	.call(xaxis);

	var colors = ['#a6cee3','#1f78b4','#b2df8a','#33a02c','#fb9a99','#e31a1c','#fdbf6f','#ff7f00','#cab2d6','#6a3d9a','#ffff99','#b15928', '#a6cee3','#1f78b4','#b2df8a','#33a02c','#fb9a99','#e31a1c','#fdbf6f','#ff7f00','#cab2d6','#6a3d9a','#ffff99','#b15928', '#a6cee3','#1f78b4','#b2df8a','#33a02c','#fb9a99','#e31a1c','#fdbf6f','#ff7f00','#cab2d6','#6a3d9a','#ffff99','#b15928'];

	console.log(jsonList)
	var dots = svg.selectAll("circle")
   		.data(jsonList)
   		.enter()
   		.append("circle")
   		.attr("cx", function(d){return (xscale(d["household net wealth"]) + margin.left)})
    	.attr("cy", function(d){return (yscale(d["satisfaction"]) + margin.top)})
   		.attr("r", 5)
   		// HOE VIND JE HET NR VAN d????????????????????????????????
   		.style("fill", function(d){return d3.rgb(colors[d])})
   		.on("mouseover", function(d) {      
            tooltip.transition()        
                .duration(200)      
                .style("opacity", .9);      
            tooltip.html(d["country"] + "<br/>"  )  
                .style("left", (d3.event.pageX) + "px")     
                .style("top", (d3.event.pageY - 28) + "px");    
            })                  
        .on("mouseout", function(d) {       
            tooltip.transition()        
                .duration(500)      
                .style("opacity", 0); 
                });  
};

// clickable link to data source
var link = document.createElement('a');//create link
link.setAttribute('href', 'http://stats.oecd.org/SDMX-JSON/data/BLI/AUS+AUT+BEL+CAN+CHL+CZE+DNK+EST+FIN+FRA+DEU+GRC+HUN+ISL+IRL+ISR+ITA+JPN+KOR+LVA+LUX+MEX+NLD+NZL+NOR+POL+PRT+SVK+SVN+ESP+SWE+CHE+TUR+GBR+USA.IW_HNFW+SW_LIFS.L.TOT/all?');//set href
link.innerHTML = 'Data Source';//set text to be seen
document.body.appendChild(link);//add to body
};
