import { NgModule } from "@angular/core";
import { BrowserModule }  from "@angular/platform-browser";

import { AppRoutingModule } from "./app.routing";
import { AppComponent } from "./app.component";

import { FieldPlannerModule } from "./fieldplanner/fieldplanner.module";

@NgModule({
    imports:[
        BrowserModule,
        AppRoutingModule,
        FieldPlannerModule
    ],
    exports: [
        
    ],
    declarations: [
        AppComponent
    ],
    providers: [

    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {}