import { TestBed, ComponentFixture } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { DebugElement } from "@angular/core";

import { AppComponent } from "./app.component";
import { UserService, IUserService, UserLoginResult } from "./shared/modules/user/user.service";

import { Observable, Subscriber } from "rxjs";

class UserServiceStub  {
    public login(): Observable<UserLoginResult> {
      let result = new UserLoginResult(true, "Welcome petcar");
      return Observable.create((o: Subscriber<UserLoginResult>) => {
        o.next(result);
        o.complete();
      });
    }

}

describe("App", () => {

    let comp: AppComponent;
    let fixture: ComponentFixture<AppComponent>;
    let de: DebugElement;
    let el: HTMLElement;
    let userService: UserService;

  beforeEach(() => {

    TestBed.configureTestingModule({
        declarations: [AppComponent],
        providers: [
            { provide: UserService, useClass: UserServiceStub }
        ]
    });

    userService = TestBed.get(UserService);

    fixture = TestBed.createComponent(AppComponent);
    comp = fixture.componentInstance;

  });

  it("should create component", async() => {
    expect(fixture.componentInstance instanceof AppComponent).toBe(true);
  });

  it("should have correct title", () => {
    expect(comp.title).toBe("The Title");
  });

  it("should have the correct title", () => {
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css("h1"));
    el = de.nativeElement;
    expect(el.innerHTML).toBe("The Title");
  });

  it("should greet", () => {
    fixture.detectChanges();
    expect(comp.greeter).toBe("Welcome petcar");
  });

});
