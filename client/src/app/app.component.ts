import { Component, OnInit } from "@angular/core";
/*import { UserService } from "./shared/services/user.service";*/

require("./styles/custom.less");

@Component({
    selector: "fp-app",
    templateUrl: "app.component.html"
})
export class AppComponent implements OnInit {

    public title: string = "Peters @angular boilerplate";

    constructor() {}

    public ngOnInit(): void {

        
    }



}
