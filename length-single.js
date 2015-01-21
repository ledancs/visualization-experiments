function LengthSingle (svgGroupId, measurements, width, height){
    this.measurements = measurements;
    this.svg = document.getElementById(svgGroupId);
    this.width = parseFloat(this.svg.getAttribute("width"));
    this.height = parseFloat(this.svg.getAttribute("height"));
    this.margin = 1;
    this.draw();
}

LengthSingle.prototype.draw = function (){

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

    var box = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    var x, x0;
    x = x0 = svgWidth/3;

    var width = svgWidth/3;

    var y = 10;
    var height = this.measurements.length * 50;
    height += 25;

    box.setAttribute("x", x.toString());
    box.setAttribute("y", y.toString());
    box.setAttribute("width", width.toString());
    box.setAttribute("height", height.toString());

    box.setAttribute("fill", "rgb(150, 150, 150)");
    box.setAttribute("opacity", "0.35");
    // box.setAttribute("stroke-width", "1");
    // box.setAttribute("stroke", "rgb(160, 160, 160)");

    this.box = box;
    this.svg.appendChild(this.box);


    // for each measurement
    var scale = 1;
    var line, measurement;

    y = 25;
    y += 10;
    x = 0;

    for(var i = 0; i < this.measurements.length; i ++){
        measurement = this.measurements[i];
        scale = width / (measurement.optimal.max - measurement.optimal.min);
        x = measurement.val - measurement.optimal.min;
        x *= scale;
        x += x0;

        line = document.createElementNS("http://www.w3.org/2000/svg", "line");

        line.setAttribute("x1", "15");
        line.setAttribute("y1", y.toString());
        line.setAttribute("x2", x.toString());
        line.setAttribute("y2", y.toString());
        line.setAttribute("stroke", "black");
        line.setAttribute("stroke-width", "3.5");

        this.svg.appendChild(line);

        this.addLabel(measurement, x + 4.5, y);

        y += 50;
    }

    this.addMinMaxLine(15, height);
    this.addMinMaxLine(svgWidth - 15, height);

    //this.addMinMaxLabel(10, (height/2) - 5, "min");
    this.addMinMaxLabel(svgWidth - 20, (height/2) - 5, "max");

};

LengthSingle.prototype.addMinMaxLine = function (x, y) {
    var minLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
    minLine.setAttribute("x1", x.toString());
    minLine.setAttribute("y1", "0");
    minLine.setAttribute("x2", x.toString());
    minLine.setAttribute("y2", y.toString());
    minLine.setAttribute("stroke", "black");
    minLine.setAttribute("stroke-width", "2");
    this.svg.appendChild(minLine);
};

LengthSingle.prototype.addMinMaxLabel = function (textX, textY, text) {
    var minText = document.createElementNS("http://www.w3.org/2000/svg", "text");

    minText.setAttribute("x", textX.toString());
    minText.setAttribute("y", textY.toString());
    minText.setAttribute("font-size", "20");
    var minTextNode = document.createTextNode(text);
    minText.appendChild(minTextNode);
    minText.setAttribute("transform", "rotate(90 " + textX.toString() + " " + textY.toString() + ")");

    var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    var x = textX - 5;
    var y = textY - 20;
    rect.setAttribute("fill", "white");
    rect.setAttribute("x", x.toString());
    rect.setAttribute("y", y.toString());
    rect.setAttribute("width", "50");
    rect.setAttribute("height", "25");
    this.svg.appendChild(rect);
    rect.setAttribute("transform", "rotate(90 " + textX.toString() + " " + textY.toString() + ")");
    this.svg.appendChild(minText);
};

LengthSingle.prototype.addLabel = function (measurement, dotX, dotY) {
    var newText = document.createElementNS("http://www.w3.org/2000/svg", "text");

    var fontSize = 15;

    var x = dotX + fontSize;
    var y = dotY + fontSize/5

    newText.setAttribute("x", x.toString());
    newText.setAttribute("y", y.toString());
    newText.setAttribute("font-size", fontSize.toString());

    var textNode = document.createTextNode(measurement.label + ": " + measurement.val + " " + measurement.units);
    newText.appendChild(textNode);

    this.svg.appendChild(newText);
};