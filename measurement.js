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