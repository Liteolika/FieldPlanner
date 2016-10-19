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
                    this.getConditions();
                }
                StationPlannerController.prototype.calculateTargetGroupDifficulty = function (weaponGroup, targetGroup) {
                    var maxDistance = this.calculateMaxTargetGroupDistance(weaponGroup, targetGroup);
                    if (isNaN(weaponGroup.ownDistance)) {
                        return 0;
                    }
                    var result = (weaponGroup.ownDistance / maxDistance) * 100;
                    return Math.round(result * 100) / 100;
                };
                StationPlannerController.prototype.calculateMaxTargetGroupDistance = function (weaponGroup, targetGroup) {
                    var _this = this;
                    var maxDistance = null;
                    targetGroup.targets.forEach(function (t) {
                        var tmp = _this.calculateMaxDistance(weaponGroup, t.figure);
                        if (maxDistance == null) {
                            maxDistance = tmp;
                        }
                        if (tmp < maxDistance) {
                            maxDistance = tmp;
                        }
                    });
                    return maxDistance;
                };
                StationPlannerController.prototype.calculateMaxDistance = function (weaponGroup, figure) {
                    console.log("Calc max dist for wg " + weaponGroup.name);
                    console.log(weaponGroup);
                    console.log(weaponGroup.condition);
                    console.log(figure);
                    if (figure == null) {
                        return 0;
                    }
                    var result = 0;
                    var figureGroup = figure.figureGroup;
                    if (figureGroup > 1) {
                        if (weaponGroup.condition.supporthand) {
                            console.log("has supporthand. compensating.");
                            figureGroup--;
                        }
                    }
                    console.log("figureGroup: " + figureGroup);
                    this.distances.forEach(function (d) {
                        if (d.figureGroup == figureGroup) {
                            console.log("found correct figuregroup");
                            console.log(d);
                            result = d[weaponGroup.name.toLowerCase()];
                        }
                    });
                    return result;
                };
                StationPlannerController.prototype.addStation = function () {
                    var newStation = new Station();
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
                StationPlannerController.prototype.getConditions = function () {
                    var _this = this;
                    this.dataService.get("api/condition").then(function (response) {
                        _this.conditions = response;
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
            var WeaponGroup = (function () {
                function WeaponGroup(name, condition) {
                    this.name = name;
                    this.condition = condition;
                }
                return WeaponGroup;
            }());
            planner.WeaponGroup = WeaponGroup;
            var Station = (function () {
                function Station() {
                    this.name = "";
                    this.weaponGroups = new Array();
                    this.targetGroups = new Array();
                    this.weaponGroups.push(new WeaponGroup("A", null));
                    this.weaponGroups.push(new WeaponGroup("R", null));
                    this.weaponGroups.push(new WeaponGroup("B", null));
                    this.weaponGroups.push(new WeaponGroup("C", null));
                }
                Station.prototype.addTargetGroup = function () {
                    if (this.targetGroups.length == 6) {
                        return;
                    }
                    if (this.targetGroups.length > 0) {
                        var lastLetter = this.targetGroups[this.targetGroups.length - 1].name;
                        var newLetter = this.getLetter(lastLetter);
                        this.targetGroups.push(new TargetGroup(newLetter));
                    }
                    else {
                        this.targetGroups.push(new TargetGroup("A"));
                    }
                };
                Station.prototype.getLetter = function (lastLetter) {
                    if (lastLetter == "")
                        return "A";
                    if (lastLetter.toUpperCase() == "A")
                        return "B";
                    if (lastLetter.toUpperCase() == "B")
                        return "C";
                    if (lastLetter.toUpperCase() == "C")
                        return "D";
                    if (lastLetter.toUpperCase() == "D")
                        return "E";
                    if (lastLetter.toUpperCase() == "E")
                        return "F";
                    if (lastLetter.toUpperCase() == "F")
                        return "G";
                };
                return Station;
            }());
            planner.Station = Station;
            var TargetGroup = (function () {
                function TargetGroup(name) {
                    this.targets = new Array();
                    this.name = name;
                }
                TargetGroup.prototype.addTarget = function () {
                    this.targets.push(new Target());
                };
                return TargetGroup;
            }());
            planner.TargetGroup = TargetGroup;
            var Target = (function () {
                function Target() {
                }
                Target.prototype.setFigure = function (figure) {
                    this.figure = figure;
                };
                return Target;
            }());
            planner.Target = Target;
            var ConditionDto = (function () {
                function ConditionDto() {
                }
                return ConditionDto;
            }());
            planner.ConditionDto = ConditionDto;
            var FigureDto = (function () {
                function FigureDto() {
                }
                return FigureDto;
            }());
            planner.FigureDto = FigureDto;
            var DistanceDto = (function () {
                function DistanceDto() {
                }
                return DistanceDto;
            }());
            planner.DistanceDto = DistanceDto;
        })(planner = components.planner || (components.planner = {}));
    })(components = app.components || (app.components = {}));
})(app || (app = {}));
//# sourceMappingURL=StationPlannerController.js.map