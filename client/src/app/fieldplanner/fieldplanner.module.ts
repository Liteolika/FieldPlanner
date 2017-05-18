import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule } from "@angular/forms";

import { FieldplannerComponent } from "./fieldplanner.component";

import { FieldplannerService } from "./services/fieldplanner.service";

const appRoutes: Routes = [
    { path: "fieldplanner", component: FieldplannerComponent }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(appRoutes)
    ],
    exports: [
        FieldplannerComponent,
        RouterModule
    ],
    providers: [
        FieldplannerService
    ],
    declarations: [
        FieldplannerComponent
    ]
})
export class FieldPlannerModule {}