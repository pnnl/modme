var CrossHairTracking = function(){
	d3.chart("CrossHairTracking").extend("CrossHairTrackingGUI",{
		initialize: function(){
			this.layer("crosshairmarks").on("enter",function(){
				var chart = this.chart();

		        return this.on("click", function(d,i){
					document.getElementById("object_name").style.display = "inline";
                    document.getElementById("object_name").innerHTML = "CrossHairTracking "+(i+1);

                    document.getElementById("object_label1").style.display = "inline";
                    document.getElementById("object_textarea1").style.display = "inline";
                    document.getElementById("object_label1").innerHTML = "Location X";
                    document.getElementById("object_textarea1").value = d.locX;
                    document.getElementById("object_select1").style.display = "none";

                    document.getElementById("object_label2").style.display = "inline";
                    document.getElementById("object_textarea2").style.display = "inline";
                    document.getElementById("object_label2").innerHTML = "Location Y";
                    document.getElementById("object_textarea2").value = d.locY;
                    document.getElementById("object_select2").style.display = "none";

                    document.getElementById("object_label3").style.display = "none";
                    document.getElementById("object_textarea3").style.display = "none";
                    //document.getElementById("object_label3").innerHTML = "Decay Rate(units/min)";
                    //document.getElementById("object_textarea3").value = d.decayRate*60000;
                    document.getElementById("object_select3").style.display = "none";

                    document.getElementById("object_label4").style.display = "none";
                    document.getElementById("object_textarea4").style.display = "none";
                    //document.getElementById("object_label4").innerHTML = "Target Range Maximum";
                    //document.getElementById("object_textarea4").value = d.targetRangeMax;
                    document.getElementById("object_select4").style.display = "none";

                    document.getElementById("object_label5").style.display = "none";
                    document.getElementById("object_textarea5").style.display = "none";
                    //document.getElementById("object_label5").innerHTML = "Target Range Minimum";
                    //document.getElementById("object_textarea5").value = d.targetRangeMin;
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
                    document.getElementById("task_name").innerHTML = "CrossHairTracking";

                    document.getElementById("task_label1").style.display = "inline";
                    document.getElementById("task_label1").innerHTML = "Distractor";
                    document.getElementById("task_textarea1").style.display = "none";
                    document.getElementById("task_select1").style.display = "none";
                    document.getElementById("task_checkbox1").style.display = "inline";
                    document.getElementById("task_checkbox1").checked = chart.data.distractor;

                    document.getElementById("task_label2").style.display = "none";
                    document.getElementById("task_textarea2").style.display = "none";
                    //document.getElementById("task_label2").innerHTML = "Time to First Event";
                    //document.getElementById("task_textarea2").value = chart.startFunc()/1000;
                    document.getElementById("task_select2").style.display = "none";
                    document.getElementById("task_checkbox2").style.display = "none";

                    document.getElementById("task_label3").style.display = "inline";
					document.getElementById("task_label3").innerHTML = "Use Joystick";
                    document.getElementById("task_select3").style.display = "none";
                    document.getElementById("task_textarea3").style.display = "none";
                    document.getElementById("task_checkbox3").style.display = "inline";
					document.getElementById("task_checkbox3").checked = chart.data.useJoystick;


                    document.getElementById("task_label4").style.display = "none";
                    document.getElementById("task_textarea4").style.display = "none";
                    /*temp = {};
                    for(i in resource_param) {
                        temp[i] = resource_param[i]/1000;
                    }
                    //document.getElementById("task_label4").innerHTML = "Event Function Parameters";
                    document.getElementById("task_textarea4").value = JSON.stringify(temp);*/
                    document.getElementById("task_select4").style.display = "none";
                    document.getElementById("task_checkbox4").style.display = "none";

                    document.getElementById("task_label5").style.display = "inline";
                    document.getElementById("task_textarea5").style.display = "inline";
                    document.getElementById("task_label5").innerHTML = "Refresh Rate";
                    document.getElementById("task_textarea5").value = chart.refreshRate();
                    document.getElementById("task_select5").style.display = "none";
                    document.getElementById("task_checkbox5").style.display = "none";

                    document.getElementById("task_label6").style.display = "none";
                    document.getElementById("task_textarea6").style.display = "none";
					//document.getElementById("task_label6").innerHTML = "Range X";
					//document.getElementById("task_textarea6").value = crossTracking_data.rangeX;
                    document.getElementById("task_select6").style.display = "none";
                    document.getElementById("task_checkbox6").style.display = "none";

                    document.getElementById("task_label7").style.display = "none";
                    document.getElementById("task_textarea7").style.display = "none";
					//document.getElementById("task_label7").innerHTML = "Range Y";
					//document.getElementById("task_textarea7").value = crossTracking_data.rangeY;
                    document.getElementById("task_select7").style.display = "none";
                    document.getElementById("task_checkbox7").style.display = "none";
					
					document.getElementById("task_label8").style.display = "inline";
                    document.getElementById("task_textarea8").style.display = "inline";
					document.getElementById("task_label8").innerHTML = "Region Type";
					document.getElementById("task_textarea8").value = crossTracking_data.regionType;
                    document.getElementById("task_select8").style.display = "none";
                    document.getElementById("task_checkbox8").style.display = "none";
					
					document.getElementById("task_label9").style.display = "inline";
                    document.getElementById("task_textarea9").style.display = "inline";
					document.getElementById("task_label9").innerHTML = "Jitter Speed";
					document.getElementById("task_textarea9").value = crossTracking_data.jitterSpeed;
                    document.getElementById("task_select9").style.display = "none";
                    document.getElementById("task_checkbox9").style.display = "none";
					
					document.getElementById("task_label10").style.display = "none";
                    document.getElementById("task_textarea10").style.display = "none";
                    document.getElementById("task_select10").style.display = "none";
                    document.getElementById("task_checkbox10").style.display = "none";

					document.getElementById("task_label11").style.display = "none";
                    document.getElementById("task_textarea11").style.display = "none";
                    document.getElementById("task_select11").style.display = "none";
                    document.getElementById("task_checkbox11").style.display = "none";

                    document.getElementById("button1").style.display = "inline";
                    document.getElementById("button1").innerHTML = "Remove Crosshair Mark";
                    document.getElementById("button1").onclick = function(){
                    	if(document.getElementById("task_name").innerHTML == "CrossHairTracking"){
                    		crossTracking_data.crossHairMarks.pop();
           					crossTracking_chart.draw(crossTracking_data);
           				}
					};
					
                    document.getElementById("button2").style.display = "inline";
                    document.getElementById("button2").innerHTML = "Add Crosshair Mark";
                    document.getElementById("button2").onclick = function(){
                    	if(document.getElementById("task_name").innerHTML == "CrossHairTracking"){
                    		crossTracking_data.crossHairMarks.push({"locX":0,"locY":0});
            				crossTracking_chart.draw(crossTracking_data);
            			}
                	};
					
                    document.getElementById("button3").style.display = "none";
                    document.getElementById("button4").style.display = "none";

                    document.getElementById("applyButton").onclick = function(){
						objectName = document.getElementById("object_name").innerHTML.split(" ");
						//crossTracking_chart.startFunc(document.getElementById("task_textarea2").value*1000);
		        		//crossTracking_data.startFunction = crossTracking_chart.startFunc();
						
						crossTracking_data.distractor = document.getElementById("task_checkbox1").checked;
						
						crossTracking_data.refresh = JSON.parse(document.getElementById("task_textarea5").value);
                        chart.refreshRate(crossTracking_data.refresh);

						//crossTracking_data.rangeX =  JSON.parse(document.getElementById("task_textarea6").value);
						//crossTracking_data.rangeY =  JSON.parse(document.getElementById("task_textarea7").value);

						crossTracking_data.regionType = document.getElementById("task_textarea8").value;
						crossTracking_data.jitterSpeed = document.getElementById("task_textarea9").value;
						crossTracking_data.useJoystick = document.getElementById("task_checkbox3").checked;
						
						crossTracking_data.crossHairMarks[objectName[1]-1].locX = JSON.parse(document.getElementById("object_textarea1").value);
						crossTracking_data.crossHairMarks[objectName[1]-1].locY = JSON.parse(document.getElementById("object_textarea2").value);
						
						crossTracking_chart.draw(crossTracking_data);
		        		setup.CrossHairTracking.data = crossTracking_data;
    				};
				});//end of click function
				
			});//end of crosshairmark layer
			this.layer("targetregion").on("enter",function(){
				var chart = this.chart();

		        return this.on("click", function(d,i){
					document.getElementById("object_name").style.display = "inline";
                    document.getElementById("object_name").innerHTML = "CrossHairTracking "+(i+1);

                    document.getElementById("object_label1").style.display = "inline";
                    document.getElementById("object_textarea1").style.display = "inline";
                    document.getElementById("object_label1").innerHTML = "radius";
                    document.getElementById("object_textarea1").value = d.radius;
                    document.getElementById("object_select1").style.display = "none";

                    document.getElementById("object_label2").style.display = "none";
                    document.getElementById("object_textarea2").style.display = "none";
                    document.getElementById("object_select2").style.display = "none";

                    document.getElementById("object_label3").style.display = "none";
                    document.getElementById("object_textarea3").style.display = "none";
                    //document.getElementById("object_label3").innerHTML = "Decay Rate(units/min)";
                    //document.getElementById("object_textarea3").value = d.decayRate*60000;
                    document.getElementById("object_select3").style.display = "none";

                    document.getElementById("object_label4").style.display = "none";
                    document.getElementById("object_textarea4").style.display = "none";
                    //document.getElementById("object_label4").innerHTML = "Target Range Maximum";
                    //document.getElementById("object_textarea4").value = d.targetRangeMax;
                    document.getElementById("object_select4").style.display = "none";

                    document.getElementById("object_label5").style.display = "none";
                    document.getElementById("object_textarea5").style.display = "none";
                    //document.getElementById("object_label5").innerHTML = "Target Range Minimum";
                    //document.getElementById("object_textarea5").value = d.targetRangeMin;
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
                    document.getElementById("task_name").innerHTML = "CrossHairTracking";

                    document.getElementById("task_label1").style.display = "inline";
                    document.getElementById("task_label1").innerHTML = "Distractor";
                    document.getElementById("task_textarea1").style.display = "none";
                    document.getElementById("task_select1").style.display = "none";
                    document.getElementById("task_checkbox1").style.display = "inline";
                    document.getElementById("task_checkbox1").checked = chart.data.distractor;

                    document.getElementById("task_label2").style.display = "none";
                    document.getElementById("task_textarea2").style.display = "none";
                    //document.getElementById("task_label2").innerHTML = "Time to First Event";
                    //document.getElementById("task_textarea2").value = chart.startFunc()/1000;
                    document.getElementById("task_select2").style.display = "none";
                    document.getElementById("task_checkbox2").style.display = "none";

                    document.getElementById("task_label3").style.display = "inline";
					document.getElementById("task_label3").innerHTML = "Use Joystick";
                    document.getElementById("task_select3").style.display = "none";
                    document.getElementById("task_textarea3").style.display = "none";
                    document.getElementById("task_checkbox3").style.display = "inline";
					document.getElementById("task_checkbox3").checked = chart.data.useJoystick;


                    document.getElementById("task_label4").style.display = "none";
                    document.getElementById("task_textarea4").style.display = "none";
                    document.getElementById("task_select4").style.display = "none";
                    document.getElementById("task_checkbox4").style.display = "none";

                    document.getElementById("task_label5").style.display = "inline";
                    document.getElementById("task_textarea5").style.display = "inline";
                    document.getElementById("task_label5").innerHTML = "Refresh Rate";
                    document.getElementById("task_textarea5").value = chart.refreshRate();
                    document.getElementById("task_select5").style.display = "none";
                    document.getElementById("task_checkbox5").style.display = "none";

                    document.getElementById("task_label6").style.display = "none";
                    document.getElementById("task_textarea6").style.display = "none";
					//document.getElementById("task_label6").innerHTML = "Range X";
					//document.getElementById("task_textarea6").value = crossTracking_data.rangeX;
                    document.getElementById("task_select6").style.display = "none";
                    document.getElementById("task_checkbox6").style.display = "none";

                    document.getElementById("task_label7").style.display = "none";
                    document.getElementById("task_textarea7").style.display = "none";
					//document.getElementById("task_label7").innerHTML = "Range Y";
					//document.getElementById("task_textarea7").value = crossTracking_data.rangeY;
                    document.getElementById("task_select7").style.display = "none";
                    document.getElementById("task_checkbox7").style.display = "none";
					
					document.getElementById("task_label8").style.display = "inline";
                    document.getElementById("task_textarea8").style.display = "inline";
					document.getElementById("task_label8").innerHTML = "Region Type";
					document.getElementById("task_textarea8").value = crossTracking_data.regionType;
                    document.getElementById("task_select8").style.display = "none";
                    document.getElementById("task_checkbox8").style.display = "none";
					
					document.getElementById("task_label9").style.display = "inline";
                    document.getElementById("task_textarea9").style.display = "inline";
					document.getElementById("task_label9").innerHTML = "Jitter Speed";
					document.getElementById("task_textarea9").value = crossTracking_data.jitterSpeed;
                    document.getElementById("task_select9").style.display = "none";
                    document.getElementById("task_checkbox9").style.display = "none";
					
					document.getElementById("task_label10").style.display = "none";
                    document.getElementById("task_textarea10").style.display = "none";
                    document.getElementById("task_select10").style.display = "none";
                    document.getElementById("task_checkbox10").style.display = "none";

                    document.getElementById("button1").style.display = "none";
                    document.getElementById("button2").style.display = "none";
                    document.getElementById("button3").style.display = "none";
                    document.getElementById("button4").style.display = "none";

                    document.getElementById("applyButton").onclick = function(){
						objectName = document.getElementById("object_name").innerHTML.split(" ");
						//crossTracking_chart.startFunc(document.getElementById("task_textarea2").value*1000);
		        		//crossTracking_data.startFunction = crossTracking_chart.startFunc();
						
						crossTracking_data.distractor = document.getElementById("task_checkbox1").checked;
						
						crossTracking_data.refresh = JSON.parse(document.getElementById("task_textarea5").value);
                        chart.refreshRate(crossTracking_data.refresh);

						//crossTracking_data.rangeX = JSON.parse(document.getElementById("task_textarea6").value);
						//crossTracking_data.rangeY = JSON.parse(document.getElementById("task_textarea7").value);

						crossTracking_data.regionType = document.getElementById("task_textarea8").value;
						crossTracking_data.jitterSpeed = document.getElementById("task_textarea9").value;
						crossTracking_data.useJoystick = document.getElementById("task_checkbox3").checked;
						
						crossTracking_data.targetRegion[objectName[1]-1].radius = JSON.parse(document.getElementById("object_textarea1").value);
						
						crossTracking_chart.draw(crossTracking_data);
		        		setup.CrossHairTracking.data = crossTracking_data;
    				};
				});//end of click function
				
			});//end of targetRegion layer
			this.layer("curserball").on("enter",function(){
				var chart = this.chart();
				
				return this.on("click", function(d,i){
					document.getElementById("object_name").style.display = "inline";
                    document.getElementById("object_name").innerHTML = "CrossHairTracking "+(i+1);

                    document.getElementById("object_label1").style.display = "inline";
                    document.getElementById("object_textarea1").style.display = "inline";
                    document.getElementById("object_label1").innerHTML = "Cursor Width and Height";
                    document.getElementById("object_textarea1").value = d.height;
                    document.getElementById("object_select1").style.display = "none";

                    document.getElementById("object_label2").style.display = "none";
                    document.getElementById("object_textarea2").style.display = "none";
                    //document.getElementById("object_label2").innerHTML = "Cursor Width";
                    //document.getElementById("object_textarea2").value = d.width;
                    document.getElementById("object_select2").style.display = "none";

                    document.getElementById("object_label3").style.display = "none";
                    document.getElementById("object_textarea3").style.display = "none";
                    document.getElementById("object_select3").style.display = "none";

                    document.getElementById("object_label4").style.display = "none";
                    document.getElementById("object_textarea4").style.display = "none";
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
                    document.getElementById("task_name").innerHTML = "CrossHairTracking";

                    document.getElementById("task_label1").style.display = "inline";
                    document.getElementById("task_label1").innerHTML = "Distractor";
                    document.getElementById("task_textarea1").style.display = "none";
                    document.getElementById("task_select1").style.display = "none";
                    document.getElementById("task_checkbox1").style.display = "inline";
                    document.getElementById("task_checkbox1").checked = chart.data.distractor;

                    document.getElementById("task_label2").style.display = "none";
                    document.getElementById("task_textarea2").style.display = "none";
                    //document.getElementById("task_label2").innerHTML = "Time to First Event";
                    //document.getElementById("task_textarea2").value = chart.startFunc()/1000;
                    document.getElementById("task_select2").style.display = "none";
                    document.getElementById("task_checkbox2").style.display = "none";

                    document.getElementById("task_label3").style.display = "inline";
					document.getElementById("task_label3").innerHTML = "Use Joystick";
                    document.getElementById("task_select3").style.display = "none";
                    document.getElementById("task_textarea3").style.display = "none";
                    document.getElementById("task_checkbox3").style.display = "inline";
					document.getElementById("task_checkbox3").checked = chart.data.useJoystick;

                    document.getElementById("task_label4").style.display = "inline";
					document.getElementById("task_label4").innerHTML = "Joystick Calibration";
                    document.getElementById("task_textarea4").style.display = "inline";
					document.getElementById("task_textarea4").value = JSON.stringify(chart.data.JoystickParams);
                    document.getElementById("task_select4").style.display = "none";
                    document.getElementById("task_checkbox4").style.display = "none";

                    document.getElementById("task_label5").style.display = "inline";
                    document.getElementById("task_textarea5").style.display = "inline";
                    document.getElementById("task_label5").innerHTML = "Refresh Rate";
                    document.getElementById("task_textarea5").value = chart.refreshRate();
                    document.getElementById("task_select5").style.display = "none";
                    document.getElementById("task_checkbox5").style.display = "none";

                    document.getElementById("task_label6").style.display = "none";
                    document.getElementById("task_textarea6").style.display = "none";
					//document.getElementById("task_label6").innerHTML = "Range X";
					//document.getElementById("task_textarea6").value = crossTracking_data.rangeX;
                    document.getElementById("task_select6").style.display = "none";
                    document.getElementById("task_checkbox6").style.display = "none";

                    document.getElementById("task_label7").style.display = "none";
                    document.getElementById("task_textarea7").style.display = "none";
					//document.getElementById("task_label7").innerHTML = "Range Y";
					//document.getElementById("task_textarea7").value = crossTracking_data.rangeY;
                    document.getElementById("task_select7").style.display = "none";
                    document.getElementById("task_checkbox7").style.display = "none";
					
					document.getElementById("task_label8").style.display = "inline";
                    document.getElementById("task_textarea8").style.display = "inline";
					document.getElementById("task_label8").innerHTML = "Region Type";
					document.getElementById("task_textarea8").value = crossTracking_data.regionType;
                    document.getElementById("task_select8").style.display = "none";
                    document.getElementById("task_checkbox8").style.display = "none";
					
					document.getElementById("task_label9").style.display = "inline";
                    document.getElementById("task_textarea9").style.display = "inline";
					document.getElementById("task_label9").innerHTML = "Jitter Speed";
					document.getElementById("task_textarea9").value = crossTracking_data.jitterSpeed;
                    document.getElementById("task_select9").style.display = "none";
                    document.getElementById("task_checkbox9").style.display = "none";
					
					document.getElementById("task_label10").style.display = "none";
                    document.getElementById("task_textarea10").style.display = "none";
                    document.getElementById("task_select10").style.display = "none";
                    document.getElementById("task_checkbox10").style.display = "none";

                    document.getElementById("button1").style.display = "none";
                    document.getElementById("button2").style.display = "none";
                    document.getElementById("button3").style.display = "none";
                    document.getElementById("button4").style.display = "none";

                    

                    document.getElementById("applyButton").onclick = function(){
						objectName = document.getElementById("object_name").innerHTML.split(" ");
						//crossTracking_chart.startFunc(document.getElementById("task_textarea2").value*1000);
		        		//crossTracking_data.startFunction = crossTracking_chart.startFunc();
						
						crossTracking_data.distractor = document.getElementById("task_checkbox1").checked;
						
                        //this setting was not actully changing the chart interval. 
                        //after attempts to debug it was decided that this was not important enough to worry about
						crossTracking_data.refresh = JSON.parse(document.getElementById("task_textarea5").value);
                        chart.refreshRate(crossTracking_data.refresh);

                        //these settings only make sense if you can also select the crosshairmarks and targetregion layers
                        //these layers are unselectable because in the chart they are covered by the trackingArea layer
						//crossTracking_data.rangeX = JSON.parse(document.getElementById("task_textarea6").value);
						//crossTracking_data.rangeY = JSON.parse(document.getElementById("task_textarea7").value);

						crossTracking_data.regionType = document.getElementById("task_textarea8").value;
						crossTracking_data.jitterSpeed = document.getElementById("task_textarea9").value;
						crossTracking_data.useJoystick = document.getElementById("task_checkbox3").checked;
						crossTracking_data.JoystickParams = JSON.parse(document.getElementById("task_textarea4").value);
						
                        //the picture scaleing was being unpredictable if height and width were different. so they are now combined
						crossTracking_data.curserBall[objectName[1]-1].height = JSON.parse(document.getElementById("object_textarea1").value);
						crossTracking_data.curserBall[objectName[1]-1].width = JSON.parse(document.getElementById("object_textarea1").value);
						
						crossTracking_chart.draw(crossTracking_data);
		        		setup.CrossHairTracking.data = crossTracking_data;
    				};
				});//end of click function
			
			});//end of cursor layer
		}
	})
	 
	setup.CrossHairTracking.Default = {crossHairMarks:[{"locX":4,"locY":4},{"locX":3,"locY":4},{"locX":2,"locY":4},{"locX":1,"locY":4},{"locX":4,"locY":3},{"locX":4,"locY":2},{"locX":4,"locY":5},{"locX":4,"locY":7},{"locX":5,"locY":4},{"locX":4,"locY":6},{"locX":6,"locY":4},{"locX":7,"locY":4},{"locX":4,"locY":1}],
		targetRegion:[{"radius":"2"}],
		regionType: "circle",
		jitterSpeed: 5,
		curserBall:[{"height": 64, "width": 64}],
		rangeX:8,
		rangeY:8,
		useJoystick: false,
		JoystickParams: [{scale: 7, minX: -1, zeroX:0, maxX:1, minY:-1, zeroY:0, maxY:1, xAxis:0, yAxis:1, trigger:4}],
		//startFunction: 5000,
		refresh: 100,
        distractor: false
    };
	
	 if (setup.CrossHairTracking.data=="{}") {
    	setup.CrossHairTracking.data = setup.CrossHairTracking.Default
    	crossTracking_data = setup.CrossHairTracking.Default;
    } else {
    	crossTracking_data = setup.CrossHairTracking.data;
    }
	//var crossTracking_param = crossTracking_data.parameters;

	var crossTracking_svg = GUIUtil.getGenericSVG(
	        d3.select("#"+setup.CrossHairTracking.container),
	        650, 650,
	        JSON.parse(document.getElementById(setup.CrossHairTracking.container).style.width.substr(0,document.getElementById(setup.CrossHairTracking.container).style.width.length-2)), 
	    	JSON.parse(document.getElementById(setup.CrossHairTracking.container).style.height.substr(0,document.getElementById(setup.CrossHairTracking.container).style.height.length-2)),
	        {top: scale(.03), right: scale(.03), bottom: scale(.03), left: scale(.03)},
	        "crossTracking_svg");

	
	var crossTracking_chart = crossTracking_svg.chart("CrossHairTrackingGUI").eventFunc(function(){t = eval(crossTracking_data.eventFunction); return t;}).refreshRate(crossTracking_data.refresh);//.startFunc(crossTracking_data.startFunction)
	crossTracking_chart.when("alert", function(args){});
	crossTracking_chart.when("timeout", function(args){});
	crossTracking_chart.when("response", function(args){});

	
	crossTracking_chart.draw(crossTracking_data);
}
