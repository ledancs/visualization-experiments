function AreaSingle (svgGroupId, measurements){
    this.measurements = measurements;
    this.svg = document.getElementById(svgGroupId);
    this.width = parseFloat(this.svg.getAttribute("width"));
    this.height = parseFloat(this.svg.getAttribute("height"));
    this.margin = 20;
    this.draw();
}

AreaSingle.prototype.draw = function (){
    // max and min squares
    this.addMinMaxBox(this.margin, this.width - 40);
    this.addMinMaxBox(this.width/3, this.width/3);
};

AreaSingle.prototype.addMinMaxBox = function (start, size) {
    var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");

    rect.setAttribute("x", start.toString());
    rect.setAttribute("y", start.toString());
    rect.setAttribute("width", size.toString());
    rect.setAttribute("height", size.toString());

    rect.setAttribute("stroke-width", "2");
    rect.setAttribute("fill", "none");
    rect.setAttribute("stroke", "black");

    this.svg.appendChild(rect);
};

AreaSingle.prototype.addMinMaxLabel = function (textX, textY, text, angle) {
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

AreaSingle.prototype.addLabel = function (measurement, dotX, dotY) {
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