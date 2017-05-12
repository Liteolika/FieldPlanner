import { Injectable } from "@angular/core";
import { UUID } from "./helpers/uuid";

import { Competition } from "./domain/competition";
import { Station } from "./domain/station";

@Injectable()
export class FieldplannerService implements IFieldplannerService {

    public stations: Array<Station> = new Array<Station>();
    public competitions: Array<Competition> = new Array<Competition>();
    public competition: Competition;

    public addStation(): void {

        let station = new Station();
        station.number = this.stations.length + 1;
        this.stations.push(station);
    }

    public addCompetition(name: string): void {

        let competitionId = UUID.UUID();
        let competition = new Competition(competitionId, name);

        this.competitions.push(competition);
    }

    public selectCompetition(id: string): void {
        for(let c of this.competitions) {
            if (c.id == id) {
                this.competition = c;
            }
        }
    }

    

}

export interface IFieldplannerService {
    competitions: Array<Competition>;
    stations: Array<Station>;

    competition: Competition;
    
    addStation(): void;
    addCompetition(name: string): void;
    selectCompetition(id: string): void;
} 



