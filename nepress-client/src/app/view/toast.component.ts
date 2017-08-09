import {Component, OnInit, OnDestroy} from '@angular/core';
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
export class ToastComponent implements OnInit, OnDestroy {

    // Constructor ------------------------------------------------------------

    constructor(
        private globalutil: GlobalutilService,
        private socket: SocketService
    ) {}

    // Implements OnInit ------------------------------------------------------

    ngOnInit(): void {
        console.info("ToastComponent: ngOnInit()");

        this.toastContainer = document.querySelector('#nepress_toast_container');

        this.socket.register("alert", msgobj => {
            this.toast(msgobj.msg);
        });
    }

    // Implements OnDestroy ---------------------------------------------------

    ngOnDestroy(): void {
        console.info("Destroying ToastComponent");

        this.socket.deregister("alert");
    }

    // Fields -----------------------------------------------------------------

    toastContainer: any;

    // Methods ----------------------------------------------------------------

    toast(msg: string): void {
        this.globalutil.getMaterialize().toast(msg, 4000);
    }

}
