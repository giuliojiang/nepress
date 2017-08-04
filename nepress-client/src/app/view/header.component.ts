import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {GlobalutilService} from './../data/globalutil.service';
import {SocketService} from './../data/socket.service';

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
        private socket: SocketService
    ) {}

    // Implements OnInit ------------------------------------------------------

    ngOnInit(): void {
        console.info("HeaderComponent: ngOnInit()");
    }

}
