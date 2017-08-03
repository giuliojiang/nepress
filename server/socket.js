var socketio = require('socket.io')();

var file_server = require('./file_server.js');

module.exports.start = function() {

    var https = file_server.getHttps();

    socketio.on('connection', function(socket) {
        console.info("A client connected " + socket);

        socket.on('disconnect', function() {
            console.info("A client disconnected " + socket);
        });

    });

    socketio.listen(https);
    console.info("Socket.io started");

};
