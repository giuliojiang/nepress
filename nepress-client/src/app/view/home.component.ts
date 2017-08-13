import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';

import {Post} from './../class/post';
import {GlobalutilService} from './../data/globalutil.service';
import {SocketService} from './../data/socket.service';

@Component({
    selector: 'nepress-home',
    templateUrl: './home.component.html',
    styleUrls: [
        './home.component.css'
    ]
})
export class HomeComponent implements OnInit {

    // Fields -----------------------------------------------------------------

    page: number = 0;
    posts: Post[] = [];

    // Constructor ------------------------------------------------------------

    constructor(
        private globalutil: GlobalutilService,
        private socket: SocketService,
        private sanitizer: DomSanitizer
    ) {}

    // Implements OnInit ------------------------------------------------------

    ngOnInit(): void {
        console.info("HomeComponent: ngOnInit()");

        // Register handlers
        this.socket.register("home_send_posts", msgobj => {
            this.posts = [];
            var newPage: number = msgobj.page + 1;
            if (newPage == this.page) {
                // If the new page is the requested one, scroll to top
                this.globalutil.getWindow().scrollTo(0, 0);
            }
            this.page = newPage;
            var posts = msgobj.posts as any[];
            for (var i = 0; i < posts.length; i++) {
                var post = posts[i];
                var safeHtml = this.sanitizer.bypassSecurityTrustHtml(post.text);
                this.posts.push({
                    title: post.title,
                    date: new Date(post.date),
                    text: safeHtml
                });
            }
        });

        // Request posts
        this.requestPosts();
    }

    // Methods ----------------------------------------------------------------

    requestPosts(): void {
        console.info("HomeComponent: requesting posts");
        this.socket.send("home_get_posts", {
            page: this.page ? this.page - 1 : 0
        });
    }

    pageKeyUp(event: any): void {
        var keycode: number = event.keyCode;
        if (keycode == 13) {
            console.info("Detected an Enter keypress");
            this.requestPosts();
        }
    }

    nextPage(): void {
        this.page += 1;
        this.requestPosts();
    }

    previousPage(): void {
        this.page -= 1;
        this.requestPosts();
    }

}
