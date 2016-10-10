var app;
(function (app) {
    var core;
    (function (core) {
        "use strict";
        var WaitModalController = (function () {
            function WaitModalController($uibModalInstance, items) {
                this.waitMessage = "";
                this.waitMessage = items.message;
                console.log("waitmodal with message: " + items.message);
            }
            WaitModalController.controllerId = "waitModalController";
            return WaitModalController;
        }());
        core.WaitModalController = WaitModalController;
        angular.module("app.core").controller(WaitModalController.controllerId, WaitModalController);
    })(core = app.core || (app.core = {}));
})(app || (app = {}));
