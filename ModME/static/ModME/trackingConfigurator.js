var Tracking = function(){
	
d3.chart("Tracking").extend("TrackingGUI",{

	initialize: function(){

	    this.layer("path").on("enter",function(){

	        var chart = this.chart();

	        if(d3.select("#tracking_area")){
	            d3.select("#tracking_area").remove();
	        }

	        return this.on("click", function(d,i){
	            document.getElementById("object_name").style.display = "inline";
	            document.getElementById("object_name").innerHTML = "Path "+(i+1);
	            document.getElementById("label1").style.display = "inline";
	            document.getElementById("textArea1").style.display = "inline";
	            document.getElementById("label1").innerHTML = "Points";
	            document.getElementById("textArea1").value = JSON.stringify(d.points);

	            document.getElementById("label2").style.display = "inline";
	            document.getElementById("textArea2").style.display = "inline";
	            document.getElementById("label2").innerHTML = "Path Interval";
	            document.getElementById("textArea2").value = d.interval/1000;

	            document.getElementById("label3").style.display = "inline";
	            document.getElementById("textArea3").style.display = "inline";
	            document.getElementById("label3").innerHTML = "Satellite Radius";
	            document.getElementById("textArea3").value = d.radius;

	            document.getElementById("label4").style.display = "inline";
	            document.getElementById("textArea4").style.display = "inline";
	            document.getElementById("label4").innerHTML = "Probability";
	            document.getElementById("textArea4").value = d.prob;

	            document.getElementById("label5").style.display = "none";
	            document.getElementById("textArea5").style.display = "none";

	            document.getElementById("label6").style.display = "none";
	            document.getElementById("textArea6").style.display = "none";

	            document.getElementById("label7").style.display = "none";
	            document.getElementById("textArea7").style.display = "none";

	            document.getElementById("label8").style.display = "none";
	            document.getElementById("textArea8").style.display = "none";

	            document.getElementById("label9").style.display = "none";
	            document.getElementById("textArea9").style.display = "none";

	            document.getElementById("label10").style.display = "none";
	            document.getElementById("textArea10").style.display = "none";

	            document.getElementById("label11").style.display = "none";
	            document.getElementById("textArea11").style.display = "none";

	            document.getElementById("label12").style.display = "none";
	            document.getElementById("textArea12").style.display = "none";

	            document.getElementById("task_name").style.display = "inline";
	            document.getElementById("task_name").innerHTML = "Tracking";

	            document.getElementById("event_parameters_label").style.display = "inline";
	            document.getElementById("event_parameters").style.display = "inline";
	            temp = {};
	            for(i in track_param) {
	                temp[i] = track_param[i]/1000;
	            }
	            document.getElementById("event_parameters").value = JSON.stringify(temp);

	            document.getElementById("first_event_label").style.display = "inline";
	            document.getElementById("first_event").style.display = "inline";
	            document.getElementById("first_event").value = chart.startFunc()/1000;

	            document.getElementById("event_function_label").style.display = "inline";
	            document.getElementById("event_function").style.display = "inline";
	            if(track_param.min){
	                document.getElementById("event_function").selectedIndex = 0;
	            }
	            else{
	                document.getElementById("event_function").selectedIndex = 1;
	            }

	            document.getElementById("label13").style.display = "inline";
	            document.getElementById("textArea13").style.display = "inline";
	            document.getElementById("label13").innerHTML = "Refresh Rate";
	            document.getElementById("textArea13").value = chart.refresh;

	            document.getElementById("label14").style.display = "inline";
	            document.getElementById("textArea14").style.display = "inline";
	            document.getElementById("label15").style.display = "inline";
	            document.getElementById("textArea15").style.display = "inline";

	            document.getElementById("button1").style.display = "inline";
	            document.getElementById("button1").innerHTML = "Decrease Paths";
	            document.getElementById("button1").onclick = function(){
	                track_data.orbits.pop();
            		track_chart.draw(track_data);
                };
	            document.getElementById("button2").style.display = "inline";
	            document.getElementById("button2").innerHTML = "Increase Paths";
	            document.getElementById("button2").onclick = function(){
	                track_data.orbits.push({points: [{"x": .1,"y":.9},{"x": .1,"y":.8},{"x": .2,"y":.8},{"x": .2,"y":.9}], interval: 10000, radius:13, prob:1});
            		track_chart.draw(track_data);
                };
	            document.getElementById("button3").style.display = "none";
	            document.getElementById("button4").style.display = "none";

	            document.getElementById("applyButton").onclick = function(){
	            	track_param = JSON.parse(document.getElementById("event_parameters").value);
	        		for(i in track_param) {
	            		track_param[i] = track_param[i]*1000;
	        		}
	        		track_chart.startFunc(document.getElementById("first_event").value*1000);
	        		if(document.getElementById("event_function").selectedIndex==0){
	            		track_data.eventFunction = "(Math.random()*(track_param.max-track_param.min))+track_param.min;";
	       			}
	        		else{
	            		track_data.eventFunction = "1000*(Math.floor(Math.log(1-Math.random())/Math.log(1-(1/(track_param.avg_wait/1000)))) + 1);"
	        		}
	        		track_data.refresh = 							JSON.parse(document.getElementById("textArea13").value);
	        		track_data.orbits[objectName[1]-1].points = 	JSON.parse(document.getElementById("textArea1").value);
	        		track_data.orbits[objectName[1]-1].interval = 	JSON.parse(document.getElementById("textArea2").value)*1000;
	        		track_data.orbits[objectName[1]-1].radius = 	JSON.parse(document.getElementById("textArea3").value);
	        		track_data.orbits[objectName[1]-1].prob = 		JSON.parse(document.getElementById("textArea4").value);
	        		track_chart.draw(track_data);
				};
	        });

	    });

	    this.layer("configPath").on("enter",function(){

	        var chart = this.chart();

	        if(d3.select("#tracking_area")){
	            d3.select("#tracking_area").remove();
	        }

	        return this.on("click", function(d,i){
	            document.getElementById("object_name").style.display = "inline";
	            document.getElementById("object_name").innerHTML = "Path "+(i+1);
	            document.getElementById("label1").style.display = "inline";
	            document.getElementById("textArea1").style.display = "inline";
	            document.getElementById("label1").innerHTML = "Points";
	            document.getElementById("textArea1").value = JSON.stringify(d.points);

	            document.getElementById("label2").style.display = "inline";
	            document.getElementById("textArea2").style.display = "inline";
	            document.getElementById("label2").innerHTML = "Path Interval";
	            document.getElementById("textArea2").value = d.interval/1000;

	            document.getElementById("label3").style.display = "inline";
	            document.getElementById("textArea3").style.display = "inline";
	            document.getElementById("label3").innerHTML = "Satellite Radius";
	            document.getElementById("textArea3").value = d.radius;

	            document.getElementById("label4").style.display = "inline";
	            document.getElementById("textArea4").style.display = "inline";
	            document.getElementById("label4").innerHTML = "Probability";
	            document.getElementById("textArea4").value = d.prob;

	            document.getElementById("label5").style.display = "none";
	            document.getElementById("textArea5").style.display = "none";

	            document.getElementById("label6").style.display = "none";
	            document.getElementById("textArea6").style.display = "none";

	            document.getElementById("label7").style.display = "none";
	            document.getElementById("textArea7").style.display = "none";

	            document.getElementById("label8").style.display = "none";
	            document.getElementById("textArea8").style.display = "none";

	            document.getElementById("label9").style.display = "none";
	            document.getElementById("textArea9").style.display = "none";

	            document.getElementById("label10").style.display = "none";
	            document.getElementById("textArea10").style.display = "none";

	            document.getElementById("label11").style.display = "none";
	            document.getElementById("textArea11").style.display = "none";

	            document.getElementById("label12").style.display = "none";
	            document.getElementById("textArea12").style.display = "none";

	            document.getElementById("task_name").style.display = "inline";
	            document.getElementById("task_name").innerHTML = "Tracking";

	            document.getElementById("event_parameters_label").style.display = "inline";
	            document.getElementById("event_parameters").style.display = "inline";
	            temp = {};
	            for(i in track_param) {
	                temp[i] = track_param[i]/1000;
	            }
	            document.getElementById("event_parameters").value = JSON.stringify(temp);

	            document.getElementById("first_event_label").style.display = "inline";
	            document.getElementById("first_event").style.display = "inline";
	            document.getElementById("first_event").value = chart.startFunc()/1000;

	            document.getElementById("event_function_label").style.display = "inline";
	            document.getElementById("event_function").style.display = "inline";
	            if(track_param.min){
	                document.getElementById("event_function").selectedIndex = 0;
	            }
	            else{
	                document.getElementById("event_function").selectedIndex = 1;
	            }

	            document.getElementById("label13").style.display = "inline";
	            document.getElementById("textArea13").style.display = "inline";
	            document.getElementById("label13").innerHTML = "Refresh Rate";
	            document.getElementById("textArea13").value = chart.refresh;

	            document.getElementById("label14").style.display = "none";
	            document.getElementById("textArea14").style.display = "none";

	            document.getElementById("label15").style.display = "none";
	            document.getElementById("textArea15").style.display = "none";

	            document.getElementById("button1").style.display = "inline";
	            document.getElementById("button1").innerHTML = "Decrease Paths";
	            document.getElementById("button1").onclick = function(){
	                track_data.orbits.pop();
            		track_chart.draw(track_data);
                };
	            document.getElementById("button2").style.display = "inline";
	            document.getElementById("button2").innerHTML = "Increase Paths";
	            document.getElementById("button2").onclick = function(){
	                track_data.orbits.push({points: [{"x": .1,"y":.9},{"x": .1,"y":.8},{"x": .2,"y":.8},{"x": .2,"y":.9}], interval: 10000, radius:13, prob:1});
            		track_chart.draw(track_data);
                };
	            document.getElementById("button3").style.display = "none";
	            document.getElementById("button4").style.display = "none";

	            document.getElementById("applyButton").onclick = function(){
	            	track_param = JSON.parse(document.getElementById("event_parameters").value);
	        		for(i in track_param) {
	            		track_param[i] = track_param[i]*1000;
	        		}
	        		track_chart.startFunc(document.getElementById("first_event").value*1000);
	        		if(document.getElementById("event_function").selectedIndex==0){
	            		track_data.eventFunction = "(Math.random()*(track_param.max-track_param.min))+track_param.min;";
	       			}
	        		else{
	            		track_data.eventFunction = "1000*(Math.floor(Math.log(1-Math.random())/Math.log(1-(1/(track_param.avg_wait/1000)))) + 1);"
	        		}
	        		track_data.refresh = 							JSON.parse(document.getElementById("textArea13").value);
	        		track_data.orbits[objectName[1]-1].points = 	JSON.parse(document.getElementById("textArea1").value);
	        		track_data.orbits[objectName[1]-1].interval = 	JSON.parse(document.getElementById("textArea2").value)*1000;
	        		track_data.orbits[objectName[1]-1].radius = 	JSON.parse(document.getElementById("textArea3").value);
	        		track_data.orbits[objectName[1]-1].prob = 		JSON.parse(document.getElementById("textArea4").value);
	        		track_chart.draw(track_data);
				};
	        });

	    });

	    this.layer("circles").on("enter", function() {

	        var chart = this.chart();

	        return this.on("click", function(d,i){
	            document.getElementById("object_name").style.display = "inline";
	            document.getElementById("object_name").innerHTML = "Path "+(i+1);
	            document.getElementById("label1").style.display = "inline";
	            document.getElementById("textArea1").style.display = "inline";
	            document.getElementById("label1").innerHTML = "Points";
	            document.getElementById("textArea1").value = JSON.stringify(d.points);

	            document.getElementById("label2").style.display = "inline";
	            document.getElementById("textArea2").style.display = "inline";
	            document.getElementById("label2").innerHTML = "Path Interval";
	            document.getElementById("textArea2").value = d.interval/1000;

	            document.getElementById("label3").style.display = "inline";
	            document.getElementById("textArea3").style.display = "inline";
	            document.getElementById("label3").innerHTML = "Satelite Radius";
	            document.getElementById("textArea3").value = d.radius;

	            document.getElementById("label4").style.display = "inline";
	            document.getElementById("textArea4").style.display = "inline";
	            document.getElementById("label4").innerHTML = "Probability";
	            document.getElementById("textArea4").value = d.prob;

	            document.getElementById("label5").style.display = "none";
	            document.getElementById("textArea5").style.display = "none";

	            document.getElementById("label6").style.display = "none";
	            document.getElementById("textArea6").style.display = "none";

	            document.getElementById("label7").style.display = "none";
	            document.getElementById("textArea7").style.display = "none";

	            document.getElementById("label8").style.display = "none";
	            document.getElementById("textArea8").style.display = "none";

	            document.getElementById("label9").style.display = "none";
	            document.getElementById("textArea9").style.display = "none";

	            document.getElementById("label10").style.display = "none";
	            document.getElementById("textArea10").style.display = "none";

	            document.getElementById("label11").style.display = "none";
	            document.getElementById("textArea11").style.display = "none";

	            document.getElementById("label12").style.display = "none";
	            document.getElementById("textArea12").style.display = "none";

	            document.getElementById("task_name").style.display = "inline";
	            document.getElementById("task_name").innerHTML = "Tracking";

	            document.getElementById("event_parameters_label").style.display = "inline";
	            document.getElementById("event_parameters").style.display = "inline";
	            temp = {};
	            for(i in track_param) {
	                temp[i] = track_param[i]/1000;
	            }
	            document.getElementById("event_parameters").value = JSON.stringify(temp);

	            document.getElementById("first_event_label").style.display = "inline";
	            document.getElementById("first_event").style.display = "inline";
	            document.getElementById("first_event").value = chart.startFunc()/1000;

	            document.getElementById("event_function_label").style.display = "inline";
	            document.getElementById("event_function").style.display = "inline";
	            if(track_param.min){
	                document.getElementById("event_function").selectedIndex = 0;
	            }
	            else{
	                document.getElementById("event_function").selectedIndex = 1;
	            }

	            document.getElementById("label13").style.display = "inline";
	            document.getElementById("textArea13").style.display = "inline";
	            document.getElementById("label13").innerHTML = "Refresh Rate";
	            document.getElementById("textArea13").value = chart.refresh;

	            document.getElementById("label14").style.display = "none";
	            document.getElementById("textArea14").style.display = "none";

	            document.getElementById("label15").style.display = "none";
	            document.getElementById("textArea15").style.display = "none";

	            document.getElementById("button1").style.display = "inline";
	            document.getElementById("button1").innerHTML = "Decrease Paths";
	            document.getElementById("button1").onclick = function(){
	            	if(document.getElementById("task_name").innerHTML == "Tracking"){
	                	track_data.orbits.pop();
            			track_chart.draw(track_data);
            		}
                };
	            document.getElementById("button2").style.display = "inline";
	            document.getElementById("button2").innerHTML = "Increase Paths";
	            document.getElementById("button2").onclick = function(){
	            	if(document.getElementById("task_name").innerHTML == "Tracking"){
	                	track_data.orbits.push({points: [{"x": .1,"y":.9},{"x": .1,"y":.8},{"x": .2,"y":.8},{"x": .2,"y":.9}], interval: 10000, radius:13, prob:1});
            			track_chart.draw(track_data);
            		}
                };
	            document.getElementById("button3").style.display = "none";
	            document.getElementById("button4").style.display = "none";

	            document.getElementById("applyButton").onclick = function(){
	            	if(document.getElementById("task_name").innerHTML == "Tracking"){
	            		track_param = JSON.parse(document.getElementById("event_parameters").value);
	        			for(i in track_param) {
	            			track_param[i] = track_param[i]*1000;
	        			}
	        			track_chart.startFunc(document.getElementById("first_event").value*1000);
	        			if(document.getElementById("event_function").selectedIndex==0){
	            			track_data.eventFunction = "(Math.random()*(track_param.max-track_param.min))+track_param.min;";
	       				}
	        			else{
	            			track_data.eventFunction = "1000*(Math.floor(Math.log(1-Math.random())/Math.log(1-(1/(track_param.avg_wait/1000)))) + 1);"
	        			}
	        			track_data.refresh = 							JSON.parse(document.getElementById("textArea13").value);
	        			track_data.orbits[objectName[1]-1].points = 	JSON.parse(document.getElementById("textArea1").value);
	        			track_data.orbits[objectName[1]-1].interval = 	JSON.parse(document.getElementById("textArea2").value)*1000;
	        			track_data.orbits[objectName[1]-1].radius = 	JSON.parse(document.getElementById("textArea3").value);
	        			track_data.orbits[objectName[1]-1].prob = 		JSON.parse(document.getElementById("textArea4").value);
	        			track_chart.draw(track_data);
	        		}
				};
	         });
	    });

	    }
	});


	setup.Tracking.Default = {
		orbits: [
        	{points: [{x:0.357,y:0.152},{x:0.342,y:0.179},{x:0.643,y:0.848},{x:0.658,y:0.821}], interval: 30000, radius:13, prob:1},
        	{points: [{x:0.28,y:0.402},{x:0.277,y:0.442},{x:0.72,y:0.598},{x:0.723,y:0.558}],   interval: 30000, radius:13, prob:1},
        	{points: [{x:0.28,y:0.597},{x:0.285,y:0.636},{x:0.72,y:0.403},{x:0.715,y:0.364}],   interval: 30000, radius:13, prob:1}
        ],
        parameters: {min: 8000, max: 14000},
        eventFunction: "(Math.random()*(track_param.max-track_param.min))+track_param.min;",
        startFunction: 5000,
        refresh: 100,
        }
    if (setup.Tracking.data=="") {
    	var track_data = setup.Tracking.Default;
    } else {
    	var track_data = setup.Tracking.data;
    }
	var track_param = track_data.parameters;

	track_svg = get_generic_svg(
	    d3.select("#"+setup.Tracking.container),
	    1300, 650,
	    JSON.parse(document.getElementById(setup.Tracking.container).style.width.substr(0,document.getElementById(setup.Tracking.container).style.width.length-2)), 
	    JSON.parse(document.getElementById(setup.Tracking.container).style.height.substr(0,document.getElementById(setup.Tracking.container).style.height.length-2)),
	    {top: scale(.03), right: scale(.03), bottom: scale(.03), left: scale(.03)},
	    "track_svg");

	var track_chart = track_svg.chart("TrackingGUI").eventFunc(function(){t = eval(track_data.eventFunction); return t;}).startFunc(track_data.startFunction)
	                            .refreshRate(track_data.refresh);

	track_svg.insert("circle", "g")
	        .attr("r", track_svg.h/4)
	        .attr("cx", track_svg.w/2)
	        .attr("cy", track_svg.h/2)
	        .style("stroke-width", "10px")
	        .style("stroke", "midnightblue")
	        .style("fill", "none");

	track_chart.when("alert", function(args){});
	track_chart.when("tick", function(args){});
	track_chart.when("response", function(args){});
	track_chart.when("timeout", function(args){});
	track_chart.when("mouseMove", function(args){});


	track_chart.draw(track_data);
}