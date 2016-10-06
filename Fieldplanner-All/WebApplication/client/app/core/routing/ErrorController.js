var app;
(function (app) {
    var core;
    (function (core) {
        var ErrorController = (function () {
            function ErrorController($stateParams) {
                this.$stateParams = $stateParams;
                this.activate();
            }
            ErrorController.prototype.activate = function () {
                this.errormessage = this.$stateParams["errormessage"];
            };
            ErrorController.controllerId = "errorController";
            return ErrorController;
        }());
        core.ErrorController = ErrorController;
        angular.module("app.core").controller(ErrorController.controllerId, ErrorController);
    })(core = app.core || (app.core = {}));
})(app || (app = {}));
//# sourceMappingURL=ErrorController.js.map