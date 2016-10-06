var app;
(function (app) {
    var core;
    (function (core) {
        var FourOFourController = (function () {
            function FourOFourController($stateParams) {
                this.$stateParams = $stateParams;
                this.activate();
            }
            FourOFourController.prototype.activate = function () {
                this.errormessage = this.$stateParams["errormessage"];
            };
            FourOFourController.controllerId = "fourOFourController";
            return FourOFourController;
        }());
        core.FourOFourController = FourOFourController;
        angular.module("app.core").controller(FourOFourController.controllerId, FourOFourController);
    })(core = app.core || (app.core = {}));
})(app || (app = {}));
