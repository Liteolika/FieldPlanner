import { TestBed, ComponentFixture } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { NgModule, DebugElement, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { Observable, Subscriber } from "rxjs";

import { AppComponent } from "./app.component";

class UserServiceStub  {
    

}

describe("App", () => {

    let comp: AppComponent;
    let fixture: ComponentFixture<AppComponent>;
    let de: DebugElement;
    let el: HTMLElement;

  beforeEach(() => {

    TestBed.configureTestingModule({
        declarations: [AppComponent],
        providers: [
        ],
        schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    });


    fixture = TestBed.createComponent(AppComponent);
    comp = fixture.componentInstance;

  });

  it("should create component", async() => {
    expect(fixture.componentInstance instanceof AppComponent).toBe(true);
  });

  it("should have correct title", () => {
    expect(comp.title).toBe("Peters @angular boilerplate");
  });

  it("should have the correct title", () => {
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css("h1"));
    el = de.nativeElement;
    expect(el.innerHTML).toBe("Peters @angular boilerplate");
  });


});
