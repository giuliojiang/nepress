var socketio = require('socket.io')();

var file_server = require('./file_server.js');
var session = require('./session.js');
var msgutil = require('./util/msgutil.js');
var handlers = require('./handlers.js');

module.exports.start = function() {

    var https = file_server.getHttps();

    socketio.on('connection', function(socket) {
        console.info("A client connected " + socket);

        // Disconnect handler
        socket.on('disconnect', function() {
            console.info("A client disconnected " + socket);
        });

        // Messages handler
        socket.on('nepress_txt', function(msgobj) {
            console.info("Received a message ["+JSON.stringify(msgobj)+"] from the client. Dispataching to event handler");
            handlers.handle(msgobj, socket);
        });

    });

    socketio.listen(https);
    console.info("Socket.io started");

};
