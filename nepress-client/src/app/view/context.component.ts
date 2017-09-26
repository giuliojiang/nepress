import {Component, OnInit, Input} from '@angular/core';

import {ContextElement} from './../class/contextElement';
import {GlobalutilService} from './../data/globalutil.service';
import {ContextService} from './../data/context.service';

@Component({
    selector: 'nepress-context',
    templateUrl: './context.component.html',
    styleUrls: [
        './context.component.css'
    ]
})
export class ContextComponent implements OnInit {

    // Fields -----------------------------------------------------------------

    @Input() name: string;
    dropdown: Array<ContextElement>;

    // Constructor ------------------------------------------------------------

    constructor(
        private globalutil: GlobalutilService,
        private contextService: ContextService
    ) {}

    // Implements OnInit ------------------------------------------------------

    ngOnInit(): void {
        console.info("ContextComponent: ngOnInit()");
        // Register this component on the ContextService
        this.contextService.register(name, this);
    }

    // Methods ----------------------------------------------------------------

    open(dropdown: Array<ContextElement>): void {
        this.dropdown = dropdown;
        // Show the context menu
    }

}