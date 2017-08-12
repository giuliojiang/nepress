var handlers = require('./../handlers.js');
var session = require('./../session.js');
var msgutil = require('./../util/msgutil.js');

// Handles session_manual_refresh
var sessionManualRefresh = function(msgobj, socket) {
    console.info("handler sessionManualRefresh received " + JSON.stringify(msgobj));

    var oldToken = msgutil.getToken(msgobj);

    // If session still exists, do nothing
    if (session.sessionExists(msgutil.getToken(msgobj))) {
        session.getSessionProperty(oldToken, "username", function(err, val) {
            if (err) {
                console.error(err);
                return;
            } else {
                var msg = {
                    token: oldToken,
                    username: val
                };
                msgutil.send(socket, "new_token", msg);
                return;
            }
        });
        return;
    }

    var token = session.createNewSession(socket);

    var msg = {
        token: token
    };
    msgutil.send(socket, "new_token", msg);
};

module.exports.init = function() {

    handlers.registerHandler("session_manual_refresh", sessionManualRefresh);

};
