var handlers = require('./../handlers.js');

// Handles session_manual_refresh
var sessionManualRefresh = function(msgobj) {
    console.info("handler sessionManualRefresh received " + JSON.stringify(msgobj));
} 

module.exports.init = function() {

    handlers.registerHandler("session_manual_refresh", sessionManualRefresh);

};