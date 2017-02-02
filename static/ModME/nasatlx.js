var div = document.createElement("div");
div.setAttribute("id", "survay")
document.body.appendChild(div);
div = document.createElement("div");
div.style.width = "90%";
var button = document.createElement("button");
button.setAttribute("id", "button1");
button.setAttribute("type", "button");
button.style.float = "right";
button.style.padding = "0.5em";
//button.style.fontsize = "20px";
button.innerHTML = "Submit";
div.appendChild(button);
document.body.appendChild(div);

var l = 500, x = 100, y = 200;
var dash = 21;

var width=window.innerWidth*.95;
var height=window.innerHeight*.95;

var svg = d3.select("#survay").append("svg")
					       .attr("width", width)
					  	   .attr("height", height);

d3.chart("NasaScale", {

	initialize: function(){

		this.xScale = d3.scale.linear();
		this.yScale = d3.scale.linear();

		this.xDashes = d3.scale.linear();
		this.yDashes = d3.scale.linear();

		var sliderBase = this.base.append("g");
		var lineBase = this.base.append("g");
		var infoBase = this.base.append("g");
		var circle = this.base.append("circle").style("fill-opacity", 0).attr("r", 5);

		this.rating = -1;

		this.layer("slider", sliderBase, {
			dataBind: function(data){
				var chart = this.chart();

				chart.xDashes.domain([0,data.dash-1]);

				chart.data = data.dash;

				return this.selectAll("g")
					.data(d3.range(data.dash));
			},

			insert: function(){
				var chart = this.chart();

				chart.xDashes.range([chart.x,chart.x+chart.l]);

				var grps = this.append("g");

				grps.append("line")
				 	.attr("y1", chart.y)
				 	.style("stroke", "black");

				grps.append("rect")
				 	.attr("y", chart.y-30)
				 	.attr("width", chart.xDashes(.7)-chart.xDashes(0))
				 	.attr("height", 30)
				 	.style("fill-opacity", 0)
				 	.on("click", function(d,i){chart.rating = i; circle.attr("cx", chart.xDashes(i)).attr("cy", chart.y-10).style("fill-opacity", 1)});

				return grps;
				},

				events: {
					"enter" : function() {
						var chart = this.chart();

						this.selectAll("line")
							.attr("x1", function(d, i){return chart.xDashes(d)})
							.attr("x2", function(d, i){return chart.xDashes(d)})
							.attr("y2", function(d,i){
								if(d==((chart.data-1)/2)) {
									return chart.y-30;
								} else if(d==((chart.data-1)/4) || d==((chart.data-1)*3/4)) {
									return chart.y-25;
								} else {
									return chart.y-20;
								}
							})
							// .style("stroke", function(d,i){
							// 	if(d==((chart.data-1)/2)) {
							// 		return "red";
							// 	} else if(d==((chart.data-1)/4) || d==((chart.data-1)*3/4)) {
							// 		return "blue";
							// 	} else {
							// 		return "black";
							// 	}
							// })
							.style("stroke-width", function(d,i){
								if(d==((chart.data-1)/2) || d==((chart.data-1)/4) || d==((chart.data-1)*3/4)) {
									return 4;
								} else {
									return 3;
								}
							})
							;

						this.selectAll("rect")
							.attr("x", function(d){return chart.xDashes(d-.35)});
						
						return	this;
						},

					"update" : function() {
						var chart = this.chart();

						this.selectAll("line")
							.attr("x1", function(d){return chart.xDashes(d)})
							.attr("x2", function(d){return chart.xDashes(d)})
							.attr("y2", function(d,i){return (d==((chart.data-1)/2) || d==((chart.data-1)/4) || d==((chart.data-1)*3/4)) ? chart.y-30: chart.y-20});

						this.selectAll("rect")
							.attr("x", function(d){return chart.xDashes(d-.25)});
						
						return	this;
					},

					"exit" : function() {
						return this.remove();
					}
 				}
			});
		
		this.layer("line", lineBase, {

			dataBind: function(data){
				var chart = this.chart();
				return this.selectAll("line")
					.data([0]);
			},


			insert: function(){
				var chart = this.chart();
				return this.append("line")
				 			.attr("x1", chart.x)
				 			.attr("x2", chart.x+chart.l)
				 			.attr("y1", chart.y)
				 			.attr("y2", chart.y)
				 			.attr("stroke-width", 3)
				 			.attr("stroke", "black");
				},

				events: {
					"enter" : function() {
						var chart = this.chart();
						return this;
					},

					"update" : function() {
						var chart = this.chart();

						return this.attr("x1", chart.x)
				 			       .attr("x2", chart.x + chart.l)
				 			       .attr("y1", chart.y)
				 			       .attr("y2", chart.y);
					}
 				}
			});

		this.layer("info", infoBase, {

			dataBind: function(data){
				var chart = this.chart();
				chart.data = data;

				chart.xScale.domain([0,1]);

				chart.yScale.domain([0,1]);

				return this.selectAll("text")
					.data(data.info);
			},


			insert: function(){
				var chart = this.chart();

				chart.xScale.range([chart.x,chart.x+chart.l]);

				chart.yScale.range([chart.y-50,chart.y+30]);

				return this.append("text")
				 		   .style("font-size", "24px");
				},

				events: {
					"enter" : function() {
						var chart = this.chart();

						return this.attr("x", function(d){
									return chart.xScale(d.loc[0])})
								   .attr("y", function(d){
									return chart.yScale(d.loc[1])})
								   .text(function(d){
								   	return d.text
								   })
								   .attr("text-anchor", function(d){
								   	return d.loc[0]==0 && d.loc[1]!=1 ? "start":"end"});
					},

					"update" : function() {
						var chart = this.chart();

						// this.select("text")
						// 	.text(function(d){return d.tlText});

						console.log("update");

						return this;

					},

					"exit"  : function () {

						console.log("exit");

						return this.remove();
					}
 				}
			});

	},

	xpos: function(d){
		if(!arguments.length)
			return this.x;
		this.x = d;
		return this;
	},

	ypos: function(d){
		if(!arguments.length)
			return this.y;
		this.y = d;
		return this;
	},

	length: function(d){
		if(!arguments.length)
			return this.l;
		this.l = d;
		return this;
	},

	score: function(){
		return this.rating;
	}


});



var slider1data = { 

	dash: 21, info: [{text: "Mental Demand", loc: [0,-.35]}, 
					 {text: "How mentally demanding was the task?", loc: [0,0]}, 
					 {text: "Very Low", loc: [0.06,1]}, 
					 {text: "Very High", loc: [1.06,1]}]
}; 

var slider2data = { 

	dash: 21, info: [{text: "Physical Demand", loc: [0,-.35]},
					 {text: "How physically demanding was the task?", loc: [0,0]},
					 {text: "Very Low", loc: [0.06,1]},
					 {text: "Very High", loc: [1.06,1]}]
};

var slider3data = { 

	dash: 21, info: [{text: "Temporal Demand", loc: [0,-.35]},
					 {text: "How hurried or rushed was the pace of the task?", loc: [0,0]},
					 {text: "Very Low", loc: [0.06,1]},
					 {text: "Very High", loc: [1.06,1]}]
};

var slider4data = { 

	dash: 21, info: [{text: "Performance", loc: [0,-.6]},
					 {text: "How successful were you in accomplishing", loc: [0,-.25]},
					 {text: "what you were asked to do?", loc: [0,0]},
					 {text: "Perfect", loc: [0.06,1]},
					 {text: "Failure", loc: [1.06,1]}]
};

var slider5data = { 

	dash: 21, info: [{text: "Effort", loc: [0,-.6]},
					 {text: "How hard did you have to work to", loc: [0,-.25]},
					 {text: "accomplish your level of performance?", loc:[0,0]},
					 {text: "Very Low", loc: [0.06,1]},
					 {text: "Very High", loc: [1.06,1]}]
};

var slider6data = { 

	dash: 21, info: [{text: "Frustration", loc: [0,-.6]},
					 {text: "How insecure, discouraged, irritated,", loc: [0,-.25]},
					 {text: "stressed, and annoyed were you?", loc: [0,0]},
					 {text: "Very Low", loc: [0.06,1]},
					 {text: "Very High", loc: [1.06,1]}]
};

var slider7data = { 

	dash: 21, info: [{text: "Fatigue", loc: [0,-.35]},
					 {text: "How fatigued were you during the task?", loc: [0,0]},
					 {text: "Very Low", loc: [0.06,1]},
					 {text: "Very High", loc: [1.06,1]}]
};

var slider8data = { 

	dash: 21, info: [{text: "Boredom", loc: [0,-.35]},
					 {text: "How bored were you during the task?", loc: [0,0]},
					 {text: "Very Low", loc: [0.06,1]},
					 {text: "Very High", loc: [1.06,1]}]
};

var scale = d3.scale.linear();

scale.range([0,width]);
scale.domain([0,18]);

var title = svg.append("text").attr("x", 50).attr("y", 50).text("NASA-TLX (Task Load Index)").style("font-size", "26px");

var slider = svg.chart("NasaScale").xpos(scale(1)).ypos(scale(2)).length(scale(5));
slider.draw(slider1data);

var slider2 = svg.chart("NasaScale").xpos(scale(8)).ypos(scale(2)).length(scale(5));
slider2.draw(slider2data);

var slider3 = svg.chart("NasaScale").xpos(scale(1)).ypos(scale(4)).length(scale(5));
slider3.draw(slider3data);

var slider4 = svg.chart("NasaScale").xpos(scale(8)).ypos(scale(4)).length(scale(5));
slider4.draw(slider4data);

var slider5 = svg.chart("NasaScale").xpos(scale(1)).ypos(scale(6)).length(scale(5));
slider5.draw(slider5data);

var slider6 = svg.chart("NasaScale").xpos(scale(8)).ypos(scale(6)).length(scale(5));
slider6.draw(slider6data);

var slider7 = svg.chart("NasaScale").xpos(scale(1)).ypos(scale(8)).length(scale(5));
slider7.draw(slider7data);

var slider8 = svg.chart("NasaScale").xpos(scale(8)).ypos(scale(8)).length(scale(5));
slider8.draw(slider8data);

d3.select("#button1").on("click",function(){
        data = {"mental": slider.score(), "physical": slider2.score(), "temporal": slider3.score(), "performance": slider4.score(),
                "effort": slider5.score(), "frustration": slider6.score(), "fatigue": slider7.score(), "boredom": slider8.score()};
	if ((slider.score() != -1) && (slider2.score() != -1) && 
		(slider3.score() != -1) && (slider4.score() != -1) && 
		(slider5.score() != -1) && (slider6.score() != -1) &&
		(slider5.score() != -1) && (slider6.score() != -1) &&
		(slider7.score() != -1) && (slider8.score() != -1)) {
                document.getElementById("data").value = JSON.stringify(data);
		document.getElementById("submit").click();
	} else {
		alert("Select a value for each slider before submiting");
	}
});
