// Monitoring task chart
// Takes in an object with a buttons field and sliders field
// Buttons field should be an array where length of the array is the number of buttons in the task
// Each element in the array should be an object of structure {color:"", button:#, key:"", alert_color:"", autoCorrect:#}
// sliders field should be an array where length of the array is the number of sliders in the task
// Each element in the array should be an object of structure {button:#, key:"", slider_interval:#, prob:#}
d3.chart("Monitoring", {
    initialize: function(options = {}){
        var chart = this;

        chart.h = chart.base.h;
        chart.w = chart.base.w;

        chart.x = d3.scale.linear();
        chart.y = d3.scale.linear();

        chart.xScale = d3.scale.linear();
        chart.yScale = d3.scale.linear();

        chart.totalProb = 0;

        chart.responseListeners = [];
        chart.alertListeners = [];
        chart.timeoutListeners = [];
        chart.rangeChangeListeners = [];

        var scalesBase = this.base.append("g")
            .classed("monitoring", true)
            .attr("height", this.h)
            .attr("width", this.w);

        var slidersBase = this.base.append("g")
            .classed("monitoring", true)
            .attr("height", this.h)
            .attr("width", this.w);

        var buttonsBase = this.base.append("g")
            .classed("monitoring", true)
            .attr("height", this.h)
            .attr("width", this.w);

        chart.defaults = {};
        chart.defaults.generateEvent = function(){
            // sum the distribution so we can choose a random sample
            chart.totalProb=0;
            chart.data.buttons.forEach(function(d){
                chart.totalProb += d.prob;
            });
            chart.data.scales.forEach(function(d){
                chart.totalProb += d.prob;
            });
            if(chart.totalProb>0){
                // choose a random sample from the distribution
                var prob = Math.random()*chart.totalProb;
                var temp = 0;
                var index = 0;
                // find the index of the chosen sample
                chart.data.buttons.forEach(function(d){
                    temp += d.prob;
                    if(temp>prob){
                        return false;
                    }
                    index++;
                });
                if(temp<prob){
                    chart.data.scales.forEach(function(d){
                        temp += d.prob;
                        if(temp>prob){
                            return false;
                        }
                        index++;
                    });
                }
                if(index<chart.data.buttons.length){
                     var event = function() { chart.beginButtonAlert(index); };
                     return event;
                }
                else{
                    var event = function() { chart.increaseSliderRange(index); }
                    return event;
                 }
             }
             return null;
        }
        chart.eventGenerator(options.generateEvent || chart.defaults.generateEvent);
        chart.beginButtonAlert = function(index) {
            // the chosen sample is a button - alert it and notify listeners
            chart.index = index;
            chart.alertListeners.forEach(function(d){d({domID: "monitor_button_"+index, args:"button"});});
            chart.data.buttons[index].alert = true;
            buttonsBase.selectAll("rect").style("fill",function(d,i){return d.alert ? d.alert_color : d.color});
            setTimeout(chart.buttonTimeout, chart.data.buttons[index].autoCorrect);
        }
        chart.increaseSliderRange = function(index) {
            // the chosen sample is a slider - alert it and notify listeners
            var sliderIndex = index - chart.data.buttons.length;
            chart.index = index;
            chart.data.scales[sliderIndex].event=true;
            rangeIncrease = Math.floor(Math.random()*((chart.ticks-chart.slider_range[1]+chart.slider_range[0]-1)/2)+1);
            chart.data.event_range = [chart.slider_range[0]-rangeIncrease, chart.slider_range[1]+rangeIncrease];
            chart.data.scales[sliderIndex].i--;
            var event = {
                type: "sliderRange",
                domID: "monitor_slider_" + sliderIndex,
                args: {
                    index: index,
                    change: rangeIncrease,
                    newRange: { min: chart.data.event_range[0], max: chart.data.event_range[1] },
                },
            }
            chart.rangeChangeListeners.forEach(function(listener){listener(event);});
        }
        chart.raiseEvent = function() {
            var event = chart.generateEvent();
            if (event) {
                event();
            }
            var timeInMillisecondsToNextEvent = chart.eventFunction();
            if (null === timeInMillisecondsToNextEvent)
                return; // no more events
            setTimeout(chart.raiseEvent, timeInMillisecondsToNextEvent);
        };

        setTimeout(function(){setTimeout(chart.raiseEvent, chart.startFunction);}, 1);

        chart.buttonTimeout = function(){
            if(chart.data.buttons[chart.index].alert){
                chart.timeoutListeners.forEach(function(d){d({domID: "monitor_button_"+chart.index});});
                chart.data.buttons[chart.index].alert = false;
                buttonsBase.selectAll("rect").style("fill",function(d,i){return d.alert ? d.alert_color : d.color});
            }
        }

        /**
         * @typedef {Object} Scale
         * @property {integer} button          - key code which resets the slider when it is in alert
         * @property {string}  key             - key name related to the key code
         * @property {integer} slider_interval - # of milliseconds for slider to transition one tick
         * @property {number}  prob            - chance of slider event; will be normalized with other monitoring elements for a total probability across all elements of 1
         * @property {integer} i               - direction; even for up, odd for down
         * @property {number}  x               - horizontal position of scale on canvas
         * @property {number}  y               - vertical position of slider
         * @property {integer} alert           - timeout counter - 3 if the alert has timed out, 0-2 or 4 otherwise.  The third reverse after a range increase event triggers a timeout.
         * @property {integer} correct         - unused?
         * @property {boolean} event           - whether the slider range has been increased due to an event
         * { button: 112, key: "F1", slider_interval: 2000, prob: 1, i: 78, y: 3, x: 1.5, alert: 4, correct: 0, event: false }
         */
        /**
         * @param {Scale} d
         */
        chart.translate = function(d){
            d.i++;
            var deltaY = chart.slider_range[d.i%chart.slider_range.length]-d.y;
            if(d.event){
                deltaY = chart.data.event_range[d.i%chart.slider_range.length]-d.y;
                d.alert = 0;
            }
            if(d.alert<=2){
                d.alert++;
            }

            d.y += deltaY;
            d3.select(this).transition()
                .duration(Math.abs(deltaY*d.slider_interval))
                .ease("linear")
                .attr("transform", ["translate("+chart.xScale(d.x)+","+chart.yScale(d.y+2.75)+")","scale("+chart.xScale(.5)/5+","+(chart.yScale(0)-chart.yScale(1.5))/10+")"])
                .each("end", chart.translate);

            if(d.event){
                slider = d3.select(this);
                chart.alertListeners.forEach(function(d){d({domID: slider.attr("id"), direction: d.i%chart.slider_range.length, args: "slider"});});
                d.event=false;
                d.i++;
            }
            else if(d.alert==3){
                slider = d3.select(this);
                chart.timeoutListeners.forEach(function(d){d({domID: slider.attr("id")});});
                d.alert++;
            }
        }

        this.layer("scale", scalesBase, {
            dataBind: function(data){
                var chart = this.chart();

                chart.data = data;

                chart.xScale.domain([0,2.5*data.scales.length+2.5]);
                chart.yScale.domain([0,chart.ticks+9]);



                return this.selectAll("g").data(data.scales);
            },

            insert: function(data){
                var chart = this.chart();

                chart.xScale.range([0, chart.w]);
                chart.yScale.range([chart.h, 0]);

                var grps = this.append("g")
                    .classed("monitoring", true);


                grps.selectAll("line").data(function(d){return d3.range(0,chart.ticks);})
                    .enter()
                    .append("line")
                    .attr("y1", function(d,i){return chart.yScale(i+3);})
                    .attr("y2", function(d,i){return chart.yScale(i+3);})
                    .attr("x1", chart.xScale(0))
                    .attr("x2", chart.xScale(1))
                    .classed("monitoring", true);

                chart.line = grps.append("line")
                    .attr("y1", chart.yScale(3))
                    .attr("y2", chart.yScale(chart.ticks+2))
                    .attr("x1", chart.xScale(.5))
                    .attr("x2", chart.xScale(.5))
                    .classed("monitoring", true);

                grps.append("text")
                    .attr("x", chart.xScale(0))
                    .attr("y", chart.yScale(1.75))
                    .classed("monitoring", true);

                grps.append("rect")
                    .attr("x", chart.xScale(0))
                    .attr("y", chart.yScale(9))
                    .attr("width", chart.xScale(1))
                    .attr("height", chart.yScale(7.25))
                    .style("fill-opacity", 0)
                    .style("stroke-width", 0)
                    .style("fill", "black")
                    .on("touchstart", function(d,i){var time = (new Date()).getTime(); d3.event.preventDefault(); chart.resetSliders(i, time);});

                return grps;
            },

            events: {
                "enter":function(){
                    var chart = this.chart();

                    var temp=0;

                    this.selectAll("line").filter(function(d){if(d.key){return false}else{return true}})
                        .attr("id", function(d,i){if(i==chart.ticks-1){temp++; return "monitor_slider_"+(temp-1)+"_tick_"+i;}return "monitor_slider_"+temp+"_tick_"+i;});

                    temp=-1;

                    this.selectAll("line").filter(function(d){if(d.key){return true}else{return false}})
                        .attr("id",function(d,i){temp++; return "monitor_centerline_"+temp;});

                    this.select("text")
                        .text(function(d){return d.key});

                    return this.attr("transform", function(d,i){return "translate("+chart.xScale(2.5*i+2)+","+0+")";});
                },

                "update":function(){
                    var chart = this.chart();

                    var temp=0;

                    var lines = this.selectAll("line").data(function(d){return d3.range(0,chart.ticks);})

                    lines.exit().remove();

                    lines.enter().append("line")
                                .classed("monitoring", true);

                    lines.attr("y1", function(d,i){return chart.yScale(i+3);})
                        .attr("y2", function(d,i){return chart.yScale(i+3);})
                        .attr("x1", chart.xScale(0))
                        .attr("x2", chart.xScale(1))
                        .attr("id", function(d,i){if(i==chart.ticks-1){temp++; return "monitor_slider_"+(temp-1)+"_tick_"+i;}return "monitor_slider_"+temp+"_tick_"+i;});

                    this.append("line")
                        .attr("y1", chart.yScale(3))
                        .attr("y2", chart.yScale(chart.ticks+2))
                        .attr("x1", chart.xScale(.5))
                        .attr("x2", chart.xScale(.5))
                        .attr("id", function(d,i){return "monitor_centerline_"+i})
                        .classed("monitoring", true);

                    this.select("text")
                        .text(function(d){return d.key});

                    return this.attr("transform", function(d,i){return "translate("+chart.xScale(2.5*i+2)+","+0+")";});
                },

                "exit":function(){
                    return this.remove();
                }
            }
        });

        this.layer("sliders", slidersBase,{
            dataBind: function(data){
                var chart = this.chart();

                chart.data = data;

                chart.xScale.domain([0,2.5*data.scales.length+2.5]);
                chart.yScale.domain([0,chart.ticks+9]);

                return this.selectAll("path").data(data.scales);
            },

            insert: function(data){
                var chart = this.chart();

                chart.xScale.range([0,chart.w]);
                chart.yScale.range([chart.h,0]);

                return this.append("path")
                    .attr("d", "M 0 3 L 1 3 L 1 0 L 5 5 L 1 10 L 1 7 L 0 7 z")
                    .style("stroke-width", ".6")
                    .classed("monitoring",true)
                    .on("touchstart", function(d,i){var time = (new Date()).getTime(); d3.event.preventDefault(); chart.resetSliders(i, time);});
            },
            events: {
                "enter":function(){
                    var chart = this.chart();

                    this.each(function(d,i){
                        d.i = 0;
                        d.y=Math.round(chart.ticks/2);
                        d.x = i*2.5+1.5;
                        d.alert=4;
                        d.correct=0;
                        d.event=false;
                        if(!d.hasOwnProperty("prob")){
                            d.prob = 1;
                        }
                        chart.totalProb += d.prob;
                    });

                    this.each(chart.translate);



                    return this
                        .attr("transform", function(d,i){return ["translate("+chart.xScale(2.5*i+1.5)+","+chart.yScale(Math.round(chart.ticks/2)+2.75)+")","scale("+chart.xScale(.5)/5+","+ (chart.yScale(0)-chart.yScale(1.5))/10+")"]})
                        .attr("id", function(d,i){return "monitor_slider_"+i;});
                },

                "update":function(){
                    var chart = this.chart();

                    this.each(function(d,i){
                        d.x = i*2.5+1.5;
                    });

                    this.transition()
                        .duration(0).attr("transform", function(d,i){
                                                    return ["translate("+chart.xScale(2.5*i+1.5)+","+chart.yScale(Math.round(chart.ticks/2)+2.75)+")","scale("+chart.xScale(.5)/5+","+ (chart.yScale(0)-chart.yScale(1.5))/10+")"]
                                                });

                    this.each(chart.translate);

                    return this
                        .attr("transform", function(d,i){return ["translate("+chart.xScale(2.5*i+1.5)+","+chart.yScale(Math.round(chart.ticks/2)+2.75)+")","scale("+chart.xScale(.5)/5+","+ (chart.yScale(0)-chart.yScale(1.5))/10+")"]})
                        .attr("id", function(d,i){return "monitor_slider_"+i;});
                },

                "exit": function(){
                    return this.remove();
                }

            }
        });

        this.layer("buttons", buttonsBase,{
            dataBind: function(data){
                var chart = this.chart();

                chart.data = data;

                chart.x.domain([0,4.75*data.buttons.length+3]);
                chart.y.domain([0,chart.ticks+9]);

                return this.selectAll("g").data(data.buttons);
            },

            insert: function(){
                var chart = this.chart();

                chart.x.range([0, chart.w]);
                chart.y.range([chart.h, 0]);

                var total_width = chart.data.buttons.length*4.75+3;

                var rect_width = 3.75;

                var grps = this.append("g")

                grps.append("rect")
                    .attr("width", chart.x(rect_width))
                    .attr("height", chart.y(0)-chart.y(2))
                    .attr("y", chart.y(chart.ticks+7))
                    .on("touchstart", function(d,i){var time = (new Date()).getTime(); d3.event.preventDefault(); chart.resetButtons(i, time);});

                grps.append("text")
                    .attr("class", "monitoring")
                    .attr("x", chart.x(rect_width/2-.5))
                     .attr("y", chart.y(chart.ticks+3.75));

                return grps;
            },

            events: {
                "enter": function(){
                    var chart = this.chart();

                    this.each(function(d,i){
                        if(!d.hasOwnProperty("prob")){
                            d.prob = 1;

                        }
                        d.alert = false;
                        chart.totalProb += d.prob;
                    });

                    var total_width = chart.data.buttons.length*4.75+3;

                    var rect_width = 3.75;

                    this.select("text").text(function(d){return d.key;});

                    this.select("rect").attr("id", function(d,i){return "monitor_button_"+i;})
                        .style("fill", function(d){return d.color;});

                    return this.attr("transform", function(d,i){return "translate("+[chart.x(2+(i*(rect_width+1))),0]+")";});
                },

                "update": function(){
                    var chart = this.chart();

                    var total_width = chart.data.buttons.length*4.75+3;

                    var rect_width = 3.75;

                    this.select("text").text(function(d){return d.key;})
                        .attr("x", chart.x(rect_width/2-.5))
                        .attr("y", chart.y(chart.ticks+3.75));

                    this.select("rect").attr("id", function(d,i){return "monitor_button_"+i;})
                        .style("fill", function(d){return d.color;})
                        .attr("width", chart.x(rect_width))
                        .attr("height", chart.y(0)-chart.y(2))
                        .attr("y", chart.y(chart.ticks+7));

                    return this.attr("transform", function(d,i){return "translate("+[chart.x(2+(i*(rect_width+1))),0]+")";});
                },

                "exit": function(){
                    return this.remove();
                }
            }

        });
    },

    // Returns a given sliders current location
    getSliderLocation: function(sliderNum){
        var sliderCenter = Math.round(this.ticks/2);
        var currentPosition = d3.select("#monitor_slider_"+sliderNum).attr("transform").split(",");
        var x = currentPosition[0].split("(")[1];
        var y = currentPosition[1].split(")")[0];
        return {x:x,y:y};
    },

    // Resets a given sliders location to the middle dash if the slider is in an alert state
    resetSliders: function(sliderNum, time){
        var chart = this;
        var sliderCenter = Math.round(chart.ticks/2);
        var currentPosition = chart.y.invert(d3.select("#monitor_slider_"+sliderNum).attr("transform").split(",")[1].split(")")[0]);
        if((currentPosition>sliderCenter+3.75 || currentPosition<sliderCenter+1.75)){
            chart.responseListeners.forEach(function(d){d({domID:"monitor_slider_"+sliderNum, correct:true, direction: chart.data.scales[sliderNum].i, ascii:chart.data.scales[sliderNum].button, time:time});});
            chart.data.scales[sliderNum].alert=4;
            chart.data.scales[sliderNum].y = Math.round(chart.ticks/2);
            d3.select("#monitor_slider_"+sliderNum)
                    .transition()
                    .duration(0)
                    .attr("transform", ["translate("+chart.x(chart.data.scales[sliderNum].x)+","+chart.y(chart.data.scales[sliderNum].y+2.75)+")","scale("+chart.x(.5)/5+","+(chart.y(0)-chart.y(1.5))/10+")"])
                    .each("end", chart.translate);
        }
        else{
            chart.responseListeners.forEach(function(d){d({domID:"monitor_slider_"+sliderNum, correct:"false", ascii:chart.data.scales[sliderNum].button, time:time});});
        }
    },

    // Resets a given buttons color to it's non alert color if the button is in an alert state
    resetButtons: function(buttonNum, time){
        var chart = this;
        if(chart.data.buttons[buttonNum].alert){
            chart.responseListeners.forEach(function(d){d({domID:"monitor_button_"+buttonNum, correct:"true", ascii:chart.data.buttons[buttonNum].button, time:time});});
            chart.data.buttons[buttonNum].alert = false;
            d3.select("#monitor_button_"+buttonNum).style("fill", chart.data.buttons[buttonNum].color);
        }
        else{
            chart.responseListeners.forEach(function(d){d({domID:"monitor_button_"+buttonNum, correct:"false", ascii:chart.data.buttons[buttonNum].button, time:time});});
        }
    },

    // If no arguments are passed returns the tick
    // Other wise sets the tick to the value passed in
    // The tick is the number of dashes on the slider's scale
    tick: function(t) {
        if(!arguments.length)
            return this.ticks;
        this.ticks = t;
        return this;
    },

    // If no arguments are passed returns the range
    // Other wise sets the range to the value passed in
    // The the range is the bounds of where the slider should bounce between when not in an alert state
    range: function(s) {
        if(!arguments.length)
            return this.slider_range;
        this.slider_range = s;
        return this;
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

    eventGenerator: function(generateEvent) {
        if (!arguments.length)
            return this.generateEvent;
        this.generateEvent = generateEvent;
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
    when: function(eventType, f){
        var name = eventType + "Listeners";
        if(!this[name]){
            this[name] = [];
        }
        this[name].push(f);
        return this;
    },
});

