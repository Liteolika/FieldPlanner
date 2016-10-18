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
                PlannerController.prototype.setFigure = function (station, targetGroup, target, figure) {
                    target.figure = figure;
                    //this.calculateMaxDistance(station, targetGroup);
                };
                PlannerController.prototype.getTargetMaxDistance = function (station, target, weaponGroup) {
                    if (target.figure == null) {
                        return "N/A";
                    }
                    var wg = WeaponGroup[weaponGroup];
                    var figureGroup = target.figure.figureGroup;
                    var maxDistance = "";
                    if (figureGroup > 1) {
                        station.shootingConditions.forEach(function (sc) {
                            if (sc.weaponGroup == wg) {
                                if (sc.hasSupportHand) {
                                    figureGroup--;
                                }
                            }
                        });
                    }
                    this.distances.forEach(function (d) {
                        if (d.figureGroup == figureGroup) {
                            maxDistance = d[weaponGroup];
                        }
                    }, this);
                    return maxDistance;
                };
                PlannerController.prototype.getTargetGroupMaxDistance = function (station, targetGroup, weaponGroup) {
                    var maxFigureGroup = 0;
                    var maxDistance = "N/A";
                    var wg = WeaponGroup[weaponGroup];
                    if (targetGroup.targets.length < 1) {
                        return maxDistance;
                    }
                    targetGroup.targets.forEach(function (t) {
                        if (t.figure != null) {
                            if (t.figure.figureGroup > maxFigureGroup) {
                                maxFigureGroup = t.figure.figureGroup;
                            }
                        }
                    });
                    if (maxFigureGroup > 1) {
                        station.shootingConditions.forEach(function (s) {
                            if (s.weaponGroup == wg) {
                                if (s.hasSupportHand) {
                                    maxFigureGroup--;
                                }
                            }
                        });
                    }
                    this.distances.forEach(function (d) {
                        if (d.figureGroup == maxFigureGroup) {
                            maxDistance = d[weaponGroup];
                        }
                    }, this);
                    return maxDistance;
                };
                PlannerController.prototype.setSupportHand = function (station, weaponGroup, supportHand) {
                    var wg = WeaponGroup[weaponGroup];
                    station.shootingConditions.forEach(function (s) {
                        if (s.weaponGroup == wg) {
                            console.log("Setting supporthand for " + weaponGroup + " to " + supportHand);
                            s.hasSupportHand == supportHand;
                        }
                    });
                };
                PlannerController.prototype.setStance = function (station, weaponGroup, stance) {
                    var wg = WeaponGroup[weaponGroup];
                    station.shootingConditions.forEach(function (s) {
                        if (s.weaponGroup == wg) {
                            console.log("Setting stance for " + weaponGroup + " to " + stance);
                            s.stance = stance;
                        }
                    });
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
                    this.shootingConditions = new Array();
                    this.shootingConditions.push(new ShootingCondition(WeaponGroup.A));
                    this.shootingConditions.push(new ShootingCondition(WeaponGroup.R));
                    this.shootingConditions.push(new ShootingCondition(WeaponGroup.B));
                    this.shootingConditions.push(new ShootingCondition(WeaponGroup.C));
                }
                return Station;
            }());
            planner.Station = Station;
            var ShootingCondition = (function () {
                function ShootingCondition(weaponGroup) {
                    this.hasSupportHand = false;
                    this.stance = Stance.Stående;
                    this.weaponGroup = weaponGroup;
                }
                return ShootingCondition;
            }());
            planner.ShootingCondition = ShootingCondition;
            (function (WeaponGroup) {
                WeaponGroup[WeaponGroup["A"] = 0] = "A";
                WeaponGroup[WeaponGroup["R"] = 1] = "R";
                WeaponGroup[WeaponGroup["B"] = 2] = "B";
                WeaponGroup[WeaponGroup["C"] = 3] = "C";
            })(planner.WeaponGroup || (planner.WeaponGroup = {}));
            var WeaponGroup = planner.WeaponGroup;
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
            var FigureModelDto = (function () {
                function FigureModelDto() {
                }
                return FigureModelDto;
            }());
            planner.FigureModelDto = FigureModelDto;
        })(planner = components.planner || (components.planner = {}));
    })(components = app.components || (app.components = {}));
})(app || (app = {}));
