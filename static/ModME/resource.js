document.addEventListener('DOMContentLoaded', function() {
    var resource_data = setup.Resource.data;

    var resource_param = resource_data.parameters;
    
        var resource_svg = GUIUtil.getGenericSVG(
            d3.select("#"+setup.Resource.container),
            1300, 650,
            JSON.parse(document.getElementById(setup.Resource.container).style.width.substr(0,document.getElementById(setup.Resource.container).style.width.length-2)), 
            JSON.parse(document.getElementById(setup.Resource.container).style.height.substr(0,document.getElementById(setup.Resource.container).style.height.length-2)),
            {top: scale(.03), right: scale(.03), bottom: scale(.03), left: scale(.03)},
            "resource_svg");
    
        var resource_chart = resource_svg.chart("Resource");
        resource_chart.refreshRate(resource_data.refresh);
        if (window.preprogrammedAlerts) {
            var preprogrammedResourceAlerts = window.preprogrammedAlerts.filter(function(alert) { return alert.chart == "resource"; });
            var nextAlertIndex = 0;
            var generateAlert = function() {
                var alert = preprogrammedResourceAlerts[nextAlertIndex++];
                return alert;
            };
            var getTimeToNextAlert = function() {
                if (nextAlertIndex == preprogrammedResourceAlerts.length)
                    return null; // signal no more events
                    var lastAlert = preprogrammedResourceAlerts[nextAlertIndex-1];
                    var nextAlert = preprogrammedResourceAlerts[nextAlertIndex];
                    return nextAlert.time - lastAlert.time;
            }
            var timeToFirstAlertInMilliseconds = preprogrammedResourceAlerts[0].time
            resource_chart.alertGenerator(generateAlert);
            resource_chart.eventFunc(getTimeToNextAlert);
            resource_chart.startFunc(timeToFirstAlertInMilliseconds);
        } else {
            resource_chart.eventFunc(function(){t = eval(resource_data.eventFunction); return t;})
            resource_chart.startFunc(resource_data.startFunction);
        }

    
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
    
    if(!resource_data.distractor) {
        resource_chart.when("alert", function(args){data.push({time: (new Date()).getTime()-startTime, eventType: "alert", chart: "resource", arg: "", id: args.domID, table: "Event"})});
        resource_chart.when("tick", function(args){
                                                resource_data.tanks.forEach(function(d,i){
                                                    data.push({time: (new Date()).getTime()-startTime, tankNumber: i+1, state: args.tanks[i].resource, table: "Tank"});
                                                })
                                                resource_data.switches.forEach(function(d,i){
                                                    data.push({time: (new Date()).getTime()-startTime, switchNumber: i+1, state: args.state[i], table: "Switch"});
                                                })
                                            });
        resource_chart.when("response", function(args){data.push({time: args.time-startTime, eventType: "input", chart: "resource", arg: args.ascii, id: args.domID, table: "Event"})});
        resource_chart.when("timeout", function(args){});
    }
    
    resource_chart.draw(resource_data);
    
    keyboard.push(function(e, time){
        if(!resource_data.distractor) {
            resource_data.switches.forEach(function(d,i){
                if(d.key == e.keyCode){
                    resource_chart.flipSwitch(i, time);
                }
            });
        }
    });
}, false);