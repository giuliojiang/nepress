var async = require('async');
var passwordHash = require('password-hash');

var handlers = require('./../handlers.js');
var msgutil = require('./../util/msgutil.js');
var dbUser = require('./../db/user.js');

// Handles register
var loginUser = function(msgobj, socket) {

    async.waterfall([

        // Get database user object
        function(callback) {
            var username = msgobj.user;
            var password = msgobj.pass;

            dbUser.getUser(username, function(err, userDoc) {
                if (err) {
                    callback(err);
                    return;
                } else {
                    var passhash = userDoc.passhash;
                    callback(null, passhash);
                    return;
                }
            });
        },

        // Try to match the password
        function(passhash, callback) {
            var loginSuccess = passwordHash.verify(msgobj.pass, passhash);
            if (loginSuccess) {
                callback();
                return;
            } else {
                callback("Login unsuccessful");
                return;
            }
        }

    ], function(err) {
        if (err) {
            console.error(err);
            msgutil.sendAlert(socket, err);
            return;
        } else {
            console.info("Login successful");
            msgutil.sendAlert(socket, "Login successful");
            return;
        }
    });

};

module.exports.init = function() {

    handlers.registerHandler("login_user", loginUser);

};
