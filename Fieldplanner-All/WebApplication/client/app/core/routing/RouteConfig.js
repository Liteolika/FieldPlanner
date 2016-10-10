var app;
(function (app) {
    var core;
    (function (core) {
        var RouteConfig = (function () {
            function RouteConfig($locationProvider, $stateProvider, $urlRouterProvider) {
                this.$locationProvider = $locationProvider;
                this.$stateProvider = $stateProvider;
                this.$urlRouterProvider = $urlRouterProvider;
                this.$urlRouterProvider.otherwise("/404");
                this.$stateProvider.state("404", {
                    url: "/404",
                    templateUrl: "views/404.html",
                    controller: core.FourOFourController.controllerId,
                    controllerAs: "vm",
                    params: { "errormessage": null }
                });
                this.$stateProvider.state("unauthorized", {
                    url: "/unauthorized",
                    templateUrl: "views/unauthorized.html",
                    controller: core.ErrorController.controllerId,
                    controllerAs: "vm",
                    params: { "errormessage": null }
                });
                this.$stateProvider.state("home", {
                    url: "/home",
                    templateUrl: "views/home.html",
                    controller: app.components.home.HomeController.controllerId,
                    controllerAs: "vm"
                });
                this.$stateProvider.state("planner", {
                    url: "/planner",
                    templateUrl: "views/planner.html",
                    controller: app.components.planner.PlannerController.controllerId,
                    controllerAs: "vm"
                });
            }
            return RouteConfig;
        }());
        core.RouteConfig = RouteConfig;
        angular.module("app.core").config(RouteConfig);
    })(core = app.core || (app.core = {}));
})(app || (app = {}));
//# sourceMappingURL=RouteConfig.js.map