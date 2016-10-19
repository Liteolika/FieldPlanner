module app.components.planner {

    export class StationPlannerController {

        public conditions: Array<ConditionDto>;
        public figures: Array<FigureDto>;
        public distances: Array<DistanceDto>;
        public stations: Array<Station> = new Array<Station>();

        public calculateTargetDifficulty(weaponGroup: WeaponGroup, target: Target): number {
            if (isNaN(weaponGroup.ownDistance)) {
                return 0;
            }

            var maxDistance = this.calculateMaxDistance(weaponGroup, target.figure);
            var result = (weaponGroup.ownDistance / maxDistance) * 100;
            return Math.round(result * 100) / 100;

        }

        public calculateTargetGroupDifficulty(weaponGroup: WeaponGroup, targetGroup: TargetGroup): number {

            if (isNaN(weaponGroup.ownDistance)) {
                return 0;
            }

            var result: number = 0;
            var diffs: Array<number> = new Array<number>();
            var totalTargets = 0;
            var totalDiff = 0;

            targetGroup.targets.forEach(t => {
                totalTargets++;
                totalDiff += this.calculateTargetDifficulty(weaponGroup, t);
            });
            console.log("targets: " + totalTargets + " totalDiff: " + totalDiff);
            result = totalDiff / totalTargets;
            return Math.round(result * 100) / 100;
            //var maxDistance = this.calculateMaxTargetGroupDistance(weaponGroup, targetGroup);
            //var result = (weaponGroup.ownDistance / maxDistance) * 100;
            //return Math.round(result * 100) / 100;

        }

        public calculateMaxTargetGroupDistance(weaponGroup: WeaponGroup, targetGroup: TargetGroup): number {

            var maxDistance = null;

            targetGroup.targets.forEach(t => {
                var tmp = this.calculateMaxDistance(weaponGroup, t.figure);
                if (maxDistance == null) {
                    maxDistance = tmp;
                }
                if (tmp < maxDistance) {
                    maxDistance = tmp;
                }
            });

            return maxDistance;

        }

        public calculateMaxDistance(weaponGroup: WeaponGroup, figure: FigureDto): number {

            //console.log("Calc max dist for wg " + weaponGroup.name);
            //console.log(weaponGroup);
            //console.log(weaponGroup.condition);
            //console.log(figure);

            if (figure == null) {
                return 0;
            }

            var result: number = 0;

            var figureGroup = figure.figureGroup;
            if (figureGroup > 1) {
                if (weaponGroup.condition.supporthand) {
                    //console.log("has supporthand. compensating.");
                    figureGroup--;
                }
            }

            //console.log("figureGroup: " + figureGroup);
            
            this.distances.forEach(d => {
                if (d.figureGroup == figureGroup) {
                    //console.log("found correct figuregroup");
                    //console.log(d);
                    result = d[weaponGroup.name.toLowerCase()];
                }
            });

            return result;

        }

        public addStation(): void {
            var newStation = new Station();
            newStation.id = this.generateId();
            newStation.number = this.stations.length + 1;
            this.stations.push(newStation);
        }

        private getTargets(): void {
            this.dataService.get("api/target").then((response: Array<FigureDto>) => {
                this.figures = response;
            });
        }

        private getDistances(): void {
            this.dataService.get("api/target/distances").then((response: Array<DistanceDto>) => {
                this.distances = response;
            });
        }

        private getConditions(): void {
            this.dataService.get("api/condition").then((response: Array<ConditionDto>) => {
                this.conditions = response;
            });
        }

        private generateId(): string {
            var d = new Date().getTime();

            //var idtemplate = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";
            var idtemplate = "xxxx4xxxyxxxxx";

            var uuid = idtemplate.replace(/[xy]/g, function (c) {
                var r = (d + Math.random() * 16) % 16 | 0;
                d = Math.floor(d / 16);
                return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
            });
            return uuid;
        }

        constructor(private dataService: app.core.IDataService) {
            this.getTargets();
            this.getDistances();
            this.getConditions();
        }

        public static controllerId: string = "stationPlannerController";

    }

    angular.module("app.components.planner").controller(StationPlannerController.controllerId, StationPlannerController);

    export class WeaponGroup {
        public name: string;
        public condition: ConditionDto;
        public ownDistance: number;

        constructor(name: string, condition: ConditionDto) {
            this.name = name;
            this.condition = condition;
        }
    }

    export class Station {
        public id: string;
        public number: number;
        public name: string = "";

        public weaponGroups: Array<WeaponGroup> = new Array<WeaponGroup>();
        public targetGroups: Array<TargetGroup> = new Array<TargetGroup>();

        public addTargetGroup(): void {

            if (this.targetGroups.length == 6) {
                return;
            }

            if (this.targetGroups.length > 0) {
                var lastLetter = this.targetGroups[this.targetGroups.length - 1].name;
                var newLetter = this.getLetter(lastLetter);
                this.targetGroups.push(new TargetGroup(newLetter));
            } else {
                this.targetGroups.push(new TargetGroup("A"));
            }
        }

        private getLetter(lastLetter: string): string {
            if (lastLetter == "") return "A";
            if (lastLetter.toUpperCase() == "A") return "B";
            if (lastLetter.toUpperCase() == "B") return "C";
            if (lastLetter.toUpperCase() == "C") return "D";
            if (lastLetter.toUpperCase() == "D") return "E";
            if (lastLetter.toUpperCase() == "E") return "F";
            if (lastLetter.toUpperCase() == "F") return "G";
        }


        constructor() {
            this.weaponGroups.push(new WeaponGroup("A", null));
            this.weaponGroups.push(new WeaponGroup("R", null));
            this.weaponGroups.push(new WeaponGroup("B", null));
            this.weaponGroups.push(new WeaponGroup("C", null));
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
        public figure: FigureDto;

        public setFigure(figure: FigureDto): void {
            this.figure = figure;
        }

    }

    export class ConditionDto {

        public shortDescription: string;
        public description: string;
        public supporthand: boolean;
        public angledArm: boolean;

    }


    export class FigureDto {
        public id: string;
        public description: string;
        public imagePath: string;
        public supplier: string;
        public article: string;
        public color: string;
        public size: string;
        public figureGroup: number;
        public figureShift: number;
    }



    export class DistanceDto {
        public figureGroup: number;
        public a: number;
        public r: number;
        public b: number;
        public c: number;

    }

}