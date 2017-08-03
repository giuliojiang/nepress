var socket = require('./socket.js');
var file_server = require('./file_server.js');

file_server.start();
socket.start();

