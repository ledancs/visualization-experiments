/**
 * Created by andres on 1/27/15.
 */
function Area (svgId, measurements){
    this.measurements = measurements;
    var svg = document.getElementById(svgId);
    this.height = parseFloat(svg.getAttribute("height"));
    this.width = parseFloat(svg.getAttribute("width"));
    this.margin = 40;
    this.s = Snap("#" + svgId);
    this.draw();
}

Area.prototype.draw = function (){
    // depending on the width and height of the SVG
    // we draw the areas
    // height and width are known

    // define the min and max areas
    // no value should pass this areas

    // max
    var graphicWidth = this.width - 2 * this.margin; // the width of the plotting area
    var graphicHeight = this.height - 2 * this.margin; // the height of the plotting area
    var x0 = this.margin; // this is where we can begin to draw the plots
    var y0 = this.margin; // the same for the horizontal axis
    // move it a third of the margin out of the plotting area
    var maxArea = this.s.rect(x0 - this.margin/3, y0 - this.margin/3, graphicWidth + 2 * (this.margin/3), graphicHeight + 2 * (this.margin/3));
    maxArea.attr({
        fill: "none",
        stroke: "grey",
        strokeWidth: 2,
        strokeDasharray: "6 3"
    });
    this.s.text(x0, y0 - 18, "HIGH").attr({
        fill: "grey",
        fontSize: 12
    });

    // now the wellness zone
    // similar way to calculate the coordinates and variables
    var wZoneWidth = graphicWidth * 0.75; // since this is area we need to be careful with the proportions
    // there will be a quarter left for high values
    // a quarter zone for the wellness area
    // another quarter to define the end of the wellness area for lower values
    // the final quarter is for values lower than the wellness area
    var wZoneHeight = graphicHeight * 0.75;
    var wZoneX = x0 + graphicWidth/2 - wZoneWidth/2;
    var wZoneY = y0 + graphicHeight/2 - wZoneHeight/2;
    var wZoneArea = this.s.rect(wZoneX, wZoneY, wZoneWidth, wZoneHeight);
    wZoneArea.attr({
        fill: "green",
        opacity: 0.3
    });

    // at this point we need a complimentary white area for values lower than the wellness area
    var lZoneWidth = graphicWidth * 0.5;
    var lZoneHeight = graphicHeight * 0.5;
    var lZoneX = x0 + graphicWidth/2 - lZoneWidth/2;
    var lZoneY = y0 + graphicHeight/2 - lZoneHeight/2;
    var lZoneArea = this.s.rect(lZoneX, lZoneY, lZoneWidth, lZoneHeight);
    lZoneArea.attr({
        fill: "white"
    });

    // min
    var minAreaWidth = graphicWidth * 0.1; // this is the minimum width and height of a value
    // no value should have less than this area
    // graphicWidth already includes the margin reduction or discount
    var minAreaHeight = graphicHeight * 0.1;
    var minAreaX = graphicWidth/2 - minAreaWidth/2 + x0;
    var minAreaY = graphicHeight/2 - minAreaHeight/2 + y0;
    var minArea = this.s.rect(minAreaX, minAreaY, minAreaWidth, minAreaHeight);
    minArea.attr({
        fill: "none",
        stroke: "grey",
        strokeWidth: 2,
        strokeDasharray: "3 1"
    });
    this.s.text(minAreaX + 3, minAreaY + 18, "LOW").attr({
        fill: "grey",
        fontSize: 12
    });
    // calculate the total wellness area
    var wellnessArea = wZoneWidth * wZoneHeight; // area = base * height
    // now we have to subtract the area of the values that are lower values
    wellnessArea -= lZoneWidth * lZoneHeight;
    // now we want to know if and for how much is the base different from the height
    var c = wZoneWidth / wZoneHeight; // dimension coefficient c = b / h
    // c is the same for any rectangle created with these proportions
    // the width is the coefficient times the total area
    var measurement, scale, area, h, b, x, y, r, graphicalValue;
    // we are using a line to join the label to the figures to avoid overlapping
    var labelX, labelY, text, joinY1, joinY2, join;
    for(var i = 0; i < this.measurements.length; i ++){
        // begin
        measurement = this.measurements[i];
        // the total area is defined by the width and height of the wellness zone
        scale = wellnessArea / (measurement.optimal.max - measurement.optimal.min);
        graphicalValue = measurement.val - measurement.optimal.min; // how far is the value from the minimum recommended

        area = graphicalValue * scale; // multiplied by the scale
        // after we have the graphical representation of the value
        // we need to add the so called "lower zone" area to it
        // this is because we are using the difference in relation to the wellness zone
        // and more specifically to the lower limit of the zone
        area += (lZoneWidth * lZoneHeight);

        // we have an area, however we cannot determine unique values for the base and the height
        // given the dimensions of wellness zone we can determine the proportion between base and height
        h = Math.sqrt(area/c); // we obtain the height first of the shape ( square or rectangle )

        b = area / h; // we obtain the base given the area

        // now we have the dimensions of the shape so we can draw it
        // first we obtain x
        x = x0 + graphicWidth/2 - b/2; // we divide by two because we want to center the shape
        y = y0 + graphicHeight/2 - h/2;
        r = this.s.rect(x, y, b, h);
        r.attr({
            fill: "none",
            stroke: "black",
            strokeWidth: 1.5,
            opacity: 0.75
        });

        // start by placing the labels in the center and in one side, either left or right
        labelX = (i % 3 == 0) ? x + b * 0.65: x + b * 0.015;
        labelY = (i % 2 == 0) ? y - 25: y + h + 29;

        //labelY *= 0.1;

        text = this.s.text(labelX - 25, labelY, measurement.label + " " + measurement.val + " " + measurement.units);
        text.attr({
            fontSize: "15"
        });
        joinY1 = (i % 2 == 0) ? labelY + 2: labelY - 13;
        joinY2 = (i % 2 == 0) ? y: y + h;
        join = this.s.line(labelX + 5, joinY1, labelX + 5, joinY2);
        join.attr({
            stroke: "black",
            strokeWidth: "1.5"
        });

    }
};
