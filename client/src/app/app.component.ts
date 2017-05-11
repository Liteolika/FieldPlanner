import { Component, OnInit } from "@angular/core";
/*import { UserService } from "./shared/services/user.service";*/

require("./styles/custom.less");

@Component({
    selector: "fs-portal",
    template: `<h1>{{title}}</h1><p>{{greeter}}</p><field-planner></field-planner>`
})
export class AppComponent implements OnInit {

    public title: string = "The Title";

    constructor() {}

    public ngOnInit(): void {

        
    }



}
