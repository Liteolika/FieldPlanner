var app;
(function (app) {
    var core;
    (function (core) {
        "use strict";
        angular.module("app.core", [
            "ui.router",
            "ui.bootstrap",
            "toastr"
        ]);
    })(core = app.core || (app.core = {}));
})(app || (app = {}));
//# sourceMappingURL=core.module.js.map