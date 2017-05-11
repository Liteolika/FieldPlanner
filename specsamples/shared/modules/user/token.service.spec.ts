import { TestBed, ComponentFixture, async, inject } from "@angular/core/testing";

import { HttpModule, Http, BaseRequestOptions, XHRBackend, Response, ResponseOptions } from "@angular/http";
import { MockBackend, MockConnection } from "@angular/http/testing";

import { ITokenService, TokenService } from "./token.service";

describe("Service: TokenService", () => {

    let tokenService: ITokenService;
    let mockBackend: MockBackend;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ HttpModule ],
            declarations: [],
            providers: [
                TokenService,
                { provide: XHRBackend, useClass: MockBackend }
            ]
        });

        /*tokenService = TestBed.get(TokenService);
        mockBackend = TestBed.get(MockBackend);*/

        tokenService = TestBed.get(TokenService);
        mockBackend = TestBed.get(XHRBackend);

    });

/*    beforeEach(inject([TokenService, XHRBackend], (_tokenService: TokenService, _mockBackend: MockBackend) => {
        tokenService = _tokenService;
        mockBackend = _mockBackend;
    }));*/

    it("should have an instance", async() => {
        expect(tokenService).toBeDefined();
    });

    it ("should get me a token", async() => {

        let apiResponse = ["petcar"];

        mockBackend.connections.subscribe((conn: MockConnection) => {
            conn.mockRespond(new Response(new ResponseOptions({ body: apiResponse})));
        });

        tokenService.getToken().subscribe(x => {
            expect(x).toContain("petcar");
        });
    });

});