import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { APP_BASE_HREF, CommonModule } from "@angular/common";

import { NavbarComponent } from "./components/navbar/navbar.component";

@NgModule({
    imports: [
        CommonModule,
        RouterModule
    ],
    declarations: [
        NavbarComponent
    ],
    exports: [
        NavbarComponent
    ],
    providers: [
        { provide: APP_BASE_HREF, useValue: '<%= APP_BASE %>' }
    ]
})

export class SharedModule {}