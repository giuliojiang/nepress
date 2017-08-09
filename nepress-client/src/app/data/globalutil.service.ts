import {Injectable} from '@angular/core';

declare var window: any;

@Injectable()
export class GlobalutilService {

    getWindow(): Window {
        return window;
    }

    getLocalStorage(): Storage {
        return this.getWindow().localStorage;
    }

    getMaterialize(): any {
        return window.Materialize;
    }

}
