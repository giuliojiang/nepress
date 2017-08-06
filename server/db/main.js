var Datastore = require('nedb');
var config = require('./../../config/nepress.json');

module.exports.init = function() {

    console.info("Loading nedb databases...");

    module.exports.user = new Datastore({ filename: config.nedb_path + '/user', autoload: true });
    module.exports.post = new Datastore({ filename: config.nedb_path + '/post', autoload: true });

    console.info("nedb databases loaded");

};
