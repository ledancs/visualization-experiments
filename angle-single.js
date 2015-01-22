function AngleSingle (svgGroupId, measurements){
    this.measurements = measurements;
    this.svg = document.getElementById(svgGroupId);
    this.width = parseFloat(this.svg.getAttribute("width"));
    this.height = parseFloat(this.svg.getAttribute("height"));
    this.margin = 1;
    this.draw();
}

AngleSingle.prototype.draw = function (){

    // draw the top margin
    // 0 to 1000
    // from 400 to 600 is the optimal area

    // each measurement is 100 height
    // an additional 50 for the top and bottom margins
    // var svgHeight = 2 * y + height;
    // var svgWidth = x0 * 2 + width;
    var svgWidth = parseFloat(this.svg.getAttribute("width"));
    var svgHeight = parseFloat(this.svg.getAttribute("height"));
    // this.svg.setAttribute("height", svgHeight.toString());
    // this.svg.setAttribute("width", svgWidth.toString());

    var r0, r1, r2, r3;
    r0 = 225;
    r1 = 250;
    r2 = 450;
    r3 = 400;

    var valRad0 = 145;
    var valRad1 = 335;

    var centerX = svgWidth/6;
    var centerY = svgHeight/2;

    var x1 = centerX + Math.cos(Math.PI/2 - 0.2) * r0;
    var y1 = centerY - Math.sin(Math.PI/2 - 0.2) * r0;

    var x2 = centerX + Math.cos(Math.PI/2 - 0.2) * r3;
    var y2 = centerY - Math.sin(Math.PI/2 - 0.2) * r3;

    this.addMinMaxLine(x1, y1, x2, y2, 4);
    this.addMinMaxLabel(x1, y1 - 75, "HIGH", -77);

    var wellnessAngle = Math.PI/7;

    x1 = centerX + Math.cos(wellnessAngle) * r1;
    y1 = centerY - Math.sin(wellnessAngle) * r1;
    x2 = centerX + Math.cos(wellnessAngle) * r2;
    y2 = centerY - Math.sin(wellnessAngle) * r2;

    var path = "M" + x1.toString() + ", " + y1.toString();
    path += " L " + x2.toString() + " " + y2.toString();
    path += " A " + r2.toString() + " " + r2.toString();
    path += " 0 0 1";

    var x3 = centerX + Math.cos(-wellnessAngle) * r1;
    var y3 = centerY - Math.sin(-wellnessAngle) * r1;
    var x4 = centerX + Math.cos(-wellnessAngle) * r2;
    var y4 = centerY - Math.sin(-wellnessAngle) * r2;

    path += " " + x4.toString() + " " + y4.toString();
    path += " L " + x3.toString() + " " + y3.toString();

    path += " A " + r1.toString() + " " + r1.toString();
    path += " 0 0 0";
    path += " " + x1.toString() + " " + y1.toString();

    var wellnessZone = document.createElementNS("http://www.w3.org/2000/svg", "path");
    wellnessZone.setAttribute("d", path);
    wellnessZone.setAttribute("d", path);
    wellnessZone.setAttribute("fill", "rgb(150, 150, 150)");
    wellnessZone.setAttribute("opacity", "0.35");

    this.svg.appendChild(wellnessZone);

    // this.addMinMaxLine(x1, y1, x2, y2);

    // this.addMinMaxLine(x1, y1, x2, y2);

    x1 = centerX + Math.cos(-Math.PI/2 + 0.2) * r0;
    y1 = centerY - Math.sin(-Math.PI/2 + 0.2) * r0;
    x2 = centerX + Math.cos(-Math.PI/2 + 0.2) * r3;
    y2 = centerY - Math.sin(-Math.PI/2 + 0.2) * r3;

    this.addMinMaxLine(x1, y1, x2, y2, 4);
    this.addMinMaxLabel(x1 - 15, y1 + 70, "LOW", 77);

    var measurement, scale, angle, line, dot;

    for(var i = 0; i < this.measurements.length; i ++){
        measurement = this.measurements[i];
        // the angle goes from - radians to + radians so we multiply by 2 to get the full
        // spectrum of the angle
        scale = (wellnessAngle * 2) / (measurement.optimal.max - measurement.optimal.min);
        angle = measurement.val - measurement.optimal.min;
        angle *= scale;
        angle -= wellnessAngle;

        x1 = centerX + Math.cos(angle) * valRad0;
        y1 = centerY - Math.sin(angle) * valRad0;

        x2 = centerX + Math.cos(angle) * valRad1;
        y2 = centerY - Math.sin(angle) * valRad1;

        line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", x1.toString());
        line.setAttribute("y1", y1.toString());

        line.setAttribute("x2", x2.toString());
        line.setAttribute("y2", y2.toString());

        line.setAttribute("stroke", "black");
        line.setAttribute("stroke-width", "2");

        this.svg.appendChild(line);

        dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        dot.setAttribute("cx", x2.toString());
        dot.setAttribute("cy", y2.toString());
        dot.setAttribute("r", "4");
        dot.setAttribute("fill", "white");
        dot.setAttribute("stroke", "black");
        dot.setAttribute("stroke-width", "2");

        this.svg.appendChild(dot);

        this.addLabel(measurement,
            centerX + Math.cos(angle) * valRad1 * 1.015 ,
            centerY - Math.sin(angle) * valRad1 * 1.015);
    }



};

AngleSingle.prototype.addMinMaxLine = function (x1, y1, x2, y2, width) {
    var minLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
    minLine.setAttribute("x1", x1.toString());
    minLine.setAttribute("y1", y1.toString());
    minLine.setAttribute("x2", x2.toString());
    minLine.setAttribute("y2", y2.toString());
    minLine.setAttribute("stroke", "black");
    minLine.setAttribute("stroke-width", width.toString());
    this.svg.appendChild(minLine);
};

AngleSingle.prototype.addMinMaxLabel = function (textX, textY, text, angle) {
    var minText = document.createElementNS("http://www.w3.org/2000/svg", "text");

    minText.setAttribute("x", textX.toString());
    minText.setAttribute("y", textY.toString());
    minText.setAttribute("font-size", "20");
    var minTextNode = document.createTextNode(text);
    minText.appendChild(minTextNode);
    minText.setAttribute("transform", "rotate(" + angle + " " + textX.toString() + " " + textY.toString() + ")");

    var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    var x = textX - 5;
    var y = textY - 20;
    rect.setAttribute("fill", "white");
    rect.setAttribute("x", x.toString());
    rect.setAttribute("y", y.toString());
    rect.setAttribute("width", "50");
    rect.setAttribute("height", "25");
    // this.svg.appendChild(rect);
    rect.setAttribute("transform", "rotate(" + angle + " " + textX.toString() + " " + textY.toString() + ")");
    this.svg.appendChild(minText);
};

AngleSingle.prototype.addLabel = function (measurement, dotX, dotY) {
    var newText = document.createElementNS("http://www.w3.org/2000/svg", "text");

    var fontSize = 15;

    var x = dotX + fontSize;
    var y = dotY + fontSize/5

    newText.setAttribute("x", x.toString());
    newText.setAttribute("y", y.toString());
    newText.setAttribute("font-size", fontSize.toString());

    var textNode = document.createTextNode(measurement.label + ": " + measurement.val.toString() + " " + measurement.units);
    newText.appendChild(textNode);

    this.svg.appendChild(newText);
};