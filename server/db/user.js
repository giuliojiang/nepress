// A user has the following properties:
// -   username
// -   passhash

var async = require('async');
var passwordHash = require('password-hash');

var db_main = require('./main.js');

// Public methods -------------------------------------------------------------

// Add a new user to the database
module.exports.addUser = function(username, password, callback) {

    async.waterfall([

        // Check that the user doesn't exist already
        function(callback) {
            db_main.user.find({
                username: username
            }, function(err, docs) {
                if (err) {
                    callback(err);
                    return;
                } else {
                    if (docs.length > 0) {
                        callback("User already exists");
                        return;
                    } else {
                        callback();
                        return;
                    }
                }
            });
        },

        // Create new user and add to database
        function(callback) {
            var newUserDocument = {
                username: username,
                passhash: passwordHash.generate(password)
            };
            db_main.user.insert(newUserDocument, function(err) {
                if (err) {
                    callback(err);
                    return;
                } else {
                    callback();
                }
            });
        }

    ], callback);

};

// Get a user by username
module.exports.getUser = function(username, callback) {
    db_main.user.find({
        username: username
    }, function(err, docs) {
        if (err) {
            callback(err);
            return;
        } else {
            if (docs.length > 0) {
                var theDoc = docs[0];
                callback(null, theDoc);
                return;
            } else {
                callback("No user ["+username+"] found");
                return;
            }
        }
    });
};
