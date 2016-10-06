module app.core {

    export class RouteConfig {


        constructor(
            private $locationProvider: ng.ILocationProvider,
            private $stateProvider: ng.ui.IStateProvider,
            private $urlRouterProvider: ng.ui.IUrlRouterProvider
        ) {

            this.$urlRouterProvider.otherwise("/404");

            this.$stateProvider.state("404", <ng.ui.IState>{
                url: "/404",
                templateUrl: "views/404.html",
                controller: FourOFourController.controllerId,
                controllerAs: "vm",
                params: { "errormessage": null }
            });

            this.$stateProvider.state("unauthorized", <ng.ui.IState>{
                url: "/unauthorized",
                templateUrl: "views/unauthorized.html",
                controller: ErrorController.controllerId,
                controllerAs: "vm",
                params: { "errormessage": null }
            });

            this.$stateProvider.state("home", <ng.ui.IState>{
                url: "/home",
                templateUrl: "views/home.html",
                controller: app.components.home.HomeController.controllerId,
                controllerAs: "vm"
            });



        }

    }

    angular.module("app.core").config(RouteConfig);

}