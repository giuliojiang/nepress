var https = require('https');
var fs = require('fs');
var express = require('express');

var privateKey  = fs.readFileSync('./cert/private.key', 'utf8');
var certificate = fs.readFileSync('./cert/cert.crt', 'utf8');

var port = 29772;

var data = {};

module.exports.start = function() {

    var credentials = {key: privateKey, cert: certificate};
    data.app = express();

    data.app.use('/', express.static('./'));

    data.https = https.createServer(credentials, data.app);

    data.https.listen(port, function() {
        console.log("HTTPS Express listening on port " + port);
    });

};

module.exports.getHttps = function() {
    return data.https;
};
