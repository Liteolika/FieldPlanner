module app.layout {

    export interface IShellController {
    }

    export class ShellController implements IShellController {

        public appVersion: string;

        private init(): void {

            this.dataService.getSingle("api/version").then((result: string) => {
                this.appVersion = result;
            });

        }

        constructor(
            private dataService: app.core.IDataService
        ) {
            this.init();
        }

        public static controllerId: string = "shellController";

    }

    angular.module("app.layout").controller(ShellController.controllerId, ShellController);

}