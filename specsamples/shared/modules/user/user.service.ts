import { Injectable } from "@angular/core";
import { Observable, Subscriber, Subject, BehaviorSubject } from "rxjs";

import { ITokenService, TokenService } from "./token.service";

@Injectable()
export class UserService implements IUserService {

    public loggedIn: Subject<boolean> = new BehaviorSubject<boolean>(false);

    // private tokenService: ITokenService
    constructor(private tokenService: TokenService) {
    }

    public login(username: string, password: string): Observable<UserLoginResult> {
        return new Observable((observer: Subscriber<UserLoginResult>) => {

            if (username.trim() === "") {
                this.loggedIn.next(false);
                observer.next(new UserLoginResult(false, "Username cannot be empty"));
                observer.complete();
            }

            if (password.trim() === "") {
                this.loggedIn.next(false);
                observer.next(new UserLoginResult(false, "Password cannot be empty"));
                observer.complete();
            }

            if (username === "user" && password === "pass") {
                this.loggedIn.next(true);
                observer.next(new UserLoginResult(true, "Login successfull"));
                observer.complete();
            } else {
                this.loggedIn.next(false);
                observer.next(new UserLoginResult(false, "Incorrect username/password"));
                observer.complete();
            }

            observer.next(new UserLoginResult(false, "Unknown error"));
            observer.complete();
        });
    }


}

export interface IUserService {
    login(username: string, password: string): Observable<UserLoginResult>;
    loggedIn: Observable<boolean>;
}

export class UserLoginResult {
    public success: boolean;
    public message: string;

    constructor(success: boolean, message: string = "") {
        this.success = success;
        this.message = message;
    }

}