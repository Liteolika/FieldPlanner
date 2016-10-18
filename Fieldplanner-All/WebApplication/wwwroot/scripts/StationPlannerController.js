var app;
(function (app) {
    var components;
    (function (components) {
        var planner;
        (function (planner) {
            var StationPlannerController = (function () {
                function StationPlannerController(dataService) {
                    this.dataService = dataService;
                    this.stations = new Array();
                    this.getTargets();
                    this.getDistances();
                }
                StationPlannerController.prototype.addStation = function () {
                    var newStation = new planner.Station();
                    newStation.id = this.generateId();
                    newStation.number = this.stations.length + 1;
                    this.stations.push(newStation);
                };
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
                StationPlannerController.prototype.generateId = function () {
                    var d = new Date().getTime();
                    //var idtemplate = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";
                    var idtemplate = "xxxx4xxxyxxxxx";
                    var uuid = idtemplate.replace(/[xy]/g, function (c) {
                        var r = (d + Math.random() * 16) % 16 | 0;
                        d = Math.floor(d / 16);
                        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
                    });
                    return uuid;
                };
                StationPlannerController.controllerId = "stationPlannerController";
                return StationPlannerController;
            }());
            planner.StationPlannerController = StationPlannerController;
            angular.module("app.components.planner").controller(StationPlannerController.controllerId, StationPlannerController);
        })(planner = components.planner || (components.planner = {}));
    })(components = app.components || (app.components = {}));
})(app || (app = {}));
