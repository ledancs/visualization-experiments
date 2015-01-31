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
    this.r1 = this.width * 0.165; // the next radius
    // the limit of the circle
    this.r2 = this.width * 0.215;
    this.r3 = this.width * 0.41; // where we place the category name
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
    var centerX = this.width * 0.5265; // the center of the circle
    var centerY = this.height * 0.45;

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
    // polygon points
    var points = new Array();

    for (var i = 0; i < this.groupedMs.length; i ++){
        group = this.groupedMs[i].measurements; // assign the array of measurements
        // angle - delta
        // collect the values with this angle for the wellness section
        x1 = centerX + Math.cos(angle - delta/2) * this.r0;
        y1 = centerY - Math.sin(angle - delta/2) * this.r0;
        x2 = centerX + Math.cos(angle - delta/2) * this.r1;
        y2 = centerY - Math.sin(angle - delta/2) * this.r1;

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
            points.push({
                x: valX,
                y: valY,
                angle: angle,
                measurement: measurement
            });

            angle += delta; // increase the angle to the next measurement
        }
        labelADelta1 = angle;
        // angle - delta
        // draw the wellness zone
        x3 = centerX + Math.cos(angle - delta/2) * this.r0;
        y3 = centerY - Math.sin(angle - delta/2) * this.r0;
        x4 = centerX + Math.cos(angle - delta/2) * this.r1;
        y4 = centerY - Math.sin(angle - delta/2) * this.r1;

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
            strokeWidth: 4
        });

        // label
        labelADelta0 -= delta/2;
        labelADelta1 -= delta/2;
        labelA = labelADelta0 + (labelADelta1 - labelADelta0) / 2;
        labelX = centerX + Math.cos(labelA) * this.r3;
        labelY = centerY - Math.sin(labelA) * (this.r3 * 0.825);
        text = this.s.text(labelX, labelY, this.groupedMs[i].name);
        text.attr({
            fontSize: "15.5px"
        });

        bbox = text.getBBox();
        transformX = "-" + (bbox.width * 0.15).toString();
        if(Math.cos(labelA) < 0){
            transformX = "-" + (bbox.width * 1.15).toString();
        }
        transformY = "" + (bbox.height * 2.5).toString();;
        if(Math.sin(labelA) < 0){
            transformY = "-" + (bbox.height * 1.75).toString();
        }
        text.transform("t" + transformX + "," + transformY);
    }

    // now we add the polygon, dots ( circles ), and labels
    var point; // iterator
    var polygonPoints = new Array();
    for(var i = 0; i < points.length; i ++){
        point = points[i];
        polygonPoints.push(point.x);
        polygonPoints.push(point.y);
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


    for(var i = 0; i < points.length; i ++){
        point = points[i];
        valX = point.x;
        valY = point.y;
        angle = point.angle;
        measurement = point.measurement;

        circle = this.s.circle(valX, valY, 4);
        circle.attr({
            stroke: "black",
            fill: "white",
            strokeWidth: 2
        });
        // now the labels
        // check:
        // http://robsneuron.blogspot.fi/2013/11/svg-text-in-boxes-with-snapsvg.html
        labelX = centerX + Math.cos(angle) * this.r2;

        labelY = centerY - Math.sin(angle) * this.r2;
        text = this.s.text(labelX, labelY, measurement.label + " " + measurement.val + " " + measurement.units);
        text.attr({
            fontSize: "10px"
        });

        transformX = "0";
        bbox = text.getBBox();

        if(Math.cos(angle) < 0){
            transformX = "-" + bbox.width.toString();
        }
        transformY = "7";
        if(Math.sin(angle) < 0){
            transformY = "-" + (bbox.height * 0.15).toString();
        }
        text.transform("t" + transformX + "," + transformY);
    }

};