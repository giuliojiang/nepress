import {Injectable} from '@angular/core';

import {GlobalutilService} from './globalutil.service';

// Declare the usage of an external library: socket.io
// io is imported in the app in index.html
declare var io: any;

@Injectable()
export class SocketService {

    // Fields -----------------------------------------------------------------

    handlers: Object = {};

    // Initialization ---------------------------------------------------------

    socket = null;

    constructor(
        private globalutil: GlobalutilService
    ) {

        // Initialize handler for new_token
        this.register("new_token", (msgobj) => {
            var token = msgobj.token;
            console.info("Received new token " + token);
            this.globalutil.getLocalStorage().token = token;
        })

        // Initialize handler for refresh_session
        this.register("refresh_session", (msgobj) => {
            console.info("Session expired, requesting a new one");
            // Reload page
            this.globalutil.getWindow().location.reload();
        });

        // Connect to the socket.io server
        var destinationAddress: String = 'https://' + globalutil.getWindow().location.hostname + ':29772';
        console.info("Initializing SocketService: connecting to socket.io server ["+destinationAddress+"]");
        this.socket = io(destinationAddress, {secure: true});

        this.socket.on("connect", () => {
            console.info("Socket.io connected, requesting or validating token");
            var msg = {
                _t: "session_manual_refresh"
            };
            this.send(msg);
        });

        this.socket.on("nepress_txt", (msgobj) => {
            console.info("Received message from server: " + JSON.stringify(msgobj));
            var t = msgobj._t;
            if (!t) {
                console.error("No field _t in message!");
                return;
            }

            var theHandler = this.handlers[t];
            if (!theHandler) {
                console.error("No handler registered for message type " + t);
                return;
            }

            theHandler(msgobj);
        });
    }

    // Public methods ---------------------------------------------------------

    register(msgtype: string, func: Function): void {
        console.info("Registering handler for " + msgtype);
        this.handlers[msgtype] = func;
    }

    deregister(msgtype: string): void {
        console.info("Deregistering handler for " + msgtype);
        delete this.handlers[msgtype];
    }

    send(msg: any): void {
        msg._token = this.globalutil.getLocalStorage().token;
        this.socket.emit("nepress_txt", msg);
    }

}
