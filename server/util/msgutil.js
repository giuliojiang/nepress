// Send -----------------------------------------------------------------------
// Send a message to the given socket

module.exports.send = function(socket, t, msgobj) {
    try {
        msgobj._t = t;
        socket.emit('nepress_txt', msgobj);
    } catch (err) {
        console.error(err);
    }

};

// Send alert -----------------------------------------------------------------
// Sends an alert message to the client

module.exports.sendAlert = function(socket, alertContent) {
    var msg = {
        msg: module.exports.formatError(alertContent)
    };
    module.exports.send(socket, "alert", msg);
};

// Format Error ---------------------------------------------------------------
// Formats a String of Error object into a string

var toString = function(x) {
    if (!x.toString) {
        return "unrecognized object";
    } else {
        return x.toString();
    }
};

module.exports.formatError = function(err) {
    if (!err) {
        return "null";
    }
    
    if (!err.stack) {
        // String or other object
        return toString(err);
    } else {
        // Error object
        return err.stack;
    }
};