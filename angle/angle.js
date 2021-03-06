function Angle (svgGroupId, measurements){
    this.measurements = measurements;
    var svg = document.getElementById(svgGroupId);
    this.height = parseFloat(svg.getAttribute("height"));
    this.externalMargin = 7;
    this.innerMargin = 2;
    this.s = Snap("#" + svgGroupId);
    this.draw();
}

Angle.prototype.draw = function (){

    // draw the top margin
    // 0 to 1000
    // from 400 to 600 is the optimal area

    // each measurement is 100 height
    // an additional 50 for the top and bottom margins
    // var svgHeight = 2 * y + height;
    // var svgWidth = x0 * 2 + width;

    // this.svg.setAttribute("height", svgHeight.toString());
    // this.svg.setAttribute("width", svgWidth.toString());

    var r0, r1, r2, r3;
    // indicators
    r0 = 140; // the initial point of the low and high indicators
    r2 = 240; // the end point for the indicators
    // wellness zone
    r1 = 140; // the initial point of the wellness zone
    r3 = 245; // the end point for the wellness zone
    // the radius of the actual values
    var valRad0 = 140;
    var valRad1 = 215;
    var valRadL = 250;

    var centerX = this.externalMargin;
    var centerY = this.height - this.externalMargin;

    var x1 = centerX + Math.cos(Math.PI/2 * 0.975) * r0;
    var y1 = centerY - Math.sin(Math.PI/2 * 0.975) * r0;

    var x2 = centerX + Math.cos(Math.PI/2 * 0.975) * r3;
    var y2 = centerY - Math.sin(Math.PI/2 * 0.975) * r3;

    this.addMinMaxLine(x1 - this.innerMargin, y1, x2 - this.innerMargin, y2);
    this.addMinMaxLabel(x2 - this.innerMargin, y2, "HIGH", Math.PI/2 * 0.975);

    // PI divided by 12 means that this is the minimum step.
    // Half of those will not be used so we end up with 6 parts of PI
    // from 0 to PI/6
    // the wellness zone will be from PI/6 to PI/3
    var angle0 = Math.PI/6;
    var angle1 = Math.PI/3;

    x1 = centerX + Math.cos(angle0) * r1;
    y1 = centerY - Math.sin(angle0) * r1;
    x2 = centerX + Math.cos(angle0) * r2;
    y2 = centerY - Math.sin(angle0) * r2;

    var path = "M" + x1.toString() + ", " + y1.toString();
    path += " L " + x2.toString() + " " + y2.toString();
    path += " A " + r2.toString() + " " + r2.toString();
    path += " 0 0 0";

    var x3 = centerX + Math.cos(angle1) * r1;
    var y3 = centerY - Math.sin(angle1) * r1;
    var x4 = centerX + Math.cos(angle1) * r2;
    var y4 = centerY - Math.sin(angle1) * r2;

    path += " " + x4.toString() + " " + y4.toString();
    path += " L " + x3.toString() + " " + y3.toString();

    path += " A " + r1.toString() + " " + r1.toString();
    path += " 0 0 1";
    path += " " + x1.toString() + " " + y1.toString();

    var wellnessZone = this.s.path(path);
    wellnessZone.attr({
        fill: "green",
        opacity: "0.3"
    });

    // this.addMinMaxLine(x1, y1, x2, y2);

    // this.addMinMaxLine(x1, y1, x2, y2);

    x1 = centerX + Math.cos(0) * r0;
    y1 = centerY - Math.sin(0) * r0;
    x2 = centerX + Math.cos(0) * r3;
    y2 = centerY - Math.sin(0) * r3;

    var xL, yL, angleL;
    var plotElements = [];
    this.addMinMaxLine(x1, y1 + this.innerMargin, x2, y2 + this.innerMargin);
    this.addMinMaxLabel(x2, y2 + this.innerMargin, "LOW", 0);

    var measurement, scale, angle, pointer;
    var text;

    for(var i = 0; i < this.measurements.length; i ++) {
        measurement = this.measurements[i];
        // the angle goes from - radians to + radians so we multiply by 2 to get the full
        // spectrum of the PI/6 to PI/3 so we take this space as the full spectrum of
        // the distribution of values
        scale = (angle1 - angle0) / (measurement.optimal.max - measurement.optimal.min);
        angle = measurement.val - measurement.optimal.min;
        angle *= scale;
        angle += angle0; // this is the minimum value from which we count the optimal range or the wellness zone

        text = measurement.label + ": " + measurement.val.toString() + " " + measurement.units;

        plotElements.push({
            angle: angle,
            text: text
        });
    }
    // sort the angles
    plotElements.sort(Angle.compare);

    angle = null; // clean this iterator
    // plot the labels equally distributed among the space
    var delta = (angle1 - angle0) / plotElements.length;
    angleL = angle0; // increment by delta on each iteration starting from the initial angle
    if(plotElements.length == 2){
        angleL = plotElements[0].angle - Math.PI / 50;
        delta = Math.PI / 50;
    }

    for(var i = 0; i < plotElements.length; i ++){
        angle = plotElements[i].angle;
        x1 = centerX + Math.cos(angle) * valRad0;
        y1 = centerY - Math.sin(angle) * valRad0;

        x2 = centerX + Math.cos(angle) * valRad1;
        y2 = centerY - Math.sin(angle) * valRad1;

        pointer = this.s.line(x1, y1, x2, y2);
        pointer.attr({
            stroke: "black",
            strokeWidth: 1
        });

        /*circle = this.s.circle(centerX + Math.cos(angle) * (valRad1 - 12),
            centerY - Math.sin(angle) * (valRad1 - 12), 4).attr({
            fill: "white",
            stroke: "black",
            strokeWidth: 2
        });*/
        // detect if there is a collision with the labels by measuring the difference between the angles
        // adjust angleL as needed

        // angleL = this.adjustLabelAngle(angle, angles);
        angleL += delta;

        // angles.push(angleL);
        xL = centerX + Math.cos(angleL) * valRadL;
        yL = centerY - Math.sin(angleL) * valRadL;

        this.addLabel(plotElements[i].text, xL, yL, angleL);

        // draw a line to the label
        this.s.line(
            x2,
            y2,
            xL,
            yL).attr({
                stroke: "grey",
                strokeWidth: 1,
                opacity: 0.5
            });
    }
};

Angle.compare = function(a, b) {
    if (a.angle < b.angle)
        return -1;
    if (a.angle > b.angle)
        return 1;
    return 0;
};

Angle.prototype.adjustLabelAngle = function (angle, angles) {
    var angleL = angle;
    var minimumSeparation = Math.PI / 100;

    for(var i = 0; i < angles.length; i ++){
        if(angleL >= angles[i] - minimumSeparation && angleL <= angles[i]){
            // this angle is overlapping from the lower part
            angleL -= minimumSeparation;
        } else if( angleL <= angles[i] + minimumSeparation && angleL >= angles[i]){
            angleL += minimumSeparation;
        }

    }
    return angleL;
};

Angle.prototype.addMinMaxLine = function (x1, y1, x2, y2) {
    var line = this.s.line(x1, y1, x2, y2);
    line.attr({
        stroke: "grey",
        strokeWidth: 5,
        strokeDasharray: "10 5"
    });
    // check: http://svg.dabbles.info/snaptut-dasharray
};

Angle.prototype.addMinMaxLabel = function (x, y, text, angle) {
    var tx = this.s.text(x + 10, y + 5, text);
    tx.attr({
        fontSize: "15px",
        fill: "grey"
    });
    var degrees = angle * (180/Math.PI);
    var t = Snap.matrix()
        .rotate(-degrees, x, y);
    tx.transform(t);
    this.rotateText(angle, x, y, tx);
};

Angle.prototype.addLabel = function (text, x, y, angle) {
    var tx = this.s.text(x + 5, y + 5, text);
    tx.attr({
        fontSize: "11.7"
    });
    this.rotateText(angle, x, y, tx);
};

Angle.prototype.rotateText = function (angle, x, y, tx) {
    var degrees = angle * (180/Math.PI);
    var t = Snap.matrix()
        .rotate(-degrees, x, y);

    tx.transform(t);
};