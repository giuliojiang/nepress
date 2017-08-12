import {Injectable} from '@angular/core';

import {SocketService} from './socket.service';
import {GlobalutilService} from './globalutil.service';
import {UserdataService} from './userdata.service';

@Injectable()
export class GlobalcommService {

    // Initialization ---------------------------------------------------------

    constructor(
        private globalutil: GlobalutilService,
        private userdata: UserdataService
    ) {}

    // Public methods ---------------------------------------------------------

    registerGlobalHandlers(socketService: SocketService): void {

        console.info("GlobalcommService, registering handlers...");

        // Initialize handler for new_token
        // A new_token sends a new anonymous token, the user is not logged in anymore
        socketService.register("new_token", (msgobj) => {
            var token = msgobj.token;
            console.info("Received new token " + token);
            this.globalutil.getLocalStorage().token = token;
            this.userdata.setUsername(msgobj.username);
        });

        // Initialize handler for refresh_session
        socketService.register("refresh_session", (msgobj) => {
            console.info("Session expired, requesting a new one");
            // Reload page
            this.globalutil.getWindow().location.reload();
        });

    }

}
