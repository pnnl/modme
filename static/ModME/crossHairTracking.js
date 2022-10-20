document.addEventListener('DOMContentLoaded', function() {
	var crossHairTracking_data = setup.CrossHairTracking.data;
	var cht_param = crossHairTracking_data.parameters;
	
	crossHairTrack_svg = GUIUtil.getGenericSVG(
        d3.select("#"+setup.CrossHairTracking.container),
        1300, 650,
        JSON.parse(document.getElementById(setup.CrossHairTracking.container).style.width.substr(0,document.getElementById(setup.CrossHairTracking.container).style.width.length-2)), 
        JSON.parse(document.getElementById(setup.CrossHairTracking.container).style.height.substr(0,document.getElementById(setup.CrossHairTracking.container).style.height.length-2)),
        {top: scale(.03), right: scale(.03), bottom: scale(.03), left: scale(.03)},
        "crossHairTrack_svg");
		
	var crossHairTrack_chart = crossHairTrack_svg.chart("CrossHairTracking");
	if (window.preprogrammedAlerts) {
        var preprogrammedCHTAlerts = window.preprogrammedAlerts.filter(function(alert) { return alert.chart == "crossHairTracking"; });
        var nextAlertIndex = 0;
        var generateAlert = function() {
            var alert = preprogrammedCHTAlerts[nextAlertIndex++];
            return alert;
        };
        var getTimeToNextAlert = function() {
            if (nextAlertIndex == preprogrammedCHTAlerts.length)
                return null; // signal no more events
            var nextAlert = preprogrammedCHTAlerts[nextAlertIndex];
            var elapsedTime = (new Date()).getTime()-startTime;
            return nextAlert.time - elapsedTime;
        }
        var timeToFirstAlertInMilliseconds = getTimeToNextAlert();
        crossHairTrack_chart.alertGenerator(generateAlert);
        crossHairTrack_chart.eventFunc(getTimeToNextAlert);
        crossHairTrack_chart.startFunc(timeToFirstAlertInMilliseconds);
    } else {
        crossHairTrack_chart.eventFunc(function(){t = eval(crossHairTracking_data.eventFunction); return t;})
        crossHairTrack_chart.startFunc(crossHairTracking_data.startFunction)
    }
    crossHairTrack_chart.refreshRate(crossHairTracking_data.refresh)
	
	if(!crossHairTracking_data.distractor) {
        crossHairTrack_chart.when("alert", function(args){data.push({time: (new Date()).getTime()-startTime, eventType: "alert", chart: "crossHairTracking", arg: args.arg , id: args.domID, table: "Event"} )});
        crossHairTrack_chart.when("tick", function(args){
			var stateVal;
			//if dragging
			if(args.curser.state){
				stateVal = 1;
			}else{
				stateVal = 0;
			}
			
            data.push({
                time: (new Date()).getTime()-startTime,
                x: args.curser.x,
                y: args.curser.y,
                domID: "CrossHair",
				state: stateVal,
                mouseX: (args.event.x),
                mouseY: (args.event.y),
                table: "Tracking",
            });
            
        });
        //crossHairTrack_chart.when("response", function(args){data.push({time: args.time-startTime, eventType: "input", chart: "crossHairTracking", arg: "correct:"+args.correct, id: args.domID, table: "Event"})});
        crossHairTrack_chart.when("timeout", function(args){data.push({time: (new Date()).getTime()-startTime, eventType: "timeout", chart: "crossHairTracking", arg: "", id: args.domID, table: "Event"})});
        //crossHairTrack_chart.when("mouseMove", function(args){data.push({time: (new Date()).getTime()-startTime, x:args.x, y:args.y, domID:args.domID, targetX: args.targetX, targetY: args.targetY, table: "Mouse"})});
    } else {
        //crossHairTrack_chart.when("response", function(args){data.push({time: args.time-startTime, eventType: "input", chart: "crossHairTracking", arg: "invalid", id: args.domID, table: "Event"})});
        //crossHairTrack_chart.when("mouseMove", function(args){data.push({time: (new Date()).getTime()-startTime, x:args.x, y:args.y, domID:args.domID, targetX: args.targetX, targetY: args.targetY, table: "Mouse"})});
    }
    
    crossHairTrack_chart.draw(crossHairTracking_data);
}, false);