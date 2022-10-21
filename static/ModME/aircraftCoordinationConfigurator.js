var AircraftCoordination = function(){
	
	d3.chart("AircraftCoordination").extend("AircraftCoordinationGUI",{

		initialize: function(){

		    this.layer("plane").on("enter",function(){

		        var chart = this.chart();

				var myInterval;

		        return this.on("click", function(d,i){
		            document.getElementById("object_name").style.display = "plane";

		            document.getElementById("object_label1").style.display = "none";
		            document.getElementById("object_textarea1").style.display = "none";
		            document.getElementById("object_select1").style.display = "none";

		            document.getElementById("object_label2").style.display = "none";
		            document.getElementById("object_textarea2").style.display = "none";
		            document.getElementById("object_select2").style.display = "none";

		           document.getElementById("object_label3").style.display = "none";
		            document.getElementById("object_textarea3").style.display = "none";
		            document.getElementById("object_select3").style.display = "none";

		            document.getElementById("object_label4").style.display = "none";
		            document.getElementById("object_textarea4").style.daisplay = "none";
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
		            document.getElementById("task_name").innerHTML = "AircraftCoordination";

		            document.getElementById("task_label1").style.display = "inline";
		            document.getElementById("task_label1").innerHTML = "Distractor";
                    document.getElementById("task_textarea1").style.display = "none";
                    document.getElementById("task_select1").style.display = "none";
                    document.getElementById("task_checkbox1").style.display = "inline";
                    document.getElementById("task_checkbox1").checked = aircraftCoordination_data.distractor;//chart.data.distractor;

		            document.getElementById("task_label2").style.display = "inline";
		            document.getElementById("task_textarea2").style.display = "inline";
		            document.getElementById("task_label2").innerHTML = "Time To First Event";
		            document.getElementById("task_textarea2").value = chart.startFunc()/1000;
		            document.getElementById("task_select2").style.display = "none";
		            document.getElementById("task_checkbox2").style.display = "none";

		            document.getElementById("task_label3").style.display = "inline";
		            document.getElementById("task_select3").style.display = "inline";
		            document.getElementById("task_label3").innerHTML = "Event Function";
		            if(aircraftCoordination_data.eventFunction == eventFunctionOption1){
		                document.getElementById("task_select3").selectedIndex = 0;
		            }
		            else{
		                document.getElementById("task_select3").selectedIndex = 1;
		            }
		            document.getElementById("task_textarea3").style.display = "none";
		            document.getElementById("task_checkbox3").style.display = "none";

		            document.getElementById("task_label4").style.display = "inline";
					document.getElementById("task_label4").innerHTML = "Event Function Parameters";
		            document.getElementById("task_textarea4").style.display = "inline";
		            temp = {};
		            for(i in aircraftCoordination_param) {
		                temp[i] = aircraftCoordination_param[i]/1000;
		            }
		            document.getElementById("task_textarea4").value = JSON.stringify(temp);
		            document.getElementById("task_select4").style.display = "none";
		            document.getElementById("task_checkbox4").style.display = "none";

		            document.getElementById("task_label5").style.display = "inline";
		            document.getElementById("task_textarea5").style.display = "inline";
		            document.getElementById("task_label5").innerHTML = "Refresh Rate";
		            document.getElementById("task_textarea5").value = chart.refresh;
		            document.getElementById("task_select5").style.display = "none";
		            document.getElementById("task_checkbox5").style.display = "none";

		            document.getElementById("task_label6").style.display = "inline";
		            document.getElementById("task_textarea6").style.display = "inline";
					document.getElementById("task_label6").innerHTML = "Speed of Target Aircraft";
		            document.getElementById("task_textarea6").value = aircraftCoordination_data.speed;
		            document.getElementById("task_select6").style.display = "none";
		            document.getElementById("task_checkbox6").style.display = "none";

		            document.getElementById("task_label7").style.display = "inline";
		            document.getElementById("task_textarea7").style.display = "inline";
					document.getElementById("task_label7").innerHTML = "Collision Probability";
		            document.getElementById("task_textarea7").value = aircraftCoordination_data.collisionProb;
		            document.getElementById("task_select7").style.display = "none";
		            document.getElementById("task_checkbox7").style.display = "none";

					document.getElementById("task_label8").style.display = "inline";
                    document.getElementById("task_textarea8").style.display = "inline";
					document.getElementById("task_label8").innerHTML = "Min Distance";
					//aircraftCoordination_data.minDist
					temp = {};
		            for(i in aircraftCoordination_dist) {
		                temp[i] = aircraftCoordination_dist[i]/1000;
		            }
		            document.getElementById("task_textarea8").value = JSON.stringify(temp);
                    document.getElementById("task_select8").style.display = "none";
                    document.getElementById("task_checkbox8").style.display = "none";
					
					document.getElementById("task_label9").style.display = "inline";
                    document.getElementById("task_textarea9").style.display = "inline";
					document.getElementById("task_label9").innerHTML = "Incoming Aircraft Speed";
					temp = {};
		            for(i in aircraftCoordination_incoming) {
		                temp[i] = aircraftCoordination_incoming[i];
		            }
		            document.getElementById("task_textarea9").value = JSON.stringify(temp);
                    document.getElementById("task_select9").style.display = "none";
                    document.getElementById("task_checkbox9").style.display = "none";

					document.getElementById("task_label10").style.display = "inline";
					document.getElementById("task_label10").innerHTML = "Use Joystick";
                    document.getElementById("task_select10").style.display = "none";
                    document.getElementById("task_textarea10").style.display = "none";
                    document.getElementById("task_checkbox10").style.display = "inline";
					document.getElementById("task_checkbox10").checked = aircraftCoordination_data.useJoystick;
					
					if (aircraftCoordination_data.useJoystick) {
						document.getElementById("object_label9").style.display = "inline";
                    document.getElementById("object_textarea9").style.display = "inline";
                    document.getElementById("object_label9").innerHTML = "Joystick Button";
                    document.getElementById("object_textarea9").value = aircraftCoordination_data.joyButton;
                    document.getElementById("object_select9").style.display = "none";
					
					myInterval = setInterval(function() {
						navigator.getGamepads()[0].buttons.forEach((element, index) => {
							if(element.pressed) {
								document.getElementById("object_textarea9").value = index;
								
							}
						});
					}, 100)
					
					}

					
					
					if (!aircraftCoordination_data.useJoystick) {
					document.getElementById("object_label12").style.display = "inline";
                    document.getElementById("object_textarea12").style.display = "inline";
                    document.getElementById("object_label12").innerHTML = "Keyboard Key";
                    document.getElementById("object_textarea12").value = aircraftCoordination_button.key;
                    document.getElementById("object_select12").style.display = "none";

					document.getElementById("object_label11").style.display = "inline";
                    document.getElementById("object_textarea11").style.display = "inline";
                    document.getElementById("object_label11").innerHTML = "Keyboard ASCII";
                    document.getElementById("object_textarea11").value = aircraftCoordination_button.button;
                    document.getElementById("object_select11").style.display = "none";

					}
					
		            document.getElementById("button1").style.display = "none";
		            
		            document.getElementById("button2").style.display = "none";
		            
		            document.getElementById("button3").style.display = "none";
		            document.getElementById("button4").style.display = "none";

					document.getElementById("task_checkbox10").onclick = function(){
						if (!document.getElementById("task_checkbox10").checked) {
							clearInterval(myInterval)
							document.getElementById("object_label9").style.display = "none";
                    document.getElementById("object_textarea9").style.display = "none";
                    document.getElementById("object_label9").innerHTML = "";
                    document.getElementById("object_textarea9").value = aircraftCoordination_data.joyButton;
                    document.getElementById("object_select9").style.display = "none";


							document.getElementById("object_label12").style.display = "inline";
                    document.getElementById("object_textarea12").style.display = "inline";
                    document.getElementById("object_label12").innerHTML = "Keyboard Key";
                    document.getElementById("object_textarea12").value = aircraftCoordination_button.key;
                    document.getElementById("object_select12").style.display = "none";

					document.getElementById("object_label11").style.display = "inline";
                    document.getElementById("object_textarea11").style.display = "inline";
                    document.getElementById("object_label11").innerHTML = "Keyboard ASCII";
                    document.getElementById("object_textarea11").value = aircraftCoordination_button.button;
                    document.getElementById("object_select11").style.display = "none";
						} else {
							myInterval = setInterval(function() {
								navigator.getGamepads()[0].buttons.forEach((element, index) => {
									if(element.pressed) {
										document.getElementById("object_textarea9").value = index;
									}
								});
							}, 100)
							document.getElementById("object_label9").style.display = "inline";
							document.getElementById("object_textarea9").style.display = "inline";
							document.getElementById("object_label9").innerHTML = "Joystick Button";
							document.getElementById("object_textarea9").value = aircraftCoordination_data.joyButton;
							document.getElementById("object_select9").style.display = "none";

						document.getElementById("object_label12").style.display = "none";
						document.getElementById("object_textarea12").style.display = "none";
						document.getElementById("object_label12").innerHTML = "";
						document.getElementById("object_textarea12").value = aircraftCoordination_button.key;
						document.getElementById("object_select12").style.display = "none";
	
						document.getElementById("object_label11").style.display = "none";
						document.getElementById("object_textarea11").style.display = "none";
						document.getElementById("object_label11").innerHTML = "";
						document.getElementById("object_textarea11").value = aircraftCoordination_button.button;
						document.getElementById("object_select11").style.display = "none";
						
					}
				}

		            document.getElementById("applyButton").onclick = function(){
		            	objectName = document.getElementById("object_name").innerHTML.split(" ");
		            	
						
						aircraftCoordination_data.distractor = document.getElementById("task_checkbox1").checked;
		        		aircraftCoordination_chart.distractor(document.getElementById("task_checkbox1").checked);

						aircraftCoordination_chart.startFunc(document.getElementById("task_textarea2").value*1000);
						aircraftCoordination_data.startFunction = aircraftCoordination_chart.startFunc();
						
						if(document.getElementById("task_select3").selectedIndex==0){
		            		aircraftCoordination_data.eventFunction = eventFunctionOption1;
		       			}
		        		else{
		            		aircraftCoordination_data.eventFunction = eventFunctionOption2;
		        		}

						aircraftCoordination_param = JSON.parse(document.getElementById("task_textarea4").value);
		        		for(i in aircraftCoordination_param) {
		            		aircraftCoordination_param[i] = aircraftCoordination_param[i]*1000;
		        		}
                        aircraftCoordination_data.parameters = aircraftCoordination_param;

						aircraftCoordination_data.refresh = JSON.parse(document.getElementById("task_textarea5").value);

						aircraftCoordination_data.speed = JSON.parse(document.getElementById("task_textarea6").value);

						aircraftCoordination_data.collisionProb = JSON.parse(document.getElementById("task_textarea7").value);

						aircraftCoordination_dist = JSON.parse(document.getElementById("task_textarea8").value);
		        		for(i in aircraftCoordination_dist) {
		            		aircraftCoordination_dist[i] = aircraftCoordination_dist[i]*1000;
		        		}
                        aircraftCoordination_data.minDist = aircraftCoordination_dist;

						aircraftCoordination_incoming = JSON.parse(document.getElementById("task_textarea9").value);
		        		for(i in aircraftCoordination_incoming) {
		            		aircraftCoordination_incoming[i] = aircraftCoordination_incoming[i];
		        		}

						aircraftCoordination_data.joyButton = document.getElementById("object_textarea9").value;

						aircraftCoordination_data.useJoystick = document.getElementById("task_checkbox10").checked;

						aircraftCoordination_data.incomingSpeed = aircraftCoordination_incoming;

		        		aircraftCoordination_chart.draw(aircraftCoordination_data);
		        		setup.AircraftCoordination.data = aircraftCoordination_data;
				
					};
		        }); // end of click function

		    });	// end of layer
		}
	});

	let eventFunctionOption1 = "(Math.random()*(aircraftCoordination_param.max-aircraftCoordination_param.min))+aircraftCoordination_param.min;";
	let eventFunctionOption2 = "1000*(Math.floor(Math.log(1-Math.random())/Math.log(1-(1/(aircraftCoordination_param.avg_wait/1000)))) + 1);";


	setup.AircraftCoordination.Default = {
		plane: [{data: 1}],
		collisionPlane:  [],
		minDist: {front: 5000, back:5000},
		collisionProb: 5,
		speed: 5,
        parameters: {min: 8000, max: 14000},
		incomingSpeed: {min: 400, max: 400},
        eventFunction: "(Math.random()*(aircraftCoordination_param.max-aircraftCoordination_param.min))+aircraftCoordination_param.min;",
        startFunction: 5000,
        refresh: 100,
		button: {button: 118, key: "F7"},
        distractor: false,
		useJoystick: true,
		joyButton: 0
        }
    if (setup.AircraftCoordination.data=="{}") {
    	setup.AircraftCoordination.data = setup.AircraftCoordination.Default;
    	var aircraftCoordination_data = setup.AircraftCoordination.Default;
    } else {
    	var aircraftCoordination_data = setup.AircraftCoordination.data;
		//var aircraftCoordination_data = setup.AircraftCoordination.Default;
    }
	var aircraftCoordination_param = aircraftCoordination_data.parameters;
	var aircraftCoordination_dist = aircraftCoordination_data.minDist;
	var aircraftCoordination_incoming = aircraftCoordination_data.incomingSpeed;
	var aircraftCoordination_button = aircraftCoordination_data.button

	aircraftCoordination_svg = GUIUtil.getGenericSVG(
	    d3.select("#"+setup.AircraftCoordination.container),
	    1300, 650,
	    JSON.parse(document.getElementById(setup.AircraftCoordination.container).style.width.substr(0,document.getElementById(setup.AircraftCoordination.container).style.width.length-2)), 
	    JSON.parse(document.getElementById(setup.AircraftCoordination.container).style.height.substr(0,document.getElementById(setup.AircraftCoordination.container).style.height.length-2)),
	    {top: scale(.03), right: scale(.03), bottom: scale(.03), left: scale(.03)},
	    "aircraftCoordination_svg");

	var aircraftCoordination_chart = aircraftCoordination_svg.chart("AircraftCoordinationGUI").eventFunc(function(){t = eval(aircraftCoordination_data.eventFunction); return t;}).startFunc(aircraftCoordination_data.startFunction)
	                            .refreshRate(aircraftCoordination_data.refresh);

	aircraftCoordination_chart.when("alert", function(args){});
	aircraftCoordination_chart.when("tick", function(args){});
	aircraftCoordination_chart.when("response", function(args){});
	aircraftCoordination_chart.when("timeout", function(args){});
	aircraftCoordination_chart.when("mouseMove", function(args){});
	aircraftCoordination_chart.distractor(aircraftCoordination_data.distractor);



	aircraftCoordination_chart.draw(aircraftCoordination_data);
}
