// Handlers collection --------------------------------------------------------

var registeredHandlers = {};

module.exports.registerHandler = function(eventName, handleFunction) {
    registeredHandlers[eventName] = handleFunction;
    console.info("handlers: registered for ["+eventName+"]");
};

// msgobj: incoming message from a socket.io event
//         sent from the client
// socket: socket.io connection object
module.exports.handle = function(msgobj, socket) {
    console.info("handlers.js: received message " + JSON.stringify(msgobj));

    var t = msgobj._t;
    if (!t) {
        console.error("Error, received a message without type");
        return;
    }

    var theHandler = registeredHandlers[t];
    if (!theHandler) {
        console.error(new Error("No handler registered for message type ["+t+"]"));
        return;
    }

    // Call the handler
    theHandler(msgobj, socket);
};
