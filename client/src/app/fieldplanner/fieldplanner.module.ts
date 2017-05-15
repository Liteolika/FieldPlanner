import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule } from "@angular/forms";

import { FieldplannerComponent } from "./fieldplanner.component";
import { FieldplannerRoutingModule } from "./fieldplanner.routing";
import { FieldplannerService } from "./services/fieldplanner.service";


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
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