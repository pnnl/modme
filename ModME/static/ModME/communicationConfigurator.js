var Communication = function(){
	d3.chart("Communication").extend("CommunicationGUI",{

	    initialize: function(){

	        this.layer("communication").on("enter",function(){

	            var chart = this.chart();

	            return this.on("click", function(d,i){
	            	console.log("test");
	                document.getElementById("object_name").style.display = "inline";
	                document.getElementById("object_name").innerHTML = "Channels "+(i+1);
	                document.getElementById("label1").style.display = "inline";
	                document.getElementById("textArea1").style.display = "inline";
	                document.getElementById("label1").innerHTML = "Channels Name";
	                document.getElementById("textArea1").value = d.name;

	                document.getElementById("label2").style.display = "inline";
	                document.getElementById("textArea2").style.display = "inline";
	                document.getElementById("label2").innerHTML = "Frequency Differential";
	                document.getElementById("textArea2").value = d.differential/10.0;

	                document.getElementById("label3").style.display = "inline";
	                document.getElementById("textArea3").style.display = "inline";
	                document.getElementById("label3").innerHTML = "Probability";
	                document.getElementById("textArea3").value = d.prob;

	                document.getElementById("label4").style.display = "none";
	                document.getElementById("textArea4").style.display = "none";

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
	                document.getElementById("task_name").innerHTML = "Communication";

	                document.getElementById("event_parameters_label").style.display = "inline";
	                document.getElementById("event_parameters").style.display = "inline";
	                temp = {};
	                for(i in comm_param) {
	                    temp[i] = comm_param[i]/1000;
	                }
	                document.getElementById("event_parameters").value = JSON.stringify(temp);

	                document.getElementById("first_event_label").style.display = "inline";
	                document.getElementById("first_event").style.display = "inline";
	                document.getElementById("first_event").value = chart.startFunc()/1000;

	                document.getElementById("event_function_label").style.display = "inline";
	                document.getElementById("event_function").style.display = "inline";
	                if(comm_param.min){
	                    document.getElementById("event_function").selectedIndex = 0;
	                }
	                else{
	                    document.getElementById("event_function").selectedIndex = 1;
	                }

	                document.getElementById("label13").style.display = "inline";
	                document.getElementById("textArea13").style.display = "inline";
	                document.getElementById("label13").innerHTML = "Alert Timeout";
	                document.getElementById("textArea13").value = chart.rt/1000;

	                document.getElementById("label14").style.display = "inline";
	                document.getElementById("textArea14").style.display = "inline";
	                document.getElementById("label14").innerHTML = "Frequency Minimum";
	                document.getElementById("textArea14").value = chart.data.absoluteMin/10.0;

	                document.getElementById("label15").style.display = "inline";
	                document.getElementById("textArea15").style.display = "inline";
	                document.getElementById("label15").innerHTML = "Frequency Maximum";
	                document.getElementById("textArea15").value = chart.data.absoluteMax/10.0;

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
	                	if(document.getElementById("task_name").innerHTML == "Communication"){
							comm_param = JSON.parse(document.getElementById("event_parameters").value);
							for(i in comm_param) {
								comm_param[i] = comm_param[i]*1000;
							}
							comm_chart.startFunc(document.getElementById("first_event").value*1000);
							if(document.getElementById("event_function").selectedIndex==0){
								comm_data.eventFunction = "(Math.random()*(comm_param.max-comm_param.min))+comm_param.min;";
							}
							else{
								comm_data.eventFunction = "1000*(Math.floor(Math.log(1-Math.random())/Math.log(1-(1/(comm_param.avg_wait/1000)))) + 1);"
							}
							comm_data.startFunction = comm_chart.startFunc();
							comm_data.eventFunction = comm_chart.eventFunc();
							comm_data.parameters = comm_param;
							comm_data.response = JSON.parse(document.getElementById("textArea13").value)*1000;
							comm_chart.responseTime(comm_data.response);

							comm_data.absoluteMin = JSON.parse(document.getElementById("textArea14").value)*10;
							comm_data.absoluteMax = JSON.parse(document.getElementById("textArea15").value)*10;

							comm_data.channels[objectName[1]-1].name = document.getElementById("textArea1").value;
							comm_data.channels[objectName[1]-1].differential = JSON.parse(document.getElementById("textArea2").value)*10;
							comm_data.channels[objectName[1]-1].prob = JSON.parse(document.getElementById("textArea3").value);
							comm_chart.draw(comm_data);
		                }
		            };
	            });

	        });

	    }
	});
	setup.Communication.Default = {channels: [{name: "OPS 1", avalibleFrequency: [1173,1231,1123,1131], differential: 6, prob:1},
                    {name: "OPS 2", avalibleFrequency: [1235,1231,1123,1131], differential: 6, prob:1},
                    {name: "INT 1", avalibleFrequency: [1141,1231,1123,1131], differential: 6, prob:1},
                    {name: "INT 2", avalibleFrequency: [1259,1231,1123,1131], differential: 6, prob:1}
                    ],
            target: {name: "OPS 1",frequency:1173},
            response: 8000,
            startFunction: 5000,
            absoluteMin:1100,
            absoluteMax: 1600,
            eventFunction: "(Math.random()*(comm_param.max-comm_param.min))+comm_param.min;",
            parameters: {min:8000, max:14000}
            };
    if (setup.Communication.data=="") {
    	setup.Communication.data = setup.Communication.Default
    	var comm_data = setup.Communication.Default;
    } else {
    	var comm_data = setup.Communication.data;
    }
	var comm_param = comm_data.parameters;

	var comm_svg = get_generic_svg(
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