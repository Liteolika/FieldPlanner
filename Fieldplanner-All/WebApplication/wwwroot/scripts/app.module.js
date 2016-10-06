/// <reference path="../typings/index.d.ts" />
var app;
(function (app) {
    angular.module("app", [
        "app.layout",
        "app.core",
        "app.components.home"
    ]);
})(app || (app = {}));
