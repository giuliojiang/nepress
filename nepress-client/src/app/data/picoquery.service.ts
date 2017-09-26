import {Injectable} from '@angular/core';

@Injectable()
export class PicoqueryService {

    document: HTMLDocument = window.document;

    show(id: string): void {
        this.executeOnElementById(id, (elem) => {
            elem.style.display = 'block';
        })
    }

    hide(id: string): void {
        this.executeOnElementById(id, (elem) => {
            elem.style.display = 'none';
        })
    }

    // Position element A under element B
    positionBelow(idA: string, idB: string): void {
        let boxB = null;
        this.executeOnElementById(idB, (elemB: HTMLElement) => {
            boxB = elemB.getClientRects();
        })
    }

    // Private methods --------------------------------------------------------

    private executeOnElementById(id: string, func: (HTMLElement) => void): void {
        let elem: HTMLElement = document.getElementById(id);
        if (!elem) {
            console.error("No element ["+id+"] found");
            return;
        }
        func(elem);
    }

}