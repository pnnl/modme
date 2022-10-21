// AircraftCoordination task chart
//Planes randomly fly in at intervals

var collision = false;
var clicked = false;
var notCenter = false;
var x1 = -1;
var x2 = -1;
var y1 = -1;
var y2 = -1;

d3.chart("AircraftCoordination", {
  initialize: function (options = {}) {
    var chart = this;

    chart.h = chart.base.h;
    chart.w = chart.base.w;
    
    chart.response = [];
    chart.alert = []; // TODO investigate if this does anything
    chart.timeout = []; // TODO investigate if we can delete this or if it is used anywhere
    chart.tick = [];
    chart.mouseMove = [];

    var testData = [];

    var eventCounter = 0;

    chart.mouseEvent = { x: 0, y: 0 };

    chart.x = d3.scale.linear().domain([0, 1]);
    chart.y = d3.scale.linear().domain([0, 1]);

    chart.translateObjectAlong = function (path) {
      try {
        var l = path.getTotalLength();
      } catch {
        var l = 2000
      }
      
      return function (d, i, a) {
        return function (t) {
          try {
            var p = path.getPointAtLength(t * l);
          } catch {
            return "translate(" + 1 + "," + 1 + ")";
          }
          
          return "translate(" + p.x + "," + p.y + ")";
        };
      };
    };

    

    chart.translatePlaneAlong = function (path) {
      try {
        var l = path.getTotalLength();
      } catch {
        var l = 2000
      }
      return function (d, i, a) {
        return function (t) {
          try {
            var p = path.getPointAtLength(t * l);
          } catch {
            return "translate(" + 1 + "," + 1 + ")";
          }

          let x = p.x - 650;
          let y = p.y - 325;

          let distance = Math.sqrt(x * x + y * y);

          if (clicked ){
            chart.response.forEach(function (d) {
              d({ position: "x: " + p.x + ", y: " + p.y, domID: "aircraftCoordination", time: new Date().getTime() });
            });
          }

          if (distance <= 50) {
            //chart.base.select("path.inboundPlane").remove();
            if (clicked && collision) {
              movePlane();
              return "translate(" + p.x + "," + p.y + ")";
              
            }
            
            chart.base
              .select("path.safeUserPlane")
              .style("fill", "red")
              .style("stroke", "red");

              chart.timeout.forEach(function(d){d({domID: "aircraftCoordination"})});
              collision = false;

            return "translate(" + p.x + "," + p.y + ")";
            //chart.base.select("line.planeLine").remove();
          } else {
            return "translate(" + p.x + "," + p.y + ")";
          }
        };
      };
    };

    var line = chart.base
      .append("line")
      .attr("x1", 0)
      .attr("y1", -chart.h)
      .attr("x2", 0)
      .attr("y2", 0);

    var line2 = chart.base
      .append("line")
      .attr("x1", 300)
      .attr("y1", 0)
      .attr("x2", 300)
      .attr("y2", 1300)
      .classed("planeLine", true);

    chart.translate = function (d) {
      d3.select(this)
        .transition()
        .duration(1500000 / chart.data.speed)
        .ease("linear")
        .attrTween("transform", chart.translateObjectAlong(line.node()))
        .each("end", chart.translate);
    };


    var map = chart.base
      .append("g")
      .attr("width", chart.w)
      .attr("height", chart.h);

    var lines;

    var plane = chart.base
      .append("g")
      .attr("width", chart.w)
      .attr("height", chart.h)
      .attr("transform", "translate(" + chart.w / 2 + ", " + chart.h / 2 + ")");

    var incomingPlane = chart.base
      .append("g")
      .attr("width", chart.w)
      .attr("height", chart.h);

    var planeBoundary = chart.base
      .append("g")
      .attr("width", chart.w)
      .attr("height", chart.h);

    var planePath = chart.base
      .append("g")
      .attr("width", chart.w)
      .attr("height", chart.h);

    var button = chart.base
      .append("g")
      .attr("width", chart.w)
      .attr("height", chart.h)
      .attr("transform", "translate(" + 0 + ", " + 630 + ")");

    function makeLines() {
      lines = map
      .selectAll("line")
      .data([
        1, 2, 1, 3, 2, 1, 3, 2, 1, 3, 2, 4, 3, 1, 2, 2, 2, 1, 3, 2, 2, 2, 2, 2,
        2,
      ])
      .enter()
      .append("line")
      .attr("x1", 0)
      .attr("x2", 1300)
      .attr("y1", function (d, i) {
        return i * 50 + 50;
      })
      .attr("y2", function (d, i) {
        return i * 50 + 50;
      })
      .attr("stroke", "white")
      .attr("stroke-width", function (d) {
        return 0.5;
      })
      .transition()
      .duration(1500000 / chart.data.speed)
      .ease("linear")
      .attrTween("transform", chart.translateObjectAlong(line.node()))
      .each("end", chart.translate);
      }
    

    const linesTimeout = setInterval(function() {
      if (chart.data) {
        makeLines()
        clearTimeout(linesTimeout)
      }
    }, 10)

    function movePlane() {
      notCenter = true;
    }

    chart.defaults = {};
    chart.defaults.generateEvent = function () {
      
      collision = false;
      clicked = false;
      x1 = -1;
      x2 = -1;
      y1 = -1;
      y2 = -1;
      if (notCenter) {
        chart.base
          .select("path.safeUserPlane")
          .attr("transform", "translate(0, 0)");
      }
      chart.base
        .select("path.safeUserPlane")
        .style("fill", "white")
        .style("stroke", "white");

      eventCounter++;
      if (chart.data.distractor) {
        return null;
      }

      var prob = chart.data.collisionProb / 100;


      if (Math.random() < prob) {
        collision = true;
      }

      var xOrY = Math.random();

      if (eventCounter % 2 == 0) {
        testData.pop();
        chart.base.select("path.inboundPlane").remove();
        chart.base.select("circle.planeBoundary").remove();
      } else {
        testData.push(2);

        line2
          // Makes line that the incoming plane travels along visible
          //.attr("stroke", "white")
          .attr("x1", function (d) {
            // if xOrY >= .5 the plane will start on the left or right edge
            if (xOrY >= 0.5) {
              var leftOrRight = Math.random();
              // deciding on left or right edge
              if (leftOrRight >= 0.5) {
                // if newRandom >= .5 the plane will start on the left edge
                x1 = 0;
              } else {
                // starts on right edge
                x1 = chart.w;
              }
            } else {
              // plane will start on top or bottom edge
              x1 = Math.random() * chart.w;
            }
   
            return x1;
          })
          .attr("y1", function (d) {
            if (x1 == 0 || x1 == chart.w) {
              // if started on left or right gen random value based on chart.h
              y1 = Math.random() * chart.h;
            } else {
              // if random x value place plane on top or bottom edge
              if (Math.random() >= 0.5) {
                y1 = 0;
              } else {
                y1 = chart.h;
              }
            }
    
            return y1;
          })

          .attr("x2", function (d) {

            // if started on left plane finishes on right edge
            if (x1 == 0) {
              x2 = chart.w;
            }
            // if started on right plane finishes on left edge
            else if (x1 == chart.w) {
              x2 = 0;
            } else {
              if (collision) {
                var slope = (325 - y1) / (650 - x1);

                y1 == 0
                  ? (x2 = (650 + slope * x1) / slope)
                  : (x2 = (-650 + slope * x1) / slope);
              } else {
                x2 = Math.random() * chart.w;
                var mid = (x2 + x1) / 2
                var distance = Math.abs(mid - 650)
           
                
                while (distance < 90) {
              
                  x2 = Math.random() * chart.w;
                  mid = (x2 + x1) / 2
                  distance = Math.abs(mid - 650)

                }
 
              }
            }

  
            return x2;
          })
          .attr("y2", function (d) {
            if (y1 == 0) {
              y2 = chart.h;
            } else if (y1 == chart.h) {
              y2 = 0;
            } else {
              if (collision) {
                var slope = (325 - y1) / (650 - x1);
                y2 = y1 + (slope * x2 - slope * x1);
              } else {
                y2 = Math.random() * chart.h;
                var mid = (y2 + y1) / 2
                var distance = Math.abs(mid - 325)
       
                
                while (distance < 90) {
         
                  y2 = Math.random() * chart.h;
                  mid = (y2 + y1) / 2
                  distance = Math.abs(mid - 325)

                }
           
              }
            }

            return y2;
          });

          var xD = x2 - x1
          var yD = y2 - y1
        var duration = (Math.sqrt((xD * xD) + (yD * yD)) / (Math.random() * (chart.data.incomingSpeed.min  - chart.data.incomingSpeed.max) + chart.data.incomingSpeed.min)) * 2500

        
        incomingPlane
          .append("path")
          .attr(
            "d",
            "m0,0c-0.44355,0 -0.84275,0.18332 -1.17933,0.51592c-0.33397,0.33267 -0.61055,0.80884 -0.84275,1.40377c-0.45922,1.18911 -0.74362,2.85964 -0.89755,4.86085c-0.15655,1.99729 -0.18263,4.32223 -0.11741,6.81118c-5.51835,2.26427 -16.7116,6.93857 -17.60916,7.98223c-1.19759,1.38937 -0.81143,2.98095 -0.32874,4.03902l18.39971,-3.74549c0.38616,4.88048 0.94192,9.7138 1.42461,13.50099c-1.80032,0.52703 -5.1609,1.56679 -5.85232,2.21255c-0.95496,0.88711 -0.95496,3.75718 -0.95496,3.75718l7.53,-0.61316c0.17743,1.23545 0.28701,1.95767 0.28701,1.95767l0.01304,0.06557l0.06002,0l0.13829,0l0.0574,0l0.01043,-0.06557c0,0 0.11218,-0.72222 0.28961,-1.95767l7.53164,0.61316c0,0 0,-2.87006 -0.95496,-3.75718c-0.69044,-0.64577 -4.05363,-1.68813 -5.85133,-2.21516c0.48009,-3.77545 1.03061,-8.58921 1.42198,-13.45404l18.18207,3.70115c0.48009,-1.05806 0.86881,-2.64965 -0.32617,-4.03902c-0.88969,-1.03062 -11.81147,-5.60054 -17.39409,-7.89352c0.06524,-2.52287 0.04175,-4.88024 -0.1148,-6.89989l0,-0.00476c-0.15655,-1.99844 -0.44094,-3.6683 -0.90277,-4.8561c-0.22699,-0.59493 -0.50356,-1.07111 -0.83754,-1.40377c-0.33658,-0.3326 -0.73578,-0.51592 -1.18194,-0.51592l0,0l-0.00001,0l0,0z"
          )
          .classed("inboundPlane", true)
          //.attr("transform", "translate(10, 10)")
          .style("fill", "white")
          .data(testData)
          .transition()
          .duration(duration)
          .ease("linear")
          .attrTween("transform", chart.translatePlaneAlong(line2.node()));

          chart.alert.forEach(function(d){d({domID: "aircraftCoordination"});});
      }

      return null;
    };

    chart.eventGenerator(options.generateEvent || chart.defaults.generateEvent);
    chart.raiseEvent = function () {


      //chart.data.collisionPlane.push({data: 1})
      var event = chart.generateEvent();
      if (event) {
        event();
      }
      var timeInMillisecondsToNextEvent = chart.eventFunction();
      if (null === timeInMillisecondsToNextEvent) return; // no more events
      setTimeout(chart.raiseEvent, timeInMillisecondsToNextEvent);
    };

    setTimeout(function () {
      setTimeout(chart.raiseEvent, chart.startFunction);
    }, 1);

    setInterval(function () {
      state = [];
      chart.tick.forEach(function (d) {
        d({ event: chart.mouseEvent, state: state });
      });
    }, chart.refresh);

    this.layer("plane", plane, {
      dataBind: function (data) {
        var chart = this.chart();
        chart.data = data;

        return this.selectAll("g").data(data.plane);
      },

      insert: function (data) {
    
        return this.append("path")
          .attr(
            "d",
            "m0,0c-0.44355,0 -0.84275,0.18332 -1.17933,0.51592c-0.33397,0.33267 -0.61055,0.80884 -0.84275,1.40377c-0.45922,1.18911 -0.74362,2.85964 -0.89755,4.86085c-0.15655,1.99729 -0.18263,4.32223 -0.11741,6.81118c-5.51835,2.26427 -16.7116,6.93857 -17.60916,7.98223c-1.19759,1.38937 -0.81143,2.98095 -0.32874,4.03902l18.39971,-3.74549c0.38616,4.88048 0.94192,9.7138 1.42461,13.50099c-1.80032,0.52703 -5.1609,1.56679 -5.85232,2.21255c-0.95496,0.88711 -0.95496,3.75718 -0.95496,3.75718l7.53,-0.61316c0.17743,1.23545 0.28701,1.95767 0.28701,1.95767l0.01304,0.06557l0.06002,0l0.13829,0l0.0574,0l0.01043,-0.06557c0,0 0.11218,-0.72222 0.28961,-1.95767l7.53164,0.61316c0,0 0,-2.87006 -0.95496,-3.75718c-0.69044,-0.64577 -4.05363,-1.68813 -5.85133,-2.21516c0.48009,-3.77545 1.03061,-8.58921 1.42198,-13.45404l18.18207,3.70115c0.48009,-1.05806 0.86881,-2.64965 -0.32617,-4.03902c-0.88969,-1.03062 -11.81147,-5.60054 -17.39409,-7.89352c0.06524,-2.52287 0.04175,-4.88024 -0.1148,-6.89989l0,-0.00476c-0.15655,-1.99844 -0.44094,-3.6683 -0.90277,-4.8561c-0.22699,-0.59493 -0.50356,-1.07111 -0.83754,-1.40377c-0.33658,-0.3326 -0.73578,-0.51592 -1.18194,-0.51592l0,0l-0.00001,0l0,0z"
          )
          .classed("safeUserPlane", true)
          .style("fill", "white");
      },

      events: {
        enter: function () {
          var chart = this.chart();
          return this;

        },
        update: function () {
          return this;
        },
        exit: function () {
          return this.remove();
        },
      },
    });
  },

  // This function is called when the player hits the button
  // Will show correct response or incorrect response and save it to the database

  planeAction: function (time) {
    var chart = this;

    this.response.forEach(function (d) {
      d({ correct: collision, domID: "aircraftCoordination", time: time });
    });
    clicked = true;
    if (collision) {
      if (x1 == 0 || x2 == 0) {
        chart.base
          .select("path.safeUserPlane")
          .style("fill", "green")
          .style("stroke", "green")
          .transition()
          .attr("transform", "translate(0, 150)");
      } else {
        chart.base
          .select("path.safeUserPlane")
          .style("fill", "green")
          .style("stroke", "green")
          .transition()
          .attr("transform", "translate(150, 0)");
      }
    } else {
      chart.base
        .select("path.safeUserPlane")
        .style("fill", "gold")
        .style("stroke", "gold");
    }
  },


  

  // If no arguments are passed returns the start function
  // Other wise sets the start function to the value passed in
  // The start function is the time in milliseconds until the first event happens
  // The start function is an integer value, not a function.
  startFunc: function (d) {
    if (!arguments.length) return this.startFunction;
    this.startFunction = d;
    return this;
  },

  alertGenerator: function (generateAlert) {
    if (!arguments.length) return this.generateAlert;
    this.generateAlert = generateAlert;
    return this;
  },

  eventGenerator: function (generateEvent) {
    if (!arguments.length) return this.generateEvent;
    this.generateEvent = generateEvent;
    return this;
  },

  // If no arguments are passed returns the event function
  // Other wise sets the event function to the value passed in
  // The event function is the time until the next event happens
  eventFunc: function (d) {
    if (!arguments.length) return this.eventFunction;
    this.eventFunction = d;
    return this;
  },

  // If no arguments are passed returns the refresh rate
  // Other wise sets the refresh rate to the value passed in
  // The refresh rate is the rate at which the state of the task gets recorded
  refreshRate: function (r) {
    if (!arguments.length) return this.refresh;
    this.refresh = r;
    return this;
  },

  // Binds a passed in function "f" to a passed in event name "name"
  when: function (name, f) {
    if (!this[name]) {
      this[name] = [];
    }
    this[name].push(f);
    return this;
  },

  distractor: function (dis) {
    if (!arguments.length) return this.distract;
    this.distract = dis;
    return this;
  },
});
