d3.chart("CrossHairTracking", {
	initialize: function(options = {}){
		var chart = this;
		
        chart.h = chart.base.h;
        chart.w = chart.base.w;
		
		let num = 2000;
		//let range = 6;

		let ax = [];
		let ay = [];
		
		var ballLocX = chart.w/2;
		var ballLocY = chart.h/2;
		var ballXSize = 64;
		var ballYSize = 64;
		
		var dragging = false;
		var inTrackingArea = true;
		var mousePos = [0, 0];
		var firstTime = true;
		
		//data arrays 
		chart.tick = [];
		
		//chart.x = d3.scale.linear().domain([0,8]);
        //chart.y = d3.scale.linear().domain([0,8]);
		//translate along?
		
		var targetRegion = chart.base.append("g")
			.attr("width", chart.w)
            .attr("height", chart.h);
		
		var crossHairMarks = chart.base.append("g")
			.attr("width", chart.w)
            .attr("height", chart.h);
			
		var trackingArea = chart.base.append("rect")
            .attr("width", chart.w)
            .attr("height", chart.h)
            .attr("id", "tracking_area")
            .style("fill-opacity", 0)
			.on("mousemove", function(d){
				//if !dragging in interval
				mousePos = d3.mouse(this);
				
				if(dragging){
					ballLocX = mousePos[0];
					ballLocY = mousePos[1];
				}
			})
			.on("mouseup", function(d){
				//This section is needed in case the user stops dragging while cursor is not over the ball.
				//This can happen if the mouse is being moved quickly

				dragging = false;
				curserBall.select("#curserShape").attr("xlink:href","/static/ModME/cursor.png");
			});
			
		
		//insert layer for curser
		var curserBall = chart.base.append("g")
			.attr("width", chart.w)
            .attr("height", chart.h);
		
		function atChtInterval(){
			if(firstTime){
				firstTime = false;
				chart.alert.forEach(function(d){d({domID: "Center", arg: chart.w/2 + "," + chart.h/2})});
				chart.alert.forEach(function(d){d({domID: "UseJoystick", arg: chart.data.useJoystick})});
			}
			
			//var theAxis;
			
			var gamepad = navigator.getGamepads()[0];
			
			var joystickSettings = chart.data.JoystickParams[0];
			if(chart.data.useJoystick && gamepad != null && gamepad.buttons[joystickSettings.trigger].value == 1){
				
				curserBall.select("#curserShape").attr("xlink:href","/static/ModME/cursorSelected.png");
				
				//ballLocX 
				var axisX = gamepad.axes[joystickSettings.xAxis];
				//handle different zero
				var ballLocXJoy;
				if(axisX < joystickSettings.zeroX){
					var numer = axisX - joystickSettings.zeroX;
					var denom = joystickSettings.minX - joystickSettings.zeroX;
					var addThis = (numer/denom)*-1*joystickSettings.scale;
					ballLocXJoy = ballLocX + addThis;
				} else{
					var numer = axisX - joystickSettings.zeroX;
					var denom = joystickSettings.maxX - joystickSettings.zeroX;
					var addThis = (numer/denom)*joystickSettings.scale;
					ballLocXJoy = ballLocX + addThis;
				}
					
				//var ballLocXJoy = ballLocX + (axisX-joystickSettings.zeroX)*joystickSettings.scale;
				//make sure ball doesnt go out of bounds
				if(ballLocXJoy < chart.w && ballLocXJoy > 0){
					ballLocX = ballLocXJoy;
				}
				
				//ballLocY
				var axisY = gamepad.axes[joystickSettings.yAxis];
				var ballLocXJoy;
				if(axisY < joystickSettings.zeroY){
					var numer = axisY - joystickSettings.zeroY;
					var denom = joystickSettings.minY - joystickSettings.zeroY;
					var addThis = (numer/denom)*-1*joystickSettings.scale;
					//we are subtracting instead of adding because we want to invert the direction of the joystick on the y axis
					ballLocYJoy = ballLocY - addThis;
				} else{
					var numer = axisY - joystickSettings.zeroY;
					var denom = joystickSettings.maxY - joystickSettings.zeroY;
					var addThis = (numer/denom)*joystickSettings.scale;
					ballLocYJoy = ballLocY - addThis;
				}

				//var ballLocYJoy = ballLocY + ((-1*axisY)-joystickSettings.zeroY)*joystickSettings.scale;
				if(ballLocYJoy < chart.h && ballLocYJoy > 0){ 
					ballLocY = ballLocYJoy;
				}
			} else if (!dragging){
				curserBall.select("#curserShape").attr("xlink:href","/static/ModME/cursor.png");
			} 
			
			//if dragging handled in mousemove
			// || chart.data.useJoystick
			if(!dragging){
				
				var max = chart.data.jitterSpeed;;
				var min = -1 * chart.data.jitterSpeed;
				
				var newLocX = ballLocX + (Math.random() * (max - min) + min);
				var newLocY = ballLocY + (Math.random() * (max - min) + min);
				
				var stayInDistractorBounds = false;
				if(chart.data.distractor){
					var ballCenterX = newLocX - (ballXSize/2);
					var ballCenterY = newLocY - (ballYSize/2);
					
					var rangeX = chart.data.rangeX;
					var rangeY = chart.data.rangeY;
					
					if(chart.data.regionType == "circle"){
						var dist = Math.sqrt((newLocX - chart.w/2)*(newLocX - chart.w/2) + (newLocY - chart.h/2)*(newLocY - chart.h/2));
						if(dist >= (chart.h/rangeY)*chart.data.targetRegion[0].radius){
							stayInDistractorBounds = true;
						}
					}else{
						var distX = Math.abs(ballCenterX - chart.w/2);
						var distY = Math.abs(ballCenterY - chart.h/2);
						var inBounds = (distX <(chart.w/rangeX)*(chart.data.targetRegion[0].radius)) && (distY < (chart.h/rangeY)*(chart.data.targetRegion[0].radius));
						if(!inBounds){
							stayInDistractorBounds = true;
						}
					}
				}
				
				//don't allow the curser to jitter out of bounds
				if(newLocX < chart.w && newLocX > 0 && !stayInDistractorBounds){
					ballLocX = newLocX;
				}
					
				//don't allow the curser to jitter out of bounds
				if(newLocY < chart.h && newLocY > 0 && !stayInDistractorBounds){
					ballLocY = newLocY;
				}
			}
			
			var ballCenterX = ballLocX - (ballXSize/2);
			var ballCenterY = ballLocY - (ballYSize/2);
			
			let shape = curserBall.select("#curserShape")
			.attr("x", function(d){return ballCenterX;})
			.attr("y", function(d){return ballCenterY;});
			
			var rangeX = chart.data.rangeX;
			var rangeY = chart.data.rangeY;
			
			//send alert when we cross the tracking area line
			if(chart.data.regionType == "circle"){
				var dist = Math.sqrt((ballCenterX - chart.w/2)*(ballCenterX - chart.w/2) + (ballCenterY - chart.h/2)*(ballCenterY - chart.h/2));
				//if cursor was in tracking area
				if(inTrackingArea){
					if(dist >= (chart.h/rangeY)*chart.data.targetRegion[0].radius){
						inTrackingArea = false;
						chart.alert.forEach(function(d){d({domID: "outside", arg: ""})});
					}
				} else{
					if(dist <= (chart.h/rangeY)*chart.data.targetRegion[0].radius){
						inTrackingArea = true;
						chart.alert.forEach(function(d){d({domID: "inside", arg: ""})});
					}
				}
			} else{//rectangle
				var distX = Math.abs(ballLocX - chart.w/2);
				var distY = Math.abs(ballLocY - chart.h/2);
				var inBounds = (distX <(chart.w/rangeX)*(chart.data.targetRegion[0].radius)) && (distY < (chart.h/rangeY)*(chart.data.targetRegion[0].radius));
				
				if(inTrackingArea && !inBounds){
					inTrackingArea = false;
					chart.alert.forEach(function(d){d({domID: "outside", arg: ""})});
				}
				else if(!inTrackingArea && inBounds){
					inTrackingArea = true;
					chart.alert.forEach(function(d){d({domID: "inside", arg: ""})});
				}
			}
			
			var draggingStatus = dragging || (chart.data.useJoystick && gamepad != null && gamepad.buttons[0].value == 1);
            chart.tick.forEach(function(d){d({event: {x: mousePos[0],y: mousePos[1]}, curser: {state:draggingStatus, x: ballLocX, y: ballLocY}});});
			
			setTimeout(atChtInterval,chart.refresh);
        }
		setTimeout(function(){setTimeout(atChtInterval,chart.refresh);}, 1);
		
		this.layer("crosshairmarks", crossHairMarks, {
			dataBind: function(data){
                var chart = this.chart();

                chart.data = data;
				this.selectAll("#crossHairMarkShapes").remove();

                return this.selectAll("g").data(data.crossHairMarks);
            
			},
			insert: function(data){
				var chart = this.chart();
				var rangeX = chart.data.rangeX;
				var rangeY = chart.data.rangeY;

				//shift by 10 to adjust for font size
                return this.append("text").attr("class", "crossHairTracking")
				.attr("id", "crossHairMarkShapes")
				.attr("x", function(d){return d.locX*(chart.w/rangeX) - 10;})
                .attr("y", function(d){return d.locY*(chart.h/rangeY) + 10;})
                .text(function(d){return "+";})
				.style("user-select", "none")
				.style("pointer-events", "none");
	
			}, 
			events: {
				"enter": function(){
				
					this.select("text");

				},
				"update": function(){
					var chart = this.chart();
					var rangeX = chart.data.rangeX;
					var rangeY = chart.data.rangeY;
				
					this.select("text").attr("x", function(d){return d.locX*(chart.w/rangeX) + 10;})
                        .attr("y", function(d){return d.locY*(chart.h/rangeY) - 10;});
				},
				"exit": function(){
                    return this.remove();
                }
			}
			
		});
		
		this.layer("targetregion", targetRegion, {
			dataBind: function(data){
                var chart = this.chart();

                chart.data = data;
				this.select("#targetRegionShape").remove();

                return this.selectAll("g").data(data.targetRegion);
            
			},
			insert: function(data){
				var chart = this.chart();
				var rangeY = chart.data.rangeY;
				var rangeX = chart.data.rangeX;
				
				if(chart.data.regionType == "circle"){
					return this.append("circle").attr("class", "crossHairTracking")
					.attr("id", "targetRegionShape")
					.attr("cx", chart.w/2)
					.attr("cy", chart.h/2)
					.attr("r", function(d){return (chart.h/rangeY)*d.radius;})
					.style("stroke-width", "2px")
					.style("stroke", "yellow")
					.style("fill", "none");
					
				}else{
					return this.append("rect").attr("class", "crossHairTracking")
					.attr("id", "targetRegionShape")
					.attr("x", function(d){return (chart.w/2) - (d.radius*chart.w)/(rangeX);})
					.attr("y", function(d){return(chart.h/2) - (d.radius*chart.h)/(rangeY);})
					.attr("width", function(d){return (chart.w/rangeX)*d.radius*2;})
					.attr("height", function(d){return (chart.h/rangeY)*d.radius*2;})
					.style("stroke-width", "2px")
					.style("stroke", "yellow")
					.style("fill", "none");;
				}
	
			}, 
			events: {
				"enter": function(){
				
					this.select("circle");

				},
				"update": function(){
					var chart = this.chart();
					var rangeX = chart.data.rangeX;
					var rangeY = chart.data.rangeY;
				
					this.select("circle").attr("x", function(d){return (chart.w/2) - (d.radius*chart.w)/(rangeX);})
                        .attr("y", function(d){return(chart.h/2) - (d.radius*chart.h)/(rangeY);});
				},
				"exit": function(){
                    return this.remove();
                }
			}
			
		});
		
		this.layer("curserball", curserBall, {
			dataBind: function(data){
				var chart = this.chart();

                chart.data = data;
				this.select("#curserShape").remove();

                return this.selectAll("g").data(data.curserBall);
            
			},
			insert: function(data){
				var chart = this.chart();
				var rangeX = chart.data.rangeX;
				var rangeY = chart.data.rangeY;
				ballXSize = chart.data.curserBall[0].width;
				ballYSize = chart.data.curserBall[0].height;
				
                return this.append("image")
				.attr("class", "crossHairTracking")
				.attr("id", "curserShape")
				.attr("xlink:href", "/static/ModME/cursor.png")
				.attr("x", function(d){return chart.w/2;})
				.attr("y", function(d){return chart.h/2;})
				.attr("width", function(d){return d.width;})
				.attr("height", function(d){return d.height;})
				.on("mousemove", function(d){
					//if !dragging in interval
					mousePos = d3.mouse(this);
					
					if(dragging){
						ballLocX = mousePos[0];
						ballLocY = mousePos[1];
					}
				})
				.on("mousedown", function(d){
					dragging = true;
					curserBall.select("#curserShape").attr("xlink:href","/static/ModME/cursorSelected.png");
				})
				.on("mouseup", function(d){
					dragging = false;
					curserBall.select("#curserShape").attr("xlink:href","/static/ModME/cursor.png");
				});
				
				/*
				.call(d3.drag()
					.on("start", function(d){dragging = true;})
					.on("drag", function(d){ballLocX = d3.event.x; ballLocY = d3.event.y;})
					.on("end",function(d){dragging = false;})
					
				)
				.on("mousedown", function(d){
					dragging = true;
				})
				.on("mouseup", function(d){
					dragging = false;
				});
				*/
				
			},
			events: {
				"enter": function(){
					this.select("rect");
				},
				"update": function(){
					//ballLocX += Math.random(-range, range);
					//ballLocY += Math.random(-range, range);
					
					//this.select("image")
					//.attr("x", function(d){return ballLocX - (d.width/2);})
					//.attr("y", function(d){return ballLocY - (d.height/2);});
					
				},
				"exit": function(){
                    return this.remove();
                }
			}
		});//end of curserball layer
		
		
	},
	
	// If no arguments are passed returns the refresh rate
    // Other wise sets the refresh rate to the value passed in
    // The refresh rate is how often the tanks update their values
    refreshRate: function(r){
        if(!arguments.length)
            return this.refresh;
        this.refresh = r;
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

    alertGenerator: function(generateAlert) {
        if (!arguments.length)
            return this.generateAlert;
        this.generateAlert = generateAlert;
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
	when: function(name, f){
        if(!this[name]){
            this[name] = [];
        }
        this[name].push(f);
        return this;
    },
});