import {Injectable} from '@angular/core';

@Injectable()
export class GlobalutilService {

    getWindow(): Window {
        return window;
    }

}
