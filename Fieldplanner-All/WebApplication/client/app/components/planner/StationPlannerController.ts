module app.components.planner {

    export class StationPlannerController {

        public figures: Array<FigureDto>;
        public distances: Array<DistanceDto>;
        public stations: Array<StationDto> = new Array<StationDto>();

        public addStation(): void {
            var newStation = new StationDto();
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
        }

        public static controllerId: string = "stationPlannerController";

    }

    angular.module("app.components.planner").controller(StationPlannerController.controllerId, StationPlannerController);

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

    export class StationDto {
        public id: string;
        public number: number;
        public name: string = "";

    }

    export class DistanceDto {
        public figureGroup: number;
        public a: number;
        public r: number;
        public b: number;
        public c: number;

    }

}