/**
 * Created by andres on 1/14/15.
 */

function Measurement(label, min, max, omin, omax, val, units){
    this.units = units;
    this.label = label;
    this.min = min;
    this.max = max;
    this.val = val;
    this.optimal ={
        min: omin,
        max: omax
    };
}