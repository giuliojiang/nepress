import {Component, OnInit, Input} from '@angular/core';

import {ContextElement} from './../class/contextElement';
import {GlobalutilService} from './../data/globalutil.service';
import {ContextService} from './../data/context.service';
import {PicoqueryService} from './../data/picoquery.service';

declare var async: any;

@Component({
    selector: 'nepress-context',
    templateUrl: './context.component.html',
    styleUrls: [
        './context.component.css'
    ]
})
export class ContextComponent implements OnInit {

    // Fields -----------------------------------------------------------------

    backdropStem: string = 'context_component_bd_';
    stem: string = 'context_component_id_';
    @Input() name: string;
    dropdown: Array<ContextElement>;

    // Constructor ------------------------------------------------------------

    constructor(
        private globalutil: GlobalutilService,
        private contextService: ContextService,
        private picoquery: PicoqueryService
    ) {}

    // Implements OnInit ------------------------------------------------------

    ngOnInit(): void {
        console.info("ContextComponent: ngOnInit()");
        if (!this.name) {
            console.error("Error! ContextComponent.name is null");
        }
        // Register this component on the ContextService
        this.contextService.register(this.name, this);
    }

    // Methods ----------------------------------------------------------------

    open(dropdown: Array<ContextElement>, parentId: string): void {
        console.info("Opening context ["+this.name+"] with parent element ["+parentId+"]");
        this.dropdown = dropdown;
        // Show the context menu
        async.waterfall([
            //
            // Make element visible
            (callback) => {
                this.picoquery.show(this.backdropStem + this.name);
                callback();
            },
            // Position element below parent
            (callback) => {
                this.picoquery.positionBelow(this.stem + this.name, parentId);
                callback();
            }
        ], function(err) {
            if (err) {
                console.error(err);
            }
        });
    }

    close(): void {
        console.info("Closing context ["+this.name+"]");
        async.setImmediate(() => {
            this.picoquery.hide(this.backdropStem + this.name);
        });
    }

    nopAction(event: MouseEvent): void {
        event.stopPropagation();
    }

}