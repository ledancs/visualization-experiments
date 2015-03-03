/**
 * Created by andres on 3/3/15.
 */

/**
 * Created by andres on 3/3/15.
 */


(function() {
    var series = [];
    var data = {
        start: new Date().getTime()
    }
    document.onmousemove = handleMouseMove;
    function handleMouseMove(event) {
        var dot, eventDoc, doc, body, pageX, pageY;

        event = event || window.event; // IE-ism

        // If pageX/Y aren't available and clientX/Y are,
        // calculate pageX/Y - logic taken from jQuery.
        // (This is to support old IE)
        if (event.pageX == null && event.clientX != null) {
            eventDoc = (event.target && event.target.ownerDocument) || document;
            doc = eventDoc.documentElement;
            body = eventDoc.body;

            event.pageX = event.clientX +
            (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
            (doc && doc.clientLeft || body && body.clientLeft || 0);
            event.pageY = event.clientY +
            (doc && doc.scrollTop  || body && body.scrollTop  || 0) -
            (doc && doc.clientTop  || body && body.clientTop  || 0 );
        }

        // Use event.pageX / event.pageY here
        series.push({
            t: new Date().getTime(),
            x: event.pageX,
            y: event.pageY
        });
    }
    data.series = series;

    document.body.addEventListener('keypress', handleKeyPress);

    function handleKeyPress (evt) {

        var k = evt ? evt.which : window.event.keyCode;

        if (k == 32) {
            data.end = new Date().getTime();
            
            console.log(JSON.stringify(data));
        }
    }
})();