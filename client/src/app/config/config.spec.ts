import { API_URL, APP_TITLE } from "./config";

import { OpaqueToken } from "@angular/core";

describe("App", () => {

    it("should have a title", () => {
        expect(APP_TITLE).not.toBeUndefined();
    });

    it("should have an API_URL of OpaqueToken", () => {
        expect(API_URL).not.toBeUndefined();
    });


});