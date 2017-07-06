document.addEventListener('DOMContentLoaded', function() {
    var monitor_data = setup.Monitoring.data;
    
    var monitor_param = monitor_data.parameters;
    
    monitor_svg = GUIUtil.getGenericSVG(
        d3.select("#"+setup.Monitoring.container),
        650, 650,
        JSON.parse(document.getElementById(setup.Monitoring.container).style.width.substr(0,document.getElementById(setup.Monitoring.container).style.width.length-2)), 
        JSON.parse(document.getElementById(setup.Monitoring.container).style.height.substr(0,document.getElementById(setup.Monitoring.container).style.height.length-2)),
        {top: scale(.03), right: scale(.03), bottom: scale(.03), left: scale(.03)},
        "monitor_svg");
    
    var monitor_chart = monitor_svg.chart("Monitoring");
    monitor_chart.range(monitor_data.range);
    monitor_chart.tick(monitor_data.ticks);
    if (window.preprogrammedAlerts) {
        var preprogrammedMonitorEvents = window.preprogrammedAlerts.filter(function(event) { return event.chart == "monitoring"; });
        preprogrammedMonitorEvents.forEach(function(event) {
            event.index = Number(event.domID.match(/\d+/));
        });
        var nextEventIndex = 0;
        var generateEvent = function() {
            var eventData = preprogrammedMonitorEvents[nextEventIndex++];
            var event = function() { monitor_chart.beginButtonAlert(eventData.index); };
            if (eventData.arg && eventData.arg.widget == "slider") {
                event = function() {
                    monitor_chart.increaseSliderRange(eventData.arg.index, eventData.arg.range);
                };
            }
            return event;
        };
        var getTimeToNextEvent = function() {
            if (nextEventIndex == preprogrammedMonitorEvents.length)
                return null; // signal no more events
            var nextEvent = preprogrammedMonitorEvents[nextEventIndex];
            var elapsedTime = (new Date()).getTime()-startTime;
            return nextEvent.time - elapsedTime;
        }
        var timeToFirstEventInMilliseconds = getTimeToNextEvent();
        monitor_chart.eventGenerator(generateEvent);
        monitor_chart.eventFunc(getTimeToNextEvent);
        monitor_chart.startFunc(timeToFirstEventInMilliseconds);
    } else {
        monitor_chart.eventFunc(function(){t = eval(monitor_data.eventFunction); return t;});
        monitor_chart.startFunc(monitor_data.startFunction);
    }
    
    
    if(!monitor_data.distractor) {
        monitor_chart.when("rangeChange", function(args){data.push({
            time: (new Date()).getTime()-startTime,
            eventType: "sliderRange",
            chart: "monitoring",
            arg: args.args,
            id: args.domID,
            table: "Event"
        })});
        monitor_chart.when("alert", function(args){data.push({
            time: (new Date()).getTime()-startTime,
            eventType: "alert",
            chart: "monitoring",
            arg: args.args,
            id: args.domID,
            table: "Event"
        })});
        monitor_chart.when("timeout", function(args){data.push({
            time: (new Date()).getTime()-startTime,
            eventType: "timeout",
            chart: "monitoring",
            arg: "",
            id: args.domID,
            table: "Event"
        })});
        monitor_chart.when("response", function(args){data.push({
            time: args.time-startTime,
            eventType: "input",
            chart: "monitoring",
            arg: "correct:"+args.correct+",ascii: "+args.ascii,
            id: args.domID,
            table: "Event"
        })});
    }
    
    monitor_chart.draw(monitor_data);
    
    keyboard.push(function(e, time){
        if(!monitor_data.distractor){
        	monitor_data.scales.forEach(function(d,i){
                if(d.button == e.keyCode){
                    monitor_chart.resetSliders(i, time);
                }
            });
    
            monitor_data.buttons.forEach(function(d,i){
                if(d.button == e.keyCode){
                    monitor_chart.resetButtons(i, time);
                }
            });
        }
    });
}, false);