import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { FieldplannerComponent } from "./fieldplanner.component";
import { FieldplannerRoutingModule } from "./fieldplanner.routing";
import { FieldplannerService } from "./services/fieldplanner.service";


@NgModule({
    imports: [
        FieldplannerRoutingModule
    ], 
    exports: [
        FieldplannerComponent,
        FieldplannerRoutingModule
    ],
    providers: [
        FieldplannerService
    ],
    declarations: [
        FieldplannerComponent
    ]
})
export class FieldPlannerModule {}