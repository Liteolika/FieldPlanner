var app;
(function (app) {
    var components;
    (function (components) {
        var home;
        (function (home) {
            "use strict";
            var HomeController = (function () {
                function HomeController() {
                    this.title = "The Home Controller";
                }
                HomeController.controllerId = "homeController";
                return HomeController;
            }());
            home.HomeController = HomeController;
            angular.module("app.components.home").controller(HomeController.controllerId, HomeController);
        })(home = components.home || (components.home = {}));
    })(components = app.components || (app.components = {}));
})(app || (app = {}));
//# sourceMappingURL=HomeController.js.map