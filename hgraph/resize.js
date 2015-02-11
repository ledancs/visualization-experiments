/**
 * Created by andres on 2/11/15.
 */

function resizeSVG(fun){
    var svgContainer = document.getElementById("hgraphContainer");
    while (svgContainer.firstChild) {
        svgContainer.removeChild(svgContainer.firstChild);
    }
    var width;
    var height;
    if (typeof (window.innerWidth) == 'number') {
        width = window.innerWidth;
        height = window.innerHeight;
    } else {
        if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
            width = document.documentElement.clientWidth;
            height = document.documentElement.clientHeight;
        } else {
            if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
                width = document.body.clientWidth;
                height = document.body.clientHeight;
            }
        }
    }
    svgContainer.setAttribute("width", (width * 0.98).toString());
    svgContainer.setAttribute("height", (height * 0.96).toString());
    fun();
}
