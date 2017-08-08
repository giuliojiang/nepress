// A post has the following properties
// -    date
// -    title
// -    text

var async = require('async');

var dbMain = require('./main.js');

// Public methods -------------------------------------------------------------

// Add a new post
module.exports.addPost = function(title, text, callback) {

    async.waterfall([
        // Insert into database
        function(callback) {
            var now = new Date();
            var newDocument = {
                date: now,
                title: title,
                text: text
            };
            dbMain.post.insert(newDocument, function(err) {
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

// Get posts starting from index and with limit
// callback(err, docs)
module.exports.getPosts = function(start, limit, callback) {

    async.waterfall([

        function(callback) {
            dbMain.post.find({}).sort({
                date: -1
            }).skip(start).limit(limit).exec(callback);
            return;
        }

    ], callback);

};

// Count number of posts
// callback(err, count)
module.exports.countPosts = function(callback) {

    dbMain.post.count({}, function(err, count) {
        if (err) {
            callback(err);
            return;
        } else {
            callback(null, count);
            return;
        }
    });

};

