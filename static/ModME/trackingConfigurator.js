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

		            document.getElementById("object_label1").style.display = "inline";
		            document.getElementById("object_textarea1").style.display = "inline";
		            document.getElementById("object_label1").innerHTML = "Points";
		            document.getElementById("object_textarea1").value = JSON.stringify(d.points);
		            document.getElementById("object_select1").style.display = "none";

		            document.getElementById("object_label2").style.display = "inline";
		            document.getElementById("object_textarea2").style.display = "inline";
		            document.getElementById("object_label2").innerHTML = "Path Interval";
		            document.getElementById("object_textarea2").value = d.interval/1000;
		            document.getElementById("object_select2").style.display = "none";

		            document.getElementById("object_label3").style.display = "inline";
		            document.getElementById("object_textarea3").style.display = "inline";
		            document.getElementById("object_label3").innerHTML = "Satellite Radius";
		            document.getElementById("object_textarea3").value = d.radius;
		            document.getElementById("object_select3").style.display = "none";

		            document.getElementById("object_label4").style.display = "inline";
		            document.getElementById("object_textarea4").style.display = "inline";
		            document.getElementById("object_label4").innerHTML = "Probability";
		            document.getElementById("object_textarea4").value = d.prob;
		            document.getElementById("object_select4").style.display = "none";

		            document.getElementById("object_label5").style.display = "none";
		            document.getElementById("object_textarea5").style.display = "none";
		            document.getElementById("object_select5").style.display = "none";

		            document.getElementById("object_label6").style.display = "none";
                    document.getElementById("object_textarea6").style.display = "none";
                    document.getElementById("object_select6").style.display = "none";

                    document.getElementById("object_label7").style.display = "none";
                    document.getElementById("object_textarea7").style.display = "none";
                    document.getElementById("object_select7").style.display = "none";

                    document.getElementById("object_label8").style.display = "none";
                    document.getElementById("object_textarea8").style.display = "none";
                    document.getElementById("object_select8").style.display = "none";

                    document.getElementById("object_label9").style.display = "none";
                    document.getElementById("object_textarea9").style.display = "none";
                    document.getElementById("object_select9").style.display = "none";

                    document.getElementById("object_label10").style.display = "none";
                    document.getElementById("object_textarea10").style.display = "none";
                    document.getElementById("object_select10").style.display = "none";

                    document.getElementById("object_label11").style.display = "none";
                    document.getElementById("object_textarea11").style.display = "none";
                    document.getElementById("object_select11").style.display = "none";

                    document.getElementById("object_label12").style.display = "none";
                    document.getElementById("object_textarea12").style.display = "none";
                    document.getElementById("object_select12").style.display = "none";

		            document.getElementById("task_name").style.display = "inline";
		            document.getElementById("task_name").innerHTML = "Tracking";

		            document.getElementById("task_label1").style.display = "inline";
		            document.getElementById("task_label1").innerHTML = "Distractor";
                    document.getElementById("task_textarea1").style.display = "none";
                    document.getElementById("task_select1").style.display = "none";
                    document.getElementById("task_checkbox1").style.display = "inline";

		            document.getElementById("task_label2").style.display = "inline";
		            document.getElementById("task_textarea2").style.display = "inline";
		            document.getElementById("task_label2").innerHTML = "Time To First Event";
		            document.getElementById("task_textarea2").value = chart.startFunc()/1000;
		            document.getElementById("task_select2").style.display = "none";
		            document.getElementById("task_checkbox2").style.display = "none";

		            document.getElementById("task_label3").style.display = "inline";
		            document.getElementById("task_select3").style.display = "inline";
		            document.getElementById("task_label3").innerHTML = "Event Function";
		            if(track_param.min){
		                document.getElementById("task_select3").selectedIndex = 0;
		            }
		            else{
		                document.getElementById("task_select3").selectedIndex = 1;
		            }
		            document.getElementById("task_textarea3").style.display = "none";
		            document.getElementById("task_checkbox3").style.display = "none";

		            document.getElementById("task_label4").style.display = "inline";
		            document.getElementById("task_textarea4").style.display = "inline";
		            temp = {};
		            for(i in track_param) {
		                temp[i] = track_param[i]/1000;
		            }
		            document.getElementById("task_label4").innerHTML = "Event Function Parameters";
		            document.getElementById("task_textarea4").value = JSON.stringify(temp);
		            document.getElementById("task_select4").style.display = "none";
		            document.getElementById("task_checkbox4").style.display = "none";

		            document.getElementById("task_label5").style.display = "inline";
		            document.getElementById("task_textarea5").style.display = "inline";
		            document.getElementById("task_label5").innerHTML = "Refresh Rate";
		            document.getElementById("task_textarea5").value = chart.refresh;
		            document.getElementById("task_select5").style.display = "none";
		            document.getElementById("task_checkbox5").style.display = "none";

		            document.getElementById("task_label6").style.display = "none";
		            document.getElementById("task_textarea6").style.display = "none";
		            document.getElementById("task_select6").style.display = "none";
		            document.getElementById("task_checkbox6").style.display = "none";

		            document.getElementById("task_label7").style.display = "none";
		            document.getElementById("task_textarea7").style.display = "none";
		            document.getElementById("task_select7").style.display = "none";
		            document.getElementById("task_checkbox7").style.display = "none";

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
		            	objectName = document.getElementById("object_name").innerHTML.split(" ");
		            	track_param = JSON.parse(document.getElementById("task_textarea3").value);
		        		for(i in track_param) {
		            		track_param[i] = track_param[i]*1000;
		        		}
		        		track_chart.startFunc(document.getElementById("task_textarea1").value*1000);
		        		track_data.distractor = document.getElementById("task_checkbox1").checked;
		        		if(document.getElementById("task_select2").selectedIndex==0){
		            		track_data.eventFunction = "(Math.random()*(track_param.max-track_param.min))+track_param.min;";
		       			}
		        		else{
		            		track_data.eventFunction = "1000*(Math.floor(Math.log(1-Math.random())/Math.log(1-(1/(track_param.avg_wait/1000)))) + 1);"
		        		}
		        		track_data.startFunction = track_chart.startFunc();
		        		track_data.refresh = 							JSON.parse(document.getElementById("task_textarea4").value);
		        		track_data.orbits[objectName[1]-1].points = 	JSON.parse(document.getElementById("object_textarea1").value);
		        		track_data.orbits[objectName[1]-1].interval = 	JSON.parse(document.getElementById("object_textarea2").value)*1000;
		        		track_data.orbits[objectName[1]-1].radius = 	JSON.parse(document.getElementById("object_textarea3").value);
		        		track_data.orbits[objectName[1]-1].prob = 		JSON.parse(document.getElementById("object_textarea4").value);
		        		track_chart.draw(track_data);
		        		setup.Tracking.data = track_data;
					};
		        }); // end of click function

		    });	// end of layer

		    this.layer("configPath").on("enter",function(){

		        var chart = this.chart();

		        if(d3.select("#tracking_area")){
		            d3.select("#tracking_area").remove();
		        }

		        return this.on("click", function(d,i){
		            document.getElementById("object_name").style.display = "inline";
		            document.getElementById("object_name").innerHTML = "Path "+(i+1);

		            document.getElementById("object_label1").style.display = "inline";
		            document.getElementById("object_textarea1").style.display = "inline";
		            document.getElementById("object_label1").innerHTML = "Points";
		            document.getElementById("object_textarea1").value = JSON.stringify(d.points);
		            document.getElementById("object_select1").style.display = "none";

		            document.getElementById("object_label2").style.display = "inline";
		            document.getElementById("object_textarea2").style.display = "inline";
		            document.getElementById("object_label2").innerHTML = "Path Interval";
		            document.getElementById("object_textarea2").value = d.interval/1000;
		            document.getElementById("object_select2").style.display = "none";

		            document.getElementById("object_label3").style.display = "inline";
		            document.getElementById("object_textarea3").style.display = "inline";
		            document.getElementById("object_label3").innerHTML = "Satellite Radius";
		            document.getElementById("object_textarea3").value = d.radius;
		            document.getElementById("object_select3").style.display = "none";

		            document.getElementById("object_label4").style.display = "inline";
		            document.getElementById("object_textarea4").style.display = "inline";
		            document.getElementById("object_label4").innerHTML = "Probability";
		            document.getElementById("object_textarea4").value = d.prob;
		            document.getElementById("object_select4").style.display = "none";

		            document.getElementById("object_label5").style.display = "none";
		            document.getElementById("object_textarea5").style.display = "none";
		            document.getElementById("object_select5").style.display = "none";

		            document.getElementById("object_label6").style.display = "none";
                    document.getElementById("object_textarea6").style.display = "none";
                    document.getElementById("object_select6").style.display = "none";

                    document.getElementById("object_label7").style.display = "none";
                    document.getElementById("object_textarea7").style.display = "none";
                    document.getElementById("object_select7").style.display = "none";

                    document.getElementById("object_label8").style.display = "none";
                    document.getElementById("object_textarea8").style.display = "none";
                    document.getElementById("object_select8").style.display = "none";

                    document.getElementById("object_label9").style.display = "none";
                    document.getElementById("object_textarea9").style.display = "none";
                    document.getElementById("object_select9").style.display = "none";

                    document.getElementById("object_label10").style.display = "none";
                    document.getElementById("object_textarea10").style.display = "none";
                    document.getElementById("object_select10").style.display = "none";

                    document.getElementById("object_label11").style.display = "none";
                    document.getElementById("object_textarea11").style.display = "none";
                    document.getElementById("object_select11").style.display = "none";

                    document.getElementById("object_label12").style.display = "none";
                    document.getElementById("object_textarea12").style.display = "none";
                    document.getElementById("object_select12").style.display = "none";

		            document.getElementById("task_name").style.display = "inline";
		            document.getElementById("task_name").innerHTML = "Tracking";

		            document.getElementById("task_label1").style.display = "inline";
		            document.getElementById("task_label1").innerHTML = "Distractor";
                    document.getElementById("task_textarea1").style.display = "none";
                    document.getElementById("task_select1").style.display = "none";
                    document.getElementById("task_checkbox1").style.display = "inline";

		            document.getElementById("task_label2").style.display = "inline";
		            document.getElementById("task_textarea2").style.display = "inline";
		            document.getElementById("task_label2").innerHTML = "Time To First Event";
		            document.getElementById("task_textarea2").value = chart.startFunc()/1000;
		            document.getElementById("task_select2").style.display = "none";
		            document.getElementById("task_checkbox2").style.display = "none";

		            document.getElementById("task_label3").style.display = "inline";
		            document.getElementById("task_select3").style.display = "inline";
		            document.getElementById("task_label3").innerHTML = "Event Function";
		            if(track_param.min){
		                document.getElementById("task_select3").selectedIndex = 0;
		            }
		            else{
		                document.getElementById("task_select3").selectedIndex = 1;
		            }
		            document.getElementById("task_textarea3").style.display = "none";
		            document.getElementById("task_checkbox3").style.display = "none";

		            document.getElementById("task_label4").style.display = "inline";
		            document.getElementById("task_textarea4").style.display = "inline";
		            temp = {};
		            for(i in track_param) {
		                temp[i] = track_param[i]/1000;
		            }
		            document.getElementById("task_label4").innerHTML = "Event Function Parameters";
		            document.getElementById("task_textarea4").value = JSON.stringify(temp);
		            document.getElementById("task_select4").style.display = "none";
		            document.getElementById("task_checkbox4").style.display = "none";

		            document.getElementById("task_label5").style.display = "inline";
		            document.getElementById("task_textarea5").style.display = "inline";
		            document.getElementById("task_label5").innerHTML = "Refresh Rate";
		            document.getElementById("task_textarea5").value = chart.refresh;
		            document.getElementById("task_select5").style.display = "none";
		            document.getElementById("task_checkbox5").style.display = "none";

		            document.getElementById("task_label6").style.display = "none";
		            document.getElementById("task_textarea6").style.display = "none";
		            document.getElementById("task_select6").style.display = "none";
		            document.getElementById("task_checkbox6").style.display = "none";

		            document.getElementById("task_label7").style.display = "none";
		            document.getElementById("task_textarea7").style.display = "none";
		            document.getElementById("task_select7").style.display = "none";
		            document.getElementById("task_checkbox7").style.display = "none";

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
		            	objectName = document.getElementById("object_name").innerHTML.split(" ");
		            	track_param = JSON.parse(document.getElementById("task_textarea3").value);
		        		for(i in track_param) {
		            		track_param[i] = track_param[i]*1000;
		        		}
		        		track_chart.startFunc(document.getElementById("task_textarea1").value*1000);
		        		track_data.distractor = document.getElementById("task_checkbox1").checked;
		        		if(document.getElementById("task_select2").selectedIndex==0){
		            		track_data.eventFunction = "(Math.random()*(track_param.max-track_param.min))+track_param.min;";
		       			}
		        		else{
		            		track_data.eventFunction = "1000*(Math.floor(Math.log(1-Math.random())/Math.log(1-(1/(track_param.avg_wait/1000)))) + 1);"
		        		}
		        		track_data.startFunction = track_chart.startFunc();
		        		track_data.refresh = 							JSON.parse(document.getElementById("task_textarea4").value);
		        		track_data.orbits[objectName[1]-1].points = 	JSON.parse(document.getElementById("object_textarea1").value);
		        		track_data.orbits[objectName[1]-1].interval = 	JSON.parse(document.getElementById("object_textarea2").value)*1000;
		        		track_data.orbits[objectName[1]-1].radius = 	JSON.parse(document.getElementById("object_textarea3").value);
		        		track_data.orbits[objectName[1]-1].prob = 		JSON.parse(document.getElementById("object_textarea4").value);
		        		track_chart.draw(track_data);
		        		setup.Tracking.data = track_data;
					};
		        });

		    });

		    this.layer("circles").on("enter", function() {

		        var chart = this.chart();

		        return this.on("click", function(d,i){
		            document.getElementById("object_name").style.display = "inline";
		            document.getElementById("object_name").innerHTML = "Path "+(i+1);

		            document.getElementById("object_label1").style.display = "inline";
		            document.getElementById("object_textarea1").style.display = "inline";
		            document.getElementById("object_label1").innerHTML = "Points";
		            document.getElementById("object_textarea1").value = JSON.stringify(d.points);
		            document.getElementById("object_select1").style.display = "none";

		            document.getElementById("object_label2").style.display = "inline";
		            document.getElementById("object_textarea2").style.display = "inline";
		            document.getElementById("object_label2").innerHTML = "Path Interval";
		            document.getElementById("object_textarea2").value = d.interval/1000;
		            document.getElementById("object_select2").style.display = "none";

		            document.getElementById("object_label3").style.display = "inline";
		            document.getElementById("object_textarea3").style.display = "inline";
		            document.getElementById("object_label3").innerHTML = "Satellite Radius";
		            document.getElementById("object_textarea3").value = d.radius;
		            document.getElementById("object_select3").style.display = "none";

		            document.getElementById("object_label4").style.display = "inline";
		            document.getElementById("object_textarea4").style.display = "inline";
		            document.getElementById("object_label4").innerHTML = "Probability";
		            document.getElementById("object_textarea4").value = d.prob;
		            document.getElementById("object_select4").style.display = "none";

		            document.getElementById("object_label5").style.display = "none";
		            document.getElementById("object_textarea5").style.display = "none";
		            document.getElementById("object_select5").style.display = "none";

		            document.getElementById("object_label6").style.display = "none";
                    document.getElementById("object_textarea6").style.display = "none";
                    document.getElementById("object_select6").style.display = "none";

                    document.getElementById("object_label7").style.display = "none";
                    document.getElementById("object_textarea7").style.display = "none";
                    document.getElementById("object_select7").style.display = "none";

                    document.getElementById("object_label8").style.display = "none";
                    document.getElementById("object_textarea8").style.display = "none";
                    document.getElementById("object_select8").style.display = "none";

                    document.getElementById("object_label9").style.display = "none";
                    document.getElementById("object_textarea9").style.display = "none";
                    document.getElementById("object_select9").style.display = "none";

                    document.getElementById("object_label10").style.display = "none";
                    document.getElementById("object_textarea10").style.display = "none";
                    document.getElementById("object_select10").style.display = "none";

                    document.getElementById("object_label11").style.display = "none";
                    document.getElementById("object_textarea11").style.display = "none";
                    document.getElementById("object_select11").style.display = "none";

                    document.getElementById("object_label12").style.display = "none";
                    document.getElementById("object_textarea12").style.display = "none";
                    document.getElementById("object_select12").style.display = "none";

		            document.getElementById("task_name").style.display = "inline";
		            document.getElementById("task_name").innerHTML = "Tracking";

		            document.getElementById("task_label1").style.display = "inline";
		            document.getElementById("task_label1").innerHTML = "Distractor";
                    document.getElementById("task_textarea1").style.display = "none";
                    document.getElementById("task_select1").style.display = "none";
                    document.getElementById("task_checkbox1").style.display = "inline";

		            document.getElementById("task_label2").style.display = "inline";
		            document.getElementById("task_textarea2").style.display = "inline";
		            document.getElementById("task_label2").innerHTML = "Time To First Event";
		            document.getElementById("task_textarea2").value = chart.startFunc()/1000;
		            document.getElementById("task_select2").style.display = "none";
		            document.getElementById("task_checkbox2").style.display = "none";

		            document.getElementById("task_label3").style.display = "inline";
		            document.getElementById("task_select3").style.display = "inline";
		            document.getElementById("task_label3").innerHTML = "Event Function";
		            if(track_param.min){
		                document.getElementById("task_select3").selectedIndex = 0;
		            }
		            else{
		                document.getElementById("task_select3").selectedIndex = 1;
		            }
		            document.getElementById("task_textarea3").style.display = "none";
		            document.getElementById("task_checkbox3").style.display = "none";

		            document.getElementById("task_label4").style.display = "inline";
		            document.getElementById("task_textarea4").style.display = "inline";
		            temp = {};
		            for(i in track_param) {
		                temp[i] = track_param[i]/1000;
		            }
		            document.getElementById("task_label4").innerHTML = "Event Function Parameters";
		            document.getElementById("task_textarea4").value = JSON.stringify(temp);
		            document.getElementById("task_select4").style.display = "none";
		            document.getElementById("task_checkbox4").style.display = "none";

		            document.getElementById("task_label5").style.display = "inline";
		            document.getElementById("task_textarea5").style.display = "inline";
		            document.getElementById("task_label5").innerHTML = "Refresh Rate";
		            document.getElementById("task_textarea5").value = chart.refresh;
		            document.getElementById("task_select5").style.display = "none";
		            document.getElementById("task_checkbox5").style.display = "none";

		            document.getElementById("task_label6").style.display = "none";
		            document.getElementById("task_textarea6").style.display = "none";
		            document.getElementById("task_select6").style.display = "none";
		            document.getElementById("task_checkbox6").style.display = "none";

		            document.getElementById("task_label7").style.display = "none";
		            document.getElementById("task_textarea7").style.display = "none";
		            document.getElementById("task_select7").style.display = "none";
		            document.getElementById("task_checkbox7").style.display = "none";

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
		            	objectName = document.getElementById("object_name").innerHTML.split(" ");
		            	track_param = JSON.parse(document.getElementById("task_textarea3").value);
		        		for(i in track_param) {
		            		track_param[i] = track_param[i]*1000;
		        		}
		        		track_chart.startFunc(document.getElementById("task_textarea1").value*1000);
		        		track_data.distractor = document.getElementById("task_checkbox1").checked;
		        		if(document.getElementById("task_select2").selectedIndex==0){
		            		track_data.eventFunction = "(Math.random()*(track_param.max-track_param.min))+track_param.min;";
		       			}
		        		else{
		            		track_data.eventFunction = "1000*(Math.floor(Math.log(1-Math.random())/Math.log(1-(1/(track_param.avg_wait/1000)))) + 1);"
		        		}
		        		track_data.startFunction = track_chart.startFunc();
		        		track_data.refresh = 							JSON.parse(document.getElementById("task_textarea4").value);
		        		track_data.orbits[objectName[1]-1].points = 	JSON.parse(document.getElementById("object_textarea1").value);
		        		track_data.orbits[objectName[1]-1].interval = 	JSON.parse(document.getElementById("object_textarea2").value)*1000;
		        		track_data.orbits[objectName[1]-1].radius = 	JSON.parse(document.getElementById("object_textarea3").value);
		        		track_data.orbits[objectName[1]-1].prob = 		JSON.parse(document.getElementById("object_textarea4").value);
		        		track_chart.draw(track_data);
		        		setup.Tracking.data = track_data;
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
        distractor: false
        }
    if (setup.Tracking.data=="{}") {
    	setup.Tracking.data = setup.Tracking.Default;
    	var track_data = setup.Tracking.Default;
    } else {
    	var track_data = setup.Tracking.data;
    }
	var track_param = track_data.parameters;

	track_svg = GUIUtil.getGenericSVG(
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
