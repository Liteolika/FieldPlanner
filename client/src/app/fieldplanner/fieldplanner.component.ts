import { Component } from "@angular/core";
import { FieldplannerService } from "./services/fieldplanner.service";
import { Competition } from "./services/domain/competition";
import { Station } from "./services/domain/station";

require("./styles/fieldplanner.less");

@Component({
    templateUrl: "./fieldplanner.component.html",
    selector: "field-planner"
})
export class FieldplannerComponent {

    public newcompname: string;

    constructor(private fieldplannerService: FieldplannerService) {

    }

    /*public getCompetitions(): Array<Competition> {
        return this.fieldplannerService.competitions;
    }

    public getCurrent(): Competition {
        return this.fieldplannerService.competition;
    }

    public addCompetition(): void {
        var newCompId = this.fieldplannerService.addCompetition(this.newcompname);
        this.fieldplannerService.selectCompetition(newCompId);
    }

    public addStation(): void {
        this.fieldplannerService.addStation();
    }*/

}
