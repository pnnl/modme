var Communication = function(){
	d3.chart("Communication").extend("CommunicationGUI",{

	    initialize: function(){

	        this.layer("communication").on("enter",function(){

	            var chart = this.chart();

	            return this.on("click", function(d,i){
	                document.getElementById("object_name").style.display = "inline";
	                document.getElementById("object_name").innerHTML = "Channels "+(i+1);
					
	                document.getElementById("object_label1").style.display = "inline";
	                document.getElementById("object_textarea1").style.display = "inline";
	                document.getElementById("object_label1").innerHTML = "Channels Name";
	                document.getElementById("object_textarea1").value = d.name;
	                document.getElementById("object_select1").style.display = "none";

	                document.getElementById("object_label2").style.display = "inline";
	                document.getElementById("object_textarea2").style.display = "inline";
	                document.getElementById("object_label2").innerHTML = "Frequency Differential";
	                document.getElementById("object_textarea2").value = d.differential/10.0;
	                document.getElementById("object_select2").style.display = "none";

	                document.getElementById("object_label3").style.display = "inline";
	                document.getElementById("object_textarea3").style.display = "inline";
	                document.getElementById("object_label3").innerHTML = "Probability";
	                document.getElementById("object_textarea3").value = d.prob;
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
	                document.getElementById("task_name").innerHTML = "Communication";

	                document.getElementById("task_label1").style.display = "inline";
	                document.getElementById("task_label1").innerHTML = "Distractor";
                    document.getElementById("task_textarea1").style.display = "none";
                    document.getElementById("task_select1").style.display = "none";
                    document.getElementById("task_checkbox1").style.display = "inline";
                    document.getElementById("task_checkbox1").checked = chart.data.distractor;

	                document.getElementById("task_label2").style.display = "inline";
	                document.getElementById("task_textarea2").style.display = "inline";
	                document.getElementById("task_label2").innerHTML = "Time to First Event";
	                document.getElementById("task_textarea2").value = chart.startFunc()/1000;
	                document.getElementById("task_select2").style.display = "none";
	                document.getElementById("task_checkbox2").style.display = "none";

	                document.getElementById("task_label3").style.display = "inline";
	                document.getElementById("task_select3").style.display = "inline";
	                document.getElementById("task_label3").innerHTML = "Event Function";
	                if(comm_data.eventFunction == eventFunctionOption1){
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
	                for(i in comm_param) {
	                    temp[i] = comm_param[i]/1000;
	                }
	                document.getElementById("task_label4").innerHTML = "Event Function Parameters";
	                document.getElementById("task_textarea4").value = JSON.stringify(temp);
	                document.getElementById("task_select4").style.display = "none";
	                document.getElementById("task_checkbox4").style.display = "none";

	                document.getElementById("task_label5").style.display = "inline";
	                document.getElementById("task_textarea5").style.display = "inline";
	                document.getElementById("task_label5").innerHTML = "Alert Timeout";
	                document.getElementById("task_textarea5").value = chart.rt/1000;
	                document.getElementById("task_select5").style.display = "none";
	                document.getElementById("task_checkbox5").style.display = "none";

	                document.getElementById("task_label6").style.display = "inline";
	                document.getElementById("task_textarea6").style.display = "inline";
	                document.getElementById("task_label6").innerHTML = "Frequency Minimum";
	                document.getElementById("task_textarea6").value = chart.data.absoluteMin/10.0;
	                document.getElementById("task_select6").style.display = "none";
	                document.getElementById("task_checkbox6").style.display = "none";

	                document.getElementById("task_label7").style.display = "inline";
	                document.getElementById("task_textarea7").style.display = "inline";
	                document.getElementById("task_label7").innerHTML = "Frequency Maximum";
	                document.getElementById("task_textarea7").value = chart.data.absoluteMax/10.0;
	                document.getElementById("task_select7").style.display = "none";
	                document.getElementById("task_checkbox7").style.display = "none";
					
					document.getElementById("task_label8").style.display = "inline";
					document.getElementById("task_label8").innerHTML = "Show Mouse Controls";
                    document.getElementById("task_textarea8").style.display = "none";
                    document.getElementById("task_select8").style.display = "none";
                    document.getElementById("task_checkbox8").style.display = "inline";
					document.getElementById("task_checkbox8").checked = chart.data.mouseVersion;
					
					document.getElementById("task_label9").style.display = "none";
                    document.getElementById("task_textarea9").style.display = "none";
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
	                document.getElementById("button1").innerHTML = "Decrease Channels";
	                document.getElementById("button1").onclick = function(){
	                	if(document.getElementById("task_name").innerHTML == "Communication"){
	                        comm_data.channels.pop();
                            comm_chart.draw(comm_data);
	                    }
	                };
	                document.getElementById("button2").style.display = "inline";
	                document.getElementById("button2").innerHTML = "Increase Channels";
	                document.getElementById("button2").onclick = function(){
	                	if(document.getElementById("task_name").innerHTML == "Communication"){
	                        comm_data.channels.push({name: "Name", differential: 6, prob:1});
                            comm_chart.draw(comm_data);
	                    }
	                };
	                document.getElementById("button3").style.display = "none";
	                document.getElementById("button4").style.display = "none";

	                document.getElementById("applyButton").onclick = function(){
	                	objectName = document.getElementById("object_name").innerHTML.split(" ");
	                	if(document.getElementById("task_name").innerHTML == "Communication"){
							comm_param = JSON.parse(document.getElementById("task_textarea4").value);
							for(i in comm_param) {
								comm_param[i] = comm_param[i]*1000;
							}
							comm_chart.startFunc(document.getElementById("task_textarea2").value*1000);

							comm_data.distractor = document.getElementById("task_checkbox1").checked;

							if(document.getElementById("task_select3").selectedIndex==0){
								comm_data.eventFunction = eventFunctionOption1;
							}
							else{
								comm_data.eventFunction = eventFunctionOption2;
							}
							comm_data.startFunction = comm_chart.startFunc();
							comm_data.parameters = comm_param;
							comm_data.response = JSON.parse(document.getElementById("task_textarea5").value)*1000;
							comm_chart.responseTime(comm_data.response);

							comm_data.absoluteMin = JSON.parse(document.getElementById("task_textarea6").value)*10;
							comm_data.absoluteMax = JSON.parse(document.getElementById("task_textarea7").value)*10;

							comm_data.mouseVersion = document.getElementById("task_checkbox8").checked;

							comm_data.channels[objectName[1]-1].name = document.getElementById("object_textarea1").value;
							comm_data.channels[objectName[1]-1].differential = JSON.parse(document.getElementById("object_textarea2").value)*10;
							comm_data.channels[objectName[1]-1].prob = JSON.parse(document.getElementById("object_textarea3").value);
							comm_chart.draw(comm_data);
							setup.Communication.data = comm_data;
		                }
		            };
	            }); // end click function

	        }); // end communication layer
	    } // end of initializtion
	}); // end of extention
	
	let eventFunctionOption1 = "(Math.random()*(comm_param.max-comm_param.min))+comm_param.min;";
	let eventFunctionOption2 = "1000*(Math.floor(Math.log(1-Math.random())/Math.log(1-(1/(comm_param.avg_wait/1000)))) + 1);";
	
	setup.Communication.Default = {channels: [{name: "OPS 1", avalibleFrequency: [1173,1231,1123,1131], differential: 6, prob:1},
                    {name: "OPS 2", avalibleFrequency: [1235,1231,1123,1131], differential: 6, prob:1},
                    {name: "INT 1", avalibleFrequency: [1141,1231,1123,1131], differential: 6, prob:1},
                    {name: "INT 2", avalibleFrequency: [1259,1231,1123,1131], differential: 6, prob:1}
                    ],
            target: {name: "OPS 1",frequency:1173},
            distractor: false,
			mouseVersion: true,
            response: 8000,
            startFunction: 5000,
            absoluteMin:1100,
            absoluteMax: 1600,
            eventFunction: "(Math.random()*(comm_param.max-comm_param.min))+comm_param.min;",
            parameters: {min:8000, max:14000},
            controller: {indexUp: 40, indexDown:38, frequencyDown:37, frequencyUp:39, accept:13}
            };
    if (setup.Communication.data=="{}") {
    	setup.Communication.data = setup.Communication.Default
    	comm_data = setup.Communication.Default;
    } else {
    	comm_data = setup.Communication.data;
    }
	var comm_param = comm_data.parameters;

	var comm_svg = GUIUtil.getGenericSVG(
	        d3.select("#"+setup.Communication.container),
	        650, 650,
	        JSON.parse(document.getElementById(setup.Communication.container).style.width.substr(0,document.getElementById(setup.Communication.container).style.width.length-2)), 
	    	JSON.parse(document.getElementById(setup.Communication.container).style.height.substr(0,document.getElementById(setup.Communication.container).style.height.length-2)),
	        {top: scale(.03), right: scale(.03), bottom: scale(.03), left: scale(.03)},
	        "comm_svg");

	var comm_chart = comm_svg.chart("CommunicationGUI").eventFunc(function(){t = eval(comm_data.eventFunction); return t;}).startFunc(comm_data.startFunction).responseTime(comm_data.response);
	comm_chart.when("alert", function(args){});
	comm_chart.when("timeout", function(args){});
	comm_chart.when("response", function(args){});

	comm_chart.draw(comm_data);
}
