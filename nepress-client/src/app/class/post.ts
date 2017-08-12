import {SafeHtml} from '@angular/platform-browser';

// Represents a single blog post
export interface Post {

    title: string;
    date: Date;
    text: SafeHtml;

}