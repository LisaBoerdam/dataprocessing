window.onload = function(){ 
	d3.queue()
	.defer(d3.json, 'bevolking_man_vrouw.json')
	.defer(d3.json, 'bevolking_leeftijd.json')
	.await(function(error, maleFemale, Age) {
  		if (error) throw error;;
  		var maleFemale = maleFemale
  		var Age = Age

  		drawInit(maleFemale)
 	}); 
 }; 

function drawInit(initData){
	var svg = d3.select("body").transition();
  	d3.selectAll("svg").remove();

  	// create svg element
  	var margin = {top: 80, right: 100, bottom: 30, left: 40},
      	width = 800 - margin.left - margin.right,
      	height = 550 - margin.top - margin.bottom;

  	var svg = d3.select("body").append("svg")
      	.attr("width", width + margin.left + margin.right)
      	.attr("height", height + margin.top + margin.bottom)
      	.append("g")
      	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  	// add the tooltip area to the webpage
  	var tooltip = d3.select("body").append("div")
     	.attr("class", "tooltip")
    	.style("opacity", 0)

    /*
    * draw line graph FUNCTIE???
    */ 
	// create y scale
	var yscale = d3.scaleLinear()
	   	.domain([17000, 0])
	   	.range([0, height/2 - 50])

	// create x scale
	var xscale = d3.scaleLinear()
	    .domain([1900, 2010])
	    .range([0, width])

	// create y axis
  	var yaxis = d3.axisLeft(yscale)
    	.ticks(17)
    	.tickSize(2)
  	svg.append("g")
    	.attr("transform", "translate(" + margin.left + ",0)")
	    .call(yaxis)
	    .append("text")
	    .attr("class", "label")
	    .attr("transform", "rotate(-90)")
	    .attr("x", -50)
	    .attr("y", -50)
	    .attr("dy", ".71em")
	    .style("text-anchor", "end")
	    .style("fill", "black")
	    .style("font-weight", "bold")
	    .text("population size (x1000)")

  	// create x axis
  	var xaxis = d3.axisBottom(xscale)
    	.ticks(12)
    	.tickSize(4)
    	.tickFormat(d3.format("d"))
	svg.append("g")
	    .attr("transform", "translate(" + margin.left + "," + (height/2-50) + ")")
	    .call(xaxis)
	    .append("text")
	    .attr("class", "label")
	    .attr("x", 500)
	    .attr("y", +25)
	    .style("text-anchor", "end")
	    .style("font-weight", "bold")
	    .style("fill", "black")
	    .text("year");

	// define the line
	var lineFunction = d3.line()
        .x(function(d) { return xscale(d.period) + margin.left; })
        .y(function(d) { return yscale(d.total); })

    // draw the line
	var lineGraph = svg.append("path")
		.datum(initData)
        .attr("d", lineFunction)
        .attr("stroke", "black")
        .attr("fill", "none")
        .attr("class", "graph");

    // add clickable circles
    var dots = svg.selectAll("circle")
    	.data(initData)
    	.enter()
    	.append("circle")
    	.attr("cx", function(d){return xscale(d.period) + margin.left})
    	.attr("cy", function(d){return yscale(d.total)})
    	.attr("r", 5)
    	.style("fill", "black")
    	.on("mouseover", function(d) {      
    		tooltip.transition()        
        	.duration(200)      
        	.style("opacity", .9);      
      		tooltip.html(d.period + "<br/>"  )  
        	.style("left", (d3.event.pageX + 10) + "px")     
        	.style("top", (d3.event.pageY - 40) + "px");    
    	})                  
    	.on("mouseout", function(d) {       
      		tooltip.transition()        
        	.duration(500)      
        	.style("opacity", 0); 
    	}) 
    	.on("click", function(d) {
  			//console.log("You clicked", d);
  			infoYear(d);
		});

	/*
    * draw bar chart FUNCTIE???
    */ 
    // create y scale
	var yscale2 = d3.scaleLinear()
	   	.domain([8500, 0])
	   	.range([height/2 + 50, height])

	// create y axis
  	var yaxis2 = d3.axisLeft(yscale2)
    	.ticks(17)
    	.tickSize(2)
  	svg.append("g")
    	.attr("transform", "translate(" + margin.left + ",0)")
	    .call(yaxis2)
	    .append("text")
	    .attr("class", "label")
	    .attr("transform", "rotate(-90)")
	    .attr("x", -340)
	    .attr("y", -50)
	    .attr("dy", ".71em")
	    .style("text-anchor", "end")
	    .style("fill", "black")
	    .style("font-weight", "bold")
	    .text("population size (x1000)")

	// create x axis
	var xaxis2 = svg.append("path")
        .attr("d", "M40 440 L180 440 Z")
        .attr("stroke", "black")
        .attr("fill", "none")
        .attr("class", "graph");

    // create bars
    // male
	var rects = svg.append("rect")
		.attr("fill", "blue")
		.attr("x", 50)
		.attr("y", yscale2(initData[11]["male"]))
		.attr("width", 50)
		.attr("height", 440- (yscale2(initData[11]["male"])))
		.on("mouseover", function(d) {      
    		tooltip.transition()        
        	.duration(200)      
        	.style("opacity", .9);      
      		tooltip.html(initData[11]["male"]) 
        	.style("left", (d3.event.pageX + 10) + "px")     
        	.style("top", (d3.event.pageY - 40) + "px");    
    	})                  
    	.on("mouseout", function(d) {       
      		tooltip.transition()        
        	.duration(500)      
        	.style("opacity", 0); 
    	}) 

	// female
	var rects = svg.append("rect")
		.attr("fill", "pink")
		.attr("x", 120)
		.attr("y", yscale2(initData[11]["female"]))
		.attr("width", 50)
		.attr("height", 440- (yscale2(initData[11]["female"])))
		.on("mouseover", function(d) {      
    		tooltip.transition()        
        	.duration(200)      
        	.style("opacity", .9);      
      		tooltip.html(initData[11]["female"]) 
        	.style("left", (d3.event.pageX + 10) + "px")     
        	.style("top", (d3.event.pageY - 40) + "px");    
    	})                  
    	.on("mouseout", function(d) {       
      		tooltip.transition()        
        	.duration(500)      
        	.style("opacity", 0); 
    	});
 

}; 

function infoYear(d) {
	console.log(d)
	var svg = d3.select("body").transition();
	d3.selectAll(".graph").remove();
};