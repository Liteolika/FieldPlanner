import { Component, OnInit } from "@angular/core";
/*import { UserService } from "./shared/services/user.service";*/

require("./styles/custom.less");

@Component({
    selector: "fs-portal",
    template: `<h1>{{title}}</h1><p>{{greeter}}</p><router-outlet></router-outlet>`
})
export class AppComponent implements OnInit {

    public title: string = "Peters @angular boilerplate";

    constructor() {}

    public ngOnInit(): void {

        
    }



}
