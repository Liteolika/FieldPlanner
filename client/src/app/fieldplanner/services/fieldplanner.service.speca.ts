import { Injectable } from "@angular/core";
import { TestBed, ComponentFixture, async, inject } from "@angular/core/testing";

import { HttpModule, Http, BaseRequestOptions, XHRBackend, Response, ResponseOptions } from "@angular/http";
import { MockBackend, MockConnection } from "@angular/http/testing";

import { Observable } from "rxjs/Observable";

import { IFieldplannerService, FieldplannerService } from "./fieldplanner.service";
import { Competition } from "./domain/competition";
import { Station } from "./domain/station";

/*class MockFieldplanningService implements IFieldplannerService {
    getToken(): Observable<any> {
        let response = ["petcar"];
        return Observable.from(response);
    }
}*/


describe("Service: FieldplannerService", () => {

    let fixture: IFieldplannerService;

    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [],
            declarations: [],
            providers: [
                { provide: FieldplannerService, useClass: FieldplannerService },
                // { provide: TokenService, useClass: MockTokenService }
            ]
        });

        fixture = TestBed.get(FieldplannerService);
        /*tokenService = TestBed.get(TokenService);*/

    });

    /*it("should have no competition at init", async() => {
        expect(fixture.competitions.length).toBe(0);
    });

    it("should add a new competition", async() => {
        fixture.addCompetition("");
        expect(fixture.competitions.length).toBe(1);
    });

    it("should create a competition id", async() => {
        fixture.addCompetition("");
        let c = fixture.competitions[0];
        expect(c.id).not.toBeUndefined();
        expect(c.id).not.toBe("");
    });

    it("should create a competition with name", async() => {
        let name = "My Competition";
        fixture.addCompetition(name);
        let c = fixture.competitions[0];
        expect(c.name).toBe(name);
    });

    it("should throw if competition name is empty or null", () => {
        expect(() => { fixture.addCompetition(""); }).toThrow(new Error("Competition name cannot be empty"));
    });

    it("should select currentCompetition from id", () => {
        fixture.addCompetition("name1");
        fixture.addCompetition("name2");
        fixture.addCompetition("name3");
        let c = fixture.competitions[1];
        let id = c.id;
        fixture.selectCompetition(id);
        expect(fixture.competition).not.toBeUndefined();
        expect(fixture.competition.id).toBe(id);
    });

    it ("should return id of competitions when added", () => {
        let name = "My Competition";
        var id = fixture.addCompetition(name);
        var cid = fixture.competitions[0].id;
        expect(id).toBe(cid);
    });

    it("should have an empty station list", () => {
        var compId = fixture.addCompetition("Test");
        fixture.selectCompetition(compId);
        expect(fixture.competition.stations.length).toBe(0);
    });

    it("should create a station in the selected competition when added", () => {
        var compId = fixture.addCompetition("Test");
        fixture.selectCompetition(compId);
        fixture.addStation();
        expect(fixture.competition.stations.length).toBe(1);
    });

    it("should create a station in a numbering order", () => {
        var compId = fixture.addCompetition("Test");
        fixture.selectCompetition(compId);
        fixture.addStation();
        fixture.addStation();
        fixture.addStation();
        fixture.addStation();
        expect(fixture.competition.stations[2].number).toBe(3);
    });*/







    /*it("should create service instance", async() => {
        expect(fixture instanceof FieldplannerService).toBe(true);
    });

    it("should have no stations as default", async() => {
    expect(fixture.stations.length).toBe(0);

  it("should add a new station", async() => {
    fixture.addStation();
    let s1 = fixture.stations[0];
    expect(fixture.stations.length).toBe(1);
    expect(s1 instanceof Station).toBe(true);
  });

  it("stations should have correct numbering", async() => {
    fixture.addStation();
    fixture.addStation();
    fixture.addStation();
    expect(fixture.stations[0].number).toBe(1);
    expect(fixture.stations[1].number).toBe(2);
    expect(fixture.stations[2].number).toBe(3);
  });*/

    

  

/*  it("should export stations as json", async() => {
    let json: string = fixture.dumpStations();
    expect(json).toBe("[]");
    
    fixture.addStation();
    fixture.addStation();
    let sjson: string = fixture.dumpStations();
    expect(sjson).toBe("[{\"number\":1},{\"number\":2}]");
  });*/


    /*it("should initially have no user logged in", async() => {
        const result = userService.loggedIn;
        result.subscribe(res => {
            expect(res).toBeFalsy();
        });
    });*/

    /*it("should have user logged in after successfull authentication", async() => {
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
    });*/


});
