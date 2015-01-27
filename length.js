/**
 * Created by andres on 1/14/15.
 */

function Length (svgId, measurements, width, height){
    this.measurements = measurements;
    this.svg = document.getElementById(svgId);
    this.width = parseFloat(this.svg.getAttribute("width"));
    this.height = parseFloat(this.svg.getAttribute("height"));
    this.margin = 7;
    this.rowSize = 75;
    this.s = Snap('#' + svgId);
    this.draw();
}

Length.prototype.draw = function (){
    // the wellness zone starts here
    var wZoneHeight = this.rowSize * this.measurements.length;
    var graphicWidth = 2 * (this.width/3); // the total width where we can plot
    var wZoneWidth = graphicWidth/3 - this.margin;
    var x0 = this.width/3; // the starting point of the visualization
    x0 += this.margin; // remember to add the margin also here
    var y0 = this.margin; // the same for the y axis
    var wZoneX = x0 + graphicWidth/3; // we begin from x0
    // then we add one third of the remaining width
    // the wellness zone will be another third and
    // the last third comes from the values that are higher than the recommended
    // wZoneWidth *= 2;
    var b = this.s.rect(wZoneX, y0, wZoneWidth, wZoneHeight);
    b.attr({
        fill: "green",
        opacity: 0.3
    });
    // adjust the height of the SVG element
    var svgHeight = wZoneHeight + 2 * this.margin;
    this.svg.setAttribute("height", svgHeight.toString());
    var measurement; // the iterator
    var scale = 0; // the scale for each measurement

    var x = 0; // longitudinal coordinate to plot the circle
    var radius = 5; // the size of the radius of the circle
    var y = this.margin + this.rowSize/2; // we have to add the margin to the y coordinate with half of the row size
    // to place the line in the middle of the space
    var line; // the line that represents the value of the measurement in the plot
    var label; // really the value only and perhaps the units
    var measurementName; // the name of the measurement
    for(var i = 0; i < this.measurements.length; i ++){
        measurement = this.measurements[i];
        // add the label first
        measurementName = this.s.text(this.margin, y, measurement.label);
        measurementName.attr({
            fontSize: "12px",
            fill: "black"
        });
        scale = wZoneWidth / (measurement.optimal.max - measurement.optimal.min);
        x = measurement.val - measurement.optimal.min;
        x *= scale; // multiply by the scale
        x += wZoneX; // add the wellness zone x coordinate

        line = this.s.line(x0 - this.margin, y - this.margin/2, x, y - this.margin/2);
        line.attr({
            stroke: "black",
            strokeWidth: 2.75,
            opacity: 0.75
        });

        label = this.s.text(x - 3 * radius, y + 1.75 * this.margin, measurement.val + " " + measurement.units);
        label.attr({
            fontSize: "9.75px",
            fill: "black"
        });
        y += this.rowSize;
    }

    // add low and high lines
    var lowLine = this.s.line(x0 - this.margin, this.margin + 20,
        x0 - this.margin, svgHeight - this.margin);
    lowLine.attr({
        stroke: "grey",
        strokeWidth: 2,
        strokeDasharray: "6 4"
    });
    // x0 includes already a margin
    // wZoneWidth also includes the margin
    // but not graphicWidth
    var highLine = this.s.line(x0 + graphicWidth - 2 * this.margin, this.margin + 20,
        x0 + graphicWidth - 2 * this.margin, svgHeight - this.margin);
    highLine.attr({
        stroke: "grey",
        strokeWidth: 2.3,
        strokeDasharray: "6 4"
    });
    // now we can add the LOW and HIGH legend
    var lowLabel = this.s.text(x0 - 1.5 * this.margin, this.margin * 2.5, "LOW");
    lowLabel.attr({
        fontSize: "14px",
        fill: "grey"
    });
    var highLabel = this.s.text(x0 + graphicWidth - 6.5 * this.margin, this.margin * 2.5, "HIGH");
    highLabel.attr({
        fontSize: "14px",
        fill: "grey"
    });
};
