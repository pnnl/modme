// Communication task chart
// Takes in an object with a channels field
// Channel field should be an array where length of the array is the number of channels in the task
// Each element in the array should be an object of structure {name:"", frequency:#, differential:#}
d3.chart("Communication", {
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

        var rectBase = chart.base.append("g")
            .classed("communication", true)
            .attr("height", chart.h)
            .attr("width", chart.w);

        chart.target = chart.base.append("rect")
            .classed("communication", true)
            .attr("id", "comm_target_rect")
            .on("touchstart", function(){var time=(new Date()).getTime(); d3.event.preventDefault(); chart.accept(time);});

        chart.target_name = chart.base.append("svg:text")
            .classed("communication", true)
            .classed("alert", false)
            .attr("text-anchor", "start")
            .attr("id", "comm_target_name")
            .on("touchstart", function(){var time=(new Date()).getTime(); d3.event.preventDefault(); chart.accept(time);});

        chart.target_frequency = chart.base.append("svg:text")
            .classed("communication", true)
            .classed("alert", false)
            .attr("text-anchor", "end")
            .attr("id", "comm_target_frequency")
            .on("touchstart", function(){var time=(new Date()).getTime(); d3.event.preventDefault(); chart.accept(time);});

        chart.defaults = {};
        chart.defaults.generateAlert = function() {
            // Choose new Channel for alert event
            chart.totalProb = 0;                                                // Initialize totalProb to 0
            chart.data.channels.forEach(function(d){                            // Start forEach loop over channels
                chart.totalProb += d.prob;                                      // Sum probs to calculate totalProb
            });                                                                 // End forEach loop over channels
            if(chart.totalProb>0){
                var prob = Math.random()*chart.totalProb;                       // Calculate random probablility
                var temp = 0;                                                   // Declare and initialize temp variable
                var newChannel = 0;                                             // Declare and initialize index variable for channel as newChannel

                chart.data.channels.forEach(function(d){                        // Start forEach loop over channels
                    temp += d.prob;                                             // Add prob of current channel to temp
                    if(temp > prob){                                            // Check for break condition
                        return false;                                           // break loop
                    }                                                           // End if statement
                    newChannel++;                                               // increment newChannel
                });                                                             // end forEach loop

                // Choose new frequency for alert event based on current frequency and frequency differential
                var min = Math.max(chart.data.absoluteMin, chart.data.channels[newChannel].frequency - chart.data.channels[newChannel].differential);
                var max = Math.min(chart.data.absoluteMax, chart.data.channels[newChannel].frequency + chart.data.channels[newChannel].differential);
                var newFrequency = Math.floor(Math.random()*(max-min))+min;
                newFrequency = newFrequency%2==0 ? newFrequency+1 : newFrequency;
                var alert = {
                    domID: "comm_channel_" + newChannel + "_name",
                    channel: newChannel,
                    target: newFrequency,
                    current: chart.data.channels[newChannel].frequency
                };
                return alert;
            }
            return null;
        }
        chart.alertGenerator(options.generateAlert || chart.defaults.generateAlert);
        chart.endCurrentAlert = function() {
            if(chart.target_name.classed("alert")){
                chart.timeout.forEach(function(d){d(chart.data.currentAlert)});
            }
            chart.target_name.classed("alert",false);
            chart.target_frequency.classed("alert",false);
            chart.data.currentAlert = null;
        };
        chart.beginAlert = function(alert) {
            chart.data.currentAlert = alert;
            chart.data.target.name = chart.data.channels[alert.channel].name;
            chart.data.target.frequency = alert.target;
            chart.target_name.text(chart.data.target.name);
            chart.target_frequency.text(chart.data.target.frequency/10);
            chart.target_name.classed("alert",true);
            chart.target_frequency.classed("alert",true);
            chart.alert.forEach(function(d){d(alert);});
            setTimeout(chart.endCurrentAlert, chart.rt);
        }
        chart.alertEvent = function() {
            var alert = chart.generateAlert();
            if (alert) {
                chart.beginAlert(alert);
            }
            var timeInMillisecondsToNextAlert = chart.eventFunction();
            if (null === timeInMillisecondsToNextAlert)
                return; // no more events
            setTimeout(chart.alertEvent, chart.eventFunction());
        };

        // startFunction is currently a misnomer.  It is used here as a number, not a function.
        setTimeout(function(){setTimeout(chart.alertEvent, chart.startFunction)}, 1);

        this.layer("communication", rectBase, {
            dataBind: function(data){
                var chart = this.chart();
                chart.data = data;
                chart.y.domain([0,data.channels.length*1.25+3.75]);



                return this.selectAll("g").data(data.channels);
            },

            insert: function(data){
                var chart = this.chart();

                chart.x.range([0, +chart.w]);
                chart.y.range([+chart.h, 0]);

                chart.target.attr("width", chart.x(2))
                .attr("height", chart.y(0)-chart.y(1))
                .attr("x", chart.x(1))
                .attr("y", chart.y(chart.data.channels.length*1.25+2.75));

                var grps = this.append("g")
                                .classed("communication", true);

                chart.last = -1;

                grps.append("rect")
                    .classed("highlighted", function(d,i){return chart.select==i})
                    .attr("width", chart.x(2))
                    .attr("height", chart.y(0)-chart.y(1))
                    .attr("id", function(d,i){return "comm_channel_"+i+"_rect";})
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
                    });

                grps.append("svg:text")
                    .classed("communication", true)
                    .attr("text-anchor", "end")
                    .attr("x", chart.x(1.8))
                    .attr("y", chart.y(chart.y.domain()[1]-.75))
                    .attr("id", function(d,i){return "comm_channel_"+i+"_frequency";})
                    .text(function(d){d.frequency = Math.floor(Math.random()*(chart.data.absoluteMax - chart.data.absoluteMin) + chart.data.absoluteMin); d.frequency = d.frequency%2==0 ? d.frequency+1 : d.frequency; return d.frequency/10})
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
                    });

                grps.append("svg:text")
                    .classed("communication", true)
                    .attr("text-anchor", "start")
                    .attr("x", chart.x(.2))
                    .attr("y", chart.y(0)-chart.y(.75))
                    .attr("id", function(d,i){return "comm_channel_"+i+"_name";})
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
                    });



                return grps;
            },

            events: {
                "enter": function(){
                    var chart = this.chart();

                    var channel = Math.floor(Math.random()*chart.data.channels.length);
                    var min = chart.data.absoluteMin > (chart.data.channels[channel].frequency - chart.data.channels[channel].differential) ? chart.data.absoluteMin : (chart.data.channels[channel].frequency - chart.data.channels[channel].differential);
                    var max = chart.data.absoluteMax < (chart.data.channels[channel].frequency + chart.data.channels[channel].differential) ? chart.data.absoluteMax : (chart.data.channels[channel].frequency + chart.data.channels[channel].differential);
                    var frequency = Math.floor(Math.random()*(max-min))+min;
                    frequency = frequency%2==0 ? frequency+1 : frequency;

                    chart.target_name.text(chart.data.channels[channel].name)
                        .attr("x", chart.x(1.2))
                        .attr("y", chart.y(chart.data.channels.length*1.25+2.75)+chart.y(0)-chart.y(.75));

                    chart.target_frequency.text(frequency/10)
                        .attr("x", chart.x(2.8))
                        .attr("y", chart.y(chart.data.channels.length*1.25+2.75)+chart.y(0)-chart.y(.75));

                    return this.attr("transform", function(d,i){
                            return "translate("+[chart.x(1),chart.y(chart.data.channels.length*1.25+.75-i*1.25)]+")";
                    });
                },
                "update": function(){
                    var chart = this.chart();

                    chart.target_name
                        .attr("x", chart.x(1.2))
                        .attr("y", chart.y(chart.data.channels.length*1.25+2.75)+chart.y(0)-chart.y(.75));

                    chart.target_frequency
                        .attr("x", chart.x(2.8))
                        .attr("y", chart.y(chart.data.channels.length*1.25+2.75)+chart.y(0)-chart.y(.75));

                    this.select("rect")
                            .classed("highlighted", function(d,i){return chart.select==i})
                            .attr("width", chart.x(2))
                            .attr("height", chart.y(0)-chart.y(1));

                    this.selectAll("text")
                            .text(function(d){return d.name})
                            .attr("y", chart.y(0)-chart.y(.75));

                    this.select("text")
                            .text(function(d){return d.frequency/10;});

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
        chart.response.forEach(function(d){d({domID:"accept", ascii: chart.data.controller.accept, id: "comm_target_rect",
            channel:chart.data.channels[chart.select].name, frequency:chart.data.channels[chart.select].frequency,
                correct:chart.data.target.name == chart.data.channels[chart.select].name && chart.data.target.frequency==chart.data.channels[chart.select].frequency, time:time});});
        chart.target_name.classed("alert", (chart.data.target.name == chart.data.channels[chart.select].name && chart.data.target.frequency==chart.data.channels[chart.select].frequency) ?
            false : chart.target_name.classed("alert"));

        chart.target_frequency.classed("alert", (chart.data.target.name == chart.data.channels[chart.select].name && chart.data.target.frequency==chart.data.channels[chart.select].frequency) ?
            false : chart.target_frequency.classed("alert"));

    },

    // Changes which channel is selected to the one bellow the currently selected one
    // If at the end of the list it loops back to the beginning
    indexUp: function(time){
        var chart = this;
        chart.select=(chart.select+1)%chart.data.channels.length;
        chart.response.forEach(function(d){d({domID:"Index Up", ascii: chart.data.controller.indexUp, id: "comm_channel_"+chart.select+"_rect",
            channel:chart.data.channels[chart.select].name, frequency:chart.data.channels[chart.select].frequency, time:time});});
        chart.draw(chart.data);
    },

    // Changes which channel is selected to the one above the currently selected one
    // If at the beginning of the list it loops back to the end
    indexDown: function(time){
        var chart = this;
        chart.select = chart.select==0 ? chart.data.channels.length-1 : chart.select-1;
        chart.response.forEach(function(d){d({domID:"Index Down", ascii: chart.data.controller.indexDown, id: "comm_channel_"+chart.select+"_rect",
            channel:chart.data.channels[chart.select].name, frequency:chart.data.channels[chart.select].frequency, time:time});});
        chart.draw(chart.data);
    },

    indexSet: function(ind, time) {
        var chart = this;
        chart.select = ind;
        chart.response.forEach(function(d){d({domID:"Index Set", ascii: "Touch", id: "comm_channel_"+chart.select+"_rect",
            channel:chart.data.channels[chart.select].name, frequency:chart.data.channels[chart.select].frequency, time:time});});
        chart.draw(chart.data);
    },

    // Increases the frequency of the correctly selected channel
    frequencyUp: function(time){
        var chart = this;
        chart.data.channels[chart.select].frequency+=2;
        chart.response.forEach(function(d){d({domID:"Frequency Up", ascii: chart.data.controller.frequencyUp, id: "comm_channel_"+chart.select+"_rect",
            channel:chart.data.channels[chart.select].name, frequency:chart.data.channels[chart.select].frequency, time:time});});
        chart.draw(chart.data);
    },

    // Increases the frequency of the correctly selected channel
    frequencyDown: function(time){
        var chart = this;
        chart.data.channels[chart.select].frequency-=2;
        chart.response.forEach(function(d){d({domID:"Frequency Down", ascii: chart.data.controller.frequencyDown, id: "comm_channel_"+chart.select+"_rect",
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

