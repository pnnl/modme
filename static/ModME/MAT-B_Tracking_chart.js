// Tracking task chart
// Takes in an object with an orbits field
// Orbits field should be an array where length of the array is the number of orbits in the task
// Each element in the array should be an object of structure {points:[], interval:#, radius:#}
d3.chart("Tracking", {
    initialize: function(options = {}){
        var chart = this;

        chart.h = chart.base.h;
        chart.w = chart.base.w;

        chart.response = [];
        chart.alert = []; // TODO investigate if this does anything
        chart.timeout = []; // TODO investigate if we can delete this or if it is used anywhere
        chart.tick = [];
        chart.mouseMove = [];

        chart.mouseEvent = {x:0, y:0};

        chart.x = d3.scale.linear().domain([0,1]);
        chart.y = d3.scale.linear().domain([0,1]);

        chart.translateAlong = function(path){
            var l = path.getTotalLength();
                return function(d,i,a){
                    return function(t){
                        var p = path.getPointAtLength(t*l);
                        return "translate("+p.x+","+p.y+")";
                    };
                };
        };

        chart.translate = function(d){
            d3.select(this).transition()
                .duration(d.interval)
                .ease("linear")
                .attrTween("transform", chart.translateAlong(d3.select(this).select("path").node()))
                .each("end", chart.translate);
        };

        var pathBase = chart.base.append("g")
            .attr("width", chart.w)
            .attr("height", chart.h);

        var configPathBase = chart.base.append("g")
            .attr("width", chart.w)
            .attr("height", chart.h);

        var trackingArea = chart.base.append("rect")
            .attr("width", chart.w)
            .attr("height", chart.h)
            .attr("id", "tracking_area")
            .style("fill-opacity", 0)
            .style("cursor", "move")
            .on("mousemove", function(datum, index){
                chart.mouseLocation(d3.event);
            })
            .on("click", function(){
                var temp = d3.select(this);
                var time = (new Date()).getTime();
                chart.missClick(temp.attr("id"), time)
            });

        var circleBase = chart.base.append("g")
            .attr("width", chart.w)
            .attr("height", chart.h);

        chart.circleBase = circleBase;

        chart.refresh=100;
        chart.distract=false;

        chart.defaults = {};
        chart.defaults.generateAlert = function() {
            chart.totalProb = 0;                                                                                            // Initialize totalProb to 0
            chart.data.forEach(function(d){                                                                                 // Start forEach loop over data
                chart.totalProb += d.prob;                                                                                  // Sum probs to calculate totalProb
            });                                                                                                             // End forEach loop over data
            if(chart.totalProb>0){
                var prob = Math.random()*chart.totalProb;                                                                   // Calculate random probablility
                var temp = 0;                                                                                               // Declare and initialize temp variable
                var activeOrbitIndex = 0;
                chart.data.forEach(function(d){                                                                             // Start forEach loop over channels
                    temp += d.prob;                                                                                         // Add prob of current data to temp
                    if(temp > prob){                                                                                        // Check for break condition
                        return false;                                                                                       // break loop
                    }                                                                                                       // End if statement
                    activeOrbitIndex++;
                });                                                                                                         // end forEach loop over data
                var alert = {
                    domID: "track_circle_" + activeOrbitIndex
                };
                return alert;
            }
            return null;
        };
        chart.alertGenerator(options.generateAlert || chart.defaults.generateAlert);
        chart.endCurrentAlert = function() {
            if (!chart.data.currentAlert)
                return;
            if(d3.select("#" + chart.data.currentAlert.domID).classed("alert")){
                chart.timeout.forEach(function(d){d(chart.data.currentAlert);});
            }
            d3.select("#" + chart.data.currentAlert.domID).classed("active", false).classed("alert",false);
            chart.data.currentAlert = null;
        };
        chart.beginAlert = function(alert) {
            chart.endCurrentAlert();
            chart.alert.forEach(function(d){d(alert);});
            d3.select("#" + alert.domID).classed("alert",true).classed("active",true);
            chart.data.currentAlert = alert;
        }
        chart.alertEvent = function() {
            var alert = chart.generateAlert();
            if (alert) {
                chart.beginAlert(alert);
            }
            var timeInMillisecondsToNextAlert = chart.eventFunction();
            if (null === timeInMillisecondsToNextAlert)
                return; // no more events
            setTimeout(chart.alertEvent, timeInMillisecondsToNextAlert);
        };

        // startFunction is currently a misnomer.  It is used here as a number, not a function.
        setTimeout(function(){setTimeout(chart.alertEvent, chart.startFunction);}, 1);

        setInterval(function(){
            state = [];

            circleBase.selectAll("circle").each(function(d){
                if(d3.select(this).classed("alert")){
                    state.push(2);
                }
                else if(d3.select(this).classed("active")){
                    state.push(1);
                }
                else{
                    state.push(0);
                }
            });
            chart.tick.forEach(function(d){d({event: chart.mouseEvent, state: state});});
        },chart.refresh);

        this.layer("path", pathBase, {
            dataBind: function(data){
                var chart = this.chart();

                chart.data = data.orbits;

                return this.selectAll("path").data(data.orbits);
            },

            insert: function(data){
                var chart = this.chart();
                chart.x.range([0,chart.w]);
                chart.y.range([chart.h,0]);

                return this.append("path")
                        .style("stroke","white")
                        .style("stroke-width", "3px");
            },

            events: {
                "enter": function(){
                    var chart = this.chart();

                    var lineFunction = d3.svg.line()
                    .x(function(d){return chart.x(d.x)})
                    .y(function(d){return chart.y(d.y)})
                    .interpolate("basis-closed");

//  Object { base=[1],  _layers={...},  _attached={...},  more...} 0.357 0.152 [Object { x=0.357,  y=0.152}, Object { x=0.342,  y=0.179}, Object { x=0.643,  y=0.848}, Object { x=0.658,  y=0.821}] MNaN,NaNCNaN,NaN,NaN,NaN,NaN,NaNCNaN,NaN,NaN,NaN,NaN,NaNCNaN,NaN,NaN,NaN,NaN,NaNCNaN,NaN,NaN,NaN,NaN,NaN
                    return this.attr("d", function(d){var line = lineFunction(d.points); return line;}).attr("id", function(d,i){return "track_path_"+i});
                },
                "update": function(){
                    var chart = this.chart();

                    var lineFunction = d3.svg.line()
                    .x(function(d){return chart.x(d.x)})
                    .y(function(d){return chart.y(d.y)})
                    .interpolate("basis-closed")

                    return this.attr("d", function(d){return lineFunction(d.points);}).attr("id", function(d,i){return "track_path_"+i});
                },
                "exit": function(){
                    return this.remove();
                }

            }
        });

        this.layer("configPath", configPathBase, {
            dataBind: function(data){
                var chart = this.chart();

                chart.data = data.orbits;

                return this.selectAll("path").data(data.orbits);
            },

            insert: function(data){
                var chart = this.chart();

                chart.x.range([0,chart.w]);
                chart.y.range([chart.h,0]);

                return this.append("path")
                        .style("stroke","white")
                        .style("opacity", 0)
                        .style("stroke-width", "20px");
            },

            events: {
                "enter": function(){
                    var chart = this.chart();

                    var lineFunction = d3.svg.line()
                    .x(function(d){return chart.x(d.x)})
                    .y(function(d){return chart.y(d.y)})
                    .interpolate("basis-closed");

                    return this.attr("d", function(d){return lineFunction(d.points);}).attr("id", function(d,i){return "track_path_"+i});
                },
                "update": function(){
                    var chart = this.chart();

                    var lineFunction = d3.svg.line()
                    .x(function(d){return chart.x(d.x)})
                    .y(function(d){return chart.y(d.y)})
                    .interpolate("basis-closed")

                    return this.attr("d", function(d){return lineFunction(d.points);}).attr("id", function(d,i){return "track_path_"+i});
                },
                "exit": function(){
                    return this.remove();
                }

            }
        });

        this.layer("circles", circleBase, {
            dataBind: function(data){
                var chart = this.chart();

                chart.data = data.orbits;

                return this.selectAll("circle").data(data.orbits);
            },

            insert: function(data){
                var chart = this.chart();

                chart.x.range([0,chart.w]);
                chart.y.range([chart.h,0]);



                var circles = this.append("circle")
                    .classed("tracking", true)
                    .style("cursor", "move")
                    .on("click", function(d){
                        var time = (new Date()).getTime();
                        var temp = d3.select(this);
                        temp.classed("alert") ? chart.activate(temp.attr("id"),time):chart.missClick(temp.attr("id"),time)
                    })
                    .on("touchstart", function(d){
                        var time = (new Date()).getTime();
                        var temp = d3.select(this);
                        temp.classed("alert") ? chart.activate(temp.attr("id"),time):chart.missClick(temp.attr("id"),time)
                    })
                    .on("mousemove", function(datum, index){
                        chart.mouseLocation(d3.event)
                    })
                    .on("touchmove", function(datum, index){
                        chart.mouseLocation(d3.event)
                    });

                circles.append("path")
                    .style("stroke","none");

                return circles;

            },

            events: {
                "enter":function(){
                    var chart = this.chart();

                    var lineFunction = d3.svg.line()
                    .x(function(d){return chart.x(d.x)})
                    .y(function(d){return chart.y(d.y)})
                    .interpolate("basis-closed");

                    this.select("path").attr("d", function(d){d.points = d.points.concat(d.points.splice(0,Math.floor(Math.random()*d.points.length)));
                        return lineFunction(d.points);});

                    this.each(chart.translate);

                    return this.attr("r", function(d){return d.radius;})
                        .attr("transform", function(d){return "translate("+chart.x(d.points[0].x)+","+chart.y(d.points[0].y)+")";})
                        .attr("id", function(d,i){return "track_circle_"+i;});
                },

                "update": function(){
                    var chart = this.chart();

                    var lineFunction = d3.svg.line()
                    .x(function(d){return chart.x(d.x)})
                    .y(function(d){return chart.y(d.y)})
                    .interpolate("basis-closed")

                    return this.attr("r", function(d){return d.radius;})
                        .attr("transform", function(d){return "translate("+chart.x(d.points[0].x)+","+chart.y(d.points[0].y)+")";})
                        .attr("id", function(d,i){return "track_circle_"+i;}).select("path").attr("d", function(d){return lineFunction(d.points);});
                },

                "exit": function(){
                    return this.remove();
                }
            }
        });
    },

    // Records a miss click in the data
    missClick: function(obj, time){
        var chart = this;
        this.response.forEach(function(d){d({correct: "false", domID: obj, time: time});});
    },

    // Changes an alerted circle from alerted state to active state
    activate: function(circle, time){
        var chart = this;
        this.response.forEach(function(d){d({correct: "true", domID: circle, time: time});});
        d3.select("#"+circle).classed("alert", chart.distract ? d3.select("#"+circle).classed("alert") : false); // TODO the hash on this selector looks very wrong.  Investigate.
    },

    // If no arguments are passed returns the mouse location
    // Other wise sets the mouse location to the value passed in
    // The mouse location is the location of the mouse in the data
    // NOTE: does not actualy move the mouse
    // When changing the mouse location in the data also logs the new location to the database
    mouseLocation: function(pos){
        if(!pos)
            return this.mouseEvent;
        var active = this.circleBase.selectAll("circle").filter(function(d,i){
            return d3.select(this).classed("active")
        });
        this.mouseEvent = {x:pos.x,y:pos.y};
        if(!active[0].length){
            this.mouseMove.forEach(function(d){d({x:pos.x, y:pos.y, targetX:0, targetY:0, domID:"NULL"})});
        }
        else{
            var temp = d3.select(active[0][0]);
            this.mouseMove.forEach(function(d){d({x:pos.x, y:pos.y, targetX:(document.getElementById(temp.attr("id")).getBoundingClientRect().left+(document.getElementById(temp.attr("id")).getBoundingClientRect().width/2)),
                             targetY:(document.getElementById(temp.attr("id")).getBoundingClientRect().top+(document.getElementById(temp.attr("id")).getBoundingClientRect().height/2)), domID:temp.attr("id")})});
        }

        return this;
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

    // If no arguments are passed returns the refresh rate
    // Other wise sets the refresh rate to the value passed in
    // The refresh rate is the rate at which the state of the task gets recorded
    refreshRate: function(r){
        if(!arguments.length)
            return this.refresh;
        this.refresh = r;
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

    distractor: function(dis) {
        if(!arguments.length)
            return this.distract;
        this.distract = dis;
        return this;
    }
});

