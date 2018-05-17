window.onload = function(){ 
	d3.queue()
	.defer(d3.json, 'bevolking_man_vrouw.json')
	.defer(d3.json, 'bevolking_leeftijd.json')
	.await(function(error, maleFemale, Age) {
  		if (error) throw error;;
  		var maleFemale = maleFemale
  		var Age = Age

  		drawInit(maleFemale, Age)
 	}); 
 }; 

function drawInit(initData, initData2){
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
    	.style("opacity", 0);

	drawLine(initData)
	drawBar(initData, 11)
	drawPie(initData2, 11)

	svg.append("text")
		.attr("class", "title")    
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "left") 
        .text("Populatie grootte en samenstelling NL");

	svg.append("text")
		.attr("class", "figureTitle") 
		.attr("x", 500)   
        .attr("y", 240)
        .attr("text-anchor", "left") 
        .text("Beweeg over de bolletjes en klik voor informatie over de bevolkingssamenstelling");

/*
* draw line graph FUNCTIE???
*/ 
function drawLine(initData){
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
    	.ticks(12)
    	.tickSize(2)
  	svg.append("g")
    	.attr("transform", "translate(" + margin.left + ",0)")
	    .call(yaxis)
	    .append("text")
	    .attr("class", "label")
	    .attr("transform", "rotate(-90)")
	    .attr("x", -30)
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
	    .attr("x", 350)
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
  			drawBar(initData, d.id);
  			drawPie(initData2, d.id);
		});

};
	/*
    * draw bar chart FUNCTIE???
    */ 
function drawBar(initData, id){    
	d3.selectAll("rect").remove();
	d3.selectAll("text.figureTitle").remove();
    // create y scale
	var yscale2 = d3.scaleLinear()
	   	.domain([8500, 0])
	   	.range([height/2 + 50, height])

	// create y axis
  	var yaxis2 = d3.axisLeft(yscale2)
    	.ticks(10)
    	.tickSize(2)
  	svg.append("g")
    	.attr("transform", "translate(" + margin.left + ",0)")
	    .call(yaxis2)
	    .append("text")
	    .attr("class", "label")
	    .attr("transform", "rotate(-90)")
	    .attr("x", -300)
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
		.attr("fill", "#abcaff")
		.attr("x", 50)
		.attr("y", yscale2(initData[id]["male"]))
		.attr("width", 50)
		.attr("height", 440- (yscale2(initData[id]["male"])))
		.on("mouseover", function(d) {      
    		tooltip.transition()        
        	.duration(200)      
        	.style("opacity", .9);      
      		tooltip.html(initData[id]["male"]) 
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
		.attr("fill", "#ff4040")
		.attr("x", 120)
		.attr("y", yscale2(initData[id]["female"]))
		.attr("width", 50)
		.attr("height", 440- (yscale2(initData[id]["female"])))
		.on("mouseover", function(d) {      
    		tooltip.transition()        
        	.duration(200)      
        	.style("opacity", .9);      
      		tooltip.html(initData[id]["female"]) 
        	.style("left", (d3.event.pageX + 10) + "px")     
        	.style("top", (d3.event.pageY - 40) + "px");    
    	})                  
    	.on("mouseout", function(d) {       
      		tooltip.transition()        
        	.duration(500)      
        	.style("opacity", 0); 
    	});

    svg.append("text")
		.attr("class", "figureTitle") 
		.attr("x", 10)   
        .attr("y", 240)
        .attr("text-anchor", "left") 
        .text("Man / vrouw verdeling");

    svg.append("text")
		.attr("class", "figureTitle") 
		.attr("x", 185)   
        .attr("y", 240)
        .attr("text-anchor", "left") 
        .text(initData2[id]["period"]);
};

 	/*
    * draw pie chart FUNCTIE???
    */
function drawPie(initData2, id){
	d3.selectAll(".arc").remove();

    var data = [{"label":"0-20", "value":initData2[id]["0-20"]}, {"label":"20-45", "value":initData2[id]["20-45"]}, 
    			{"label":"45-60", "value":initData2[id]["45-65"]}, {"label":"60-80", "value": initData2[id]["65-80"]}, 
    			{"label":"80+", "value": initData2[id]["80+"]}];

    //var color = d3.scaleOrdinal(d3.schemeCategory20);
    var color = d3.scaleOrdinal(["#abcaff", "#ff8330", "#a63fff", "#ff4040", "#ffd700"]);
    radius = Math.min(200, 200) / 2;
    var arc = d3.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);

    var labelArc = d3.arc()
    .outerRadius(radius - 40)
    .innerRadius(radius - 40);

    var pie = d3.pie()
    .sort(null)
    .value(function(d) { return d.value; });

    var g = svg.selectAll(".arc")
      .data(pie(data))
    .enter().append("g")
      .attr("class", "arc")
      .attr("transform", "translate(" + 350 + "," + 350 + ")") 

      g.append("path")
      .attr("d", arc)
      .style("fill", function(d) { return color(d.data.value); })
      .on("mouseover", function(d) {      
    		tooltip.transition()        
        	.duration(200)      
        	.style("opacity", .9);      
      		tooltip.html(d.data.value) 
        	.style("left", (d3.event.pageX + 10) + "px")     
        	.style("top", (d3.event.pageY - 40) + "px");    
    	})                  
    	.on("mouseout", function(d) {       
      		tooltip.transition()        
        	.duration(500)      
        	.style("opacity", 0); 
      	})
 	
 	g.append("text") 
      .attr("transform", function(d) { var c = labelArc.centroid(d); return "translate(" + c[0]*2.0 +"," + c[1]*1.6 + ")";})
      .text(function(d) { return d.data.label; })
      .style("font-size", "10px")
      .style("font-family", "sans-serif");

      svg.append("text")
		.attr("class", "figureTitle") 
		.attr("x", 260)   
        .attr("y", 240)
        .attr("text-anchor", "left") 
        .text("Per leeftijds categorie");

     svg.append("text")
		.attr("class", "figureTitle") 
		.attr("x", 430)   
        .attr("y", 240)
        .attr("text-anchor", "left") 
        .text(initData2[id]["period"]);
}; 

};
