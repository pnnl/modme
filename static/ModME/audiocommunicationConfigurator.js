var AudioCommunication = function(){
	d3.chart("AudioCommunication").extend("AudioCommunicationGUI",{

	    initialize: function(){

	        this.layer("audiocommunication").on("enter",function(){

	            var chart = this.chart();

	            return this.on("click", function(d,i){
	                document.getElementById("object_name").style.display = "inline";
	                document.getElementById("object_name").innerHTML = "Channels "+(i+1);
					
	                document.getElementById("object_label1").style.display = "inline";
	                document.getElementById("object_textarea1").style.display = "inline";
	                document.getElementById("object_label1").innerHTML = "Channel Name";
	                document.getElementById("object_textarea1").value = d.name;
	                document.getElementById("object_select1").style.display = "none";

	                document.getElementById("object_label2").style.display = "none"
	                document.getElementById("object_textarea2").style.display = "none";
	                //document.getElementById("object_label2").innerHTML = "Frequency Differential";
	                //document.getElementById("object_textarea2").value = d.differential/10.0;
	                document.getElementById("object_select2").style.display = "none";

	                document.getElementById("object_label3").style.display = "inline";
	                document.getElementById("object_textarea3").style.display = "inline";
	                document.getElementById("object_label3").innerHTML = "Probability";
	                document.getElementById("object_textarea3").value = d.prob;
	                document.getElementById("object_select3").style.display = "none";

	                document.getElementById("object_label4").style.display = "inline";
	                document.getElementById("object_textarea4").style.display = "inline";
					document.getElementById("object_label4").innerHTML = "Min Freq";
					document.getElementById("object_textarea4").value = d.absoluteMin;
	                document.getElementById("object_select4").style.display = "none";

	                document.getElementById("object_label5").style.display = "inline";
	                document.getElementById("object_textarea5").style.display = "inline";
					document.getElementById("object_label5").innerHTML = "Max Freq";
					document.getElementById("object_textarea5").value = d.absoluteMax;
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
	                document.getElementById("task_name").innerHTML = "AudioCommunication";

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
	                if(audcomm_data.eventFunction == eventFunctionOption1){
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
	                for(i in audcomm_param) {
	                    temp[i] = audcomm_param[i]/1000;
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
	                document.getElementById("task_label6").innerHTML = "Files";
	                document.getElementById("task_textarea6").value = JSON.stringify(chart.data.files);
	                document.getElementById("task_select6").style.display = "none";
	                document.getElementById("task_checkbox6").style.display = "none";

	                document.getElementById("task_label7").style.display = "inline";
	                document.getElementById("task_textarea7").style.display = "inline";
	                document.getElementById("task_label7").innerHTML = "User Callsign";
	                document.getElementById("task_textarea7").value = chart.data.userCallsign;
	                document.getElementById("task_select7").style.display = "none";
	                document.getElementById("task_checkbox7").style.display = "none";
					
					document.getElementById("task_label8").style.display = "inline";
	                document.getElementById("task_textarea8").style.display = "inline";
	                document.getElementById("task_label8").innerHTML = "User Probability";
	                document.getElementById("task_textarea8").value = chart.data.userProb;
	                document.getElementById("task_select8").style.display = "none";
	                document.getElementById("task_checkbox8").style.display = "none";
					
					document.getElementById("task_label9").style.display = "inline";
	                document.getElementById("task_textarea9").style.display = "inline";
	                document.getElementById("task_label9").innerHTML = "Number of Events";
	                document.getElementById("task_textarea9").value = chart.data.numberOfEvents;
	                document.getElementById("task_select9").style.display = "none";
	                document.getElementById("task_checkbox9").style.display = "none";
					
					document.getElementById("task_label10").style.display = "inline";
	                document.getElementById("task_textarea10").style.display = "none";
	                document.getElementById("task_label10").innerHTML = "Random Event Spacing";
	                //document.getElementById("task_textarea10").value = chart.data.absoluteMax;
	                document.getElementById("task_select10").style.display = "none";
	                document.getElementById("task_checkbox10").style.display = "inline";
					document.getElementById("task_checkbox10").checked = chart.data.randomSpaceing;
					
					document.getElementById("task_label11").style.display = "inline";
					document.getElementById("task_label11").innerHTML = "Show Mouse Controls";
                    document.getElementById("task_textarea11").style.display = "none";
                    document.getElementById("task_select11").style.display = "none";
                    document.getElementById("task_checkbox11").style.display = "inline";
					document.getElementById("task_checkbox11").checked = chart.data.mouseVersion;
					
	                document.getElementById("button1").style.display = "inline";
	                document.getElementById("button1").innerHTML = "Decrease Channels";
	                document.getElementById("button1").onclick = function(){
	                	if(document.getElementById("task_name").innerHTML == "AudioCommunication"){
	                        audcomm_data.channels.pop();
                            audcomm_chart.draw(audcomm_data);
	                    }
	                };
	                document.getElementById("button2").style.display = "inline";
	                document.getElementById("button2").innerHTML = "Increase Channels";
	                document.getElementById("button2").onclick = function(){
	                	if(document.getElementById("task_name").innerHTML == "AudioCommunication"){
	                        audcomm_data.channels.push({name: "Name", differential: 6, prob:1, absoluteMin:1100, absoluteMax:1600});
                            audcomm_chart.draw(audcomm_data);
	                    }
	                };
	                document.getElementById("button3").style.display = "none";
	                document.getElementById("button4").style.display = "none";

	                document.getElementById("applyButton").onclick = function(){
	                	objectName = document.getElementById("object_name").innerHTML.split(" ");
	                	if(document.getElementById("task_name").innerHTML == "AudioCommunication"){
							audcomm_param = JSON.parse(document.getElementById("task_textarea4").value);
							for(i in audcomm_param) {
								audcomm_param[i] = audcomm_param[i]*1000;
							}
							audcomm_chart.startFunc(document.getElementById("task_textarea2").value*1000);

							audcomm_data.duration = (document.getElementById("duration").value) * 60000;
							
							audcomm_data.distractor = document.getElementById("task_checkbox1").checked;

							if(document.getElementById("task_select3").selectedIndex==0){
								audcomm_data.eventFunction = eventFunctionOption1;
							}
							else{
								audcomm_data.eventFunction = eventFunctionOption2;
							}
							audcomm_data.startFunction = audcomm_chart.startFunc();
							audcomm_data.parameters = audcomm_param;
							audcomm_data.response = JSON.parse(document.getElementById("task_textarea5").value)*1000;
							var val = document.getElementById("task_textarea6").value;
							audcomm_data.files = JSON.parse(val);
							audcomm_data.userProb = document.getElementById("task_textarea8").value;
							audcomm_chart.responseTime(audcomm_data.response);
							
							//audcomm_data.absoluteMin = JSON.parse(document.getElementById("object_textarea4").value);
							//audcomm_data.absoluteMax = JSON.parse(document.getElementById("object_textarea5").value);
							
							audcomm_data.userCallsign = document.getElementById("task_textarea7").value;
							
							audcomm_data.numberOfEvents = document.getElementById("task_textarea9").value;
							
							audcomm_data.randomSpaceing = document.getElementById("task_checkbox10").checked;
							
							audcomm_data.mouseVersion = document.getElementById("task_checkbox11").checked;
							
							audcomm_data.channels[objectName[1]-1].name = document.getElementById("object_textarea1").value;
							audcomm_data.channels[objectName[1]-1].differential = JSON.parse(document.getElementById("object_textarea2").value)*10;
							audcomm_data.channels[objectName[1]-1].prob = JSON.parse(document.getElementById("object_textarea3").value);
							audcomm_data.channels[objectName[1]-1].absoluteMin = JSON.parse(document.getElementById("object_textarea4").value);
							audcomm_data.channels[objectName[1]-1].absoluteMax = JSON.parse(document.getElementById("object_textarea5").value);
							
							audcomm_chart.draw(audcomm_data);
							setup.AudioCommunication.data = audcomm_data;
		                }
		            };
	            }); // end click function

	        }); // end AudioCommunication layer
	    } // end of initializtion
	}); // end of extention
	
	eventFunctionOption1 = "(Math.random()*(audcomm_param.max-audcomm_param.min))+audcomm_param.min;";
	eventFunctionOption2 = "1000*(Math.floor(Math.log(1-Math.random())/Math.log(1-(1/(audcomm_param.avg_wait/1000)))) + 1);";
	
	setup.AudioCommunication.Default = {channels: [{name: "COM 1", differential: 6, prob:1, absoluteMin:1100, absoluteMax:1600},
                    {name: "COM 2", differential: 6, prob:1, absoluteMin:1100, absoluteMax:1600},
                    {name: "NAV 1", differential: 6, prob:1, absoluteMin:1100, absoluteMax:1600},
                    {name: "NAV 2", differential: 6, prob:1, absoluteMin:1100, absoluteMax:1600}
                    ],
            distractor: false,
			mouseVersion: true,
			duration: 60000,
            response: 8000,
            startFunction: 5000,
            files: ["/static/ModME/AF-MATB_Audio/NAL478_COM2_1183.wav","/static/ModME/AF-MATB_Audio/NAL478_NAV1_1097.wav","/static/ModME/AF-MATB_Audio/NAL478_NAV2_1153.wav","/static/ModME/AF-MATB_Audio/NAL478_NAV2_1177.wav","/static/ModME/AF-MATB_Audio/NDL183_NAV1_1131.wav","/static/ModME/AF-MATB_Audio/NDL183_NAV2_1173.wav","/static/ModME/AF-MATB_Audio/NGT504_COM1_1211.wav","/static/ModME/AF-MATB_Audio/NGT504_COM1_1213.wav","/static/ModME/AF-MATB_Audio/NGT504_COM1_1219.wav","/static/ModME/AF-MATB_Audio/NGT504_COM2_1199.wav","/static/ModME/AF-MATB_Audio/NGT504_COM2_1213.wav","/static/ModME/AF-MATB_Audio/NGT504_COM2_1219.wav","/static/ModME/AF-MATB_Audio/NGT504_NAV1_1097.wav","/static/ModME/AF-MATB_Audio/NGT504_NAV1_1101.wav","/static/ModME/AF-MATB_Audio/NGT504_NAV1_1105.wav","/static/ModME/AF-MATB_Audio/NGT504_NAV1_1107.wav","/static/ModME/AF-MATB_Audio/NGT504_NAV2_1115.wav","/static/ModME/AF-MATB_Audio/NGT504_NAV2_1123.wav","/static/ModME/AF-MATB_Audio/NGT504_NAV2_1131.wav","/static/ModME/AF-MATB_Audio/NLS217_COM1_1213.wav","/static/ModME/AF-MATB_Audio/NLS217_COM1_1249.wav","/static/ModME/AF-MATB_Audio/NLS217_COM1_1255.wav","/static/ModME/AF-MATB_Audio/NLS217_COM1_1261.wav","/static/ModME/AF-MATB_Audio/NLS217_COM2_1191.wav","/static/ModME/AF-MATB_Audio/NRK362_COM2_1213.wav","/static/ModME/AF-MATB_Audio/NRK362_COM2_1233.wav","/static/ModME/AF-MATB_Audio/NRK362_NAV1_1139.wav","/static/ModME/AF-MATB_Audio/NRK362_NAV2_1135.wav"],
			userCallsign: "NGT504",
			userProb: 5,
            eventFunction: "(Math.random()*(audcomm_param.max-audcomm_param.min))+audcomm_param.min;",
            parameters: {min:8000, max:14000},
			numberOfEvents: 3,
			randomSpaceing: true,
            controller: {indexUp: 40, indexDown:38, frequencyDown:37, frequencyUp:39, accept:13}
            };
    if (setup.AudioCommunication.data=="{}") {
    	setup.AudioCommunication.data = setup.AudioCommunication.Default
    	audcomm_data = setup.AudioCommunication.Default;
    } else {
    	audcomm_data = setup.AudioCommunication.data;
    }
	var audcomm_param = audcomm_data.parameters;

	var audcomm_svg = GUIUtil.getGenericSVG(
	        d3.select("#"+setup.AudioCommunication.container),
	        650, 650,
	        JSON.parse(document.getElementById(setup.AudioCommunication.container).style.width.substr(0,document.getElementById(setup.AudioCommunication.container).style.width.length-2)), 
	    	JSON.parse(document.getElementById(setup.AudioCommunication.container).style.height.substr(0,document.getElementById(setup.AudioCommunication.container).style.height.length-2)),
	        {top: scale(.03), right: scale(.03), bottom: scale(.03), left: scale(.03)},
	        "audcomm_svg");

	var audcomm_chart = audcomm_svg.chart("AudioCommunicationGUI").eventFunc(function(){t = eval(audcomm_data.eventFunction); return t;}).startFunc(audcomm_data.startFunction).responseTime(audcomm_data.response);
	audcomm_chart.when("alert", function(args){});
	audcomm_chart.when("timeout", function(args){});
	audcomm_chart.when("response", function(args){});

	audcomm_chart.draw(audcomm_data);
}
