import { NgModule } from "@angular/core";
import { HttpModule } from "@angular/http";

import { UserService } from "./user.service";
import { TokenService } from "./token.service";

@NgModule({
    imports: [
        HttpModule
    ],
    exports: [
    ],
    declarations: [

    ],
    providers: [
        UserService,
        TokenService
    ]
})
export class UserModule {}