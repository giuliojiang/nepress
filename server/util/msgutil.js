module.exports.send = function(socket, msgobj) {
    if (msgobj && typeof msgobj === 'object') {
        socket.emit('nepress_txt', msgobj);
    } else {
        console.error(new Error("Attempted to send a non-object message!"));
    }
};
