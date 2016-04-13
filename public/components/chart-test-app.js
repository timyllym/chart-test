Polymer({
    is: "chart-test-app",
    properties: {
        cols: {
            type: Array,
            value: [{"label": "Data", "type": "string"},{"label": "Value", "type": "number"}]
        },
        rows: {
            type: Array,
            value: [["Col1", 5.0],["Col2", 5.0],["Col3", 5.0]]
        }
    },
    resizeWindow() {
        document.getElementById("mychart").drawChart();
    },
    attached() {
        window.addEventListener("resize", this.resizeWindow);

        console.log( 'ready');
        var socket = io();
        socket.emit('test message', 'test');
        socket.on('test message', function(msg) {
            console.log( 'test message: ' + msg);
            this.rows = JSON.parse(msg);
            document.getElementById("mychart").rows = this.rows;
        });
    },
    detached() {
        window.removeEventListener("resize", this.resizeWindow);
    }
});
