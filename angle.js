/**
 * Created by andres on 1/15/15.
 */

function Angle(svgGroupId, measurement, width, height){
    this.measurement = measurement;
    this.svgGroup = document.getElementById(svgGroupId);
    this.width = width;
    this.height = height;
    this.margin = 1;
    this.SVGPointsPerUnitOfMeasurement = (this.width - 2 * this.margin)/(this.measurement.max - this.measurement.min);
    this.draw();
}

Angle.prototype.draw = function () {
    var center = this.width/2;


};