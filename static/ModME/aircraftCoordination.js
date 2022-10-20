document.addEventListener(
  "DOMContentLoaded",
  function () {
    var aircraftCoordination_data = setup.AircraftCoordination.data;
    var aircraftCoordination_param = aircraftCoordination_data.parameters;

    aircraftCoordination_svg = GUIUtil.getGenericSVG(
      d3.select("#" + setup.AircraftCoordination.container),
      1300,
      650,
      JSON.parse(
        document
          .getElementById(setup.AircraftCoordination.container)
          .style.width.substr(
            0,
            document.getElementById(setup.AircraftCoordination.container).style
              .width.length - 2
          )
      ),
      JSON.parse(
        document
          .getElementById(setup.AircraftCoordination.container)
          .style.height.substr(
            0,
            document.getElementById(setup.AircraftCoordination.container).style
              .height.length - 2
          )
      ),
      {
        top: scale(0.03),
        right: scale(0.03),
        bottom: scale(0.03),
        left: scale(0.03),
      },
      "aircraftCoordination_svg"
    );

    // TODO return time difference from events table when we are pulling data from a past run
    var aircraftCoordination_chart = aircraftCoordination_svg.chart(
      "AircraftCoordination"
    );
    if (window.preprogrammedAlerts) {
      var preprogrammedAircraftCoordinationAlerts =
        window.preprogrammedAlerts.filter(function (alert) {
          return alert.chart == "aircraftCoordination";
        });
      var nextAlertIndex = 0;
      var generateAlert = function () {
        var alert = preprogrammedAircraftCoordinationAlerts[nextAlertIndex++];
        return alert;
      };
      var getTimeToNextAlert = function () {
        if (nextAlertIndex == preprogrammedAircraftCoordinationAlerts.length)
          return null; // signal no more events1
        var nextAlert = preprogrammedAircraftCoordinationAlerts[nextAlertIndex];
        var elapsedTime = new Date().getTime() - startTime;
        return nextAlert.time - elapsedTime;
      };
      var timeToFirstAlertInMilliseconds = getTimeToNextAlert();
      aircraftCoordination_chart.alertGenerator(generateAlert);
      aircraftCoordination_chart.eventFunc(getTimeToNextAlert);
      aircraftCoordination_chart.startFunc(timeToFirstAlertInMilliseconds);
    } else {
      aircraftCoordination_chart.eventFunc(function () {
        t = eval(aircraftCoordination_data.eventFunction);
        return t;
      });
      aircraftCoordination_chart.startFunc(
        aircraftCoordination_data.startFunction
      );
    }
    aircraftCoordination_chart.refreshRate(aircraftCoordination_data.refresh);
    aircraftCoordination_chart.distractor(aircraftCoordination_data.distractor);

    if (!aircraftCoordination_data.distractor) {
      aircraftCoordination_chart.when("alert", function (args) {
        data.push({
          time: new Date().getTime() - startTime,
          table: "Event",
          eventType: "alert",
          chart: "aircraftCoordination",
          arg: "",
          id: args.domID,
          table: "Event",
        });
      });
      aircraftCoordination_chart.when("response", function (args) {
        data.push({
          time: args.time - startTime,
          table: "Event",
          eventType: "response",
          chart: "aircraftCoordination",
          arg: (args.correct ? "correct: " + args.correct : "") + (args.position ? "   position: " +  args.position : ""),
          id: args.domID,
          table: "Event",
        });
      });
      aircraftCoordination_chart.when("timeout", function (args) {
        data.push({
          time: new Date().getTime() - startTime,
          table: "Event",
          eventType: "timeout",
          chart: "aircraftCoordination",
          arg: "",
          id: args.domID,
          table: "Event",
        });
      });
    }

    aircraftCoordination_chart.draw(aircraftCoordination_data);

    if (aircraftCoordination_data.useJoystick) {
      setInterval(function () {
        if (navigator.getGamepads()[0].buttons === null) {
            return
        } else {
            navigator.getGamepads()[0].buttons.forEach((element, index) => {
                if (element.pressed) {
                  if (index == aircraftCoordination_data.joyButton) {
                    aircraftCoordination_chart.planeAction(new Date().getTime());
                  }
                }
              }, 100);
        }
        
      });
    }

    keyboard.push(function (e, time) {
   
      if (aircraftCoordination_data.button.button == e.keyCode) {
        aircraftCoordination_chart.planeAction(time);
      }
    });
  },
  false
);
