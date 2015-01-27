function PaasSingle (svgGroupId, measurements, width, height){
    this.measurements = measurements;
    this.svg = document.getElementById(svgGroupId);
    this.width = parseFloat(this.svg.getAttribute("width"));
    this.height = parseFloat(this.svg.getAttribute("height"));
    this.margin = this.width/10;
    this.draw();
}

PaasSingle.prototype.draw = function (){
    
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
    var height = 80;
    var box = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    var x, x0;
    var width = svgWidth * 0.25;
    x = x0 = (svgWidth - width)/2;

    var y = 5;

    var wellnessZoneHeight =  height * this.measurements.length + height/2;

    box.setAttribute("x", x.toString());
    box.setAttribute("y", y.toString());
    box.setAttribute("width", width.toString());
    box.setAttribute("height", wellnessZoneHeight.toString());

    box.setAttribute("fill", "green");
    box.setAttribute("opacity", "0.3");
    // box.setAttribute("stroke-width", "1");
    // box.setAttribute("stroke", "rgb(160, 160, 160)");

    this.box = box;
    this.svg.appendChild(this.box);

    
    // for each measurement
    var scale = 1;
    var dot, measurement, line;
    var radius = 5;
    var linePositionY = 25;
    var length = this.width - this.margin;
    
    y = height / 2;
    y += 10;
    y += radius/2;
    x = 0;
    
    for(var i = 0; i < this.measurements.length; i ++){
        measurement = this.measurements[i];
        scale = width / (measurement.optimal.max - measurement.optimal.min);
        x = measurement.val - measurement.optimal.min;
        x *= scale;
        x += x0;
        x -= radius/2;
        /*
        line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", this.margin.toString());

        line.setAttribute("x2", length.toString());
        linePositionY = y;
        line.setAttribute("y1", linePositionY.toString());
        line.setAttribute("y2", linePositionY.toString());
        line.setAttribute("stroke", "black");
        line.setAttribute("stroke-width", "2");
        this.svg.appendChild(line);
        */

        dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");    

        dot.setAttribute("cx", x.toString());
        dot.setAttribute("cy", y.toString());
        dot.setAttribute("r", radius.toString());
        dot.setAttribute("stroke", "black");
        dot.setAttribute("stroke-width", "2");
        dot.setAttribute("fill", "white");

        this.svg.appendChild(dot);

        this.addLabel(measurement, x + radius/2, y + radius/2);

        y += height;
    }

    this.addMinMaxLine(this.margin, height * this.measurements.length + height/2);
    this.addMinMaxLine(svgWidth - this.margin   ,  height * this.measurements.length + height/2);

    this.addMinMaxLabel(this.margin - 25, ((height * this.measurements.length)/2) - 17, "LOW");
    this.addMinMaxLabel(svgWidth - this.margin + 15, ((height * this.measurements.length)/2) - 15, "HIGH");

};

PaasSingle.prototype.addMinMaxLine = function (x, y) {
    var minLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
    minLine.setAttribute("x1", x.toString());
    minLine.setAttribute("y1", "10");
    minLine.setAttribute("x2", x.toString());
    minLine.setAttribute("y2", y.toString());
    minLine.setAttribute("stroke", "black");
    minLine.setAttribute("stroke-width", "2");
    this.svg.appendChild(minLine);
};

PaasSingle.prototype.addMinMaxLabel = function (textX, textY, text) {
    var minText = document.createElementNS("http://www.w3.org/2000/svg", "text");

    minText.setAttribute("x", textX.toString());
    minText.setAttribute("y", textY.toString());
    minText.setAttribute("font-size", "21");
    var minTextNode = document.createTextNode(text);
    minText.appendChild(minTextNode);
    minText.setAttribute("transform", "rotate(90 " + textX.toString() + " " + textY.toString() + ")");

    /*var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    var x = textX - 5;
    var y = textY - 20;
    rect.setAttribute("fill", "white");
    rect.setAttribute("x", x.toString());
    rect.setAttribute("y", y.toString());
    rect.setAttribute("width", "60");
    rect.setAttribute("height", "25");
    this.svg.appendChild(rect);
    rect.setAttribute("transform", "rotate(90 " + textX.toString() + " " + textY.toString() + ")");*/
    this.svg.appendChild(minText);
};

PaasSingle.prototype.addLabel = function (measurement, dotX, dotY) {
    var newText = document.createElementNS("http://www.w3.org/2000/svg", "text");

    var fontSize = 15;

    var x = dotX - fontSize;
    var y = dotY + fontSize * 1.35;

    newText.setAttribute("x", x.toString());
    newText.setAttribute("y", y.toString());
    newText.setAttribute("font-size", fontSize.toString());

    var textNode = document.createTextNode(measurement.label + ": " + measurement.val + " " + measurement.units);
    newText.appendChild(textNode);

    this.svg.appendChild(newText);
};