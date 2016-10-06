module app.core {

    export class ErrorController {

        public errormessage: string;

        private activate(): void {
            this.errormessage = this.$stateParams["errormessage"];
        }

        constructor(
            private $stateParams: ng.ui.IStateParamsService
        ) {
            this.activate();
        }

        public static controllerId: string = "errorController";
    }

    angular.module("app.core").controller(ErrorController.controllerId, ErrorController);
    

}