module app.core {

    "use strict";

    export interface IDataService {
        get(resource: string, showWait?: boolean): ng.IPromise<app.domain.EntityBase[]>;
        getSingle(resource: string, showWait?: boolean): ng.IPromise<app.domain.EntityBase>;
        add(resource: string, entity: app.domain.IEntity): ng.IPromise<app.domain.EntityBase>;
        update(resource: string, entity: app.domain.IEntity): ng.IPromise<app.domain.EntityBase>;
        remove(resource: string): ng.IPromise<any>;
    }

    export class DataService {

        private httpService: ng.IHttpService;
        private qService: ng.IQService;


        public get(resource: string, showWait?: boolean): ng.IPromise<app.domain.EntityBase[]> {
            var self = this;

            var deferred = self.qService.defer();

            self.httpService.get(resource).then(function (result: any) {
                deferred.resolve(result.data);
            }, function (error) {
                deferred.reject(error);
            });

            return deferred.promise;
        }

        public getSingle(resource: string, showWait?: boolean): ng.IPromise<app.domain.EntityBase> {
            var self = this;

            var deferred = self.qService.defer();

            self.httpService.get(resource).then(function (result: any) {
                deferred.resolve(result.data);
            }, function (error) {
                deferred.reject(error);
            });

            return deferred.promise;
        }

        public add(resource: string, entity: app.domain.IEntity): ng.IPromise<app.domain.EntityBase> {
            var self = this;
            var deferred = self.qService.defer();

            self.httpService.post(resource, entity)
                .then(function (result) {
                    deferred.resolve(result.data);
                }, function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        public update(resource: string, entity: app.domain.IEntity): ng.IPromise<app.domain.EntityBase> {
            var self = this;
            var deferred = self.qService.defer();

            self.httpService.put(resource, entity)
                .then(function (result) {
                    deferred.resolve(result.data);
                }, function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        public remove(resource: string): ng.IPromise<any> {
            var self = this;

            var deferred = self.qService.defer();

            self.httpService.delete(resource)
                .then(function (result) {
                    deferred.resolve(result.data);
                }, function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        constructor($http: ng.IHttpService, $q: ng.IQService) {
            this.httpService = $http;
            this.qService = $q;
        }

        public static serviceId: string = "dataService";

    }

    angular.module("app.core").service(DataService.serviceId, DataService);

}