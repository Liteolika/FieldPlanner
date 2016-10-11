module app.components.planner {

    "use strict";

    export class PlannerController {

        public stations: Array<Station> = new Array<Station>();
        public figures: Array<FigureModelDto> = new Array<FigureModelDto>();
        public stances: Array<string> = new Array<string>();
        public stance: Stance = null;
        public distances: Array<DistanceModel> = new Array<DistanceModel>();

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

        private getLetter(lastLetter: string): string {
            if (lastLetter == "") return "A";
            if (lastLetter.toUpperCase() == "A") return "B";
            if (lastLetter.toUpperCase() == "B") return "C";
            if (lastLetter.toUpperCase() == "C") return "D";
            if (lastLetter.toUpperCase() == "D") return "E";
            if (lastLetter.toUpperCase() == "E") return "F";
            if (lastLetter.toUpperCase() == "F") return "G";
        }

        public addStation() {
            var newStation = new Station();
            newStation.id = this.generateId();
            newStation.number = this.stations.length + 1;
            this.stations.push(newStation);
        }

        public addTargetGroup(station: Station) {

            if (station.targetGroups.length == 6) {
                return;
            }

            if (station.targetGroups.length > 0) {
                var lastLetter = station.targetGroups[station.targetGroups.length - 1].name;
                var newLetter = this.getLetter(lastLetter);
                station.targetGroups.push(new TargetGroup(newLetter));
            } else {
                station.targetGroups.push(new TargetGroup("A"));
            }
        }

        public removeTargetGroup(station: Station, targetGroup: TargetGroup) {

            var confirm = this.notificationService.confirm("Vill du verkligen ta bort målgrupp " + targetGroup.name + "? ", "Ta bort målgrupp").then((result: any) => {
                var idx: number = null;
                for (var i = 0; i < station.targetGroups.length; i++) {
                    if (station.targetGroups[i].name == targetGroup.name) {
                        idx = i;
                    }
                }
                if (idx != null) {
                    station.targetGroups.splice(idx, 1);
                    this.renameTargetGroups(station);
                }
            });

        }

        public addTarget(targetGroup: TargetGroup) {
            targetGroup.targets.push(new Target());
        }

        private renameTargetGroups(station): void {
            for (var i = 0; i < station.targetGroups.length; i++) {
                if (i == 0) {
                    station.targetGroups[i].name = "A";
                } else {
                    station.targetGroups[i].name = this.getLetter(station.targetGroups[i - 1].name);
                }

            }
        }

        public setFigure(station: Station, targetGroup: TargetGroup, target: Target, figure: FigureModelDto): void {
            target.figure = figure;
            //this.calculateMaxDistance(station, targetGroup);
        }

        public getTargetMaxDistance(station: Station, target: Target, weaponGroup: string): string {

            if (target.figure == null) {
                return "N/A";
            }

            var figureGroup: number = target.figure.figureGroup;
            var maxDistance: string = "";
            if (figureGroup > 1) {
                if (station.hasSupportHand) {
                    figureGroup--;
                }
            }

            this.distances.forEach((d) => {
                if (d.figureGroup == figureGroup) {
                    maxDistance = d[weaponGroup];
                }
            }, this);

            return maxDistance;

        }

        public getTargetGroupMaxDistance(station: Station, targetGroup: TargetGroup, weaponGroup: string): string {
            var maxFigureGroup: number = 0;
            var maxDistance = "N/A";

            if (targetGroup.targets.length < 1) {
                return maxDistance;
            }

            targetGroup.targets.forEach((t) => {
                if (t.figure != null) {
                    if (t.figure.figureGroup > maxFigureGroup) {
                        maxFigureGroup = t.figure.figureGroup;
                    }    
                }
                
            });

            if (maxFigureGroup > 1) {
                if (station.hasSupportHand) {
                    maxFigureGroup--;
                }
            }

            this.distances.forEach((d) => {
                if (d.figureGroup == maxFigureGroup) {
                    maxDistance = d[weaponGroup];
                }
            }, this);

            return maxDistance;

        }

        

        private calculateTargetGroupMaxDistance(station: Station, targetGroup: TargetGroup) {

            console.log("calculating max distance for targetgroup: " + targetGroup.name);
            var maxFigureGroup: number = 0;

            targetGroup.targets.forEach((t) => {
                console.log(t.figure.description);
                console.log(maxFigureGroup);
                if (t.figure.figureGroup > maxFigureGroup) {
                    console.log("found higher figuregroup: " + maxFigureGroup);
                    maxFigureGroup = t.figure.figureGroup;
                }
            }, this);

            this.distances.forEach((d) => {
                if (d.figureGroup == maxFigureGroup) {
                    targetGroup.maxDistance = d;
                }
            }, this);


            if (station.hasSupportHand) {
                if (maxFigureGroup > 1) {
                    maxFigureGroup--;
                }
            }

        }



        public getMaxDistance(weapongroup: string, figureGroup: number): string {
            if (figureGroup == null) return "N/A";
            for (var i = 0; i < this.distances.length; i++) {
                if (this.distances[i].figureGroup == figureGroup) {
                    var fg = this.distances[i];
                    return fg[weapongroup.toLowerCase()];
                }
            }
        }

        private getTargets(): void {
            this.dataService.get("api/target").then((response: Array<FigureModelDto>) => {
                this.figures = response;
            });
        }

        private getDistances(): void {

            this.dataService.get("api/target/distances").then((response: Array<DistanceModel>) => {
                this.distances = response;
            });

        }

        constructor(
            private dataService: app.core.IDataService,
            private notificationService: app.core.INotificationService
        ) {
            this.getDistances();
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
        Stående,
        Sittande,
        Knästående,
        Liggande,
        Valfri
    }

    export class DistanceModel {
        public figureGroup: number;
        public a: number;
        public r: number;
        public b: number;
        public c: number;

    }

    export class Station {
        public id: string;
        public number: number;
        public name: string = "";
        public targetGroups: Array<TargetGroup> = new Array<TargetGroup>();
        public hasSupportHand: boolean = false;
        public stance: Stance = Stance.Stående;

    }

    export class TargetGroup {

        public name: string;

        public maxDistance: DistanceModel;

        public targets: Array<Target> = new Array<Target>();

        constructor(name: string) {
            this.name = name;
        }

    }

    export class Target {
        public name: string;
        public figure: FigureModelDto;

    }

    export class FigureModelDto {
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

    //    public Guid Id { get; set; }
    //public string Supplier { get; set; }
    //public string Article { get; set; }
    //public string Color { get; set; }
    //public string Size { get; set; }
    //public int FigureGroup { get; set; }
    //public int FigureShift { get; set; }

    //public string Description { get; set; }
    //public string ImagePath { get; set; }

}