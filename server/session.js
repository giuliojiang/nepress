var randomstring = require('randomstring');

var msgutil = require('./util/msgutil.js');

// Configuration --------------------------------------------------------------

var SESSION_TIMEOUT_MS = 172800000; // 48 hours

// Data storage ---------------------------------------------------------------

// Stores the active sessions.
// key: token
// {
//     data
//     timeout_handle
//     socket
// }
// The timeout_handle is used to automatically destroy a session once its
// timeout is reached. It can be refreshed and cancelled.
// socket is a socket.io client socket connection object.
var activeSessions = {};

// Utilities ------------------------------------------------------------------

// Create a new user token. Checks that the token hasn't already
// been registered among the active sessions
var createNewToken = function() {

    while (true) {
        var newToken = randomstring.generate(30);
        if (!activeSessions[newToken]) {
            return newToken;
        }
    }

};

// Public methods -------------------------------------------------------------

// Create a new session object and adds it to the active sessions
// Starts the timeout event that will cancel the session
// Returns: the new token
var createNewSession = function(socket) {

    var newToken = createNewToken();

    activeSessions[newToken] = {
        data: {}
    };

    console.info("Creating new session with token " + newToken);

    refreshSession(newToken, socket);

    return newToken;

};

// Refreshes the session's timeout by clearing the previous timeout event
// and moving it forward by the default timeout
var refreshSession = function(token, socket) {

    var sessionObject = activeSessions[token];
    if (!sessionObject) {
        console.info("No session found for token ["+token+"], skipping refresh");
        return;
    }

    // Refresh the socket object
    sessionObject.socket = socket;

    // Clear the existing timeout
    clearTimeout(sessionObject.timeout_handle);

    // Create a new timeout function
    sessionObject.timeout_handle = setTimeout(function() {
        // Once the timeout is reached, we need to send the refresh session
        // message to the client, and destroy the current session
        msgutil.send(socket, "refresh_session", {});
    }, SESSION_TIMEOUT_MS);
    console.info("Session ["+token+"] refreshed");

};

// Removes a session
// It does not notify the client
var removeSession = function(token) {

    var sessionObject = activeSessions[token];
    if (!sessionObject) {
        console.info("No session found for token ["+token+"], skipping removeSession");
    }

    var timeoutHandle = sessionObject.timeout_handle;
    clearTimeout(timeoutHandle);

    // Remove from the active sessions
    delete activeSessions[token];

};

// Get a session data property
var getSessionProperty = function(token, propertyName, callback) {
    var sessionObject = activeSessions[token];
    if (!sessionObject) {
        callback(new Error("No session with token ["+token+"] found"));
        return;
    }

    var theProperty = sessionObject[propertyName];
    callback(null, theProperty);
    return;
};

// Set a session data property
var setSessionProperty = function(token, propertyName, newValue, callback) {
    var sessionObject = activeSessions[token];
    if (!sessionObject) {
        callback(new Error("No session with token ["+token+"] found"));
        return;
    }

    sessionObject[propertyName] = newValue;
    callback();
    return;
};

// Remove a session data property
var delSessionProperty = function(token, propertyName, callback) {
    var sessionObject = activeSessions[token];
    if (!sessionObject) {
        callback(new Error("No session with token ["+token+"] found"));
        return;
    }

    delete sessionObject[propertyName];
    callback();
    return;
};

// Exports --------------------------------------------------------------------

module.exports = {
    createNewSession: createNewSession,
    refreshSession: refreshSession,
    removeSession: removeSession,
    getSessionProperty: getSessionProperty,
    setSessionProperty: setSessionProperty,
    delSessionProperty: delSessionProperty
};