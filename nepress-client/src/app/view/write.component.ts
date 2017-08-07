import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {GlobalutilService} from './../data/globalutil.service';
import {SocketService} from './../data/socket.service';

@Component({
    selector: 'nepress-write',
    templateUrl: './write.component.html',
    styleUrls: [
        './write.component.css'
    ]
})
export class WriteComponent implements OnInit {

    // Fields -----------------------------------------------------------------

    title: String;
    text: String;

    // Constructor ------------------------------------------------------------

    constructor(
        private globalutil: GlobalutilService,
        private socket: SocketService,
        private router: Router
    ) {}

    // Implements OnInit ------------------------------------------------------

    ngOnInit(): void {
        console.info("WriteComponent: ngOnInit()");

        // Register handlers
        this.socket.register("write_new_post_submitted", msgobj => {
            this.router.navigateByUrl('/home');
        });
    }

    // Methods ----------------------------------------------------------------

    submit(): void {
        var msg = {
            title: this.title,
            text: this.text
        };
        this.socket.send("write_new_post", msg);
    }

}
