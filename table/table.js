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
    var minVal = 0;
    for(var i = 0; i < measurements.length; i ++){
        measurement = measurements[i];

        minVal = measurement.optimal.min < 0 ? 0: measurement.optimal.min;

        measurementDiv = groupDiv.append("div");

        measurementDiv.append("div")
            .text("" + measurement.label + " " + measurement.units + ": ")
            .attr("class", "label");

        numbersDiv = measurementDiv.append("div");

        numbersDiv.selectAll("div")
            .data([minVal, measurement.optimal.max, measurement.val])
            .enter()
            .append("div")
            .text(String)
            .attr("class", "number");

        measurementDiv.append("div")
            .html("&nbsp;")
            .style("clear", "both");

    }
}