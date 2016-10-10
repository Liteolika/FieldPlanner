module app.core {

    "use strict";

    export class ConfirmModalController {

        public title: string = "";
        public message: string = "";

        public ok(): void {
            this.$uibModalInstance.close(true);
        }

        public cancel(): void {
            this.$uibModalInstance.close(false);
        }

        constructor(private $uibModalInstance: angular.ui.bootstrap.IModalServiceInstance, title: string, message: string) {
            this.title = title;
            this.message = message;
        }

        public static controllerId: string = "confirmModalController";

    }

    angular.module("app.core").controller(ConfirmModalController.controllerId, ConfirmModalController);

}