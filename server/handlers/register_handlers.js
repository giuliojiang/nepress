var async = require('async');

var handlers = require('./../handlers.js');
var msgutil = require('./../util/msgutil.js');
var dbUser = require('./../db/user.js');

// Handles register
var registerUser = function(msgobj, socket) {

    async.waterfall([

        // Register user in database
        function(callback) {
            var username = msgobj.username;
            var password = msgobj.password;
            dbUser.addUser(username, password, function(err) {
                if (err) {
                    callback(err);
                    return;
                } else {
                    callback();
                    return;
                }
            })
        }

    ], function(err) {
        if (err) {
            console.error(err);
            msgutil.sendAlert(socket, err);
            return;
        } else {
            msgutil.sendAlert(socket, "Registration successful");
            return;
        }
    });

};

module.exports.init = function() {

    handlers.registerHandler("register_user", registerUser);

};
