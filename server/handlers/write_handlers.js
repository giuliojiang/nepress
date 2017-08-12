var async = require('async');

var dbPost = require('./../db/post.js');
var msgutil = require('../util/msgutil.js');
var session = require('./../session.js');
var handlers = require('./../handlers.js');

// Handle write_new_post ------------------------------------------------------

var handleWriteNewPost = function(msgobj, socket) {

    async.waterfall([

        // Check if user is logged in
        function(callback) {
            if (session.isLoggedIn(msgutil.getToken(msgobj))) {
                callback();
                return;
            } else {
                callback("You are not logged in");
                return;
            }
        },

        // Check that title and post are not empty
        function(callback) {
            if (stringNullOrEmpty(msgobj.title)) {
                callback("Title is empty");
                return;
            } else if (stringNullOrEmpty(msgobj.text)) {
                callback("Text is empty");
                return;
            } else {
                callback();
                return;
            }
        },

        // Insert post in database
        function(callback) {
            var title = msgobj.title;
            var text = msgobj.text;
            dbPost.addPost(title, text, function(err) {
                // Override default callback as the callback from database might return
                // additional data that we don't need
                if (err) {
                    callback(err);
                    return;
                } else {
                    callback();
                    return;
                }
            });
        },

        // Send confirmation message
        function(callback) {
            msgutil.send(socket, "write_new_post_submitted", null);
            callback();
        }

    ], function(err) {
        if (err) {
            console.error(err);
            msgutil.sendAlert(socket, err);
            return;
        } else {
            console.info("New post added to database");
        }
    });

};


module.exports.init = function() {

    handlers.registerHandler("write_new_post", handleWriteNewPost);

};

// Utilities ------------------------------------------------------------------

var stringNullOrEmpty = function(s) {
    return !s || s == '';
};