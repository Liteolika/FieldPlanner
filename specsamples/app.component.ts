import { Component, OnInit } from "@angular/core";
/*import { UserService } from "./shared/services/user.service";*/

import { UserService, UserLoginResult } from "./shared/modules/user/user.service";

require("./styles/custom.less");

@Component({
    selector: "fs-portal",
    template: `<h1>{{title}}</h1><p>{{greeter}}</p>`
})
export class AppComponent implements OnInit {

    public title: string = "The Title";

    public greeter: string = "";

    constructor(private userService: UserService) {}

    public ngOnInit(): void {

        this.userService.login("user", "pass").subscribe((res: UserLoginResult) => {
            this.greeter = "Welcome petcar";
        });

        /*this.greeter = this.userService.isLoggedIn ?
            "Welcome " + this.userService.getUser() :
            "Please log in.";*/

    }



}
