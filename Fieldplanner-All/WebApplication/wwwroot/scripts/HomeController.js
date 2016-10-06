var app;
(function (app) {
    var components;
    (function (components) {
        var home;
        (function (home) {
            "use strict";
            var HomeController = (function () {
                function HomeController(dataService) {
                    var _this = this;
                    this.dataService = dataService;
                    this.title = "The Home Controller";
                    dataService.get("api/target").then(function (response) {
                        _this.targets = response;
                    });
                }
                HomeController.controllerId = "homeController";
                return HomeController;
            }());
            home.HomeController = HomeController;
            angular.module("app.components.home").controller(HomeController.controllerId, HomeController);
            var TargetDto = (function () {
                function TargetDto() {
                }
                return TargetDto;
            }());
            home.TargetDto = TargetDto;
        })(home = components.home || (components.home = {}));
    })(components = app.components || (app.components = {}));
})(app || (app = {}));
