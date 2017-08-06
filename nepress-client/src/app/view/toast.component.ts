import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {GlobalutilService} from './../data/globalutil.service';
import {SocketService} from './../data/socket.service';

@Component({
    selector: 'nepress-toast',
    templateUrl: './toast.component.html',
    styleUrls: [
        './toast.component.css'
    ]
})
export class ToastComponent implements OnInit {

    // Constructor ------------------------------------------------------------

    constructor(
        private globalutil: GlobalutilService,
        private socket: SocketService
    ) {}

    // Implements OnInit ------------------------------------------------------

    ngOnInit(): void {
        console.info("ToastComponent: ngOnInit()");

        this.toastContainer = document.querySelector('#nepress_toast_container');
    }

    // Fields -----------------------------------------------------------------

    toastContainer: any;

    // Methods ----------------------------------------------------------------

    toast(msg: string): void {
        var data = {message: msg};
        this.toastContainer.MaterialSnackbar.showSnackbar(data);
    }

}
