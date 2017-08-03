var socketio = require('socket.io')();

module.exports.start = function() {

    socketio.on('connection', function(socket) {
        console.info("A client connected " + socket);

        socket.on('disconnect', function() {
            console.info("A client disconnected " + socket);
        });

    });

    socketio.listen(29772);

};
