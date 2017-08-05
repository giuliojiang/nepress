import {Injectable} from '@angular/core';

import {GlobalutilService} from './globalutil.service';

// Declare the usage of an external library: socket.io
// io is imported in the app in index.html
declare var io: any;

@Injectable()
export class SocketService {

    // Initialization

    socket = null;

    constructor(
        private globalutil: GlobalutilService
    ) {
        // Connect to the socket.io server
        var destinationAddress: String = 'https://' + globalutil.getWindow().location.hostname + ':29772';
        console.info("Initializing SocketService: connecting to socket.io server ["+destinationAddress+"]");
        this.socket = io(destinationAddress, {secure: true});

        this.socket.on("nepress_txt", function(msgobj) {
            console.info("Received message from server: " + JSON.stringify(msgobj));
        });
    }

}
