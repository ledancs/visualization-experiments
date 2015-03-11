/**
 * Created by andres on 3/5/15.
 */

function Table(title, measurements){

    var groupDiv = d3.select("#container").append("div").attr("class", "group");

    groupDiv.append("h1")
        .text("" + title);

    groupDiv.append("hr");


    groupDiv.append("div")
        .html("&nbsp;")
        .attr("class", "label");

    groupDiv.append("div")
        .text("Min")
        .attr("class", "numberHeader");

    groupDiv.append("div")
        .text("Max")
        .attr("class", "numberHeader");

    groupDiv.append("div")
        .text("Value")
        .attr("class", "number");

    groupDiv.append("div")
        .html("&nbsp;")
        .style("clear", "both");

    var measurement;
    var dataset = [];
    var measurementDiv, numbersDiv;

    for(var i = 0; i < measurements.length; i ++){
        measurement = measurements[i];
		
		if(measurement.optimal.min < 0){
			measurement.optimal.min = 0;
		}
		
		if(measurement.label == "Depression" || 
			measurement.label == "Stress Recovery")
		{
			measurement.units = "(index)";
		}
		
		if(measurement.label == "Weekly Active Days" ||
			measurement.label == "Muscular force")
			measurement.optimal.max = " - ";
		
		if(measurement.label == "Optimism"){
			measurement.units = "(1 to 24)";
		}
		
		if(measurement.label == "Fitness Index"){
			measurement.units = "(1 to 120)";
		}
		
		if(measurement.label == "Depression"){
			measurement.units = "(0 to 30) DEPS";
		}
		
		if(measurement.label == "Balance" || measurement.label == "Muscular endurance"){
			measurement.units = "(0 to 6)";
		}
		
		if(measurement.label == "Stress Recovery"){
			measurement.optimal.max = " - ";
		}
		
		if(measurement.optimal.max == 20000){
			measurement.optimal.max = " - ";
		}

        measurementDiv = groupDiv.append("div");

        measurementDiv.append("div")
            .text("" + measurement.label + " " + measurement.units + ": ")
            .attr("class", "label");

        numbersDiv = measurementDiv.append("div");

        numbersDiv.selectAll("div")
            .data([measurement.optimal.min, measurement.optimal.max, measurement.val])
            .enter()
            .append("div")
            .text(String)
            .attr("class", "number");

        measurementDiv.append("div")
            .html("&nbsp;")
            .style("clear", "both");

    }
}