/**
 * Created by andres on 1/14/15.
 */

function LineLength(svgGroupId, measurement, width, height){
    this.measurement = measurement;
    this.svgGroup = document.getElementById(svgGroupId);
    this.width = width;
    this.height = height;
    this.margin = 1;
    this.SVGPointsPerUnitOfMeasurement = (this.width - 2 * this.margin)/(this.measurement.max - this.measurement.min);
    this.draw();
}

LineLength.prototype.draw = function () {

    var minCoordinates = this.getCoordinates(this.measurement.optimal.min);

    var maxCoordinates = this.getCoordinates(this.measurement.optimal.max);

    this.drawBox(maxCoordinates.x1, minCoordinates.x1);

    this.drawBox(minCoordinates.x2, maxCoordinates.x2);

    var val = this.drawLine(this.measurement.val, this.height/2, "black");
    this.valLine = val;
    this.svgGroup.appendChild(this.valLine);

    /*
    var min = this.drawLine(this.measurement.optimal.min, this.height/4, "grey");
    this.minLine = min;
    this.svgGroup.appendChild(this.minLine);


    var max = this.drawLine(this.measurement.optimal.max, 3 * (this.height/4), "grey");
    this.maxLine = max;
    this.svgGroup.appendChild(this.maxLine);
    */
};

LineLength.prototype.drawLine = function (val, y, color) {

    var line = document.createElementNS("http://www.w3.org/2000/svg", "line");

    var x = this.getCoordinates(val);

    line.setAttribute("x1", x.x1.toString());
    line.setAttribute("x2", x.x2.toString());

    line.setAttribute("y1", y.toString());
    line.setAttribute("y2", y.toString());

    line.setAttribute("stroke", color);
    line.setAttribute("stroke-width", "2.75");

    return line;

};

LineLength.prototype.getCoordinates = function (val) {
    var center = this.width/2;

    var length = val - this.measurement.min;
    length *= this.SVGPointsPerUnitOfMeasurement;

    var x1 = center - length/2;
    var x2 = center + length/2;

    return {x1: x1, x2: x2};
};

LineLength.prototype.drawBox = function (x1, x2) {
    var box = document.createElementNS("http://www.w3.org/2000/svg", "rect");

    var width = x2 - x1;

    var y = this.height/6;
    var height = y * 4;

    box.setAttribute("x", x1.toString());
    box.setAttribute("y", y.toString());
    box.setAttribute("width", width.toString());
    box.setAttribute("height", height.toString());

    box.setAttribute("fill", "grey");
    box.setAttribute("opacity", "0.5");

    this.box = box;
    this.svgGroup.appendChild(this.box);

};