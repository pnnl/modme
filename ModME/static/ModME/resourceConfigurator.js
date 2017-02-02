var Resource = function(){
    d3.chart("Resource").extend("ResourceGUI",{

        initialize: function(){

        this.layer("tanks").on("enter",function(){

            var chart = this.chart();

            return this.on("click", function(d,i){
                document.getElementById("object_name").style.display = "inline";
                document.getElementById("object_name").innerHTML = "Tank "+(i+1);
                document.getElementById("label1").style.display = "inline";
                document.getElementById("textArea1").style.display = "inline";
                document.getElementById("label1").innerHTML = "Max Resource";
                document.getElementById("textArea1").value = d.maxResource;

                document.getElementById("label2").style.display = "inline";
                document.getElementById("textArea2").style.display = "inline";
                document.getElementById("label2").innerHTML = "Starting Reource";
                document.getElementById("textArea2").value = d.startingResource;

                document.getElementById("label3").style.display = "inline";
                document.getElementById("textArea3").style.display = "inline";
                document.getElementById("label3").innerHTML = "Decay Rate(units/min)";
                document.getElementById("textArea3").value = d.decayRate*60000;

                document.getElementById("label4").style.display = "inline";
                document.getElementById("textArea4").style.display = "inline";
                document.getElementById("label4").innerHTML = "Target Range Maximum";
                document.getElementById("textArea4").value = d.targetRangeMax;

                document.getElementById("label5").style.display = "inline";
                document.getElementById("textArea5").style.display = "inline";
                document.getElementById("label5").innerHTML = "Target Range Minimum";
                document.getElementById("textArea5").value = d.targetRangeMin;

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
                document.getElementById("task_name").innerHTML = "Resource";

                document.getElementById("event_parameters_label").style.display = "inline";
                document.getElementById("event_parameters").style.display = "inline";
                temp = {};
                for(i in resource_param) {
                    temp[i] = resource_param[i]/1000;
                }
                document.getElementById("event_parameters").value = JSON.stringify(temp);

                document.getElementById("first_event_label").style.display = "inline";
                document.getElementById("first_event").style.display = "inline";
                document.getElementById("first_event").value = chart.startFunc()/1000;

                document.getElementById("event_function_label").style.display = "inline";
                document.getElementById("event_function").style.display = "inline";
                if(resource_param.min){
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

                document.getElementById("button1").style.display = "none";
                document.getElementById("button2").style.display = "none";
                document.getElementById("button3").style.display = "none";
                document.getElementById("button4").style.display = "none";

                document.getElementById("applyButton").onclick = function(){
	                resource_param = JSON.parse(document.getElementById("event_parameters").value);

		            for(i in resource_param) {
		                resource_param[i] = resource_param[i]*1000;
		            }
		            resource_chart.startFunc(document.getElementById("first_event").value*1000);

		            if(document.getElementById("event_function").selectedIndex==0){
		                resource_data.eventFunction = "(Math.random()*(resource_param.max-resource_param.min))+resource_param.min;";
		            }
		            else{
		            	resource_data.eventFunction = "1000*(Math.floor(Math.log(1-Math.random())/Math.log(1-(1/(resource_param.avg_wait/1000)))) + 1);"
		            }

		            resource_data.refresh = JSON.parse(document.getElementById("textArea13").value);
		            resource_chart.refreshRate(resource_data.refresh);

		            if(objectName[0] == "Tank"){
		                resource_data.tanks[objectName[1]-1].maxResource = 			JSON.parse(document.getElementById("textArea1").value);
		                resource_data.tanks[objectName[1]-1].startingResource = 	JSON.parse(document.getElementById("textArea2").value);
		                resource_data.tanks[objectName[1]-1].decayRate = 			JSON.parse(document.getElementById("textArea3").value)/60000;
		                if(objectName[1]<=2){
		                    resource_data.tanks[objectName[1]-1].targetRangeMax = 	JSON.parse(document.getElementById("textArea4").value);
		                    resource_data.tanks[objectName[1]-1].targetRangeMin = 	JSON.parse(document.getElementById("textArea5").value);
		                }

		            }
		            else if(objectName[0] == "Switch"){
		                resource_data.switches[objectName[1]-1].transferRate = 		JSON.parse(document.getElementById("textArea1").value)/60000;
		                resource_data.switches[objectName[1]-1].repairTime = 		JSON.parse(document.getElementById("textArea2").value);
		                resource_data.switches[objectName[1]-1].keyboard = 			document.getElementById("textArea3").value;
		                resource_data.switches[objectName[1]-1].key = 				JSON.parse(document.getElementById("textArea4").value);
		                resource_data.switches[objectName[1]-1].prob = 				JSON.parse(document.getElementById("textArea5").value);

		            }
		            resource_data.tanks.forEach(function(d){
		                d.resource = d.startingResource;
		            });
		            resource_chart.draw(resource_data);
				};
		    });
        });

        this.layer("switches").on("enter", function() {

            var chart = this.chart();


             return this.on("click", function(d,i){
                document.getElementById("object_name").style.display = "inline";
                document.getElementById("object_name").innerHTML = "Switch "+(i+1);

                document.getElementById("label1").style.display = "inline";
                document.getElementById("textArea1").style.display = "inline";
                document.getElementById("label1").innerHTML = "Transfer Rate(units/min)";
                document.getElementById("textArea1").value = d.transferRate*60000;

                document.getElementById("label2").style.display = "inline";
                document.getElementById("textArea2").style.display = "inline";
                document.getElementById("label2").innerHTML = "Repair Time";
                document.getElementById("textArea2").value = d.repairTime;

                document.getElementById("label3").style.display = "inline";
                document.getElementById("textArea3").style.display = "inline";
                document.getElementById("label3").innerHTML = "Keyboard Key";
                document.getElementById("textArea3").value = d.keyboard;

                document.getElementById("label4").style.display = "inline";
                document.getElementById("textArea4").style.display = "inline";
                document.getElementById("label4").innerHTML = "Keyboard ASCII";
                document.getElementById("textArea4").value = d.key;

                document.getElementById("label5").style.display = "inline";
                document.getElementById("textArea5").style.display = "inline";
                document.getElementById("label5").innerHTML = "Probability";
                document.getElementById("textArea5").value = d.prob;

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

                document.getElementById("object_name").style.display = "inline";
                document.getElementById("task_name").innerHTML = "Resource";

                document.getElementById("event_parameters_label").style.display = "inline";
                document.getElementById("event_parameters").style.display = "inline";
                temp = {};
                for(i in resource_param) {
                    temp[i] = resource_param[i]/1000;
                }
                document.getElementById("event_parameters").value = JSON.stringify(temp);

                document.getElementById("first_event_label").style.display = "inline";
                document.getElementById("first_event").style.display = "inline";
                document.getElementById("first_event").value = chart.startFunc()/1000;

                document.getElementById("event_function_label").style.display = "inline";
                document.getElementById("event_function").style.display = "inline";
                if(resource_param.min){
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

                document.getElementById("button1").style.display = "none";
                document.getElementById("button2").style.display = "none";
                document.getElementById("button3").style.display = "none";
                document.getElementById("button4").style.display = "none";

                document.getElementById("applyButton").onclick = function(){
                	if(document.getElementById("task_name").innerHTML == "Resource"){
		                resource_param = JSON.parse(document.getElementById("event_parameters").value);

			            for(i in resource_param) {
			                resource_param[i] = resource_param[i]*1000;
			            }
			            resource_chart.startFunc(document.getElementById("first_event").value*1000);

			            if(document.getElementById("event_function").selectedIndex==0){
			                resource_data.eventFunction = "(Math.random()*(resource_param.max-resource_param.min))+resource_param.min;";
			            }
			            else{
			            	resource_data.eventFunction = "1000*(Math.floor(Math.log(1-Math.random())/Math.log(1-(1/(resource_param.avg_wait/1000)))) + 1);"
			            }

			            resource_data.refresh = JSON.parse(document.getElementById("textArea13").value);
			            resource_chart.refreshRate(resource_data.refresh);

			            if(objectName[0] == "Tank"){
			                resource_data.tanks[objectName[1]-1].maxResource = 			JSON.parse(document.getElementById("textArea1").value);
			                resource_data.tanks[objectName[1]-1].startingResource = 	JSON.parse(document.getElementById("textArea2").value);
			                resource_data.tanks[objectName[1]-1].decayRate = 			JSON.parse(document.getElementById("textArea3").value)/60000;
			                if(objectName[1]<=2){
			                    resource_data.tanks[objectName[1]-1].targetRangeMax = 	JSON.parse(document.getElementById("textArea4").value);
			                    resource_data.tanks[objectName[1]-1].targetRangeMin = 	JSON.parse(document.getElementById("textArea5").value);
			                }

			            }
			            else if(objectName[0] == "Switch"){
			                resource_data.switches[objectName[1]-1].transferRate = 		JSON.parse(document.getElementById("textArea1").value)/60000;
			                resource_data.switches[objectName[1]-1].repairTime = 		JSON.parse(document.getElementById("textArea2").value);
			                resource_data.switches[objectName[1]-1].keyboard = 			document.getElementById("textArea3").value;
			                resource_data.switches[objectName[1]-1].key = 				JSON.parse(document.getElementById("textArea4").value);
			                resource_data.switches[objectName[1]-1].prob = 				JSON.parse(document.getElementById("textArea5").value);

			            }
			            resource_data.tanks.forEach(function(d){
			                d.resource = d.startingResource;
			            });
			            resource_chart.draw(resource_data);
			        }
				};
            });
        });

        }
    });

	setup.Resource.Default = {tanks: [{label: "A", x:3 , y: 8.75, width:4 , height: 3.75, decayRate: .0125, startingResource: 2400, maxResource: 4000, targetRangeMax:2800 ,targetRangeMin:2100, index:0},
								{label: "B", x:11 , y: 8.75, width:4 , height: 3.75, decayRate: .0125, startingResource: 2400, maxResource: 4000, targetRangeMax:2800 ,targetRangeMin:2100, index:1},
								{label: "C", x:2 , y: 3, width:2 , height: 2, decayRate: 0, startingResource: 1000, maxResource: 2000, index:2},
								{label: "D", x:10 , y: 3, width:2 , height: 2, decayRate: 0, startingResource: 1000, maxResource: 2000, index:3}],
				generators: [generator1 = {label: "S1", resource: Number.POSITIVE_INFINITY, cx: 7, cy: 2, r: 1, index:100},
								generator2 = {label: "S2", resource: Number.POSITIVE_INFINITY, cx: 15, cy: 2, r: 1, index:101}],
				switches:[{source: 2, target: 0, transferRate:.008, x1: 3.5, y1: 5, x2: 3.5, y2: 3, textX: 2.5, textY: 3.9, rotation: -90, on:0, key:49, keyboard: "1", repairTime: 4000, prob:1},
							{source: 100, target: 0, transferRate:.008, x1: 6.5, y1: 5, x2: 6.5, y2: 2.85, textX: 5.5, textY: 3.9, rotation: -90, on:0, key: 50, keyboard: "2", repairTime: 4000, prob:1},
							{source: 3, target: 1, transferRate:.008, x1: 11.5, y1: 5, x2: 11.5, y2: 3, textX: 10.5, textY: 3.9, rotation: -90, on:0, key: 51, keyboard: "3", repairTime: 4000, prob:1},
							{source: 101, target: 1, transferRate:.008, x1: 14.5, y1: 5, x2: 14.5, y2: 2.85, textX: 13.5, textY: 3.9, rotation: -90, on:0, key: 52, keyboard: "4", repairTime: 4000, prob:1},
							{source: 100, target: 2, transferRate:.0133, x1: 4, y1: 2, x2: 6, y2: 2, on:0, textX: 4.9, textY: 1, rotation: 180, key: 53, keyboard: "5", repairTime: 4000, prob:1},
							{source: 101, target: 3, transferRate:.0133, x1: 12, y1: 2, x2: 14, y2: 2, on:0, textX: 12.9, textY: 1, rotation: 180, key: 54, keyboard: "6", repairTime: 4000, prob:1},
							{source: 0, target: 1, transferRate:.00833, x1: 7, y1: 7.75, x2: 11, y2: 7.75, on:0, textX: 8.85, textY: 8.5, rotation: 0, key: 55, keyboard: "7", repairTime: 4000, prob:1},
							{source: 1, target: 0, transferRate:.00833, x1: 7, y1: 6.25, x2: 11, y2: 6.25, on:0, textX: 8.85, textY: 5.25, rotation: 180, key: 56, keyboard: "8", repairTime: 4000, prob:1}],
				eventFunction: "(Math.random()*(resource_param.max-resource_param.min))+resource_param.min;",
				startFunction: 5000,
				parameters: {min:8000, max:14000},
				refresh: 100
                             };
    if (setup.Resource.data=="") {
    	var resource_data = setup.Resource.Default;
    } else {
    	var resource_data = setup.Resource.data;
    }
	var resource_param = resource_data.parameters;

	var resource_svg = get_generic_svg(
	    d3.select("#"+setup.Resource.container),
	    1300, 650,
	    JSON.parse(document.getElementById(setup.Resource.container).style.width.substr(0,document.getElementById(setup.Resource.container).style.width.length-2)), 
	    JSON.parse(document.getElementById(setup.Resource.container).style.height.substr(0,document.getElementById(setup.Resource.container).style.height.length-2)),
	    {top: scale(.03), right: scale(.03), bottom: scale(.03), left: scale(.03)},
	    "resource_svg");

	resource_chart = resource_svg.chart("ResourceGUI").eventFunc(function(){t = eval(resource_data.eventFunction); return t;})
	    .refreshRate(resource_data.refresh).startFunc(resource_data.startFunction);

	resource_data.switches.forEach(function(d){
	        if(d.source < 100){
	            d.source = resource_data.tanks[d.source];
	        }
	        else{
	            d.source = resource_data.generators[d.source-100];
	        }
	        if(d.target<100){
	            d.target = resource_data.tanks[d.target];
	        }
	        else{
	            d.target = resource_data.generators[d.source-100];
	        }
	    });
    resourceSubmit = function(){
                    resource_data.switches.forEach(function(d){
                        d.source = d.source.index;
                        d.target = d.target.index;
                    });
                };

    document.getElementById("submit").setAttribute("onclick", "resourceSubmit();" + document.getElementById("submit").attributes.onclick.value)

	resource_chart.when("alert", function(args){});
	resource_chart.when("tick", function(args){});
	resource_chart.when("response", function(args){});
	resource_chart.when("timeout", function(args){});
	resource_chart.draw(resource_data);
}