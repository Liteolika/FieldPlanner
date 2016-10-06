var app;
(function (app) {
    var core;
    (function (core) {
        "use strict";
        var DataService = (function () {
            function DataService($http, $q) {
                this.httpService = $http;
                this.qService = $q;
            }
            DataService.prototype.get = function (resource, showWait) {
                var self = this;
                var deferred = self.qService.defer();
                self.httpService.get(resource).then(function (result) {
                    deferred.resolve(result.data);
                }, function (error) {
                    deferred.reject(error);
                });
                return deferred.promise;
            };
            DataService.prototype.getSingle = function (resource, showWait) {
                var self = this;
                var deferred = self.qService.defer();
                self.httpService.get(resource).then(function (result) {
                    deferred.resolve(result.data);
                }, function (error) {
                    deferred.reject(error);
                });
                return deferred.promise;
            };
            DataService.prototype.add = function (resource, entity) {
                var self = this;
                var deferred = self.qService.defer();
                self.httpService.post(resource, entity)
                    .then(function (result) {
                    deferred.resolve(result.data);
                }, function (error) {
                    deferred.reject(error);
                });
                return deferred.promise;
            };
            DataService.prototype.update = function (resource, entity) {
                var self = this;
                var deferred = self.qService.defer();
                self.httpService.put(resource, entity)
                    .then(function (result) {
                    deferred.resolve(result.data);
                }, function (error) {
                    deferred.reject(error);
                });
                return deferred.promise;
            };
            DataService.prototype.remove = function (resource) {
                var self = this;
                var deferred = self.qService.defer();
                self.httpService.delete(resource)
                    .then(function (result) {
                    deferred.resolve(result.data);
                }, function (error) {
                    deferred.reject(error);
                });
                return deferred.promise;
            };
            DataService.serviceId = "dataService";
            return DataService;
        }());
        core.DataService = DataService;
        angular.module("app.core").service(DataService.serviceId, DataService);
    })(core = app.core || (app.core = {}));
})(app || (app = {}));
