module app.components.home {

    "use strict";

    export class HomeController {

        public title: string = "The Home Controller";

        public targets: Array<TargetDto>

        constructor(private dataService: app.core.IDataService) {

            dataService.get("api/target").then((response: Array<TargetDto>) => {
                this.targets = response;
            });

        }

        public static controllerId: string = "homeController";

    }


    angular.module("app.components.home").controller(HomeController.controllerId, HomeController);

    export class TargetDto {
        public description: string;
        public imagePath: string;
    }
}