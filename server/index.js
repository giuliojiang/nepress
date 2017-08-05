var socket = require('./socket.js');
var file_server = require('./file_server.js');
var handlers = require('./handlers.js');
var session_handlers = require('./handlers/session_handlers.js');

// Initialize handlers
session_handlers.init();

// Start servers
file_server.start();
socket.start();
