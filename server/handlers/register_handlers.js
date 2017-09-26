var async = require('async');

var handlers = require('./../handlers.js');
var msgutil = require('./../util/msgutil.js');
var dbUser = require('./../db/user.js');
var config = require('./../../config/nepress.json');

// Handles register
var registerUser = function(msgobj, socket) {

    async.waterfall([

        // Check if registrations are enabled
        function(callback) {
            if (config.register_enable) {
                callback();
                return;
            } else {
                callback("Registrations are disabled.");
                return;
            }
        },

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
