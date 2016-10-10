var app;
(function (app) {
    var core;
    (function (core) {
        "use strict";
        var ConfirmModalController = (function () {
            function ConfirmModalController($uibModalInstance, title, message) {
                this.$uibModalInstance = $uibModalInstance;
                this.title = "";
                this.message = "";
                this.title = title;
                this.message = message;
            }
            ConfirmModalController.prototype.ok = function () {
                this.$uibModalInstance.close(true);
            };
            ConfirmModalController.prototype.cancel = function () {
                this.$uibModalInstance.close(false);
            };
            ConfirmModalController.controllerId = "confirmModalController";
            return ConfirmModalController;
        }());
        core.ConfirmModalController = ConfirmModalController;
        angular.module("app.core").controller(ConfirmModalController.controllerId, ConfirmModalController);
    })(core = app.core || (app.core = {}));
})(app || (app = {}));
