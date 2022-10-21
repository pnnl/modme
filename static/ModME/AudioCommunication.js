document.addEventListener('DOMContentLoaded', function() {
    var audcomm_data = setup.AudioCommunication.data;
    var audcomm_param = audcomm_data.parameters;

    var parent = d3.select("#"+setup.AudioCommunication.container);
    var width = 650;
    var height = 650;
    var parentDimensions = parent.node().getBoundingClientRect();
    var scaledWidth = parentDimensions.width;
    var scaledHeight = parentDimensions.height;
    var margin = {top: scale(.03), right: scale(.03), bottom: scale(.03), left: scale(.03)};
    var id = "comm_svg";
    var comm_svg = GUIUtil.getGenericSVG(
            parent,
            width,
            height,
            scaledWidth,
            scaledHeight,
            margin,
            id
    );
    var communicationChartOptions = {};
    var comm_chart = comm_svg.chart("AudioCommunication", communicationChartOptions)
    if (window.preprogrammedAlerts) {
        var preprogrammedCommunicationAlerts = window.preprogrammedAlerts.filter(function(alert) { return alert.chart == "audiocommunication"; });
        preprogrammedCommunicationAlerts.forEach(function(alert) {
            alert.channel = Number(alert.domID.match(/\d+/));
            alert.target = alert.arg.target;
        });
        var nextAlertIndex = 0;
        var generateAlert = function() {
            var alert = preprogrammedCommunicationAlerts[nextAlertIndex++];
            var deltaFrequency = alert.arg.current - alert.arg.target;
            alert.target = this.data.channels[alert.channel].frequency - deltaFrequency;
            if (alert.target > this.data.absoluteMax || alert.target < this.data.absoluteMin)
                alert.target = this.data.channels[alert.channel].frequency + deltaFrequency;

            alert.sound = new Audio();
            alert.sound.src = alert.arg.sound;

            return alert;
        };
        var getTimeToNextAlert = function() {
            if (nextAlertIndex == preprogrammedCommunicationAlerts.length)
                return null; // signal no more events
            var nextAlert = preprogrammedCommunicationAlerts[nextAlertIndex];
            var elapsedTime = (new Date()).getTime()-startTime;
            return nextAlert.time - elapsedTime;
        }
        var timeToFirstAlertInMilliseconds = getTimeToNextAlert();
        comm_chart.alertGenerator(generateAlert);
        comm_chart.eventFunc(getTimeToNextAlert);
        comm_chart.startFunc(timeToFirstAlertInMilliseconds);
    } else {
        comm_chart.eventFunc(
            function() {
                t = eval(audcomm_data.eventFunction);
                return t;
            }
        );
        comm_chart.startFunc(audcomm_data.startFunction);
    }
    comm_chart.responseTime(audcomm_data.response);

    if(!audcomm_data.distractor) {
        // record events for eventual submission to the database
        comm_chart.when("alert", function(args) {
            data.push({
                time: (new Date()).getTime()-startTime,
                eventType: "alert",
                chart: "audiocommunication",
                arg: {
                    target: args.target,
                    current: args.current,
                    callsign: args.callsign,
                },
                id: args.domID,
                table: "Event",
                
            })
        });
        comm_chart.when("timeout", function(args) {
            data.push({
                time: (new Date()).getTime()-startTime,
                eventType: "timeout",
                chart: "audiocommunication",
                arg: {
                    target: args.target,
                    current: args.current,
		    callsign: args.callsign,
                },
                id: args.domID,
                table: "Event"
            });
        });
        comm_chart.when("response", function(args) {
            var arg = {
                channel: args.channel,
                frequency: args.frequency,
            };
            if (args.correct) args.correct = args.correct;
            data.push({
                time: args.time-startTime,
                eventType: "input",
                chart: "audiocommunication",
                arg: arg,
                id: args.domID,
                table: "Event"
            })
        });
    }

    comm_chart.draw(audcomm_data);

    keyboard.push(function(e, time){
        if(!audcomm_data.distractor){
            switch(e.keyCode){
                case audcomm_data.controller.accept:
                    comm_chart.accept(time);
                    break;
                case audcomm_data.controller.frequencyDown:
                    comm_chart.frequencyDown(time);
                    break;
                case audcomm_data.controller.frequencyUp:
                    comm_chart.frequencyUp(time);
                    break;
                case audcomm_data.controller.indexDown:
                    comm_chart.indexDown(time);
                    break;
                case audcomm_data.controller.indexUp:
                    comm_chart.indexUp(time);
                    break;
            }
        }
    });
}, false);
