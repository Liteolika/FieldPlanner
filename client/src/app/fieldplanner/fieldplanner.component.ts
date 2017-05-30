import { Component } from "@angular/core";
import { IFieldplannerService } from "./services/fieldplanner.service";
import { Competition } from "./services/domain/competition";
import { Station } from "./services/domain/station";

require("./styles/fieldplanner.less");

@Component({
    templateUrl: "./fieldplanner.component.html",
    selector: "field-planner"
})
export class FieldplannerComponent {

    public newcompname: string;

    constructor(private fieldplannerService: IFieldplannerService) {
        let koko = fieldplannerService.getCompetition("");
    }

    

}
