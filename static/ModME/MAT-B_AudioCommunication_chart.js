// AudioCommunication task chart
// Takes in an object with a channels field
// Channel field should be an array where length of the array is the number of channels in the task
// Each element in the array should be an object of structure {name:"", frequency:#, differential:#}
d3.chart("AudioCommunication", {
    initialize: function(options = {}){
        var chart = this;

        chart.h = chart.base.h;
        chart.w = chart.base.w;

        chart.x = d3.scale.linear().domain([0,4]);
        chart.y = d3.scale.linear();

        chart.response = [];
        chart.alert = [];
        chart.timeout = [];
        chart.tick = [];

        chart.select = 0;  
		
        chart.sound = new Audio();

		//var bleep = new Audio();
		//bleep.src = "/static/ModME/AF-MATB_Audio/NAL478_COM2_1183.wav";
		//var sounds = [];
		var myAlerts = [];
		var notMyAlerts = [];
		var channelMap = [];//chart.data.channels.map(function(e){return e.name.replace(/\s/g,'');});
		
		var evenSpaceing = 10;
		
		
        var rectBase = chart.base.append("g")
            .classed("audiocommunication", true)
            .attr("height", chart.h)
            .attr("width", chart.w);

        chart.target = chart.base.append("rect")
            .classed("audiocommunication", true)
            .attr("id", "audcomm_target_rect")
            .on("touchstart", function(){var time=(new Date()).getTime(); d3.event.preventDefault(); chart.accept(time);})
			.on("mousedown", function(){var time=(new Date()).getTime(); d3.event.preventDefault(); chart.accept(time);});

		
        chart.target_name = chart.base.append("svg:text")
            .classed("audiocommunication", true)
            .classed("alert", false)
            .attr("text-anchor", "start")
            .attr("id", "audcomm_target_name")
            .on("touchstart", function(){var time=(new Date()).getTime(); d3.event.preventDefault(); chart.accept(time);})
			.on("mousedown", function(){var time=(new Date()).getTime(); d3.event.preventDefault(); chart.accept(time);});
		/*
        chart.target_frequency = chart.base.append("svg:text")  
            .classed("audiocommunication", true)
            .classed("alert", false)
            .attr("text-anchor", "end")
            .attr("id", "audcomm_target_frequency")
            .on("touchstart", function(){var time=(new Date()).getTime(); d3.event.preventDefault(); chart.accept(time);});
		*/
			
		chart.enter_box = chart.base.append("rect")
            .attr("text-anchor", "end")
		
		chart.enter_text = chart.base.append("svg:text")
			.classed("audiocommunication", true)
            .classed("alert", false)
            .attr("text-anchor", "end")
            .attr("id", "enter_text");
		
        chart.defaults = {};
        chart.defaults.generateAlert = function() {
            // Choose new Channel for alert event
            chart.totalProb = 0;                                                // Initialize totalProb to 0
            chart.data.channels.forEach(function(d){                            // Start forEach loop over channels
                chart.totalProb += d.prob;                                      // Sum probs to calculate totalProb
            });                                                                 // End forEach loop over channels
            if(chart.totalProb>0){
                /*var prob = Math.random()*chart.totalProb;                       // Calculate random probablility
                var temp = 0;                                                   // Declare and initialize temp variable
                var newChannel = 0;                                             // Declare and initialize index variable for channel as newChannel

                chart.data.channels.forEach(function(d){                        // Start forEach loop over channels
                    temp += d.prob;                                             // Add prob of current channel to temp
                    if(temp > prob){                                            // Check for break condition
                        return false;                                           // break loop
                    }                                                           // End if statement
                    newChannel++;                                               // increment newChannel
                })*/                                                             // end forEach loop

                // Choose new frequency for alert event based on current frequency and frequency differential
                /*var min = Math.max(chart.data.absoluteMin, chart.data.channels[newChannel].frequency - chart.data.channels[newChannel].differential);
                var max = Math.min(chart.data.absoluteMax, chart.data.channels[newChannel].frequency + chart.data.channels[newChannel].differential);
                var newFrequency = Math.floor(Math.random()*(max-min))+min;
                newFrequency = newFrequency%2==0 ? newFrequency+1 : newFrequency;
                var alert = {
                    domID: "audcomm_channel_" + newChannel + "_name",
                    channel: newChannel,
                    target: newFrequency,
                };*/
				
				//decide if it should my alert or an alert not for me
				//calculate probablility
				var probArr = [];
				var i;
				for(i = 0;i < chart.data.userProb; i++){probArr.push(1);}
				//probablility out of 10
				for(i;i < 10;i++){probArr.push(2);}
				
				var probIndex = Math.floor(Math.random() * 11);
				
				//if mine 
				if(probArr[probIndex] == 1 && !chart.data.distractor){
					//select a channel
					probArr = [];
					i = 0;
					
					chart.data.channels.forEach(function(d){// Start forEach loop over channels
						var j;
						for(j = 0;j < d.prob;j++){
							probArr.push(i);
						}
						i++;
					});
					
					channel = myAlerts[Math.floor(Math.random() * probArr.length)];
					
					//randomly select any track on that channel, 
					alert = channel[Math.floor(Math.random() * channel.length)];
					
					//make sure it was not the same as the last played?
					
				}else{
					//randomly select a track on any channel
			
					var alertIndex = Math.floor(Math.random() * notMyAlerts.length);
					alert = notMyAlerts[alertIndex];
				}
                return alert;
            }
            return null;
        }
        chart.alertGenerator(options.generateAlert || chart.defaults.generateAlert);
        chart.endCurrentAlert = function() {
            chart.timeout.forEach(function(d){d(chart.data.currentAlert)});
            
            chart.target_name.classed("alert",false);
            //chart.target_frequency.classed("alert",false);
            chart.data.currentAlert = null;
        };
        chart.beginAlert = function(alert) {
            alert.current = chart.data.channels[alert.channel].frequency;
            chart.data.currentAlert = alert;
            //chart.target_name.classed("alert",true);//Changes callsign name to red
            chart.alert.forEach(function(d){d(alert);});
            setTimeout(chart.endCurrentAlert, chart.rt);
            chart.sound.src = alert.soundSrc;
            chart.sound.play();
        }
        chart.alertEvent = function() {
			chart.enter_box.classed("entered",false);
            var alert = chart.generateAlert();
            if (alert) {
                chart.beginAlert(alert);
            }
			
            var timeInMillisecondsToNextAlert = 0;
			if(chart.data.randomSpaceing){
				timeInMillisecondsToNextAlert = chart.eventFunction();
			}else{
				timeInMillisecondsToNextAlert = evenSpaceing;
			}
				
			
            if (null === timeInMillisecondsToNextAlert)
                return; // no more events
            setTimeout(chart.alertEvent, timeInMillisecondsToNextAlert);
        };

        // Calculate if object crosses diamond path

        // startFunction is currently a misnomer.  It is used here as a number, not a function.
        setTimeout(function(){setTimeout(chart.alertEvent, chart.startFunction)}, 1);

        this.layer("audiocommunication", rectBase, {
            dataBind: function(data){
                var chart = this.chart();
                chart.data = data;
                chart.y.domain([0,data.channels.length*1.25+3.75]);
				
				//sounds = [];
				//clear and rebuild array structures
				notMyAlerts = [];
				myAlerts = [];
				channelMap = chart.data.channels.map(function(e){return e.name.replace(/\s/g,'');});
				chart.data.channels.forEach(function(d){var empty = []; myAlerts.push(empty);});//one sub-array for each channel
				
                chart.data.files.forEach(function(d){
                    //parse file name string for frequency and channel
                    //assumes file name is of format CALLSIGN_CHANNEL_FREQUENCY.TYPE
                    
                    //remove directorys to just get the file name
                    var dirNames = d.split("/");
                    var fileName = dirNames[dirNames.length-1];
                    
                    strArr = fileName.split("_");
                    
                    var newChannel = channelMap.indexOf(strArr[1]);
                    var newFrequency = strArr[2].split(".")[0];//remove type from end
                    
                    
                    
                    var alert = {
                        //domID: "audcomm_channel_" + newChannel + "_name",
                        domID: "audcomm_channel_" + newChannel,
                        channel: newChannel,
                        target: newFrequency,
                        soundSrc: d,
                        callsign: strArr[0],
                        
                    };
                    
                    if(strArr[0] == chart.data.userCallsign){//if my channel
                        //add to the correct channel so we can control probablility of each channel being selected
                        //var chartIndex = channelMap.indexOf(newChannel);//index of channel name ignoring whiteSpace
                        if(newChannel != -1){
                            myAlerts[newChannel].push(alert);
                        }
                    }else{
                        notMyAlerts.push(alert);
                    }
                    
                });
				
				
				evenSpaceing = ((chart.data.duration - (chart.data.numberOfEvents * chart.data.response) - chart.data.startFunction)/(chart.data.numberOfEvents-1)) + chart.data.response;
				

                return this.selectAll("g").data(data.channels);
            },

            insert: function(data){
                var chart = this.chart();

                chart.x.range([0, +chart.w]);
                chart.y.range([+chart.h, 0]);

                chart.target.attr("width", chart.x(2))
					.attr("height", chart.y(0)-chart.y(1))
					.attr("x", chart.x(1))
					.attr("y", chart.y(chart.data.channels.length*1.25+3.425));
					
				chart.enter_box.attr("width", chart.x(2))
					.attr("height", chart.y(0)-chart.y(1))
					.attr("x", chart.x(1))
					.attr("y", chart.y(1.125))
					.on("mousedown", function(d,i){var time = (new Date()).getTime(); d3.event.preventDefault(); chart.accept(time);});
					
				chart.enter_text.text("ENTER").attr("x", chart.x(2.35)).attr("y", chart.y(0.425)).on("mousedown", function(d,i){var time = (new Date()).getTime(); d3.event.preventDefault(); chart.accept(time);});

                var grps = this.append("g")
                                .classed("audiocommunication", true);

                chart.last = -1;

                grps.append("rect")
                    .classed("highlighted", function(d,i){return chart.select==i})
                    .attr("width", chart.x(2))
                    .attr("height", chart.y(0)-chart.y(1))
                    .attr("id", function(d,i){return "audcomm_channel_"+i+"_rect";})
					.attr("y", chart.y(chart.y.domain()[1] + .7))
                    .on("touchstart", function(d,i){var time = (new Date()).getTime(); d3.event.preventDefault(); chart.indexSet(i, time);})
                    .on("touchmove", function(){var time = (new Date()).getTime(); d3.event.preventDefault();
                        if (chart.last != -1) {
                            if (chart.last < d3.event.touches[0].clientX) {
                                chart.frequencyUp(time);
                            } else {
                                chart.frequencyDown(time);
                            }
                        }
                        chart.last = d3.event.touches[0].clientX;
                    })
					.on("mousedown", function(d,i){var time = (new Date()).getTime(); d3.event.preventDefault(); chart.indexSet(i, time);});

				
				let str1 = '' + chart.x(2.3) + ' ' + chart.y(chart.y.domain()[1]-0.3) + ',' + chart.x(2.1) + ' ' + chart.y(chart.y.domain()[1]+.1) + ',' + chart.x(2.5) + ' ' + chart.y(chart.y.domain()[1]+.1);
					
				if(chart.data.mouseVersion){
					grps.append("polyline")
					.attr("id", "arrowDown")
					.attr("points", str1)
					.attr('visibility', function(d,i){if(chart.select!=i){return 'hidden'}else{return 'visible'}})
					.style('fill', 'midnightblue')
					.style('stroke-width', '0')
					.on("mousedown", function(){var time = (new Date()).getTime(); d3.event.preventDefault();chart.frequencyDown(time);});
						
					let str2 = '' + chart.x(2.3) + ' ' + chart.y(chart.y.domain()[1] + 0.7) + ',' + chart.x(2.1) + ' ' + chart.y(chart.y.domain()[1]+.3) + ',' + chart.x(2.5) + ' ' + chart.y(chart.y.domain()[1]+.3);
					
					grps.append("polyline")
					.attr("id", "arrowUp")
					.attr("points", str2)
					.attr('visibility', function(d,i){if(chart.select!=i){return 'hidden'}else{return 'visible'}})
					.style('fill', 'midnightblue')
					.style('stroke-width', '0')
					.on("mousedown", function(){var time = (new Date()).getTime(); d3.event.preventDefault();chart.frequencyUp(time);});
				}

                grps.append("svg:text")
                    .classed("audiocommunication", true)
                    .attr("text-anchor", "end")
                    .attr("x", chart.x(1.8))
                    .attr("y", chart.y(chart.y.domain()[1]))
                    .attr("id", function(d,i){return "audcomm_channel_"+i+"_frequency";})
                    .text(function(d){d.frequency = Math.floor(Math.random()*(d.absoluteMax - d.absoluteMin) + d.absoluteMin);d.frequency = d.frequency%2==0 ? d.frequency+1 : d.frequency; return d.frequency/10})
                    .on("touchstart", function(d,i){var time = (new Date()).getTime(); d3.event.preventDefault(); chart.indexSet(i, time);})
                    .on("touchmove", function(){var time = (new Date()).getTime(); d3.event.preventDefault();
                        if (chart.last != -1) {
                            if (chart.last < d3.event.touches[0].clientX) {
                                chart.frequencyUp(time);
                            } else {
                                chart.frequencyDown(time);
                            }
                        }
                        chart.last = d3.event.touches[0].clientX;
                    })
					.on("mousedown", function(d,i){var time = (new Date()).getTime(); d3.event.preventDefault(); chart.indexSet(i, time);});

                grps.append("svg:text")
                    .classed("audiocommunication", true)
                    .attr("text-anchor", "start")
                    .attr("x", chart.x(.2))
                    .attr("y", chart.y(chart.y.domain()[1]))
                    .attr("id", function(d,i){return "audcomm_channel_"+i+"_name";})
                    .text(function(d){return d.name})
                    .on("touchstart", function(d,i){var time = (new Date()).getTime(); d3.event.preventDefault(); chart.indexSet(i, time);})
                    .on("touchmove", function(){var time = (new Date()).getTime(); d3.event.preventDefault();
                        if (chart.last != -1) {
                            if (chart.last < d3.event.touches[0].clientX) {
                                chart.frequencyUp(time);
                            } else {
                                chart.frequencyDown(time);
                            }
                        }
                        chart.last = d3.event.touches[0].clientX;
                    })
					.on("mousedown", function(d,i){var time = (new Date()).getTime(); d3.event.preventDefault(); chart.indexSet(i, time);});
					
                return grps;
            },

            events: {
                "enter": function(){
                    var chart = this.chart();

					/*
                    var channel = Math.floor(Math.random()*chart.data.channels.length);
                    var min = chart.data.absoluteMin > (chart.data.channels[channel].frequency - chart.data.channels[channel].differential) ? chart.data.absoluteMin : (chart.data.channels[channel].frequency - chart.data.channels[channel].differential);
                    var max = chart.data.absoluteMax < (chart.data.channels[channel].frequency + chart.data.channels[channel].differential) ? chart.data.absoluteMax : (chart.data.channels[channel].frequency + chart.data.channels[channel].differential);
                    var frequency = Math.floor(Math.random()*(max-min))+min;
                    frequency = frequency%2==0 ? frequency+1 : frequency;
					*/
	
                    chart.target_name.text("Callsign: " + chart.data.userCallsign)
                        .attr("x", chart.x(1.2))
                        .attr("y", chart.y(chart.data.channels.length*1.25+3.5)+chart.y(0)-chart.y(.75));

                    this.select("rect")
                        .classed("highlighted", function(d,i){return chart.select==i})
                        .attr("width", chart.x(2))
                        .attr("height", chart.y(0)-chart.y(1));

                    //chart.target_frequency.text(frequency/10).attr("x", chart.x(2.8)).attr("y", chart.y(chart.data.channels.length*1.25+2.75)+chart.y(0)-chart.y(.75));

                    return this.attr("transform", function(d,i){
                            return "translate("+[chart.x(1),chart.y(chart.data.channels.length*1.25+.75-i*1.25)]+")";
                    });
                },
                "update": function(){
                    var chart = this.chart();

					chart.target_name.text("Callsign: " + chart.data.userCallsign)
                        .attr("x", chart.x(1.2))
                        .attr("y", chart.y(chart.data.channels.length*1.25+3.5)+chart.y(0)-chart.y(.75));
					
                    //chart.target_name.attr("x", chart.x(1.2)).attr("y", chart.y(chart.data.channels.length*1.25+3.5)+chart.y(0)-chart.y(.75));

                    //chart.target_frequency.attr("x", chart.x(2.8)).attr("y", chart.y(chart.data.channels.length*1.25+3.5)+chart.y(0)-chart.y(.75));

                    this.select("rect")
                        .classed("highlighted", function(d,i){return chart.select==i})
                        .attr("width", chart.x(2))
                        .attr("height", chart.y(0)-chart.y(1))
                        .attr("y", chart.y(chart.y.domain()[1] + .7));
					
					this.select("#arrowUp").attr('visibility', function(d,i){if(chart.select!=i || !chart.data.mouseVersion){return 'hidden';}else{return 'visible';}});
					this.select("#arrowDown").attr('visibility', function(d,i){if(chart.select!=i || !chart.data.mouseVersion){return 'hidden';}else{return 'visible';}});

                    this.selectAll("text").text(function(d){return d.name});

                    this.select("text").text(function(d){return d.frequency/10;});

                    var temp=this;
					
					
                    return this.attr("transform", function(d,i){
                            return "translate("+[chart.x(1),chart.y(chart.data.channels.length*1.25+.75-i*1.25)]+")";
                    });
                },
                "exit": function(){
                    return this.remove();
                }
            }
        });
    },

    // Checks to see if the currently selected channel and frequency matches the target channel and frequency
    accept: function(time) {
        var chart = this;
        chart.response.forEach(function(d){d({domID:"accept", ascii: chart.data.controller.accept, id: "audcomm_target_rect",
            channel:chart.data.channels[chart.select].name, frequency:chart.data.channels[chart.select].frequency,
                correct:alert.channel == chart.data.channels[chart.select].name && alert.target == chart.data.channels[chart.select].frequency, time:time});});
				
        chart.target_name.classed("alert", (alert.channel == chart.data.channels[chart.select].name && alert.target ==chart.data.channels[chart.select].frequency) ?
            false : chart.target_name.classed("alert"));

		/*
        chart.target_frequency.classed("alert", (alert.channel == chart.data.channels[chart.select].name && alert.target==chart.data.channels[chart.select].frequency) ?
            false : chart.target_frequency.classed("alert"));
		*/
		//chart.target_name.classed("alert",true);
		
		chart.enter_box.classed("entered",true);

    },

    // Changes which channel is selected to the one bellow the currently selected one
    // If at the end of the list it loops back to the beginning
    indexUp: function(time){
        var chart = this;
        chart.select=(chart.select+1)%chart.data.channels.length;
        chart.response.forEach(function(d){d({domID:"Index Up", ascii: chart.data.controller.indexUp, id: "audcomm_channel_"+chart.select+"_rect",
            channel:chart.data.channels[chart.select].name, frequency:chart.data.channels[chart.select].frequency, time:time});});
        chart.draw(chart.data);
    },

    // Changes which channel is selected to the one above the currently selected one
    // If at the beginning of the list it loops back to the end
    indexDown: function(time){
        var chart = this;
        chart.select = chart.select==0 ? chart.data.channels.length-1 : chart.select-1;
        chart.response.forEach(function(d){d({domID:"Index Down", ascii: chart.data.controller.indexDown, id: "audcomm_channel_"+chart.select+"_rect",
            channel:chart.data.channels[chart.select].name, frequency:chart.data.channels[chart.select].frequency, time:time});});
        chart.draw(chart.data);
    },

    indexSet: function(ind, time) {
        var chart = this;
        chart.select = ind;
        chart.response.forEach(function(d){d({domID:"Index Set", ascii: "Touch", id: "audcomm_channel_"+chart.select+"_rect",
            channel:chart.data.channels[chart.select].name, frequency:chart.data.channels[chart.select].frequency, time:time});});
        chart.draw(chart.data);
    },

    // Increases the frequency of the correctly selected channel
    frequencyUp: function(time){
        var chart = this;
        chart.data.channels[chart.select].frequency+=2;
        chart.response.forEach(function(d){d({domID:"Frequency Up", ascii: chart.data.controller.frequencyUp, id: "audcomm_channel_"+chart.select+"_rect",
            channel:chart.data.channels[chart.select].name, frequency:chart.data.channels[chart.select].frequency, time:time});});
        chart.draw(chart.data);
    },

    // Increases the frequency of the correctly selected channel
    frequencyDown: function(time){
        var chart = this;
        chart.data.channels[chart.select].frequency-=2;
        chart.response.forEach(function(d){d({domID:"Frequency Down", ascii: chart.data.controller.frequencyDown, id: "audcomm_channel_"+chart.select+"_rect",
            channel:chart.data.channels[chart.select].name, frequency:chart.data.channels[chart.select].frequency, time:time});});
        chart.draw(chart.data);
    },

    // If no arguments are passed returns the start function
    // Other wise sets the start function to the value passed in
    // The start function is the time in milliseconds until the first event happens
    // The start function is an integer value, not a function.
    startFunc: function(d){
        if(!arguments.length)
            return this.startFunction;
        this.startFunction = d;
        return this;
    },
    
    alertGenerator: function(generateAlert) {
        if (!arguments.length)
            return this.generateAlert;
        this.generateAlert = generateAlert;
        return this;
    },

    // If no arguments are passed returns the event function
    // Other wise sets the event function to the value passed in
    // The event function is the time until the next event happens
    eventFunc: function(d){
        if(!arguments.length)
            return this.eventFunction;
        this.eventFunction = d;
        return this;
    },  

    // If no arguments are passed returns the allowed response time
    // Other wise sets the allowed response time to the value passed in
    responseTime: function(d){
        if(!arguments.length)
            return this.rt;
        this.rt = d;
        return this;
    },

    // Binds a passed in function "f" to a passed in event name "name"
    when: function(name, f){
        if(!this[name]){
            this[name] = [];
        }
        this[name].push(f);
        return this;
    },

});

