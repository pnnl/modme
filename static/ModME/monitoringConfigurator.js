var Monitoring = function(){
	
    d3.chart("Monitoring").extend("MonitoringGUI",{
        initialize: function(){

            this.layer("buttons").on("enter",function(){

                var chart = this.chart();

                return this.on("click", function(d,i){
                    document.getElementById("object_name").style.display = "inline";
                    document.getElementById("object_name").innerHTML = "Button "+(i+1);

                    document.getElementById("object_label1").style.display = "inline";
                    document.getElementById("object_textarea1").style.display = "inline";
                    document.getElementById("object_label1").innerHTML = "Probability";
                    document.getElementById("object_textarea1").value = d.prob;
                    document.getElementById("object_select1").style.display = "none";

                    document.getElementById("object_label2").style.display = "inline";
                    document.getElementById("object_textarea2").style.display = "inline";
                    document.getElementById("object_label2").innerHTML = "Alert Timeout";
                    document.getElementById("object_textarea2").value = d.autoCorrect/1000;
                    document.getElementById("object_select2").style.display = "none";

                    document.getElementById("object_label3").style.display = "inline";
                    document.getElementById("object_textarea3").style.display = "inline";
                    document.getElementById("object_label3").innerHTML = "Keyboard Key";
                    document.getElementById("object_textarea3").value = d.key;
                    document.getElementById("object_select3").style.display = "none";

                    document.getElementById("object_label4").style.display = "inline";
                    document.getElementById("object_textarea4").style.display = "inline";
                    document.getElementById("object_label4").innerHTML = "Keyboard ASCII";
                    document.getElementById("object_textarea4").value = d.button;
                    document.getElementById("object_select4").style.display = "none";

                    document.getElementById("object_label5").style.display = "inline";
                    document.getElementById("object_textarea5").style.display = "inline";
                    document.getElementById("object_label5").innerHTML = "Base color";
                    document.getElementById("object_textarea5").value = d.color;
                    document.getElementById("object_select5").style.display = "none";

                    document.getElementById("object_label6").style.display = "inline";
                    document.getElementById("object_textarea6").style.display = "inline";
                    document.getElementById("object_label6").innerHTML = "Alert Color";
                    document.getElementById("object_textarea6").value = d.alert_color;
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
                    document.getElementById("task_name").innerHTML = "Monitoring";

                    document.getElementById("task_label1").style.display = "inline";
                    document.getElementById("task_label1").innerHTML = "Distractor";
                    document.getElementById("task_textarea1").style.display = "none";
                    document.getElementById("task_select1").style.display = "none";
                    document.getElementById("task_checkbox1").style.display = "inline";

                    document.getElementById("task_label2").style.display = "inline";
                    document.getElementById("task_textarea2").style.display = "inline";
                    document.getElementById("task_label2").innerHTML = "Time to First Event";
                    document.getElementById("task_textarea2").value = chart.startFunc()/1000;
                    document.getElementById("task_select2").style.display = "none";
                    document.getElementById("task_checkbox2").style.display = "none";

                    document.getElementById("task_label3").style.display = "inline";
                    document.getElementById("task_select3").style.display = "inline";
                    document.getElementById("task_label3").value = "Event Function";
                    if(monitor_param.min){
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
                    for(i in monitor_param) {
                        temp[i] = monitor_param[i]/1000;
                    }
                    document.getElementById("task_label4").innerHTML = "Event Function Parameters";
                    document.getElementById("task_textarea4").value = JSON.stringify(temp);
                    document.getElementById("task_select4").style.display = "none";
                    document.getElementById("task_checkbox4").style.display = "none";

                    document.getElementById("task_label5").style.display = "inline";
                    document.getElementById("task_textarea5").style.display = "inline";
                    document.getElementById("task_label5").innerHTML = "Tick marks";
                    document.getElementById("task_textarea5").value = chart.ticks;
                    document.getElementById("task_select5").style.display = "none";
                    document.getElementById("task_checkbox5").style.display = "none";

                    document.getElementById("task_label6").style.display = "inline";
                    document.getElementById("task_textarea6").style.display = "inline";
                    document.getElementById("task_label6").innerHTML = "Slider Range";
                    document.getElementById("task_textarea6").value = JSON.stringify(chart.slider_range);
                    document.getElementById("task_select6").style.display = "none";
                    document.getElementById("task_checkbox6").style.display = "none";

                    document.getElementById("task_label7").style.display = "none";
                    document.getElementById("task_textarea7").style.display = "none";
                    document.getElementById("task_select7").style.display = "none";
                    document.getElementById("task_checkbox7").style.display = "none";

                    document.getElementById("button1").style.display = "inline";
                    document.getElementById("button1").innerHTML = "Decrease Sliders";
                    document.getElementById("button1").onclick = function(){
                    	if(document.getElementById("task_name").innerHTML == "Monitoring"){
                    		monitor_data.scales.pop();
           					monitor_chart.draw(monitor_data);
           				}
                	};
                    document.getElementById("button2").style.display = "inline";
                    document.getElementById("button2").innerHTML = "Increase Sliders";
                    document.getElementById("button2").onclick = function(){
                    	if(document.getElementById("task_name").innerHTML == "Monitoring"){
                    		monitor_data.scales.push({button: 112, key: "F1", slider_interval: 2000, event_probablity: .1});
            				monitor_chart.draw(monitor_data);
            			}
                	};
                    document.getElementById("button3").style.display = "inline";
                    document.getElementById("button3").innerHTML = "Decrease Buttons";
                    document.getElementById("button3").onclick = function(){
                    	if(document.getElementById("task_name").innerHTML == "Monitoring"){
            				monitor_data.buttons.pop();
            				monitor_chart.draw(monitor_data);
        				}
                	};
                    document.getElementById("button4").style.display = "inline";
                    document.getElementById("button4").innerHTML = "Increase Buttons";
                    document.getElementById("button4").onclick = function(){
                    	if(document.getElementById("task_name").innerHTML == "Monitoring"){
            				monitor_data.buttons.push({color: "lightgreen", button: 116, key: "F5", alert_color:"black", autoCorrect: 1000});
            				monitor_chart.draw(monitor_data);
        				}
                	};

                    document.getElementById("applyButton").onclick = function(){
                        objectName = document.getElementById("object_name").innerHTML.split(" ");
    	            	monitor_param = JSON.parse(document.getElementById("task_textarea4").value);
    		            for(i in monitor_param) {
    		                monitor_param[i] = monitor_param[i]*1000;
    		            }
    		            monitor_chart.startFunc(JSON.parse(document.getElementById("task_textarea2").value*1000));
    		            if(document.getElementById("task_select3").selectedIndex==0){
    		                monitor_chart.eventFunc(function(){rand = Math.random()*(monitor_param.max-monitor_param.min); return rand+monitor_param.min;});
    		            }
    		            else{
    		                monitor_chart.eventFunc(function(){return 1000*(Math.floor(Math.log(1-Math.random())/Math.log(1-(1/(monitor_param.avg_wait/1000)))) + 1);});
    		            }

                        monitor_data.startFunction = monitor_chart.startFunc();

    		            monitor_data.ticks = JSON.parse(document.getElementById("task_textarea5").value);
    		            monitor_data.range = JSON.parse(document.getElementById("task_textarea6").value);

                        monitor_data.distractor = document.getElementById("task_checkbox1").checked;

    		            monitor_chart.tick(monitor_data.ticks);
    		            monitor_chart.range(monitor_data.range);

    		            if(objectName[0] == "Slider"){
    		                monitor_data.scales[objectName[1]-1].prob = 				JSON.parse(document.getElementById("object_textarea1").value);
    		                monitor_data.scales[objectName[1]-1].slider_interval =		JSON.parse(document.getElementById("object_textarea2").value);
    		                monitor_data.scales[objectName[1]-1].key = 					document.getElementById("object_textarea3").value;
    		                monitor_data.scales[objectName[1]-1].button = 				JSON.parse(document.getElementById("object_textarea4").value);
    		                monitor_chart.draw(monitor_data);
    		            }
    		            else if(objectName[0] == "Button"){
    		                monitor_data.buttons[objectName[1]-1].prob = 				JSON.parse(document.getElementById("object_textarea1").value);
    		                monitor_data.buttons[objectName[1]-1].autoCorrect = 		JSON.parse(document.getElementById("object_textarea2").value)*1000;
    		                monitor_data.buttons[objectName[1]-1].key = 				document.getElementById("object_textarea3").value;
    		                monitor_data.buttons[objectName[1]-1].button = 				JSON.parse(document.getElementById("object_textarea4").value);
    		                monitor_data.buttons[objectName[1]-1].color = 				document.getElementById("object_textarea5").value;
    		                monitor_data.buttons[objectName[1]-1].alert_color = 		document.getElementById("object_textarea6").value;
    		                monitor_chart.draw(monitor_data);
    		            }
                        setup.Monitoring.data = monitor_data;
    				};
                }); // end of click function
            }); // end of button layer

            this.layer("scale").on("enter", function() {

                var chart = this.chart();

                return this.on("click", function(d,i){
                    document.getElementById("object_name").style.display = "inline";
                    document.getElementById("object_name").innerHTML = "Slider "+(i+1);

                    document.getElementById("object_label1").style.display = "inline";
                    document.getElementById("object_textarea1").style.display = "inline";
                    document.getElementById("object_label1").innerHTML = "Probability";
                    document.getElementById("object_textarea1").value = d.prob;

                    document.getElementById("object_label2").style.display = "inline";
                    document.getElementById("object_textarea2").style.display = "inline";
                    document.getElementById("object_label2").innerHTML = "Slider Interval";
                    document.getElementById("object_textarea2").value = d.slider_interval;
                    document.getElementById("object_select2").style.display = "none";

                    document.getElementById("object_label3").style.display = "inline";
                    document.getElementById("object_textarea3").style.display = "inline";
                    document.getElementById("object_label3").innerHTML = "Keyboard Key";
                    document.getElementById("object_textarea3").value = d.key;
                    document.getElementById("object_select3").style.display = "none";

                    document.getElementById("object_label4").style.display = "inline";
                    document.getElementById("object_textarea4").style.display = "inline";
                    document.getElementById("object_label4").innerHTML = "Keyboard ASCII";
                    document.getElementById("object_textarea4").value = d.button;
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
                    document.getElementById("task_name").innerHTML = "Monitoring";

                    document.getElementById("task_label1").style.display = "inline";
                    document.getElementById("task_label1").innerHTML = "Distractor";
                    document.getElementById("task_textarea1").style.display = "none";
                    document.getElementById("task_select1").style.display = "none";
                    document.getElementById("task_checkbox1").style.display = "inline";

                    document.getElementById("task_label2").style.display = "inline";
                    document.getElementById("task_textarea2").style.display = "inline";
                    document.getElementById("task_label2").innerHTML = "Time to First Event";
                    document.getElementById("task_textarea2").value = chart.startFunc()/1000;
                    document.getElementById("task_select2").style.display = "none";
                    document.getElementById("task_checkbox2").style.display = "none";

                    document.getElementById("task_label3").style.display = "inline";
                    document.getElementById("task_select3").style.display = "inline";
                    document.getElementById("task_label3").value = "Event Function";
                    if(monitor_param.min){
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
                    for(i in monitor_param) {
                        temp[i] = monitor_param[i]/1000;
                    }
                    document.getElementById("task_label4").innerHTML = "Event Function Parameters";
                    document.getElementById("task_textarea4").value = JSON.stringify(temp);
                    document.getElementById("task_select4").style.display = "none";
                    document.getElementById("task_checkbox4").style.display = "none";

                    document.getElementById("task_label5").style.display = "inline";
                    document.getElementById("task_textarea5").style.display = "inline";
                    document.getElementById("task_label5").innerHTML = "Tick marks";
                    document.getElementById("task_textarea5").value = chart.ticks;
                    document.getElementById("task_select5").style.display = "none";
                    document.getElementById("task_checkbox5").style.display = "none";

                    document.getElementById("task_label6").style.display = "inline";
                    document.getElementById("task_textarea6").style.display = "inline";
                    document.getElementById("task_label6").innerHTML = "Slider Range";
                    document.getElementById("task_textarea6").value = JSON.stringify(chart.slider_range);
                    document.getElementById("task_select6").style.display = "none";
                    document.getElementById("task_checkbox6").style.display = "none";

                    document.getElementById("task_label7").style.display = "none";
                    document.getElementById("task_textarea7").style.display = "none";
                    document.getElementById("task_select7").style.display = "none";
                    document.getElementById("task_checkbox7").style.display = "none";

                    document.getElementById("button1").style.display = "inline";
                    document.getElementById("button1").innerHTML = "Decrease Sliders";
                    document.getElementById("button1").onclick = function(){
                        if(document.getElementById("task_name").innerHTML == "Monitoring"){
                            monitor_data.scales.pop();
                            monitor_chart.draw(monitor_data);
                        }
                    };
                    document.getElementById("button2").style.display = "inline";
                    document.getElementById("button2").innerHTML = "Increase Sliders";
                    document.getElementById("button2").onclick = function(){
                        if(document.getElementById("task_name").innerHTML == "Monitoring"){
                            monitor_data.scales.push({button: 112, key: "F1", slider_interval: 2000, event_probablity: .1});
                            monitor_chart.draw(monitor_data);
                        }
                    };
                    document.getElementById("button3").style.display = "inline";
                    document.getElementById("button3").innerHTML = "Decrease Buttons";
                    document.getElementById("button3").onclick = function(){
                        if(document.getElementById("task_name").innerHTML == "Monitoring"){
                            monitor_data.buttons.pop();
                            monitor_chart.draw(monitor_data);
                        }
                    };
                    document.getElementById("button4").style.display = "inline";
                    document.getElementById("button4").innerHTML = "Increase Buttons";
                    document.getElementById("button4").onclick = function(){
                        if(document.getElementById("task_name").innerHTML == "Monitoring"){
                            monitor_data.buttons.push({color: "lightgreen", button: 116, key: "F5", alert_color:"black", autoCorrect: 1000});
                            monitor_chart.draw(monitor_data);
                        }
                    };

                    document.getElementById("applyButton").onclick = function(){
                        objectName = document.getElementById("object_name").innerHTML.split(" ");
                        monitor_param = JSON.parse(document.getElementById("task_textarea4").value);
                        for(i in monitor_param) {
                            monitor_param[i] = monitor_param[i]*1000;
                        }
                        monitor_chart.startFunc(JSON.parse(document.getElementById("task_textarea2").value*1000));
                        if(document.getElementById("task_select3").selectedIndex==0){
                            monitor_chart.eventFunc(function(){rand = Math.random()*(monitor_param.max-monitor_param.min); return rand+monitor_param.min;});
                        }
                        else{
                            monitor_chart.eventFunc(function(){return 1000*(Math.floor(Math.log(1-Math.random())/Math.log(1-(1/(monitor_param.avg_wait/1000)))) + 1);});
                        }

                        monitor_data.startFunction = monitor_chart.startFunc();

                        monitor_data.ticks = JSON.parse(document.getElementById("task_textarea5").value);
                        monitor_data.range = JSON.parse(document.getElementById("task_textarea6").value);

                        monitor_data.distractor = document.getElementById("task_checkbox1").checked;

                        monitor_chart.tick(monitor_data.ticks);
                        monitor_chart.range(monitor_data.range);

                        if(objectName[0] == "Slider"){
                            monitor_data.scales[objectName[1]-1].prob =                 JSON.parse(document.getElementById("object_textarea1").value);
                            monitor_data.scales[objectName[1]-1].slider_interval =      JSON.parse(document.getElementById("object_textarea2").value);
                            monitor_data.scales[objectName[1]-1].key =                  document.getElementById("object_textarea3").value;
                            monitor_data.scales[objectName[1]-1].button =               JSON.parse(document.getElementById("object_textarea4").value);
                            monitor_chart.draw(monitor_data);
                        }
                        else if(objectName[0] == "Button"){
                            monitor_data.buttons[objectName[1]-1].prob =                JSON.parse(document.getElementById("object_textarea1").value);
                            monitor_data.buttons[objectName[1]-1].autoCorrect =         JSON.parse(document.getElementById("object_textarea2").value)*1000;
                            monitor_data.buttons[objectName[1]-1].key =                 document.getElementById("object_textarea3").value;
                            monitor_data.buttons[objectName[1]-1].button =              JSON.parse(document.getElementById("object_textarea4").value);
                            monitor_data.buttons[objectName[1]-1].color =               document.getElementById("object_textarea5").value;
                            monitor_data.buttons[objectName[1]-1].alert_color =         document.getElementById("object_textarea6").value;
                            monitor_chart.draw(monitor_data);
                        }
                        setup.Monitoring.data = monitor_data;
                    };
                }); //end of click function
            }); // end of slider layer
        } // end of initialize
    }); // end of extention



	setup.Monitoring.Default = {
		scales: [{button: 112, key: "F1", slider_interval: 2000, prob: 1},
				{button: 113, key: "F2", slider_interval: 1400, prob: 1},
				{button: 114, key: "F3", slider_interval: 1000, prob: 1},
				{button: 115, key: "F4", slider_interval: 1600, prob: 1}],

        buttons: [{color: "lightgreen", button: 116, key: "F5", alert_color:"black", autoCorrect: 8000, prob: 1},
                    {color: "black", button: 117, key: "F6", alert_color:"red", autoCorrect: 8000, prob: 1}],
        range: [3,5],
        ticks: 7,
        distractor: false,
        parameters: {min: 8000, max: 14000},
        eventFunction: "(Math.random()*(monitor_param.max-monitor_param.min))+monitor_param.min;",
        startFunction: 5000,
        }
    if (setup.Monitoring.data=="{}") {
        setup.Monitoring.data = setup.Monitoring.Default;
    	var monitor_data = setup.Monitoring.Default;
    } else {
    	var monitor_data = setup.Monitoring.data;
    }
	var monitor_param = monitor_data.parameters;

	monitor_svg = GUIUtil.getGenericSVG(
	    d3.select("#"+setup.Monitoring.container),
	    650, 650,
	    JSON.parse(document.getElementById(setup.Monitoring.container).style.width.substr(0,document.getElementById(setup.Monitoring.container).style.width.length-2)), 
	    JSON.parse(document.getElementById(setup.Monitoring.container).style.height.substr(0,document.getElementById(setup.Monitoring.container).style.height.length-2)),
	    {top: scale(.03), right: scale(.03), bottom: scale(.03), left: scale(.03)},
	    "monitor_svg");

	var monitor_chart = monitor_svg.chart("MonitoringGUI").eventFunc(function(){t = eval(monitor_data.eventFunction); return t;}).startFunc(monitor_data.startFunction)
							.range(monitor_data.range).tick(monitor_data.ticks);

	monitor_chart.when("alert", function(args){});
	monitor_chart.when("timeout", function(args){});
	monitor_chart.when("response", function(args){});

	monitor_chart.draw(monitor_data);
}
