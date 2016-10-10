var app;
(function (app) {
    var components;
    (function (components) {
        var planner;
        (function (planner) {
            "use strict";
            var PlannerController = (function () {
                function PlannerController(dataService, notificationService) {
                    this.dataService = dataService;
                    this.notificationService = notificationService;
                    this.stations = new Array();
                    this.figures = new Array();
                    this.stances = new Array();
                    this.stance = null;
                    this.distances = new Array();
                    this.getDistances();
                    this.getTargets();
                    for (var member in Stance) {
                        if (typeof Stance[member] === "number") {
                            this.stances.push(member);
                        }
                    }
                }
                PlannerController.prototype.generateId = function () {
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
                PlannerController.prototype.getLetter = function (lastLetter) {
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
                PlannerController.prototype.addStation = function () {
                    var newStation = new Station();
                    newStation.id = this.generateId();
                    newStation.number = this.stations.length + 1;
                    this.stations.push(newStation);
                };
                PlannerController.prototype.addTargetGroup = function (station) {
                    if (station.targetGroups.length == 6) {
                        return;
                    }
                    if (station.targetGroups.length > 0) {
                        var lastLetter = station.targetGroups[station.targetGroups.length - 1].name;
                        var newLetter = this.getLetter(lastLetter);
                        station.targetGroups.push(new TargetGroup(newLetter));
                    }
                    else {
                        station.targetGroups.push(new TargetGroup("A"));
                    }
                };
                PlannerController.prototype.removeTargetGroup = function (station, targetGroup) {
                    var _this = this;
                    var confirm = this.notificationService.confirm("Vill du verkligen ta bort målgrupp " + targetGroup.name + "? ", "Ta bort målgrupp").then(function (result) {
                        var idx = null;
                        for (var i = 0; i < station.targetGroups.length; i++) {
                            if (station.targetGroups[i].name == targetGroup.name) {
                                idx = i;
                            }
                        }
                        if (idx != null) {
                            station.targetGroups.splice(idx, 1);
                            _this.renameTargetGroups(station);
                        }
                    });
                };
                PlannerController.prototype.addTarget = function (targetGroup) {
                    targetGroup.targets.push(new Target());
                };
                PlannerController.prototype.renameTargetGroups = function (station) {
                    for (var i = 0; i < station.targetGroups.length; i++) {
                        if (i == 0) {
                            station.targetGroups[i].name = "A";
                        }
                        else {
                            station.targetGroups[i].name = this.getLetter(station.targetGroups[i - 1].name);
                        }
                    }
                };
                PlannerController.prototype.calculateMaxDistance = function (station, targetGroup) {
                    console.log("calculating max distance for targetgroup: " + targetGroup.name);
                    var maxFigureGroup = 0;
                    targetGroup.targets.forEach(function (t) {
                        console.log(t.figure.description);
                        console.log(maxFigureGroup);
                        if (t.figure.figureGroup > maxFigureGroup) {
                            console.log("found higher figuregroup: " + maxFigureGroup);
                            maxFigureGroup = t.figure.figureGroup;
                        }
                    }, this);
                    if (station.hasSupportHand) {
                        if (maxFigureGroup > 1) {
                            maxFigureGroup--;
                        }
                    }
                    this.distances.forEach(function (d) {
                        if (d.figureGroup == maxFigureGroup) {
                            targetGroup.maxDistance = d;
                        }
                    }, this);
                };
                PlannerController.prototype.setFigure = function (station, targetGroup, target, figure) {
                    target.figure = figure;
                    this.calculateMaxDistance(station, targetGroup);
                };
                PlannerController.prototype.getMaxDistance = function (weapongroup, figureGroup) {
                    if (figureGroup == null)
                        return "N/A";
                    for (var i = 0; i < this.distances.length; i++) {
                        if (this.distances[i].figureGroup == figureGroup) {
                            var fg = this.distances[i];
                            return fg[weapongroup.toLowerCase()];
                        }
                    }
                };
                PlannerController.prototype.getTargets = function () {
                    var _this = this;
                    this.dataService.get("api/target").then(function (response) {
                        _this.figures = response;
                    });
                };
                PlannerController.prototype.getDistances = function () {
                    var _this = this;
                    this.dataService.get("api/target/distances").then(function (response) {
                        _this.distances = response;
                    });
                };
                PlannerController.controllerId = "plannerController";
                return PlannerController;
            }());
            planner.PlannerController = PlannerController;
            angular.module("app.components.planner").controller(PlannerController.controllerId, PlannerController);
            (function (Stance) {
                Stance[Stance["Stående"] = 0] = "Stående";
                Stance[Stance["Sittande"] = 1] = "Sittande";
                Stance[Stance["Knästående"] = 2] = "Knästående";
                Stance[Stance["Liggande"] = 3] = "Liggande";
                Stance[Stance["Valfri"] = 4] = "Valfri";
            })(planner.Stance || (planner.Stance = {}));
            var Stance = planner.Stance;
            var DistanceModel = (function () {
                function DistanceModel() {
                }
                return DistanceModel;
            }());
            planner.DistanceModel = DistanceModel;
            var Station = (function () {
                function Station() {
                    this.name = "";
                    this.targetGroups = new Array();
                    this.hasSupportHand = false;
                    this.stance = Stance.Stående;
                }
                return Station;
            }());
            planner.Station = Station;
            var TargetGroup = (function () {
                function TargetGroup(name) {
                    this.targets = new Array();
                    this.name = name;
                }
                return TargetGroup;
            }());
            planner.TargetGroup = TargetGroup;
            var Target = (function () {
                function Target() {
                }
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
