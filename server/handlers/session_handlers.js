var handlers = require('./../handlers.js');
var session = require('./../session.js');
var msgutil = require('./../util/msgutil.js');

// Handles session_manual_refresh
var sessionManualRefresh = function(msgobj, socket) {
    console.info("handler sessionManualRefresh received " + JSON.stringify(msgobj));
    var token = session.createNewSession(socket);

    var msg = {
        token: token
    };
    msgutil.send(socket, "new_token", msg);
};

module.exports.init = function() {

    handlers.registerHandler("session_manual_refresh", sessionManualRefresh);

};
