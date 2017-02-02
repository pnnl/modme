var comm_data = setup.Communication.data;
var comm_param = comm_data.parameters;

var comm_svg = get_generic_svg(
        d3.select("#"+setup.Communication.container),
        650, 650,
        JSON.parse(document.getElementById(setup.Communication.container).style.width.substr(0,document.getElementById(setup.Communication.container).style.width.length-2)), 
    	JSON.parse(document.getElementById(setup.Communication.container).style.height.substr(0,document.getElementById(setup.Communication.container).style.height.length-2)),
        {top: scale(.03), right: scale(.03), bottom: scale(.03), left: scale(.03)},
        "comm_svg");

var comm_chart = comm_svg.chart("Communication").eventFunc(function(){t = eval(comm_data.eventFunction); return t;}).startFunc(comm_data.startFunction).responseTime(comm_data.response);


comm_chart.when("alert", function(args){data.push({time: (new Date()).getTime()-startTime, sessionID: sessionID, eventType: "alert", chart: "communication", arg: "target:"+args.target+";current:"+args.current, id: args.domID, table: "Event"})});
comm_chart.when("timeout", function(args){data.push({time: (new Date()).getTime()-startTime, sessionID: sessionID, eventType: "timeout", chart: "communication", arg: "target:"+args.target+";current:"+args.current, id: args.domID, table: "Event"})});
comm_chart.when("response", function(args){data.push({time: (new Date()).getTime()-startTime, sessionID: sessionID, eventType: "input", chart: "communication", 
    arg: (args.correct) ? "currect:"+args.correct+";channel:"+args.channel+";frequency:"+args.frequency : "channel:"+args.channel+";frequency:"+args.frequency,
    id: args.domID, table: "Event"})});

comm_chart.draw(comm_data);