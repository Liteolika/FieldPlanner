var app;
(function (app) {
    var core;
    (function (core) {
        "use strict";
        var NotificationService = (function () {
            function NotificationService($timeout, $q, toastr, $uibModal, $templateCache) {
                //$templateCache.put("/ns/waitdialog.html", "");
                this.$timeout = $timeout;
                this.$q = $q;
                this.toastr = toastr;
                this.$uibModal = $uibModal;
                this.modalInstance = null;
            }
            NotificationService.prototype.confirm = function (message, title) {
                var deferred = this.$q.defer();
                var modal = this.modalInstance = this.$uibModal.open({
                    animation: true,
                    templateUrl: "templates/tpl.confirm.html",
                    size: "sm",
                    resolve: {
                        title: (function () {
                            return title;
                        }),
                        message: (function () {
                            return message;
                        })
                    },
                    controller: core.ConfirmModalController.controllerId,
                    controllerAs: "vm"
                });
                modal.result.then(function (result) {
                    if (result === true) {
                        deferred.resolve();
                    }
                    if (result === false) {
                        deferred.reject();
                    }
                });
                return deferred.promise;
            };
            NotificationService.prototype.showWait = function (waitMessage) {
                this.modalInstance = this.$uibModal.open({
                    animation: true,
                    templateUrl: "templates/tpl.waitmodal.html",
                    size: "sm",
                    backdrop: "static",
                    resolve: {
                        items: {
                            message: waitMessage
                        }
                    },
                    controller: core.WaitModalController.controllerId,
                    controllerAs: "wmodalvm"
                });
            };
            NotificationService.prototype.hideWait = function () {
                var _this = this;
                this.$timeout(function () {
                    _this.modalInstance.close();
                }, 200);
            };
            NotificationService.prototype.toastWarning = function (message, title) {
                this.toastr.warning(message, title);
            };
            NotificationService.prototype.toastError = function (message, title) {
                this.toastr.error(message, title);
            };
            NotificationService.prototype.toastInfo = function (message, title) {
                this.toastr.info(message, title);
            };
            NotificationService.prototype.toastSuccess = function (message, title) {
                this.toastr.success(message, title);
            };
            NotificationService.serviceId = "notificationService";
            return NotificationService;
        }());
        core.NotificationService = NotificationService;
        angular.module("app.core").service(NotificationService.serviceId, NotificationService);
        angular.module("app.core").config(["toastrConfig", function (toastrConfig) {
            toastrConfig.positionClass = "toast-bottom-right";
        }]);
    })(core = app.core || (app.core = {}));
})(app || (app = {}));
