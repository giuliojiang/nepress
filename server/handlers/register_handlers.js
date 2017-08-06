var handlers = require('./../handlers.js');
var msgutil = require('./../util/msgutil.js');

// Handles register
var registerUser = function(msgobj, socket) {
    msgutil.send(socket, {
        _t: "alert",
        msg: "I received your registration message"
    });
};

module.exports.init = function() {

    handlers.registerHandler("register_user", registerUser);

};