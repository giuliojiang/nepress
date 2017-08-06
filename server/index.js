var socket = require('./socket.js');
var file_server = require('./file_server.js');
var handlers = require('./handlers.js');
var sessionHandlers = require('./handlers/session_handlers.js');
var registerHandlers = require('./handlers/register_handlers.js');
var loginHandlers = require('./handlers/login_handlers.js');
var db_main = require('./db/main.js');

// Initialize databases
db_main.init();

// Initialize handlers
sessionHandlers.init();
registerHandlers.init();
loginHandlers.init();

// Start servers
file_server.start();
socket.start();
