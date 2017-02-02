var path_data = "M 0 3 L 1 3 L 1 0 L 5 5 L 1 10 L 1 7 L 0 7 z";

function get_generic_svg(selection, width, height, scaledWidth, scaledHeight, margin) {
	
	var svg = selection.append("svg")
		.attr("width", scaledWidth + margin.left + margin.right)
		.attr("height", scaledHeight + margin.top + margin.bottom)
		.append("g")
		.attr("transform", ["translate(" + (margin.left) + "," + margin.top + ")","scale("+(scaledWidth/width)+","+(scaledHeight/height)+")"]);
	
	x = d3.scale.linear()
		.range([0, width]);
	
	y = d3.scale.linear()
		.range([height,0]);
		
	background = svg.append("rect")
						.attr("class", "background")
						.attr("width", x(1))
						.attr("height", y(0))
						.attr("x", 0)
						.attr("y", 0);
		
	svg.x = x;
	svg.y = y;
	return svg;
}

function communication() {
	
	var numChannels = 4;
	
	function self(svg){
		svg.x.domain([0,4]);
		
		var yMax = config.channels.length+(config.channels.length-1)*.25+4;
		svg.y.domain([0,yScaleMax]);
		
		
		target = svg.append("rect")
					.attr("class", "communication")
					.attr("width", svg.x(2))
					.attr("height", svg.y(0)-svg.y(1))
					.attr("x", svg.x(1))
					.attr("y", target_y = svg.y(config.channels.length+(config.channels.length-1)*.25+3));
				
		target_name = svg.append("svg:text")
						.attr("text-anchor", "start")
						.text("chl 1")
						.attr("x", svg.x(1.2))
						.attr("y", target_y+svg.y(0)-svg.y(.75))
						.attr("class", "communication")
						.classed("alert",false);
						
		target_frequency = svg.append("svg:text")
						.attr("text-anchor", "end")
						.text("freq.")
						.attr("x", svg.x(2.8))
						.attr("y", target_y+svg.y(0)-svg.y(.75))
						.attr("class", "communication")
						.classed("alert",false);
		
		
		
		grps = svg.selectAll("g").data(d3.range(numChannels));
		
		new_grps = grps.enter()
						.append("g")
						.attr("transform", function(d,i){
							return "translate("+svg.x(1)+","+svg.y(yMax-3-i*1.25)+")";});
		
		new_grps.append("rect")
				.attr("class", "communication")
				.attr("width", svg.x(2))
				.attr("height", svg.y(0)-svg.y(1));
				
		frequency = new_grps.append("svg:text")
				.attr("text-anchor", "end")
				.text("freq.")
				.attr("x", svg.x(1.8))
				.attr("y", svg.y(0)-svg.y(.75))
				.attr("class", "communication");
				
		name = new_grps.append("svg:text")
				.attr("text-anchor", "start")
				.text(function(d){return "chl"+(d+1)})
				.attr("x", svg.x(.2))
				.attr("y", svg.y(0)-svg.y(.75))
				.attr("class", "communication");		
	}
	
	return self;
}
