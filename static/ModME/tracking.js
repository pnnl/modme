(function() {
    var track_data = setup.Tracking.data;
    var track_param = track_data.parameters;
    
    track_svg = GUIUtil.getGenericSVG(
        d3.select("#"+setup.Tracking.container),
        1300, 650,
        JSON.parse(document.getElementById(setup.Tracking.container).style.width.substr(0,document.getElementById(setup.Tracking.container).style.width.length-2)), 
        JSON.parse(document.getElementById(setup.Tracking.container).style.height.substr(0,document.getElementById(setup.Tracking.container).style.height.length-2)),
        {top: scale(.03), right: scale(.03), bottom: scale(.03), left: scale(.03)},
        "track_svg");
    
    // TODO return time difference from events table when we are pulling data from a past run
    var track_chart = track_svg.chart("Tracking").eventFunc(function(){t = eval(track_data.eventFunction); return t;}).startFunc(track_data.startFunction)
                                .refreshRate(track_data.refresh);
    
    track_svg.insert("circle", "g")
            .attr("r", track_svg.h/4)
            .attr("cx", track_svg.w/2)
            .attr("cy", track_svg.h/2)
            .style("stroke-width", "10px")
            .style("stroke", "midnightblue")
            .style("fill", "none");
    
    if(!track_data.distractor) {
        track_chart.when("alert", function(args){data.push({time: (new Date()).getTime()-startTime, eventType: "alert", chart: "tracking", arg: "", id: args.domID, table: "Event"} )});
        track_chart.when("tick", function(args){
                                                track_data.orbits.forEach(function(d,i){
                                                    data.push({time: (new Date()).getTime()-startTime, x: (document.getElementById('track_circle_'+i).getBoundingClientRect().left+(document.getElementById('track_circle_'+i).getBoundingClientRect().width/2)), y: (document.getElementById('track_circle_'+i).getBoundingClientRect().top+(document.getElementById('track_circle_'+i).getBoundingClientRect().height/2)), domID:"track_circle_"+i, state: args.state[i], mouseX: (args.event.x), mouseY: (args.event.y), table: "Tracking"});
                                                });
                                            });
        track_chart.when("response", function(args){data.push({time: args.time-startTime, eventType: "input", chart: "tracking", arg: "correct:"+args.correct, id: args.domID, table: "Event"})});
        track_chart.when("timeout", function(args){data.push({time: (new Date()).getTime()-startTime, eventType: "timeout", chart: "tracking", arg: "", id: args.domID, table: "Event"})});
        track_chart.when("mouseMove", function(args){data.push({time: (new Date()).getTime()-startTime, x:args.x, y:args.y, domID:args.domID, targetX: args.targetX, targetY: args.targetY, table: "Mouse"})});
    } else {
        track_chart.when("response", function(args){data.push({time: args.time-startTime, eventType: "input", chart: "tracking", arg: "invalid", id: args.domID, table: "Event"})});
        track_chart.when("mouseMove", function(args){data.push({time: (new Date()).getTime()-startTime, x:args.x, y:args.y, domID:args.domID, targetX: args.targetX, targetY: args.targetY, table: "Mouse"})});
    }
    
    track_chart.draw(track_data);
})();
