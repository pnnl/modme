var Monitoring = function(){
	
d3.chart("Monitoring").extend("MonitoringGUI",{

        initialize: function(){

            this.layer("buttons").on("enter",function(){

                var chart = this.chart();


                this.on("click", function(d,i){
                    document.getElementById("object_name").style.display = "inline";
                    document.getElementById("object_name").innerHTML = "Button "+(i+1);

                    document.getElementById("label1").style.display = "inline";
                    document.getElementById("textArea1").style.display = "inline";
                    document.getElementById("label1").innerHTML = "Probability";
                    document.getElementById("textArea1").value = d.prob;

                    document.getElementById("label2").style.display = "inline";
                    document.getElementById("textArea2").style.display = "inline";
                    document.getElementById("label2").innerHTML = "Alert Timeout";
                    document.getElementById("textArea2").value = d.autoCorrect/1000;

                    document.getElementById("label3").style.display = "inline";
                    document.getElementById("textArea3").style.display = "inline";
                    document.getElementById("label3").innerHTML = "Keyboard Key";
                    document.getElementById("textArea3").value = d.key;

                    document.getElementById("label4").style.display = "inline";
                    document.getElementById("textArea4").style.display = "inline";
                    document.getElementById("label4").innerHTML = "Keyboard ASCII";
                    document.getElementById("textArea4").value = d.button;

                    document.getElementById("label5").style.display = "inline";
                    document.getElementById("textArea5").style.display = "inline";
                    document.getElementById("label5").innerHTML = "Base color";
                    document.getElementById("textArea5").value = d.color;

                    document.getElementById("label6").style.display = "inline";
                    document.getElementById("textArea6").style.display = "inline";
                    document.getElementById("label6").innerHTML = "Alert Color";
                    document.getElementById("textArea6").value = d.alert_color;

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
                    document.getElementById("task_name").innerHTML = "Monitoring";

                    document.getElementById("event_parameters_label").style.display = "inline";
                    document.getElementById("event_parameters").style.display = "inline";
                    temp = {};
                    for(i in monitor_param) {
                        temp[i] = monitor_param[i]/1000;
                    }
                    document.getElementById("event_parameters").value = JSON.stringify(temp);

                    document.getElementById("first_event_label").style.display = "inline";
                    document.getElementById("first_event").style.display = "inline";
                    document.getElementById("first_event").value = chart.startFunc()/1000;

                    document.getElementById("label13").style.display = "inline";
                    document.getElementById("textArea13").style.display = "inline";
                    document.getElementById("label13").innerHTML = "Tick marks";
                    document.getElementById("textArea13").value = chart.ticks;

                    document.getElementById("label14").style.display = "inline";
                    document.getElementById("textArea14").style.display = "inline";
                    document.getElementById("label14").innerHTML = "Slider Range";
                    document.getElementById("textArea14").value = JSON.stringify(chart.slider_range);

                    document.getElementById("label15").style.display = "none";
                    document.getElementById("textArea15").style.display = "none";

                    document.getElementById("event_function_label").style.display = "inline";
                    document.getElementById("event_function").style.display = "inline";
                    if(monitor_param.min){
                        document.getElementById("event_function").selectedIndex = 0;
                    }
                    else{
                        document.getElementById("event_function").selectedIndex = 1;
                    }

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
		            	monitor_param = JSON.parse(document.getElementById("event_parameters").value);
			            for(i in monitor_param) {
			                monitor_param[i] = monitor_param[i]*1000;
			            }
			            monitor_chart.startFunc(JSON.parse(document.getElementById("first_event").value*1000));
			            if(document.getElementById("event_function").selectedIndex==0){
			                monitor_chart.eventFunc(function(){rand = Math.random()*(monitor_param.max-monitor_param.min); return rand+monitor_param.min;});
			            }
			            else{
			                monitor_chart.eventFunc(function(){return 1000*(Math.floor(Math.log(1-Math.random())/Math.log(1-(1/(monitor_param.avg_wait/1000)))) + 1);});
			            }
			            monitor_data.ticks = JSON.parse(document.getElementById("textArea13").value);
			            monitor_data.range = JSON.parse(document.getElementById("textArea14").value);

			            monitor_chart.tick(monitor_data.ticks);
			            monitor_chart.range(monitor_data.range);

			            if(objectName[0] == "Slider"){
			                monitor_data.scales[objectName[1]-1].prob = 				JSON.parse(document.getElementById("textArea1").value);
			                monitor_data.scales[objectName[1]-1].slider_interval =		JSON.parse(document.getElementById("textArea2").value);
			                monitor_data.scales[objectName[1]-1].key = 					document.getElementById("textArea3").value;
			                monitor_data.scales[objectName[1]-1].button = 				JSON.parse(document.getElementById("textArea4").value);
			                monitor_chart.draw(monitor_data);
			            }
			            else if(objectName[0] == "Button"){
			                monitor_data.buttons[objectName[1]-1].prob = 				JSON.parse(document.getElementById("textArea1").value);
			                monitor_data.buttons[objectName[1]-1].autoCorrect = 		JSON.parse(document.getElementById("textArea2").value)*1000;
			                monitor_data.buttons[objectName[1]-1].key = 				document.getElementById("textArea3").value;
			                monitor_data.buttons[objectName[1]-1].button = 				JSON.parse(document.getElementById("textArea4").value);
			                monitor_data.buttons[objectName[1]-1].color = 				document.getElementById("textArea5").value;
			                monitor_data.buttons[objectName[1]-1].alert_color = 		document.getElementById("textArea6").value;
			                monitor_chart.draw(monitor_data);
			            }
					};


                });

            return this;

            });

        this.layer("scale").on("enter", function() {

            var chart = this.chart();

             return this.on("click", function(d,i){
                document.getElementById("object_name").style.display = "inline";
                document.getElementById("object_name").innerHTML = "Slider "+(i+1);
                document.getElementById("label1").style.display = "inline";
                document.getElementById("textArea1").style.display = "inline";
                document.getElementById("label1").innerHTML = "Probability";
                document.getElementById("textArea1").value = d.prob;

                document.getElementById("label2").style.display = "inline";
                document.getElementById("textArea2").style.display = "inline";
                document.getElementById("label2").innerHTML = "Slider Interval";
                document.getElementById("textArea2").value = d.slider_interval;

                document.getElementById("label3").style.display = "inline";
                document.getElementById("textArea3").style.display = "inline";
                document.getElementById("label3").innerHTML = "Keyboard Key";
                document.getElementById("textArea3").value = d.key;

                document.getElementById("label4").style.display = "inline";
                document.getElementById("textArea4").style.display = "inline";
                document.getElementById("label4").innerHTML = "Keyboard ASCII";
                document.getElementById("textArea4").value = d.button;

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
                document.getElementById("task_name").innerHTML = "Monitoring";

                document.getElementById("event_parameters_label").style.display = "inline";
                document.getElementById("event_parameters").style.display = "inline";
                temp = {};
                for(i in monitor_param) {
                    temp[i] = monitor_param[i]/1000;
                }
                document.getElementById("event_parameters").value = JSON.stringify(temp);

                document.getElementById("first_event_label").style.display = "inline";
                document.getElementById("first_event").style.display = "inline";
                document.getElementById("first_event").value = chart.startFunc()/1000;

                document.getElementById("event_function_label").style.display = "inline";
                document.getElementById("event_function").style.display = "inline";
                if(monitor_param.min){
                    document.getElementById("event_function").selectedIndex = 0;
                }
                else{
                    document.getElementById("event_function").selectedIndex = 1;
                }

                document.getElementById("label13").style.display = "inline";
                document.getElementById("textArea13").style.display = "inline";
                document.getElementById("label13").innerHTML = "Tick marks";
                document.getElementById("textArea13").value = chart.ticks;

                document.getElementById("label14").style.display = "inline";
                document.getElementById("textArea14").style.display = "inline";
                document.getElementById("label14").innerHTML = "Slider Range";
                document.getElementById("textArea14").value = JSON.stringify(chart.slider_range);

                document.getElementById("label15").style.display = "none";
                document.getElementById("textArea15").style.display = "none";

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
                    	if(document.getElementById("task_name").innerHTML == "Monitoring"){
			            	monitor_param = JSON.parse(document.getElementById("event_parameters").value);
				            for(i in monitor_param) {
				                monitor_param[i] = monitor_param[i]*1000;
				            }
				            monitor_chart.startFunc(JSON.parse(document.getElementById("first_event").value*1000));
				            if(document.getElementById("event_function").selectedIndex==0){
				                monitor_data.eventFunction = "(Math.random()*(monitor_param.max-monitor_param.min))+monitor_param.min;";
				            }
				            else{
				                monitor_data.eventFunction = "1000*(Math.floor(Math.log(1-Math.random())/Math.log(1-(1/(monitor_param.avg_wait/1000)))) + 1);"
				            }
				            monitor_data.ticks = JSON.parse(document.getElementById("textArea13").value);
				            monitor_data.range = JSON.parse(document.getElementById("textArea14").value);

				            monitor_chart.tick(monitor_data.ticks);
				            monitor_chart.range(monitor_data.range);

				            if(objectName[0] == "Slider"){
				                monitor_data.scales[objectName[1]-1].prob = 				JSON.parse(document.getElementById("textArea1").value);
				                monitor_data.scales[objectName[1]-1].slider_interval =		JSON.parse(document.getElementById("textArea2").value);
				                monitor_data.scales[objectName[1]-1].key = 					document.getElementById("textArea3").value;
				                monitor_data.scales[objectName[1]-1].button = 				JSON.parse(document.getElementById("textArea4").value);
				                monitor_chart.draw(monitor_data);
				            }
				            else if(objectName[0] == "Button"){
				                monitor_data.buttons[objectName[1]-1].prob = 				JSON.parse(document.getElementById("textArea1").value);
				                monitor_data.buttons[objectName[1]-1].autoCorrect = 		JSON.parse(document.getElementById("textArea2").value)*1000;
				                monitor_data.buttons[objectName[1]-1].key = 				document.getElementById("textArea3").value;
				                monitor_data.buttons[objectName[1]-1].button = 				JSON.parse(document.getElementById("textArea4").value);
				                monitor_data.buttons[objectName[1]-1].color = 				document.getElementById("textArea5").value;
				                monitor_data.buttons[objectName[1]-1].alert_color = 		document.getElementById("textArea6").value;
				                monitor_chart.draw(monitor_data);
				            }
				        }
					};



             });
        });
        }
    });



	setup.Monitoring.Default = {
		scales: [{button: 112, key: "F1", slider_interval: 2000, prob: 1},
				{button: 113, key: "F2", slider_interval: 1400, prob: 1},
				{button: 114, key: "F3", slider_interval: 1000, prob: 1},
				{button: 115, key: "F4", slider_interval: 1600, prob: 1}],

        buttons: [{color: "lightgreen", button: 116, key: "F5", alert_color:"black", autoCorrect: 8000, prob: 1},
                    {color: "black", button: 117, key: "F6", alert_color:"red", autoCorrect: 8000, prob: 1}],
        range: [3,5],
        ticks: 7,
        parameters: {min: 8000, max: 14000},
        eventFunction: "(Math.random()*(monitor_param.max-monitor_param.min))+monitor_param.min;",
        startFunction: 5000,
        }
    if (setup.Monitoring.data=="") {
    	var monitor_data = setup.Monitoring.Default;
    } else {
    	var monitor_data = setup.Monitoring.data;
    }
	var monitor_param = monitor_data.parameters;

	monitor_svg = get_generic_svg(
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