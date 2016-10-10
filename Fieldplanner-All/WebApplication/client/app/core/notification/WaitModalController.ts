module app.core {

    "use strict";

    export interface IWaitModalController {
        waitMessage: string;
    }

    export class WaitModalController {

        public waitMessage: string = "";

        constructor($uibModalInstance: angular.ui.bootstrap.IModalServiceInstance, items: any) {
            this.waitMessage = items.message;
            console.log("waitmodal with message: " + items.message);
        }

        public static controllerId: string = "waitModalController";

    }

    angular.module("app.core").controller(WaitModalController.controllerId, WaitModalController);

}