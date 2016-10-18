var app;
(function (app) {
    var components;
    (function (components) {
        var planner;
        (function (planner) {
            var StationPlannerController = (function () {
                function StationPlannerController(dataService) {
                    this.dataService = dataService;
                    this.getTargets();
                    this.getDistances();
                }
                StationPlannerController.prototype.getTargets = function () {
                    var _this = this;
                    this.dataService.get("api/target").then(function (response) {
                        _this.figures = response;
                    });
                };
                StationPlannerController.prototype.getDistances = function () {
                    var _this = this;
                    this.dataService.get("api/target/distances").then(function (response) {
                        _this.distances = response;
                    });
                };
                StationPlannerController.controllerId = "stationPlannerController";
                return StationPlannerController;
            }());
            planner.StationPlannerController = StationPlannerController;
            angular.module("app.components.planner").controller(StationPlannerController.controllerId, StationPlannerController);
        })(planner = components.planner || (components.planner = {}));
    })(components = app.components || (app.components = {}));
})(app || (app = {}));
//# sourceMappingURL=StationPlannerController.js.map