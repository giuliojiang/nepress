var async = require('async');
var passwordHash = require('password-hash');

var handlers = require('./../handlers.js');
var msgutil = require('./../util/msgutil.js');
var dbUser = require('./../db/user.js');
var session = require('./../session.js');

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
        },

        // Make new token for the user
        function(callback) {
            // Remove existing session
            session.removeSession(msgutil.getToken(msgobj));

            // Create a new session
            var newToken = session.createNewSession(socket);

            // Set the username of the new session
            session.setSessionProperty(newToken, "username", msgobj.user, function(err) {
                if (err) {
                    callback(err);
                    return;
                } else {
                    // Pass the token to the next function
                    callback(null, newToken);
                    return;
                }
            });
        },

        // Send the login success message
        function(newToken, callback) {
            msgutil.send(socket, "login_success", {
                token: newToken
            });
            callback();
            return;
        }

    ], function(err) {
        if (err) {
            console.error(err);
            msgutil.sendAlert(socket, err);
            return;
        } else {
            console.info("Login successful");
            return;
        }
    });

};

module.exports.init = function() {

    handlers.registerHandler("login_user", loginUser);

};
