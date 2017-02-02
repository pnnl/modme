var path_data = "M 0 3 L 1 3 L 1 0 L 5 5 L 1 10 L 1 7 L 0 7 z";

function addTable(selection, my_charts){
	
	my_table = selection.append("table");
	
	my_table.append("th")
			.text("time");
	my_table.append("th")
			.text("description");
	my_table.append("th")
			.text("task");
	my_table.attr("height", 650)
			.style("overflow", "scroll")
			.style("display","inline-block");
	
	my_charts.forEach(function(chart){
		chart.getBindings().forEach(function(d){
			if(d!="tick")
				chart.on(d, function(){
					my_table.insert("tr","tr").selectAll("td")
					.data([new Date(),d,chart.getName()])
					.enter().append("td")
					.text(function(text){return text;});
				});
		});
	});
}

function add_getter_setter(chart,config, property, default_value){
	config[property] = default_value;
	chart[property] = function(value){	
		if(!arguments.length)
				return config[property];
			config[property] = value;
			return chart;
	}
}

function get_generic_svg(selection, width, height, scaledWidth, scaledHeight, margin) {

	var width = width - margin.left - margin.right,
		height = height - margin.top - margin.bottom;
	
	var svg = selection.append("svg")
		.attr("width", scaledWidth + margin.left + margin.right)
		.attr("height", scaledHeight + margin.top + margin.bottom)
		.append("g")
		.attr("transform", ["translate(" + (margin.left) + "," + margin.top + ")","scale("+(scaledWidth/width)+","+(scaledHeight/height)+")"]);
	
	var xScale = d3.scale.linear()
		.range([0, width]);
	
	var yScale = d3.scale.linear()
		.range([height,0]);
		
	background = svg.append("rect")
						.attr("class", "background")
						.attr("width", width)
						.attr("height", height)
						.attr("x", 0)
						.attr("y", 0);
		
	svg.xScale = xScale;
	svg.yScale = yScale;
	return svg;
}

//change for namespace
function add_bindings(chart, config, bindingNames){
	config.bindings={};
	bindingNames.forEach(function(d){
		config.bindings[d] = [];
	});
	chart.getBindings = function(){
		return bindingNames;
	}
	chart.on = function(name, callback){
		config.bindings[name].push(callback);
	}
	chart.callBindings = function(name,args){
		config.bindings[name].forEach(function(d){
			d(args);
		});
	}
}

function getRandomIndex(arrayLength){
	return Math.floor(Math.random()*arrayLength);
}

function keyBoardBindings(chart,keyCode){
	if(keyCode==13){
		chart.comm.accept();
	}
	else if(keyCode==37){
		chart.comm.frequencyDown();
	}
	else if(keyCode==38){
		chart.comm.indexDown();
	}
	else if(keyCode==39){
		chart.comm.frequencyUp();
	}
	else if(keyCode==40){
		chart.comm.indexUp();
	}
	else if(keyCode>=112 && keyCode<=115){
		chart.monitor.resetSliders(keyCode-112);
	}
	else if(keyCode==116 || keyCode==117){
		chart.monitor.resetButtons(keyCode-116);
	}
	else if(keyCode>=49 && keyCode<=56){
		chart.manage.flipSwitch(keyCode);
	}
}

function communication() {var config={};
	var index=0;
	var grps;
	var target_text;
	
	function update(selection) {
		selection.select("text").text(function(d,i){return d.frequency/10;});
		selection.select("rect").classed("highlighted", function(d,i){return index==i;});
	}
	
	function chart(svg){
		svg.xScale.domain([0,4]);
		//Multiplying by .25 allows room for gaps between channels
		//Adding four allows room for the target name and frequency as well as spacing
		var yMax = config.channels.length+(config.channels.length-1)*.25+4;
		svg.yScale.domain([0,yMax]);
		
		
		target = svg.append("rect")
					.attr("class", "communication")
					.attr("width", svg.xScale(2))
					.attr("height", svg.yScale(0)-svg.yScale(1))
					.attr("x", svg.xScale(1))
					.attr("y", target_y = svg.yScale(config.channels.length+(config.channels.length-1)*.25+3));
				
		target_name = svg.append("svg:text")
						.attr("text-anchor", "start")
						.text(config.target.name)
						.attr("x", svg.xScale(1.2))
						.attr("y", target_y+svg.yScale(0)-svg.yScale(.75))
						.attr("class", "communication")
						.attr("id", "comm_target_name")
						.classed("alert",false);
						
		target_frequency = svg.append("svg:text")
						.attr("text-anchor", "end")
						.text(config.target.frequency/10)
						.attr("x", svg.xScale(2.8))
						.attr("y", target_y+svg.yScale(0)-svg.yScale(.75))
						.attr("class", "communication")
						.attr("id", "comm_target_freqeuncy")
						.classed("alert",false);
		
		grps = svg.selectAll("g").data(config.channels);
		
		new_grps = grps.enter()
						.append("g")
						.attr("transform", function(d,i){
							return "translate("+svg.xScale(1)+","+svg.yScale(yMax-3-i*1.25)+")";});//Multiply i by 1.25 to add spacing between channels
		
		new_grps.append("rect")
				.attr("class", "communication")
				.attr("width", svg.xScale(2))
				.attr("height", svg.yScale(0)-svg.yScale(1));
				
		frequency = new_grps.append("svg:text")
				.attr("text-anchor", "end")
				.text(function(d){return (d.frequency = d.avalibleFrequency[0])/10;})
				.attr("x", svg.xScale(1.8))
				.attr("y", svg.yScale(0)-svg.yScale(.75))
				.attr("id", function(d,i){return "comm_channel_"+i+"_frequency";})
				.attr("class", "communication");
				
		name = new_grps.append("svg:text")
				.attr("text-anchor", "start")
				.text(function(d){return d.name})
				.attr("x", svg.xScale(.2))
				.attr("y", svg.yScale(0)-svg.yScale(.75))
				.attr("id", function(d,i){return "comm_channel_"+i+"_name";})
				.attr("class", "communication");
			
		
					
		grps.call(update);
		
		grps.exit().remove();
		
		function event(){
			chart.callBindings("alert", {domID: target_name.attr("id")});
			var channel = getRandomIndex(config.channels.length);
			var frequency = getRandomIndex(config.channels[channel].avalibleFrequency.length);
			config.target.name = config.channels[channel].name;
			config.target.frequency = config.channels[channel].avalibleFrequency[frequency];
			target_name.text(config.target.name);
			target_frequency.text(config.target.frequency/10);
			target_name.classed("alert",true);
			target_frequency.classed("alert",true);
			
			setTimeout(function(){
				if(target_name.classed("alert")){
					chart.callBindings("timeout",{domID: target_name.attr("id")});
				}
				target_name.classed("alert",false);
				target_frequency.classed("alert",false);
			},config.responseTime);
			
			setTimeout(event, config.eventFunction());
		}
		
		setTimeout(event, config.eventFunction());
		
		
	}
	
	chart.getName = function(){
		return "communication";
	};
	
	chart.frequencyUp = function(){
		chart.callBindings("response",{});
		config.channels[index].frequency+=config.controller.frequencyIncrement;
		grps.select("text").text(function(d,i){return d.frequency/10;});
		grps.select("rect").classed("highlighted", function(d,i){return index==i;});
	};
	
	chart.frequencyDown = function(){
		chart.callBindings("response",{});
		config.channels[index].frequency-=config.controller.frequencyIncrement;
		grps.select("text").text(function(d,i){return d.frequency/10;});
		grps.select("rect").classed("highlighted", function(d,i){return index==i;});
	};
	
	chart.indexUp = function(){
		chart.callBindings("response",{});
		index=(index+1)%config.channels.length;
		grps.select("text").text(function(d,i){return d.frequency/10;});
		grps.select("rect").classed("highlighted", function(d,i){return index==i;});
	};
	
	chart.indexDown = function(){
		chart.callBindings("response",{});
		index = index==0 ? config.channels.length-1 : index-1;
		grps.select("text").text(function(d,i){return d.frequency/10;});
		grps.select("rect").classed("highlighted", function(d,i){return index==i;});
	};
	
	chart.accept = function(){
		chart.callBindings("response",{});
		target_name.classed("alert", (config.target.name==config.channels[index].name && config.target.frequency==config.channels[index].frequency)?
			false : target_name.classed("alert"));
			 
		target_frequency.classed("alert", (config.target.name==config.channels[index].name && config.target.frequency==config.channels[index].frequency)?
			false : target_frequency.classed("alert")); 
			
		grps.select("text").text(function(d,i){return d.frequency/10;});
		grps.select("rect").classed("highlighted", function(d,i){return index==i;});
	};
	
	add_getter_setter(chart, config, "channels", [{name: "OPS 1", avalibleFrequency: [1173,1231,1123,1131]},
					{name: "OPS 2", avalibleFrequency: [1235,1231,1123,1131]},
					{name: "INT 1", avalibleFrequency: [1141,1231,1123,1131]},
					{name: "INT 2", avalibleFrequency: [1259,1231,1123,1131]}]);
	
	add_getter_setter(chart, config, "target", {name: "OPS1",frequency:1173});
	
	add_getter_setter(chart, config, "controller", {indexUp: 40, indexDown: 38, frequencyUp: 39, frequencyDown: 37,
					 accept: 13, frequencyIncrement: 2});
					 
	add_getter_setter(chart, config, "responseTime", 1000);
					 
	add_getter_setter(chart, config, "eventFunction", function(){return 2000;});
	
	add_bindings(chart, config, ["alert","timeout","response"]);
	
	return chart;}

function tracking() {
	
	var config = {};
	var circles = [];
	var index=0;
	var mouseEvent={x: 0, y: 0};
	
	function chart(svg){
		//generate graph here
		
		svg.xScale.domain([0,1]);
		svg.yScale.domain([0,1]);
		
		function mouseTrack(selection){
			selection.on("mousemove", function(){
						return mouseEvent=event;
 					});
		}
		
		var path_grp = svg.append("g").selectAll("path");
		
		//Done: Use .call for mouse tracking behavior
		var area = svg.append("rect")
						.attr("width", svg.xScale(1))
						.attr("height", svg.yScale(0))
						.attr("id", "track_area")
						.style("fill-opacity",0)
						.style("stroke-width", "0px")
						.style("cursor", "move")
						.on("click", function(){chart.callBindings("response",{});})
						.call(mouseTrack);
		
		config.orbits.forEach( function(orbit){
			var points = [];
			orbit.points.forEach(function(point){
				points.push([(point[0]+svg.xScale(.5)), (point[1]+svg.yScale(.5))]);	
			});
			
			var path = path_grp.data([points]).enter()
					.append("path")
					.attr("d", d3.svg.line()
					.tension(0)
					.interpolate("basis-closed"));
					
			if(config.showPathPoints){				
				svg.selectAll(".point")
					.data(points)
					.enter().append("circle")
					.attr("r", 4)
					.attr("transform", function(d){return "translate("+d+")";})
			}
					
			var circle = svg.append("circle")
							.attr("class", "tracking")
							.attr("r", orbit.radius)
							.attr("transform", "translate("+points[0]+")")
							.attr("id", "track_circle_"+circles.length)
							.style("cursor", "move")
							.on("click", function(){chart.callBindings("response",{});circle.classed("alert",false);})
							.call(mouseTrack);
							
			circles.push(circle);
			
			transition();
			
			function transition(){		
				circle.transition()
						.duration(orbit.interval)
						.ease("linear")
						.attrTween("transform", translateAlong(path.node()))
						.each("end", transition);
			}
		
	
	
			function translateAlong(path) {
				var l = path.getTotalLength();
				return function(d,i,a){
					return function(t){
						var p = path.getPointAtLength(t*l);
						return "translate("+p.x+","+p.y+")";
					};
				};
			}
		
		});
	
		// var cursor = svg.append("circle")
// 					.attr("r", 10)
// 					.attr("cx", 15)
// 					.attr("cy", 15)
// 					.attr("fill", "none")
// 					.attr("stroke-width", "3px")
// 					.attr("stroke", "white");
		
		setInterval(function(){
			state = [];
			circles.forEach(function(d){
				if(d.classed("alert")){
					state.push(2);
				}
				else if(d.classed("active")){
					state.push(1);
				}
				else{
					state.push(0);
				}
			});
			chart.callBindings("tick",{event: mouseEvent, state: state});
		},config.refresh);
		
		function alert(){
			if(circles[index].classed("alert"))
				chart.callBindings("timeout",{domID: circles[index].attr("id")});
			circles[index].classed("active",false).classed("alert",false);
			index=getRandomIndex(circles.length);
			chart.callBindings("alert",{domID: circles[index].attr("id")});
			circles[index].classed("alert",true).classed("active",true);
			
			setTimeout(alert, config.eventFunction());
		}
		
		setTimeout(alert, config.eventFunction());
		
	}
	
	chart.getName = function(){
		return "tracking";
	};
	
	add_getter_setter(chart, config, "orbits", [{points: [[225.0, 75.0], [225.0, -75.0], [-225.0, -75.0], [-225.0, 75.0]], interval: 10000, radius:13},
				{points: [[232.3557158514987, -47.548094716167085], [157.3557158514987, -177.4519052838329], [-232.3557158514987, 47.548094716167085], [-157.3557158514987, 177.4519052838329]],interval: 20000, radius:8},
				{points: [[157.3557158514987, 177.4519052838329], [232.3557158514987, 47.548094716167085], [-157.3557158514987, -177.4519052838329], [-232.3557158514987, -47.548094716167085]],interval: 15000, radius:10}]);
	
	add_getter_setter(chart, config, "showPathPoints", false);
	
	add_getter_setter(chart, config, "refresh", 100);
	
	add_getter_setter(chart, config, "eventFunction", function(){return 1000;});
	
	add_bindings(chart, config, ["alert","timeout","response","tick"]);
	
	return chart;
}

function monitoring() {
	
	var config = {};
	var buttons;
	var sliders;
	var rect_height = .3;
	var my_svg;
	var index;
	var totalProb = 0;
	
	function chart(svg){
		//generate graph here
		
		my_svg = svg;
		
		svg.xScale.domain([0,config.scales.length+(config.scales.length-1)*1.5+4]);
		svg.yScale.domain([0,config.ticks+9]);
		
		config.scales.forEach(function(d){
			d.i=0;
			d.y=Math.round(config.ticks/2);
			if(!d.hasOwnProperty("prob")){
				d.prob = 1;
			}
			totalProb += d.prob;
		});
		
		config.buttons.forEach(function(d){
			if(!d.hasOwnProperty("prob")){
				d.prob = 1;
			}
			totalProb += d.prob;
		});
		
		grps = svg.selectAll("g").data(config.scales);
		
		new_grps = grps.enter().append("g").attr("transform", function(d,i){return "translate("+svg.xScale(i*2.5+2)+","+0+")";}).attr("class", "monitoring");
		
		new_grps.selectAll("line").data(function(d){return d3.range(0,config.ticks);})
				.enter()
				.append("line")
				.attr("y1", function(d,i){return svg.yScale(i+3);})
				.attr("y2", function(d,i){return svg.yScale(i+3);})
				.attr("x1", svg.xScale(0))
				.attr("x2", svg.xScale(1));
				
		new_grps.append("line")
				.attr("y1", svg.yScale(3))
				.attr("y2", svg.yScale(config.ticks+2))
				.attr("x1", svg.xScale(.5))
				.attr("x2", svg.xScale(.5));
				
// 		sliders = new_grps.append("rect")
// 						.attr("width", svg.xScale(.8))
// 						.attr("height", svg.yScale(0)-svg.yScale(rect_height))
// 						.attr("x", svg.xScale(-.4))
// 						.attr("y", svg.yScale(4+rect_height/2))
// 						.each(chart.transition);
		
		sliders = new_grps.append("svg:path")
					.attr("class", "monitoring")
					.attr("transform", ["translate("+svg.xScale(-.5)+","+svg.yScale(Math.round(config.ticks/2)+2.75)+")","scale("+svg.xScale(.5)/5+","+(svg.yScale(0)-svg.yScale(1.5))/10+")"])
 					.attr("d", path_data)
 					.style("stroke-width", ".6")
 					.attr("id", function(d,i){return "monitor_slider_"+i;})
 					.each(chart.transition);
 		
 		new_grps.append("text")
 				.text(function(d){return d.key;})
 				.attr("class", "monitoring")
 				.attr("x", svg.xScale(0))
 				.attr("y", svg.yScale(1.75));
		
			
		
				
		var total_width = config.scales.length+(config.scales.length-1)*1.5+4;
		
		var rect_width = (total_width-4.5)/(config.buttons.length+((config.buttons.length-1)/3.5));
		
		var buttons_offset = (config.scales.length+1)/2 - total_width/2;
						
		buttons = svg.append("g")
						.attr("transform", function(d,i){return "translate("+0+","+svg.yScale(config.ticks+7)+")";})
						.attr("class", "monitoring")
						.selectAll("rect").data(config.buttons)
						.enter().append("rect")
							.attr("width", svg.xScale(rect_width))
							.attr("height", svg.yScale(0)-svg.yScale(2))
							.attr("x", function(d,i){return svg.xScale(2)+svg.xScale(i*(rect_width+rect_width/3.5))})
							.attr("id", function(d,i){return "monitor_button_"+i;})
							.style("fill", function(d){return d.color;});
		
		svg.append("g")
				.attr("transform", function(d,i){return "translate("+svg.xScale(rect_width/2-.5)+","+svg.yScale(config.ticks+3.75)+")";})
				.attr("class", "monitoring")
				.selectAll("rect").data(config.buttons)
				.enter().append("text")
					.text(function(d){return d.key;})
					.attr("class", "monitoring")
					.attr("x", function(d,i){return svg.xScale(2)+svg.xScale(i*(rect_width+rect_width/3.5))});
		
		function eventTimeout(){
			if(index<config.buttons.length){
				chart.callBindings("timeout",{domID: "monitor_button_"+index});
				config.buttons[index].alert = false;
				buttons.style("fill",function(d,i){return d.alert ? d.alert_color : d.color});
			}
			
		}
		
// 		function event(){
// 			index = getRandomIndex((config.buttons.length+config.scales.length));
// 			if(index<config.buttons.length){
// 				chart.callBindings("alert", {domID: "monitor_button_"+index});
// 				config.buttons[index].alert = true;
//  				buttons.style("fill",function(d,i){return d.alert ? d.alert_color : d.color});
//  				setTimeout(eventTimeout, config.buttons[index].autoCorrect);
//  				setTimeout(event, config.eventFunction());
// 			}
// 			else{
// 				config.scales[index-config.buttons.length].event=true;
// 				rangeIncrease = getRandomIndex(2);
// 				config.event_range = [2-rangeIncrease,config.ticks-1+rangeIncrease];
// 				config.scales[index-config.buttons.length].i--;
// 				setTimeout(event, config.eventFunction());
//  			}
// 	
// 		}
		
		
		function event(){
			prob = getRandomIndex(totalProb)+1;
			temp = 0;
			index = 0;
			
			config.buttons.forEach(function(d){
				temp += d.prob;
				if(temp>=prob){
					return false;
				}
				index++;
			});
			if(temp<prob){
				config.scales.forEach(function(d){
					temp += d.prob;
					if(temp>=prob){
						return false;
					}
					index++;
				});
			}
			if(index<config.buttons.length){
				chart.callBindings("alert", {domID: "monitor_button_"+index});
				config.buttons[index].alert = true;
 				buttons.style("fill",function(d,i){return d.alert ? d.alert_color : d.color});
 				setTimeout(eventTimeout, config.buttons[index].autoCorrect);
 				setTimeout(event, config.eventFunction());
			}
			else{
				config.scales[index-config.buttons.length].event=true;
				rangeIncrease = getRandomIndex(2);
				config.event_range = [2-rangeIncrease,config.ticks-1+rangeIncrease];
				config.scales[index-config.buttons.length].i--;
				setTimeout(event, config.eventFunction());
 			}
 			temp=0;
		}
		
		setTimeout(event, config.eventFunction());
		
	
	}

	chart.transition = function(d){	
		d.i++;
		var deltaY = config.slider_range[d.i%config.slider_range.length]-d.y;
		if(d.event){
			deltaY = rect_height/2+config.event_range[d.i%config.slider_range.length]-d.y;
			d.alert = 0;
			
		}
		if(d.alert<=2){
			d.alert++;
		}
		
		d.y += deltaY;
		
// 		d3.select(this).transition()
// 				.duration(Math.abs(deltaY*d.slider_interval))
// 				.ease("linear")
// 				.attr("y", my_svg.yScale(d.y))
// 				.each("end", chart.transition);

		d3.select(this).transition()
				.duration(Math.abs(deltaY*d.slider_interval))
				.ease("linear")
				.attr("transform", ["translate("+my_svg.xScale(-.5)+","+my_svg.yScale(d.y+2.75)+")","scale("+my_svg.xScale(.5)/5+","+(my_svg.yScale(0)-my_svg.yScale(1.5))/10+")"])
				.each("end", chart.transition);
				
		
		if(d.event){
			chart.callBindings("alert", {domID: d3.select(this).attr("id")});
			d.event=false;
			d.i++;
		}
		else if(d.alert==3){
			chart.callBindings("timeout", {domID: d3.select(this).attr("id")});
			setTimeout(event, config.eventFunction());
		}
	};	
	
	chart.getName = function(){
		return "monitoring";
	};	
	
	chart.resetSliders = function(sliderNum){
		sliderCenter = Math.round(config.ticks/2);
		currentPosition = my_svg.yScale.invert(d3.select(sliders[0][sliderNum]).attr("transform").split(",")[1].split(")")[0]);
		if((currentPosition>sliderCenter+3.75 || currentPosition<sliderCenter+1.25)){//Add 2 for offset of the spacing and add or subtract .75 to adjust positon for the point of arrow	
			chart.callBindings("response",{});
			sliders[0][sliderNum].alert=4;
			sliders[0][sliderNum].y = Math.round(config.ticks/2);
			d3.select(sliders[0][sliderNum])
					.transition()
					.duration(0)
					.attr("transform", ["translate("+my_svg.xScale(-.5)+","+my_svg.yScale(sliders[0][sliderNum].y+2.75)+")","scale("+my_svg.xScale(.5)/5+","+(my_svg.yScale(0)-my_svg.yScale(1.5))/10+")"])
					.each("end", chart.transition);
		}
	};
	
	chart.resetButtons = function(buttonNum){
		chart.callBindings("response",{});
		config.buttons[buttonNum].alert = false;
		d3.select(buttons[0][buttonNum]).style("fill", config.buttons[buttonNum].color);
		
	};
	
	add_getter_setter(chart, config, "scales", [{button: 112, key: "F1", slider_interval: 2000, event_probablity: .1},
				{button: 113, key: "F2", slider_interval: 2000, event_probablity: .25},
				{button: 114, key: "F3", slider_interval: 1000, event_probablity: .05},
				{button: 115, key: "F4", slider_interval: 2000, event_probablity: .1}]);
	
	add_getter_setter(chart, config, "slider_range", [3,5]);
	
	add_getter_setter(chart, config, "ticks", 7);

	add_getter_setter(chart, config, "tick_width", .5);
	
	add_getter_setter(chart, config, "rect_height", 1);
	
	add_getter_setter(chart, config, "eventFunction", function(){return 20000;});
	
	add_getter_setter(chart, config, "buttons", [{color: "lightgreen", button: 116, key: "F5", alert_color:"black", autoCorrect: 1000},
													{color: "black", button: 117, key: "F6", alert_color:"red", autoCorrect: 1000}]);
													
	add_bindings(chart, config, ["alert","timeout","response"]);
	
	return chart;
}

function resourceManagement() {
	
	var config={};
	var switchesGrp;
	
	function chart(svg){
		//generate graph here
		
		svg.xScale.domain([0,18]);
		svg.yScale.domain([0,9]);
		
		
		config.switches.forEach(function(d){
			d.count=0;
		});		
		
		var tanksGrp = svg.append("g").selectAll("g").data(config.tanks).enter().append("g");
		
		switchesGrp = svg.append("g").selectAll("g").data(config.switches).enter().append("g");
		
		var generatorGrp = svg.append("g").selectAll("g").data(config.generators).enter().append("g");

		
		
			tanksGrp.append("rect")
				.attr("class", "resource")
				.attr("width", function(d){return svg.xScale(d.width);})
				.attr("height", function(d){return svg.yScale(0)-svg.yScale(d.height*d.resource/d.maxResource);})
				.attr("x", function(d){return svg.xScale(d.x);})
				.attr("y", function(d){return svg.yScale(d.y-d.height*(1-d.resource/d.maxResource));})
				.attr("id", function(d,i){return "management_tank_"+i+"_resource";});
			
			//To do: make stroke width and offset a variable	
			tanksGrp.append("line")
				.attr("class", "resourceManagement")
				.attr("x1", function(d){return svg.xScale(d.x)-4;})
				.attr("y1", function(d){if(d.targetRangeMax==null)return 0; return svg.yScale(d.y-d.height*(1-d.targetRangeMax/d.maxResource));})
				.attr("x2", function(d){return svg.xScale(d.x)-4;})
				.attr("y2", function(d){if(d.targetRangeMax==null)return 0; return svg.yScale(d.y-d.height*(1-d.targetRangeMin/d.maxResource));})
				.attr("stroke-width", "8px");
			
			tanksGrp.append("line")
				.attr("class", "resourceManagement")
				.attr("x1", function(d){return svg.xScale(d.x+d.width)+4;})
				.attr("y1", function(d){if(d.targetRangeMax==null)return 0; return svg.yScale(d.y-d.height*(1-d.targetRangeMax/d.maxResource));})
				.attr("x2", function(d){return svg.xScale(d.x+d.width)+4;})
				.attr("y2", function(d){if(d.targetRangeMax==null)return 0; return svg.yScale(d.y-d.height*(1-d.targetRangeMin/d.maxResource));})
				.attr("stroke-width", "8px");
			
			tanksGrp.append("text")
				.attr("class", "resourceManagement")
				.attr("x", function(d){return svg.xScale(d.x+d.width*.3);})
				.attr("y", function(d){return svg.yScale(d.y-d.height-.5);})
				.text(function(d){return d.resource;})
				.attr("id", function(d,i){return "management_tank_"+i+"_amount";});
				
			tanksGrp.append("rect")
				.attr("class", "resourceManagement")
				.attr("width",function(d){return svg.xScale(d.width);})
				.attr("height",function(d){return svg.yScale(0)-svg.yScale(d.height);})
				.attr("x",function(d){return svg.xScale(d.x);})
				.attr("y",function(d){return svg.yScale(d.y);});

			generatorGrp.append("circle")
						.attr("class", "resourceManagement")
						.attr("r", function(d){return svg.yScale(0)-svg.yScale(d.r);})
						.attr("cx", function(d){return svg.xScale(d.cx);})
						.attr("cy", function(d){return svg.yScale(d.cy);});		
		

			switchesGrp.append("line")
						.attr("class", "resourceManagement")
						.attr("x1", function(d){return svg.xScale(d.x1);})
						.attr("y1", function(d){return svg.yScale(d.y1);})
						.attr("x2", function(d){return svg.xScale(d.x2);})
						.attr("y2", function(d){return svg.yScale(d.y2);});
				
			switchesGrp.append("svg:path")
				.attr("class", "switches")
				.attr("transform", function(d){return ["translate("+svg.xScale((d.x1+d.x2)/2-.25*Math.cos(d.rotation*Math.PI/180)+.5*Math.sin(d.rotation*Math.PI/180))
																+","+svg.yScale((d.y1+d.y2)/2+.5*Math.cos(d.rotation*Math.PI/180)+.25*Math.sin(d.rotation*Math.PI/180))+")",
														"scale("+svg.xScale(.5)/5+","+(svg.yScale(0)-svg.yScale(1))/10+")",
														"rotate("+d.rotation+")"];})
				.attr("d", path_data)
				.attr("id", function(d,i){return "manage_switch_"+i;});
				
			switchesGrp.append("text")
				.attr("class", "resourceManagement")
				.attr("x", function(d){return svg.xScale(d.textX);})
				.attr("y", function(d){return svg.yScale(d.textY);})
				.text(function(d){return d.keyboard;});

		
		
		
		
		setInterval(function(){
			var state = [];
			config.switches.forEach(function(d){
				if(d.alert){
					state.push(2);
				}
				else if(d.on){
					state.push(1);
				}
				else{
					state.push(0);
				}
			});
			chart.callBindings("tick",{state:state});
			config.tanks.forEach(function(d,i){
				d.delta=d.decayRate*config.refresh>d.resource? -d.resource:-d.decayRate*config.refresh;
			});
			
			config.generators.forEach(function(d){
				d.delta=0;
			});
			
			config.switches.forEach(function(d){
				var delta = Math.max(Math.min(d.transferRate*d.on*config.refresh, d.source.resource+d.source.delta, d.target.maxResource-d.target.resource+d.target.delta),0);
				d.source.delta -= delta;
				d.target.delta += delta;
			});
			
			config.tanks.forEach(function(d){
				
				d.resource += d.delta;
			});
			
			config.switches.forEach(function(d, i){
				if(d.source.resource == 0)
					d.on = false;
				d.count += config.refresh;
			});
			
			
			tanksGrp.select("rect").attr("height", function(d){return svg.yScale(0)-svg.yScale(d.height*d.resource/d.maxResource);})
									.attr("y", function(d){return svg.yScale(d.y-d.height*(1-d.resource/d.maxResource));});
			
			tanksGrp.select("text").text(function(d){return Math.round(d.resource);});
			
		},config.refresh);
		
		function event(){
			index = getRandomIndex(config.switches.length);
			config.switches[index].on=false;
			config.switches[index].alert=true;
			config.switches[index].count=0;
			chart.callBindings("alert",{domID: "manage_switch_"+index});
			switchesGrp.select("path").classed("on", function(d,i){return d.on;})
						.classed("alert", function(d,i){return d.alert});
			
			setTimeout(function(){
				config.switches[index].alert=false;
				switchesGrp.select(".alert").classed("alert", function(d){return d.alert;});
			}, config.switches[index].repairTime);
						
			setTimeout(event, config.eventFunction());
		}
		
		setTimeout(event, config.eventFunction());	
	}
	
	chart.getName = function(){
		return "management";
	};
	
	chart.flipSwitch = function(keyCode){
		switchesGrp.select("path").classed("on", function(d){
										if(!d.alert&&d3.event.keyCode==d.key){
											chart.callBindings("response",{});
											d.on=!d.on;
										}
										return d.on;
										});
	};
	
	var tankA = {label: "A", x:3 , y: 8.75, width:4 , height: 3.75, decayRate: .05, resource: 500, maxResource: 10000, targetRangeMax:2750 ,targetRangeMin:2250};
	var tankB = {label: "B", x:11 , y: 8.75, width:4 , height: 3.75, decayRate: .05, resource: 2000, maxResource: 4000, targetRangeMax:2750 ,targetRangeMin:2250};
	var tankC = {label: "C", x:2 , y: 3, width:2 , height: 2, decayRate: 0, resource: 1000, maxResource: 2000};
	var tankD = {label: "D", x:10 , y: 3, width:2 , height: 2, decayRate: 0, resource: 1000, maxResource: 2000};
	
	var generator1 = {label: "S1", resource: Number.POSITIVE_INFINITY, cx: 7, cy: 2, r: 1};
	var generator2 = {label: "S2", resource: Number.POSITIVE_INFINITY, cx: 15, cy: 2, r: 1};
	
	add_getter_setter(chart, config, "tanks", [tankA, tankB, tankC, tankD]);
	
	add_getter_setter(chart, config, "generators", [generator1, generator2]);
	
	add_getter_setter(chart, config, "switches", [{source: tankC, target: tankA, transferRate:.03, x1: 3.5, y1: 5, x2: 3.5, y2: 3, textX: 2.5, textY: 3.9, rotation: -90, on:0, key:49, keyboard: "1", repairTime: 4000},
									{source: generator1, target: tankA, transferRate:.03, x1: 6.5, y1: 5, x2: 6.5, y2: 2.85, textX: 5.5, textY: 3.9, rotation: -90, on:0, key: 50, keyboard: "2", repairTime: 4000},
									{source: tankD, target: tankB, transferRate:.03, x1: 11.5, y1: 5, x2: 11.5, y2: 3, textX: 10.5, textY: 3.9, rotation: -90, on:0, key: 51, keyboard: "3", repairTime: 4000},
									{source: generator2, target: tankB, transferRate:.03, x1: 14.5, y1: 5, x2: 14.5, y2: 2.85, textX: 13.5, textY: 3.9, rotation: -90, on:0, key: 52, keyboard: "4", repairTime: 4000},
									{source: generator1, target: tankC, transferRate:.03, x1: 4, y1: 2, x2: 6, y2: 2, on:0, textX: 4.9, textY: 1, rotation: 180, key: 53, keyboard: "5", repairTime: 4000},
									{source: generator2, target: tankD, transferRate:.03, x1: 12, y1: 2, x2: 14, y2: 2, on:0, textX: 12.9, textY: 1, rotation: 180, key: 54, keyboard: "6", repairTime: 4000},
									{source: tankA, target: tankB, transferRate:.03, x1: 7, y1: 7.75, x2: 11, y2: 7.75, on:0, textX: 8.85, textY: 8.5, rotation: 0, key: 55, keyboard: "7", repairTime: 4000},
									{source: tankB, target: tankA, transferRate:.03, x1: 7, y1: 6.25, x2: 11, y2: 6.25, on:0, textX: 8.85, textY: 5.25, rotation: 180, key: 56, keyboard: "8", repairTime: 4000}]);
	
	add_getter_setter(chart, config, "speed", 1);
	
	add_getter_setter(chart, config, "refresh", 100);
	
	add_getter_setter(chart, config, "eventFunction", function(){return 5000;});
	
	add_bindings(chart, config, ["alert","tick","response"]);
	
	return chart;
}