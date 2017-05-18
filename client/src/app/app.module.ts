import { NgModule } from "@angular/core";
import { BrowserModule }  from "@angular/platform-browser";
import { RouterModule, Routes } from "@angular/router";

// application components
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";

// application modules
import { SharedModule } from "./shared/shared.module";
import { FieldPlannerModule } from "./fieldplanner/fieldplanner.module";

export const appRouting: Routes = [
    { path: "", component: HomeComponent },
    { path: "", redirectTo: "default", pathMatch: "full" },
    { path: "default", component: HomeComponent }
];

@NgModule({
    imports:[
        BrowserModule,
        RouterModule.forRoot(appRouting),
        SharedModule,
        FieldPlannerModule
    ],
    exports: [

    ],
    declarations: [
        AppComponent,
        HomeComponent
    ],
    providers: [

    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {}