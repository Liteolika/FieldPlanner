var app;
(function (app) {
    var components;
    (function (components) {
        var planner;
        (function (planner) {
            "use strict";
            var PlannerController = (function () {
                function PlannerController(dataService) {
                    this.dataService = dataService;
                    this.stations = new Array();
                    this.figures = new Array();
                    this.stances = new Array();
                    this.stance = null;
                    this.getTargets();
                    for (var member in Stance) {
                        if (typeof Stance[member] === "number") {
                            this.stances.push(member);
                        }
                    }
                }
                PlannerController.prototype.addStation = function () {
                    var newStation = new Station();
                    newStation.number = this.stations.length + 1;
                    this.stations.push(newStation);
                };
                PlannerController.prototype.getTargets = function () {
                    var _this = this;
                    this.dataService.get("api/target").then(function (response) {
                        _this.figures = response;
                    });
                };
                PlannerController.controllerId = "plannerController";
                return PlannerController;
            }());
            planner.PlannerController = PlannerController;
            angular.module("app.components.planner").controller(PlannerController.controllerId, PlannerController);
            (function (Stance) {
                Stance[Stance["Standing"] = 0] = "Standing";
                Stance[Stance["Sitting"] = 1] = "Sitting";
                Stance[Stance["Kneeling"] = 2] = "Kneeling";
                Stance[Stance["Layed"] = 3] = "Layed";
            })(planner.Stance || (planner.Stance = {}));
            var Stance = planner.Stance;
            var Station = (function () {
                function Station() {
                    this.name = "";
                    this.targetGroups = new Array();
                    this.hasSupportHand = false;
                    this.stance = Stance.Standing;
                }
                Station.prototype.addTargetGroup = function () {
                    if (this.targetGroups.length == 6) {
                        return;
                    }
                    if (this.targetGroups.length > 0) {
                        var lastLetter = this.targetGroups[this.targetGroups.length - 1].name;
                        var newLetter = Station.getLetter(lastLetter);
                        this.targetGroups.push(new TargetGroup(newLetter));
                    }
                    else {
                        this.targetGroups.push(new TargetGroup("A"));
                    }
                };
                Station.prototype.removeTargetGroup = function (targetGroup) {
                    var idx = null;
                    for (var i = 0; i < this.targetGroups.length; i++) {
                        if (this.targetGroups[i].name == targetGroup.name) {
                            idx = i;
                        }
                    }
                    if (idx != null) {
                        this.targetGroups.splice(idx, 1);
                        this.renameTargetGroups();
                    }
                };
                Station.prototype.renameTargetGroups = function () {
                    for (var i = 0; i < this.targetGroups.length; i++) {
                        if (i == 0) {
                            this.targetGroups[i].name = "A";
                        }
                        else {
                            this.targetGroups[i].name = Station.getLetter(this.targetGroups[i - 1].name);
                        }
                    }
                };
                Station.getLetter = function (lastLetter) {
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
            var TargetModelDto = (function () {
                function TargetModelDto() {
                }
                return TargetModelDto;
            }());
            planner.TargetModelDto = TargetModelDto;
        })(planner = components.planner || (components.planner = {}));
    })(components = app.components || (app.components = {}));
})(app || (app = {}));
