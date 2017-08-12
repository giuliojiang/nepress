import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {GlobalutilService} from './../data/globalutil.service';
import {SocketService} from './../data/socket.service';
import {UserdataService} from './../data/userdata.service';

@Component({
    selector: 'nepress-header',
    templateUrl: './header.component.html',
    styleUrls: [
        './header.component.css'
    ]
})
export class HeaderComponent implements OnInit {

    // Constructor ------------------------------------------------------------

    constructor(
        private globalutil: GlobalutilService,
        private socket: SocketService,
        private userdata: UserdataService
    ) {}

    // Implements OnInit ------------------------------------------------------

    ngOnInit(): void {
        console.info("HeaderComponent: ngOnInit()");
    }

    // Methods ----------------------------------------------------------------

    isLoggedIn(): boolean {
        return !!this.userdata.getUsername();
    }

    getUsername(): string {
        return this.userdata.getUsername();
    }

}
