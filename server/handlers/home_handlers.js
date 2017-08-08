var async = require('async');

var dbPost = require('./../db/post.js');
var msgutil = require('../util/msgutil.js');
var session = require('./../session.js');
var handlers = require('./../handlers.js');

// Configuration --------------------------------------------------------------

var POSTS_PER_PAGE = 1;

// Handle home_get_posts ------------------------------------------------------

var handleHomeGetPosts = function(msgobj, socket) {

    var page = msgobj.page;

    async.waterfall([

        function(callback) {
            // Get total number of pages
            dbPost.countPosts(function(err, count) {
                if (err) {
                    callback(err);
                    return;
                } else {
                    callback(null, count);
                    return;
                }
            });
        },

        // Check upper page limit range
        function(numPosts, callback) {
            var numPages = Math.ceil(numPosts / POSTS_PER_PAGE);
            if (page > numPages - 1) {
                page = numPages - 1;
            }
            if (page < 0) {
                page = 0;
            }

            // Run posts query
            dbPost.getPosts(page, POSTS_PER_PAGE, function(err, docs) {
                if (err) {
                    callback(err);
                    return;
                } else {
                    callback(null, docs);
                    return;
                }
            });
        },

        // Send response
        function(docs, callback) {
            var postsResp = [];
            for (var i = 0; i < docs.length; i++) {
                var doc = docs[i];
                console.log("date  is " + doc.date.UT)
                postsResp.push({
                    title: doc.title,
                    date: doc.date.getTime(),
                    text: doc.text
                });
            }
            var msg = {
                page: page,
                posts: postsResp
            };
            msgutil.send(socket, "home_send_posts", msg);
            callback();
        }

    ], function(err) {
        if (err) {
            console.error(err);
            msgutil.sendAlert(socket, err);
            return;
        }
    });

};

// Exports --------------------------------------------------------------------

module.exports.init = function() {

    handlers.registerHandler("home_get_posts", handleHomeGetPosts);

};
