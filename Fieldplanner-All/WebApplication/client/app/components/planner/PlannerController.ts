module app.components.planner {

    "use strict";

    export class PlannerController {

        public stations: Array<Station> = new Array<Station>();
        public figures: Array<TargetModelDto> = new Array<TargetModelDto>();
        public stances: Array<string> = new Array<string>();
        public stance: Stance = null;

        public addStation() {
            var newStation = new Station();
            newStation.number = this.stations.length + 1;
            this.stations.push(newStation);
        }

        private getTargets(): void {
            this.dataService.get("api/target").then((response: Array<TargetModelDto>) => {
                this.figures = response;
            });
        }

        constructor(private dataService: app.core.IDataService) {
            this.getTargets();
            for (var member in Stance) {
                if (typeof Stance[member] === "number") {
                    this.stances.push(member);
                }
            }
        }

        public static controllerId: string = "plannerController";

    }

    angular.module("app.components.planner").controller(PlannerController.controllerId, PlannerController);

    export enum Stance {
        Standing,
        Sitting,
        Kneeling,
        Layed
    }

    export class Station {

        public number: number;
        public name: string = "";
        public targetGroups: Array<TargetGroup> = new Array<TargetGroup>();
        public hasSupportHand: boolean = false;
        public stance: Stance = Stance.Standing;

        public addTargetGroup() {

            if (this.targetGroups.length == 6) {
                return;
            }

            if (this.targetGroups.length > 0) {
                var lastLetter = this.targetGroups[this.targetGroups.length - 1].name;
                var newLetter = Station.getLetter(lastLetter);
                this.targetGroups.push(new TargetGroup(newLetter));
            } else {
                this.targetGroups.push(new TargetGroup("A"));
            }
        }

        public static getLetter(lastLetter: string): string {
            if (lastLetter.toUpperCase() == "A") return "B";
            if (lastLetter.toUpperCase() == "B") return "C";
            if (lastLetter.toUpperCase() == "C") return "D";
            if (lastLetter.toUpperCase() == "D") return "E";
            if (lastLetter.toUpperCase() == "E") return "F";
            if (lastLetter.toUpperCase() == "F") return "G";
        }

    }

    export class TargetGroup {

        public name: string;
        public targets: Array<Target> = new Array<Target>();

        public addTarget(): void {
            this.targets.push(new Target());
        }

        constructor(name: string) {
            this.name = name;
        }

    }

    export class Target {
        public name: string;
        public targetClass: number;
        public figure: TargetModelDto;

        public setFigure(figure: TargetModelDto): void {
            this.figure = figure;
        }
    }

    export class TargetModelDto {
        public id: string;
        public description: string;
        public imagePath: string;
    }

}