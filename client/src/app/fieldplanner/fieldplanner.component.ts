import { Component } from "@angular/core";
import { IFieldplannerService } from "./services/fieldplanner.service";

require("./styles/fieldplanner.less");

@Component({
    templateUrl: "./fieldplanner.component.html",
    selector: "field-planner"
})
export class FieldplannerComponent {

    
    constructor(private fieldplannerService: IFieldplannerService) {
        
    }
}
