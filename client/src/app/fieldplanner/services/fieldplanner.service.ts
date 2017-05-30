import { Injectable } from "@angular/core";
import { UUID } from "./helpers/uuid";

import { Competition } from "./domain/competition";
import { Station } from "./domain/station";

@Injectable()
export class FieldplannerService implements IFieldplannerService {


    public getCompetition(id: string): any {
        return "";
    }

    /*public competitions: Array<Competition> = new Array<Competition>();
    public competition: Competition;

    public addStation(): void {

        let station = new Station();
        station.number = this.competition.stations.length + 1;
        this.competition.stations.push(station);
    }

    public addCompetition(name: string): string {

        let competitionId = UUID.UUID();
        let competition = new Competition(competitionId, name);

        this.competitions.push(competition);

        return competitionId;
    }

    public selectCompetition(id: string): void {
        for(let c of this.competitions) {
            if (c.id === id) {
                this.competition = c;
            }
        }
    }*/

    

}

export interface IFieldplannerService {
    getCompetition(id: string): any;
    /*competitions: Array<Competition>;
    competition: Competition;
    addStation(): void;
    addCompetition(name: string): string;
    selectCompetition(id: string): void;*/
} 



