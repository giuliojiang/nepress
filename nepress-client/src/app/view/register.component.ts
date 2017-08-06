import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {GlobalutilService} from './../data/globalutil.service';
import {SocketService} from './../data/socket.service';

@Component({
    selector: 'nepress-register',
    templateUrl: './register.component.html',
    styleUrls: [
        './register.component.css'
    ]
})
export class RegisterComponent implements OnInit {

    // Constructor ------------------------------------------------------------

    constructor(
        private globalutil: GlobalutilService,
        private socket: SocketService
    ) {}

    // Implements OnInit ------------------------------------------------------

    ngOnInit(): void {
        console.info("RegisterComponent: ngOnInit()");
    }

    // Fields -----------------------------------------------------------------

    username: string = "";
    password: string = "";

    // Methods ----------------------------------------------------------------

    registerKeyUp(event: any): void {
        var keycode: number = event.keyCode;
        if (keycode == 13) {
            console.info("Detected an Enter keypress");
            var msg = {
                _t: "register_user",
                username: this.username,
                password: this.password
            };
            this.socket.send(msg);
        }
    }

}
