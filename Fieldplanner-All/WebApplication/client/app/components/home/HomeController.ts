module app.components.home {

    "use strict";

    export class HomeController {

        public title: string = "The Home Controller";

        public static controllerId: string = "homeController";

    }


    angular.module("app.components.home").controller(HomeController.controllerId, HomeController);


}