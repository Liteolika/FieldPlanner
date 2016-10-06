var app;
(function (app) {
    var layout;
    (function (layout) {
        var ShellController = (function () {
            function ShellController(dataService) {
                this.dataService = dataService;
                this.init();
            }
            ShellController.prototype.init = function () {
                var _this = this;
                this.dataService.getSingle("api/version").then(function (result) {
                    _this.appVersion = result;
                });
            };
            ShellController.controllerId = "shellController";
            return ShellController;
        }());
        layout.ShellController = ShellController;
        angular.module("app.layout").controller(ShellController.controllerId, ShellController);
    })(layout = app.layout || (app.layout = {}));
})(app || (app = {}));
//# sourceMappingURL=ShellController.js.map