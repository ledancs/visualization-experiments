/**
 * Created by andres on 1/29/15.
 */
function GroupedMs(name, measurements){
    this.name = "";
    this.measurements = new Array();

    this.name = name;
    this.measurements = measurements;
}

function hgraph(svgId, groupedMs){
    this.groupedMs = new Array();

    this.groupedMs = groupedMs; // grouped measurements
    // groupedMs = { name: "name", measurements: [m1, m2, m3] }
    var svg = document.getElementById(svgId);
    this.width = parseFloat(svg.getAttribute("width"));
    this.height = parseFloat(svg.getAttribute("height"));
    this.margin = 7;
    this.s = Snap('#' + svgId);
    // the wellness zone
    this.r0 = this.width * 0.1; // the smallest radius
    this.r1 = this.width * 0.15; // the next radius
    // the limit of the circle
    this.r2 = this.width * 0.165;
    this.r3 = this.width * 0.3; // where we place the category name
    this.draw();
}

hgraph.prototype.draw = function () {
    // we receive a group of measurements grouped by categories
    // first we divide the circle in as many slices as measurements and then we add the sections
    var group; // iterator for the grouped measurements
    var total = 0; // total number of measurements
    for (var i = 0; i < this.groupedMs.length; i ++){
        group = this.groupedMs[i].measurements; // assign the array of measurements
        for(var j = 0; j < group.length; j++){
            total++;
        }
    }



    // now we divide the circle in as many measurements as we have
    // we can also start drawing the sections
    var centerX = this.width * 0.525; // the center of the circle
    var centerY = this.height * 0.475;

    /*this.s.circle(centerX, centerY, this.r1).attr({
        stroke: "none",
        fill: "green",
        opacity: 0.3
    });

    this.s.circle(centerX, centerY, this.r0).attr({
        stroke: "none",
        fill: "white"
    });*/

    var scale = 0;
    var angle = 0; // the angle where we will place each measurement
    var r = 0; // in the hGraph, the value is represented by the radius at which we place
    // the measurement
    var delta = (Math.PI * 2) / total; // this is how much we will increment the angles

    // to place each measurement
    // the coordinates of the value
    var valX = 0; // the x of the value
    var valY = 0; // the y of the value
    var measurement; // iterator for each measurement
    var circle; // the measurement representation as a dot or circle on the hGraph

    // path for the sections
    var wellnessZone, x1, x2, x3, x4, y1, y2, y3, y4, path;
    // labels
    var text, labelX, labelY, bbox, transformX, transformY, labelADelta0, labelADelta1, labelA;

    var sectionSpace = 0.05; // space between the sections
    for (var i = 0; i < this.groupedMs.length; i ++){
        group = this.groupedMs[i].measurements; // assign the array of measurements
        // angle - delta
        // collect the values with this angle for the wellness section
        x1 = centerX + Math.cos(angle - delta/2 + sectionSpace) * this.r0;
        y1 = centerY - Math.sin(angle - delta/2 + sectionSpace) * this.r0;
        x2 = centerX + Math.cos(angle - delta/2 + sectionSpace) * this.r1;
        y2 = centerY - Math.sin(angle - delta/2 + sectionSpace) * this.r1;

        path = "M" + x1.toString() + ", " + y1.toString();
        path += " L " + x2.toString() + " " + y2.toString();
        path += " A " + this.r1.toString() + " " + this.r1.toString();
        path += " 0 0 0";
        // start iterating through the measurements of this group
        labelADelta0 = angle;
        for(var j = 0; j < group.length; j++){

            measurement = group[j];
            // the available space is the difference of the two radii
            scale = (this.r1 - this.r0) / (measurement.optimal.max - measurement.optimal.min);
            r = (measurement.val - measurement.optimal.min) * scale;
            r += this.r0; // do not forget to add the small radius as we are calculating
            // the difference or distance from the minimum optimal value
            valX = centerX + Math.cos(angle) * r; // the origin is the center of the circle
            valY = centerY - Math.sin(angle) * r; // for y it is the opposite since the top is 0 and the bottom is the height

            // save the points for the polygon
            measurement.graphicalElement = {
                x: valX,
                y: valY,
                angle: angle,
                r: r
            };

            angle += delta; // increase the angle to the next measurement
        }
        labelADelta1 = angle;
        // angle - delta
        // draw the wellness zone
        x3 = centerX + Math.cos(angle - delta/2 - sectionSpace) * this.r0;
        y3 = centerY - Math.sin(angle - delta/2 - sectionSpace) * this.r0;
        x4 = centerX + Math.cos(angle - delta/2 - sectionSpace) * this.r1;
        y4 = centerY - Math.sin(angle - delta/2 - sectionSpace) * this.r1;

        path += " " + x4.toString() + " " + y4.toString();
        path += " L " + x3.toString() + " " + y3.toString();

        path += " A " + this.r0.toString() + " " + this.r0.toString();
        path += " 0 0 1";
        path += " " + x1.toString() + " " + y1.toString();

        wellnessZone = this.s.path(path);
        wellnessZone.attr({
            fill: "green",
            opacity: "0.3",
            stroke: "white",
            strokeWidth: 1
        });

        // label
        labelADelta0 -= delta/2 - sectionSpace;
        labelADelta1 -= delta/2 - sectionSpace;
        labelA = labelADelta0 + (labelADelta1 - labelADelta0) / 2;
        labelX = centerX + Math.cos(labelA) * this.r3;
        labelY = centerY - Math.sin(labelA) * (this.r3 * 0.825);
        text = this.s.text(labelX, labelY, this.groupedMs[i].name);
        text.attr({
            fontSize: "19.5px"
        });

        bbox = text.getBBox();
        transformX = "-" + ((1 - Math.cos(labelA)) * 100).toString();
        if(Math.cos(labelA) < 0){
            transformX = "-" + Math.abs( bbox.width - ( (1 + Math.cos(labelA)) * 75 ) ).toString();
        }
        transformY = "" + (65 * Math.sin(labelA)).toString();
        if(Math.sin(labelA) < 0){
            transformY = "-" + (bbox.height + Math.abs(Math.sin(labelA) * 15)).toString();
        }
        text.transform("t" + transformX + "," + transformY);
    }

    // now we add the polygon, dots ( circles ), and labels
    var graphicalElement; // iterator

    var polygonPoints = new Array();
    for (var i = 0; i < this.groupedMs.length; i ++){
        group = this.groupedMs[i].measurements; // assign the array of measurements
        for(var j = 0; j < group.length; j++){
            measurement = group[j];
            graphicalElement = measurement.graphicalElement;
            polygonPoints.push(graphicalElement.x);
            polygonPoints.push(graphicalElement.y);
        }


    }

    // draw the polygon
    this.s.polygon(polygonPoints).attr({
        fill: "grey",
        stroke: "none",
        opacity: 0.35
    });
    this.s.polygon(polygonPoints).attr({
        fill: "none",
        stroke: "black",
        strokeWidth: "1"
    });

    var t; // the transformation variable
    var labelR; // the radius of the label
    var margin; // a small margin around the dot for the label
    // variables for the repositioning of the group titles or big labels
    var gBoxX1, gBoxY1, gBoxX2, gBoxY2;
    for (var i = 0; i < this.groupedMs.length; i ++){
        group = this.groupedMs[i].measurements; // assign the array of measurements
        labelR = 0; // reset the radius of the label
        for(var j = 0; j < group.length; j++) {
            measurement = group[j];
            graphicalElement = measurement.graphicalElement;

            valX = graphicalElement.x;
            valY = graphicalElement.y;
            angle = graphicalElement.angle;
            r = graphicalElement.r;


            circle = this.s.circle(valX, valY, 4);
            circle.attr({
                stroke: "black",
                fill: "white",
                strokeWidth: 2
            });
            // now the labels
            // check:
            // http://robsneuron.blogspot.fi/2013/11/svg-text-in-boxes-with-snapsvg.html
            labelR = Math.max(labelR, Math.max(r * 1.015, this.r2));
            labelX = centerX + Math.cos(angle) * labelR;
            labelY = centerY - Math.sin(angle) * labelR;

            text = this.s.text(labelX, labelY, measurement.label + " " + measurement.val + " " + measurement.units);
            text.attr({
                fontSize: "10.75px"
            });

            margin = Math.cos(angle) * 5;

            transformX = margin.toString();
            bbox = text.getBBox();

            if (Math.cos(angle) < 0) {
                transformX = "-" + (bbox.width + Math.abs(margin)).toString();
            }

            margin = Math.sin(angle) * 7;

            transformY = "-" + margin.toString();
            if (Math.sin(angle) < 0) {
                transformY = "" + (bbox.height + Math.abs(margin)).toString();
            }
            text.transform("t" + transformX + "," + transformY);
            measurement.svg = {
                bbox: bbox,
                text: text
            };

            // check if we need a line from the dot to the label
            // less than the half of the middle point between the two radii
            // that is the center of the wellness zone
            if(r < this.r0 + (this.r1 - this.r0) * 0.65){
                // draw the line from r to labelR
                this.s.line(
                    centerX + Math.cos(angle) * r * 1.05,
                    centerY - Math.sin(angle) * r * 1.05,
                    centerX + Math.cos(angle) * labelR,
                    centerY - Math.sin(angle) * labelR).attr({
                    stroke: "grey",
                    strokeWidth: 1.25
                });
                console.log("line");
            }


            /*
             if(Math.cos(angle) >= 0 && Math.sin(angle) >= 0){
             text.transform("t15,0" + "r-20," + valX + "," + valY);
             } else if(Math.cos(angle) > 0 && Math.sin(angle) < 0){
             text.transform("t15," + (bbox.height - 3).toString() + "r20," + valX + "," + valY);
             } else if(Math.cos(angle) < 0 && Math.sin(angle) > 0){
             text.transform("t-" + (bbox.width + 10).toString() + ",-30r20");
             } else if(Math.cos(angle) < 0 && Math.sin(angle) < 0){
             text.transform("t-"
             + (bbox.width + 10).toString()
             + "," + (bbox.height + bbox.width * 0.15).toString()
             + "r-20");
             }
            var degrees = angle * (180/Math.PI);
            t = Snap.matrix().rotate(-degrees, valX, valY);
            text.transform(t);*/
        }
        // draw a square around the labels of the same category
        // console.log("" + this.groupedMs[i].name);
        // to determine the full area that is comprised of the labels
        for(var j = 0; j < group.length; j++) {
            measurement = group[j];
            bbox = measurement.svg.bbox;
            gBoxX1 = bbox.x;
            gBoxX2 = bbox.x + bbox.width;
            gBoxY1 = bbox.y - bbox.height;
            gBoxY2 = bbox.y;
            // console.log("x1 " + gBoxX1 + " | y1 " + gBoxY1 + " || x2 " + gBoxX2 + " | " + gBoxY2);
        }

    }

};