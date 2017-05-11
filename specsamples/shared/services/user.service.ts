import { Injectable } from "@angular/core";

@Injectable()
export class UserService {

    public isLoggedIn: boolean = false;
    private currentUser: string = "";

    public setUser(username: string): void {
        this.currentUser = username;
    }

    public getUser(): string {
        return this.currentUser;
    }


}