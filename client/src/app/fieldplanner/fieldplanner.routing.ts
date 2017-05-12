import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FieldplannerComponent } from "./fieldplanner.component";

const appRoutes: Routes = [
    { path: "", redirectTo: "default", pathMatch: "full" },
    { path: "default", component: FieldplannerComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class FieldplannerRoutingModule {}