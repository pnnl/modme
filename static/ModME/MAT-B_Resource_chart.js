// Resource task chart
// Takes in an object with a tanks field, generators field, and switchs field
d3.chart("Resource", {
    initialize: function(options = {}){
        var chart = this;

        chart.h = chart.base.h;
        chart.w = chart.base.w;

        chart.x = d3.scale.linear().domain([0,18]);
        chart.y = d3.scale.linear().domain([0,9]);

        chart.refresh = 100;

        chart.response = [];
        chart.alert = [];
        chart.timeout = [];
        chart.tick = [];

        var tankBase = chart.base.append("g")
            .attr("width", chart.w)
            .attr("height", chart.h);

        var genBase = chart.base.append("g")
            .attr("width", chart.w)
            .attr("height", chart.h);

        var switchBase = chart.base.append("g")
            .attr("width", chart.w)
            .attr("height", chart.h);

        step = function(){
            var state = [];
            chart.data.switches.forEach(function(d){
                if(d.alert){
                    state.push(2);
                }
                else if(d.on){
                    state.push(1);
                }
                else{
                    state.push(0);
                }
            });
            chart.tick.forEach(function(d){d({state:state, tanks:chart.data.tanks});});
            chart.data.tanks.forEach(function(d,i){
                //d.delta=d.decayRate*chart.refresh>d.resource? -d.resource:-d.decayRate*chart.refresh;
                d.delta=-d.decayRate*chart.refresh;
            });

            chart.data.generators.forEach(function(d){
                d.delta=0;
            });

            chart.data.switches.forEach(function(d){
                var delta = Math.min(d.transferRate*d.on*chart.refresh, d.source.resource+d.source.delta, d.target.maxResource-d.target.resource+d.target.delta);
                d.source.delta -= delta;
                d.target.delta += delta;
                if(d.source.resource+d.source.delta == 0) {
                    d.on = false;
                }
                if(d.alert) {
                    d.count += chart.refresh;
                }                
                if(d.count >= d.repairTime)
                    d.alert = false;
            });

            chart.data.tanks.forEach(function(d,i){
                d.resource += d.delta;
                d.resource = Math.max(d.resource,0)
            });

            // chart.data.switches.forEach(function(d, i){
            //     // if(d.source.resource == 0)
            //     //     d.on = false;
                
            // });
            tankBase.selectAll("rect").filter(function(d,i){return !(i%2)}).attr("height", function(d){return chart.y(0)-chart.y(d.height*d.resource/d.maxResource);})
                                    .attr("y", function(d){return chart.y(d.y-d.height*(1-d.resource/d.maxResource));});
            tankBase.selectAll("text").text(function(d){return Math.round(d.resource);});
            switchBase.selectAll("path").classed("alert", function(d){return d.alert;}).classed("on", function(d){return d.on;});

            setTimeout(step, chart.refresh);
        }

        setTimeout(step, chart.refresh);

        chart.defaults = {};
        
        chart.defaults.generateAlert = function(){
            chart.totalProb = 0;                                                                                        // Initialize totalProb to 0
            chart.data.switches.forEach(function(d){                                                                    // Start forEach loop over switches
                chart.totalProb += d.prob;                                                                              // Sum probs to calculate totalProb
            });                                                                                                         // End forEach loop over switches
            var prob = Math.random()*chart.totalProb;                                                                   // Calculate random probablility
            var temp = 0;                                                                                               // Declare and initialize temp variable
            var index = 0;                                                                                                  // initialize index variable for switches
            if(chart.totalProb > 0){
                chart.data.switches.forEach(function(d){                                                                    // Start forEach loop over channels
                    temp += d.prob;                                                                                         // Add prob of current switch to temp
                    if(temp > prob){                                                                                        // Check for break condition
                        return false;                                                                                       // break loop
                    }                                                                                                       // End if statement
                    index++;                                                                                                // increment index
                });                                                                                                         // end forEach loop over switches
                var alert = { domID: "resource_switch_"+index };
                return alert;
            }
            return null;
        }
        chart.alertGenerator(options.generateAlert || chart.defaults.generateAlert);
        chart.beginAlert = function(alert) {
            chart.data.currentAlert = alert;
            var alertingSwitch = d3.select("#" + alert.domID);
            var switchIndex = alert.channel = Number(alert.domID.match(/\d+/));
            chart.data.switches[switchIndex].on=false;
            chart.data.switches[switchIndex].alert=true;
            chart.data.switches[switchIndex].count=0;
            var paths = switchBase.selectAll("path");
            paths.classed("on", function(d,i){return d.on;});
            paths.classed("alert", function(d,i){return d.alert});
            chart.alert.forEach(function(d){d(alert);});
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

        setTimeout(function(){setTimeout(chart.alertEvent, chart.startFunction);}, 1);

        this.layer("tanks", tankBase, {
            dataBind: function(data){
                var chart = this.chart();

                chart.data = data;


                return this.selectAll("g")
                    .data(data.tanks);
            },

            insert: function(data){
                var chart = this.chart();

                chart.x.range([0,+chart.w]);
                chart.y.range([+chart.h,0]);

                var grps = this.append("g");

                grps.append("rect")
                    .classed("resource", true);

                grps.append("line")
                    .classed("resourceManagement", true)
                    .attr("stroke-width", "8px");

                grps.append("line")
                    .classed("resourceManagement", true)
                    .attr("stroke-width", "8px");

                grps.append("text")
                    .classed("resourceManagement", true);

                grps.append("rect")
                    .classed("resourceManagement", true);

                return grps;
            },

            events: {
                "enter": function(){
                    var chart = this.chart();



                    this.select("rect").attr("width", function(d){d.resource = d.startingResource; return chart.x(d.width);})
                        .attr("height", function(d){return chart.y(0)-chart.y(d.height*d.resource/d.maxResource);})
                        .attr("x", function(d){return chart.x(d.x);})
                        .attr("y", function(d){return chart.y(d.y-d.height*(1-d.resource/d.maxResource));})
                        .attr("id", function(d,i){return "management_tank_"+i+"_resource";});

                    this.select("line")
                        .attr("x1", function(d){return chart.x(d.x)-4;})
                        .attr("y1", function(d){if(d.targetRangeMax==null)return 0; return chart.y(d.y-d.height*(1-d.targetRangeMax/d.maxResource));})
                        .attr("x2", function(d){return chart.x(d.x)-4;})
                        .attr("y2", function(d){if(d.targetRangeMax==null)return 0; return chart.y(d.y-d.height*(1-d.targetRangeMin/d.maxResource));})
                        .attr("id", function(d,i){return "management_tank_"+i+"_target_left";});

                    this.select("line + line")
                        .attr("x1", function(d){return chart.x(d.x+d.width)+4;})
                        .attr("y1", function(d){if(d.targetRangeMax==null)return 0; return chart.y(d.y-d.height*(1-d.targetRangeMax/d.maxResource));})
                        .attr("x2", function(d){return chart.x(d.x+d.width)+4;})
                        .attr("y2", function(d){if(d.targetRangeMax==null)return 0; return chart.y(d.y-d.height*(1-d.targetRangeMin/d.maxResource));})
                        .attr("id", function(d,i){return "management_tank_"+i+"_target_right";});

                    this.select("text").attr("x", function(d){return chart.x(d.x+d.width*.3);})
                        .attr("y", function(d){return chart.y(d.y-d.height-.5);})
                        .text(function(d){return d.resource;})
                        .attr("id", function(d,i){return "management_tank_"+i+"_amount";});

                    this.select("rect.resourceManagement")
                        .attr("width",function(d){return chart.x(d.width);})
                        .attr("height",function(d){return chart.y(0)-chart.y(d.height);})
                        .attr("x",function(d){return chart.x(d.x);})
                        .attr("y",function(d){return chart.y(d.y);})
                        .attr("id", function(d,i){return "management_tank_"+i+"_rect"});

                    return this;
                },

                "update": function(){
                    
                    var chart = this.chart();

                    this.select("rect").attr("width", function(d){d.resource = d.startingResource; return chart.x(d.width);})
                        .attr("height", function(d){return chart.y(0)-chart.y(d.height*d.resource/d.maxResource);})
                        .attr("x", function(d){return chart.x(d.x);})
                        .attr("y", function(d){return chart.y(d.y-d.height*(1-d.resource/d.maxResource));});

                    this.select("line")
                        .attr("x1", function(d){return chart.x(d.x)-4;})
                        .attr("y1", function(d){if(d.targetRangeMax==null)return 0; return chart.y(d.y-d.height*(1-d.targetRangeMax/d.maxResource));})
                        .attr("x2", function(d){return chart.x(d.x)-4;})
                        .attr("y2", function(d){if(d.targetRangeMax==null)return 0; return chart.y(d.y-d.height*(1-d.targetRangeMin/d.maxResource));});

                    this.select("line + line")
                        .attr("x1", function(d){return chart.x(d.x+d.width)+4;})
                        .attr("y1", function(d){if(d.targetRangeMax==null)return 0; return chart.y(d.y-d.height*(1-d.targetRangeMax/d.maxResource));})
                        .attr("x2", function(d){return chart.x(d.x+d.width)+4;})
                        .attr("y2", function(d){if(d.targetRangeMax==null)return 0; return chart.y(d.y-d.height*(1-d.targetRangeMin/d.maxResource));});

                    this.select("text").attr("x", function(d){return chart.x(d.x+d.width*.3);})
                        .attr("y", function(d){return chart.y(d.y-d.height-.5);})
                        .text(function(d){return d.resource;});

                    this.select("rect.resourceManagement")
                        .attr("width",function(d){return chart.x(d.width);})
                        .attr("height",function(d){return chart.y(0)-chart.y(d.height);})
                        .attr("x",function(d){return chart.x(d.x);})
                        .attr("y",function(d){return chart.y(d.y);});

                    return this;
                },

                "exit": function(){
                    return this.remove();
                }
            }
        });

        this.layer("generators", genBase,{
            dataBind: function(data){
                var chart = this.chart();

                chart.data = data;

                return this.selectAll("circle").data(data.generators);
            },

            insert: function(){
                var chart = this.chart();


                return this.append("circle").attr("class", "resourceManagement");

            },

            events: {
                "enter": function(){
                    var chart = this.chart();

                    return this.attr("r", function(d){d.resource = Number.POSITIVE_INFINITY; return chart.y(0)-chart.y(d.r);})
                        .attr("cx", function(d){return chart.x(d.cx);})
                        .attr("cy", function(d){return chart.y(d.cy);})
                        .attr("id", function(d,i){return "resource_generator_"+i;});
                },
                "exit": function(){
                    this.remove();
                }
            }
        });

        this.layer("switches", switchBase,{
            dataBind: function(data){
                var chart = this.chart();

                chart.data = data;

                return this.selectAll("g").data(data.switches);
            },

            insert: function(){
                var chart = this.chart();

                var grps = this.append("g");

                grps.append("line")
                    .classed("resourceManagement", true);

                grps.append("path")
                    .classed("switches", true)
                    .attr("d", "M 0 3 L 1 3 L 1 0 L 5 5 L 1 10 L 1 7 L 0 7 z")
                    .on("touchstart", function(d,i){var time = (new Date()).getTime(); d3.event.preventDefault(); chart.flipSwitch(i, time);});

                grps.append("text")
                    .classed("resourceManagement", true);

                return grps;
            },
            events:{
                "enter": function(){
                    var chart = this.chart();

                    this.select("line").attr("x1", function(d){return chart.x(d.x1);})
                        .attr("y1", function(d){return chart.y(d.y1);})
                        .attr("x2", function(d){return chart.x(d.x2);})
                        .attr("y2", function(d){return chart.y(d.y2);});

                    this.select("path").attr("transform", function(d){d.alert = false; return ["translate("+chart.x((d.x1+d.x2)/2-.25*Math.cos(d.rotation*Math.PI/180)+.5*Math.sin(d.rotation*Math.PI/180))
                                                                                    +","+chart.y((d.y1+d.y2)/2+.5*Math.cos(d.rotation*Math.PI/180)+.25*Math.sin(d.rotation*Math.PI/180))+")",
                                                                                "scale("+chart.x(.5)/5+","+(chart.y(0)-chart.y(1))/10+")",
                                                                                "rotate("+d.rotation+")"];})
                        .attr("id", function(d,i){return "resource_switch_"+i;});

                    this.select("text").attr("x", function(d){return chart.x(d.textX);})
                        .attr("y", function(d){return chart.y(d.textY);})
                        .text(function(d){return d.keyboard;});



                    return this;
                },

                "update": function(){

                    this.select("text").attr("x", function(d){return chart.x(d.textX);})
                        .attr("y", function(d){return chart.y(d.textY);})
                        .text(function(d){return d.keyboard;});

                    return this.select("path").classed("on", function(d){d.alert = false; return d.on});
                },

                "exit": function(){
                    return this.remove();
                }
            }
        });
    },

    // If no arguments are passed returns the refresh rate
    // Other wise sets the refresh rate to the value passed in
    // The refresh rate is how often the tanks update their values
    refreshRate: function(r){
        if(!arguments.length)
            return this.refresh;
        this.refresh = r;
        return this;
    },

    // Changes the state of the passed in switch
    // If the switch is broken nothin happens
    flipSwitch: function(switchNum, time){
        var chart = this;
        chart.response.forEach(function(d){d({domID:"resource_switch_"+switchNum, ascii: chart.data.switches[switchNum].key, time:time});});
        chart.data.switches[switchNum].on = !chart.data.switches[switchNum].alert ? !chart.data.switches[switchNum].on : chart.data.switches[switchNum].on;
        d3.select("#resource_switch_"+switchNum).classed("on", chart.data.switches[switchNum].on);
    },

    // If no arguments are passed returns the start function
    // Other wise sets the start function to the value passed in
    // The start function is the time until the first event happens
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
    // The event function is the time until the first event happens
    eventFunc: function(d){
        if(!arguments.length)
            return this.eventFunction;
        this.eventFunction = d;
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
