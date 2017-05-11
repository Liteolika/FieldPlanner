import { Injectable } from "@angular/core";
import { TestBed, ComponentFixture, async, inject } from "@angular/core/testing";

import { HttpModule, Http, BaseRequestOptions, XHRBackend, Response, ResponseOptions } from "@angular/http";
import { MockBackend, MockConnection } from "@angular/http/testing";

import { Observable } from "rxjs/Observable";

import { IUserService, UserService, UserLoginResult } from "./user.service";
import { ITokenService, TokenService } from "./token.service";

class MockTokenService implements ITokenService {
    getToken(): Observable<any> {
        let response = ["petcar"];
        return Observable.from(response);
    }
}


describe("Service: UserService", () => {

    let userService: IUserService;
    let tokenService: ITokenService;

    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [],
            declarations: [],
            providers: [
                { provide: UserService, useClass: UserService },
                { provide: TokenService, useClass: MockTokenService }
            ]
        });

        userService = TestBed.get(UserService);
        tokenService = TestBed.get(TokenService);

    });

    it("should initially have no user logged in", async() => {
        const result = userService.loggedIn;
        result.subscribe(res => {
            expect(res).toBeFalsy();
        });
    });

    it("should have user logged in after successfull authentication", async() => {
        const loginResult = userService.login("user", "pass");
        loginResult.subscribe(() => {
            const result = userService.loggedIn;
            result.subscribe((res) => {
                expect(res).toBeTruthy();
            });
        });
    });

    it("should return loginresult with success after correct credentials", async() => {
        const result = userService.login("user", "pass");
        result.subscribe(res => {
            expect(res.success).toBeTruthy();
        });
    });

    it("should return loginresult with failure after incorrect credentials", async() => {
        const result = userService.login("user123", "pass123");
        result.subscribe((res: UserLoginResult) => {
            expect(res.success).toBeFalsy();
            expect(res.message).toBe("Incorrect username/password");
        });
    });

    it("should return unsuccessful loginresult when username is empty", async() => {
        const result = userService.login("", "pass");
        result.subscribe((res: UserLoginResult) => {
            expect(res.success).toBeFalsy();
            expect(res.message).toBe("Username cannot be empty");
        });
    });

    it("should return unsuccessful loginresult when password is empty", async() => {
        const result = userService.login("user", "");
        result.subscribe((res: UserLoginResult) => {
            expect(res.success).toBeFalsy();
            expect(res.message).toBe("Password cannot be empty");
        });
    });


});
