var socket = require('./socket.js');
var file_server = require('./file_server.js');
var handlers = require('./handlers.js');
var session_handlers = require('./handlers/session_handlers.js');
var db_main = require('./db/main.js');

// Initialize databases
db_main.init();

// Initialize handlers
session_handlers.init();

// Start servers
file_server.start();
socket.start();
