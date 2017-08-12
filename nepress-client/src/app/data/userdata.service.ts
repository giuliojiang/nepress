import {Injectable} from '@angular/core';

@Injectable()
export class UserdataService {

    username: string = null;

    getUsername(): string {
        return this.username;
    }

    setUsername(username: string): void {
        console.info("Setting username to ["+username+"]");
        this.username = username;
    }

}
