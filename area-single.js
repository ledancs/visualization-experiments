function AreaSingle (svgGroupId, measurements){
    this.measurements = measurements;
    this.svg = document.getElementById(svgGroupId);
    this.width = parseFloat(this.svg.getAttribute("width"));
    this.height = parseFloat(this.svg.getAttribute("height"));
    this.margin = 20;
    this.dasharray = ["10,10,5,5,5,10", "5,5", "15,15"];
    this.dasharrayIndex = 0;
    this.draw();
}

AreaSingle.prototype.draw = function (){
    // wellness zone
    this.drawWellnessZone();
    // now we compute for each measurement the area of the square
    var measurement;
    var scale = 0;
    var origin = 0;
    var size = 0;
    for(var i = 0; i < this.measurements.length; i ++){
        measurement = this.measurements[i];
        // the full scale is in the wellnessArea property
        scale = this.wellnessZone / (measurement.optimal.max - measurement.optimal.min);
        // for each measurement there is a different scale
        // now that we have the scale we remember to obtain the square of that value
        // as this is the size of one side of the equally-sided square
        size = measurement.val - measurement.optimal.min;
        size *= scale;
        // since this size is only the difference between the optimal min and max values
        // we must add the size of the minimum optimal value to preserve the aspect ratio
        size += this.min;
        // now we multiply the size by the total width
        size *= this.width;
        // determine the origin coordinates of the square
        // the total width of the svg minus the side divided by two is the origin point
        origin = (this.width - size)/2;
        this.addValBox(origin, size);
        // now we need to add the labels
        this.addLabel(measurement, origin, origin);
    }
};

AreaSingle.prototype.drawWellnessZone = function () {
    // split the width in equal parts
    // twice the start parameters plus the size has to be equal to 1
    this.min = 0.4;
    this.max = 0.8;
    // the width of this box is a portion of the total svg width
    // the rest divided by two is where it should start
    var start = (this.width - (this.max * this.width))/2;
    this.addZoneBox(start, this.width * this.max, "grey", 0.35);
    // recalculate the starting point or coordinates of origin for the small box
    start = (this.width - (this.min * this.width))/2;
    this.addZoneBox(start, this.width * this.min, "white", 1);

    // since this is a square the total wellness area is
    // one side of the square to the power of 2
    // ( this.width * 0.6 - this.width * 35 ) ^ 2
    // to keep the values linear we only use the difference
    this.wellnessZone = this.max - this.min;
    console.log(this.wellnessZone);
};

AreaSingle.prototype.addZoneBox = function (start, size, color, opacity) {
    var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("x", start.toString());
    rect.setAttribute("y", start.toString());
    rect.setAttribute("width", size.toString());
    rect.setAttribute("height", size.toString());
    rect.setAttribute("fill", color);
    rect.setAttribute("stroke", "none");
    rect.setAttribute("opacity", opacity.toString());
    this.svg.appendChild(rect);
};

AreaSingle.prototype.getDasharray = function () {
    var dasharray = this.dasharray[this.dasharrayIndex % this.dasharray.length];
    this.dasharrayIndex++;
    return dasharray;
};

AreaSingle.prototype.addValBox = function (start, size) {
    var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("x", start.toString());
    rect.setAttribute("y", start.toString());
    rect.setAttribute("width", size.toString());
    rect.setAttribute("height", size.toString());
    rect.setAttribute("fill", "none");
    rect.setAttribute("stroke", "black");
    rect.setAttribute("stroke-width", "3");
    rect.setAttribute("stroke-dasharray", this.getDasharray());
    this.svg.appendChild(rect);
};


AreaSingle.prototype.addLabel = function (measurement, dotX, dotY) {
    var newText = document.createElementNS("http://www.w3.org/2000/svg", "text");

    var fontSize = 15;

    var x = dotX - 5;
    var y = dotY + fontSize/5

    newText.setAttribute("x", x.toString());
    newText.setAttribute("y", y.toString());
    newText.setAttribute("font-size", fontSize.toString());
    var text = measurement.label + ": " + measurement.val.toString() + " " + measurement.units;
    var textNode = document.createTextNode(text);
    newText.appendChild(textNode);

    // now add the semi transparent background
    var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    var backgroundPositionY = y - fontSize;
    rect.setAttribute("x", x.toString());
    rect.setAttribute("y", backgroundPositionY.toString());
    rect.setAttribute("fill", "white");
    var width = text.length * fontSize * 0.588;
    rect.setAttribute("width", width.toString());
    var height = fontSize + fontSize/5;
    rect.setAttribute("height", height.toString())
    rect.setAttribute("opacity", "1")
    this.svg.appendChild(rect);
    this.svg.appendChild(newText);
};