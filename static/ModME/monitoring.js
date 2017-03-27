var monitor_data = setup.Monitoring.data;
var monitor_param = monitor_data.parameters;

monitor_svg = GUIUtil.getGenericSVG(
    d3.select("#"+setup.Monitoring.container),
    650, 650,
    JSON.parse(document.getElementById(setup.Monitoring.container).style.width.substr(0,document.getElementById(setup.Monitoring.container).style.width.length-2)), 
    JSON.parse(document.getElementById(setup.Monitoring.container).style.height.substr(0,document.getElementById(setup.Monitoring.container).style.height.length-2)),
    {top: scale(.03), right: scale(.03), bottom: scale(.03), left: scale(.03)},
    "monitor_svg");

var monitor_chart = monitor_svg.chart("Monitoring").eventFunc(function(){t = eval(monitor_data.eventFunction); return t;}).startFunc(monitor_data.startFunction)
						.range(monitor_data.range).tick(monitor_data.ticks);

if(!monitor_data.distractor) {
    monitor_chart.when("alert", function(args){data.push({time: (new Date()).getTime()-startTime, sessionID: sessionID, eventType: "alert", chart: "monitoring", arg: args.args, id: args.domID, table: "Event"})});
    monitor_chart.when("timeout", function(args){data.push({time: (new Date()).getTime()-startTime, sessionID: sessionID, eventType: "timeout", chart: "monitoring", arg: "", id: args.domID, table: "Event"})});
    monitor_chart.when("response", function(args){data.push({time: args.time-startTime, sessionID: sessionID, eventType: "input", chart: "monitoring", arg: "correct:"+args.correct+",ascii: "+args.ascii, id: args.domID, table: "Event"})});
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
