module app.core {

    export class FourOFourController {

        public errormessage: string;

        private activate(): void {
            this.errormessage = this.$stateParams["errormessage"];
        }

        constructor(
            private $stateParams: ng.ui.IStateParamsService
        ) {
            this.activate();
        }

        public static controllerId: string = "fourOFourController";
    }

    angular.module("app.core").controller(FourOFourController.controllerId, FourOFourController);

}