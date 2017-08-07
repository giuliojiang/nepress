import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';

import {GlobalutilService} from './../data/globalutil.service';
import {SocketService} from './../data/socket.service';

@Component({
    selector: 'nepress-login',
    templateUrl: './login.component.html',
    styleUrls: [
        './login.component.css'
    ]
})
export class LoginComponent implements OnInit, OnDestroy {

    // Constructor ------------------------------------------------------------

    constructor(
        private globalutil: GlobalutilService,
        private socket: SocketService,
        private router: Router
    ) {}

    // Implements OnInit ------------------------------------------------------

    ngOnInit(): void {
        console.info("LoginComponent: ngOnInit()");

        // Register handlers
        this.socket.register("login_success", msgobj => {
            this.router.navigateByUrl('/home');
        });
    }

    // Implements OnDestroy

    ngOnDestroy(): void {
        console.info("Destroying LoginComponent");
    }

    // Fields -----------------------------------------------------------------

    username: string = "";
    password: string = "";

    // Methods ----------------------------------------------------------------

    loginKeyUp(event: any): void {
        var keycode: number = event.keyCode;
        if (keycode == 13) {
            console.info("Detected an Enter keypress");
            var msg = {
                user: this.username,
                pass: this.password
            };
            this.socket.send("login_user", msg);
        }
    }

}
