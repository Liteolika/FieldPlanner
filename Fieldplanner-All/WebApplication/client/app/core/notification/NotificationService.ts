module app.core {

    "use strict";

    export interface INotificationService {

        toastWarning(message: string, title?: string): void;
        toastError(message: string, title?: string): void;
        toastInfo(message: string, title?: string): void;
        toastSuccess(message: string, title?: string): void;

        confirm(message: string, title?: string): ng.IPromise<any>;

        showWait(waitMessage?: string): void;
        hideWait(): void;

    }

    export class NotificationService implements INotificationService {

        private modalInstance: angular.ui.bootstrap.IModalServiceInstance = null;

        public confirm(message: string, title: string): ng.IPromise<any> {

            var deferred = this.$q.defer();

            var modal = this.modalInstance = this.$uibModal.open({
                animation: true,
                templateUrl: "templates/tpl.confirm.html",
                size: "sm",
                resolve: {
                    title: (() => {
                        return title;
                    }),
                    message: (() => {
                        return message;
                    })
                },
                controller: ConfirmModalController.controllerId,
                controllerAs: "vm"
            });

            modal.result.then((result: boolean) => {
                if (result === true) {
                    deferred.resolve();
                }
                if (result === false) {
                    deferred.reject();
                }
            });

            return deferred.promise;

        }

        public showWait(waitMessage: string): void {
            this.modalInstance = this.$uibModal.open(<ng.ui.bootstrap.IModalSettings>{
                animation: true,
                templateUrl: "templates/tpl.waitmodal.html",
                size: "sm",
                backdrop: "static",
                resolve: {
                    items: {
                        message: waitMessage
                    }
                },
                controller: WaitModalController.controllerId,
                controllerAs: "wmodalvm"
            });
        }

        public hideWait(): void {
            this.$timeout(() => {
                this.modalInstance.close();
            }, 200);

        }


        public toastWarning(message: string, title: string): void {
            this.toastr.warning(message, title);
        }

        public toastError(message: string, title: string): void {
            this.toastr.error(message, title);
        }

        public toastInfo(message: string, title: string): void {
            this.toastr.info(message, title);
        }

        public toastSuccess(message: string, title: string): void {
            this.toastr.success(message, title);
        }


        constructor(
            private $timeout: ng.ITimeoutService,
            private $q: ng.IQService,
            private toastr: angular.toastr.IToastrService,
            private $uibModal: angular.ui.bootstrap.IModalService, $templateCache: angular.ITemplateCacheService) {

            //$templateCache.put("/ns/waitdialog.html", "");

        }

        public static serviceId: string = "notificationService";

    }

    angular.module("app.core").service(NotificationService.serviceId, NotificationService);

    angular.module("app.core").config((toastrConfig: angular.toastr.IToastrConfig) => {

        toastrConfig.positionClass = "toast-bottom-right";

    });

}