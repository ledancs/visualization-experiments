/**
 * Created by andres on 1/14/15.
 */

function Measurement(label, omin, omax, val, units){
    this.units = units;
    this.label = label;
    this.val = val;
    this.optimal ={
        min: omin,
        max: omax
    };
}