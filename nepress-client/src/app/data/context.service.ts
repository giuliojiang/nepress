import {Injectable} from '@angular/core';

import {ContextComponent} from './../view/context.component';
import {ContextElement} from './../class/contextElement';

@Injectable()
export class ContextService {

    registry: {[key:string]:ContextComponent} = {};

    register(name: string, component: ContextComponent): void {
        this.registry[name] = component;
    }

    open(name: string, dropdown: Array<ContextElement>, parentId: string): void {
        let theComponent: ContextComponent = this.registry[name];
        if (!theComponent) {
            console.error("No context component named " + name);
            return;
        }
        // Call the method open on the component
        theComponent.open(dropdown, parentId);
    }

}