window.onload = function(){ 
    d3.queue()
    .defer(d3.json, 'bevolking_man_vrouw.json')
    .defer(d3.json, 'bevolking_leeftijd.json')
    .await(function(error, maleFemale, Age) {
        if (error) throw error;;
        var maleFemale = maleFemale
        var Age = Age

        drawInit(maleFemale, Age, 11)
    }); 
 }; 

function drawInit(initData, initData2, id){
    // add the tooltip area to the webpage
    var tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    drawLine(initData)
    drawBar(initData, id)
    drawPie(initData2, id)

    function drawLine(initData){
        // create svg element for line 
        var margin = {top: 10, right: 10, bottom: 10, left: 40},
            width = 1000 - margin.left - margin.right,
            height = 250 - margin.top - margin.bottom;

        var svg = d3.select("#area2").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        // create y scale
        var yscale = d3.scaleLinear()
            .domain([17000, 0])
            .range([0, height - 50])

        // create x scale
        var xscale = d3.scaleLinear()
            .domain([1900, 2020])
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
            .text("populatie grootte (x1000)")

        // create x axis
        var xaxis = d3.axisBottom(xscale)
            .ticks(12)
            .tickSize(4)
            .tickFormat(d3.format("d"))
        svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + (height-50) + ")")
            .call(xaxis)
            .append("text")
            .attr("class", "label")
            .attr("x", 450)
            .attr("y", +25)
            .style("text-anchor", "end")
            .style("font-weight", "bold")
            .style("fill", "black")
            .text("jaar");

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
                var svg = d3.select("#area3").selectAll("svg").remove();
                var svg = d3.select("#area4").selectAll("svg").remove();
                drawBar(initData, d.id);
                drawPie(initData2, d.id);
            });

    };

    function drawBar(initData, id){    
        // create svg element for barchart 
        var margin = {top: 0, right: 10, bottom: 40, left: 40},
            width = 250 - margin.left - margin.right,
            height = 300 - margin.top - margin.bottom;

        var svg = d3.select("#area3").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

        d3.selectAll("rect").remove();
        d3.selectAll("text.figureTitle").remove();
        
        // create y scale
        var yscale2 = d3.scaleLinear()
            .domain([8500, 0])
            .range([50, 230])

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
            .attr("x", -80)
            .attr("y", -50)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .style("fill", "black")
            .style("font-weight", "bold")
            .text("populatie grootte (x1000)")

        // create x axis
        var xaxis2 = svg.append("path")
            .attr("d", "M40 230 L180 230 Z")
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
            .attr("height", 230- (yscale2(initData[id]["male"])))
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
            .attr("height", 230- (yscale2(initData[id]["female"])))
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
            .attr("class", "figureLabel") 
            .attr("x", 10)   
            .attr("y", 20)
            .attr("text-anchor", "left") 
            .text("Man / vrouw verdeling");

        svg.append("text")
            .attr("class", "figureTitle") 
            .attr("x", 145)   
            .attr("y", 20)
            .attr("text-anchor", "left") 
            .text(initData2[id]["period"]);

        svg.append("text")
            .attr("class", "figureLabel") 
            .attr("x", 50)   
            .attr("y", 245)
            .attr("text-anchor", "left") 
            .text("Mannen");

        svg.append("text")
            .attr("class", "figureLabel") 
            .attr("x", 120)   
            .attr("y", 245)
            .attr("text-anchor", "left") 
            .text("Vrouwen");
    };
    
    /*
    * draw pie chart FUNCTIE???
    */
    function drawPie(initData2, id){
        // create svg element for barchart 
        var margin = {top: 0, right: 10, bottom: 40, left: 40},
            width = 250 - margin.left - margin.right,
            height = 300 - margin.top - margin.bottom;

        var svg = d3.select("#area4").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

        d3.selectAll(".arc").remove();

        var data = [{"label":"0-20", "value":initData2[id]["0-20"]}, {"label":"20-45", "value":initData2[id]["20-45"]}, 
                    {"label":"45-60", "value":initData2[id]["45-65"]}, {"label":"60-80", "value": initData2[id]["65-80"]}, 
                    {"label":"80+", "value": initData2[id]["80+"]}];

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
          .attr("transform", "translate(" + 80 + "," + 150 + ")") 

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
            .attr("class", "figureLabel") 
            .attr("x", -10)   
            .attr("y", 20)
            .attr("text-anchor", "left") 
            .text("Per leeftijds categorie (x1000)");

         svg.append("text")
            .attr("class", "figureTitle") 
            .attr("x", 165)   
            .attr("y", 20)
            .attr("text-anchor", "left") 
            .text(initData2[id]["period"]);
    };
    // /$('#1').on('click', drawBar(initData, 1))
};

function update(id){
    var svg = d3.select("body").transition();
    d3.selectAll("svg").remove();

     d3.queue()
    .defer(d3.json, 'bevolking_man_vrouw.json')
    .defer(d3.json, 'bevolking_leeftijd.json')
    .await(function(error, maleFemale, Age) {
        if (error) throw error;;
        var maleFemale = maleFemale
        var Age = Age

        drawInit(maleFemale, Age, id)
    }); 
}