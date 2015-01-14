/**
 * Created by andres on 1/14/15.
 */

function Measurement(min, max, omin, omax, val){
    this.min = min;
    this.max = max;
    this.val = val;
    this.optimal ={
        min: omin,
        max: omax
    };
}

function BoxAndDot (svgGroupId, measurement, width, height){
    this.measurement = measurement;
    this.svgGroup = document.getElementById(svgGroupId);
    this.width = width;
    this.height = height;
    this.margin = 1;
    this.SVGPointsPerUnitOfMeasurement = (this.width - 2 * this.margin)/(this.measurement.max - this.measurement.min);
    this.draw();
}

BoxAndDot.prototype.draw = function () {
    this.drawVerticalLine(0 + this.margin);
    this.drawVerticalLine(this.width - this.margin);
    this.drawBox();
    this.drawDot();
};

BoxAndDot.prototype.drawVerticalLine = function (x) {
    var line = document.createElementNS("http://www.w3.org/2000/svg", "line");

    line.setAttribute("x1", x.toString());

    var y1 = 0 + this.margin;
    line.setAttribute("y1", y1.toString());

    line.setAttribute("x2", x.toString());

    var y2 = this.height - this.margin;
    line.setAttribute("y2", y2.toString());

    line.setAttribute("stroke", "black");
    line.setAttribute("stroke-width", "2");

    this.minLine = line;
    this.svgGroup.appendChild(this.minLine);
};

BoxAndDot.prototype.drawBox = function () {
    var box = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    var x = this.measurement.optimal.min - this.measurement.min;
    x *= this.SVGPointsPerUnitOfMeasurement;
    var width = this.measurement.optimal.max - this.measurement.optimal.min;
    width *= this.SVGPointsPerUnitOfMeasurement;
    var y = 0 + this.margin;
    var height = this.height - this.margin;

    box.setAttribute("x", x.toString());
    box.setAttribute("y", y.toString());
    box.setAttribute("width", width.toString());
    box.setAttribute("height", height.toString());

    box.setAttribute("fill", "grey");
    box.setAttribute("opacity", "0.5");

    this.box = box;
    this.svgGroup.appendChild(this.box);

};

BoxAndDot.prototype.drawDot = function () {
    var dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");

    var x = this.measurement.val - this.measurement.min;
    x *= this.SVGPointsPerUnitOfMeasurement;

    var y = this.height / 2;
    y += this.margin;

    dot.setAttribute("cx", x.toString());
    dot.setAttribute("cy", y.toString());
    dot.setAttribute("r", "5");
    dot.setAttribute("stroke", "black");
    dot.setAttribute("stroke-width", "1.5");
    dot.setAttribute("fill", "white");

    this.dot = dot;
    this.svgGroup.appendChild(this.dot);


};