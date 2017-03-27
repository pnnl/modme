var GUIUtil = {
    getGenericSVG: function (selection, width, height, scaledWidth, scaledHeight, margin, id) {

        var innerScaledWidth = scaledWidth - margin.left - margin.right;
        var innerScaledHeight = scaledHeight - margin.top - margin.bottom;
        var svg = selection.append("svg")
            .style("vertical-align","top")
            .attr("width", scaledWidth)
            .attr("height", scaledHeight)
            .attr("id", id)
            .append("g")
            .attr("transform", ["translate(" + margin.left + "," + margin.top + ")", "scale(" + (innerScaledWidth / width) + "," + (innerScaledHeight / height) + ")"]);
        var x = d3.scale.linear()
                .range([0, width]);

        var y = d3.scale.linear()
                .range([height, 0]);

        var background = svg.append("rect")
                                .attr("class", "background")
                            .attr("width", width)
                            .attr("height", height)
                            .attr("x", 0)
                            .attr("y", 0);
        svg.w = width;
        svg.h = height;
        return svg;
    }
};

