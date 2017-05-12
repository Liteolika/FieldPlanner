import { TestBed, ComponentFixture } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { DebugElement } from "@angular/core";

import { FieldplannerComponent } from "./fieldplanner.component";

import { FieldplannerService, IFieldplannerService } from "./services/fieldplanner.service";
/*import { UserService, IUserService, UserLoginResult } from "./shared/modules/user/user.service";*/

import { Observable, Subscriber } from "rxjs";

/*class UserServiceStub  {
    public login(): Observable<UserLoginResult> {
      let result = new UserLoginResult(true, "Welcome petcar");
      return Observable.create((o: Subscriber<UserLoginResult>) => {
        o.next(result);
        o.complete();
      });
    }

}*/

class FieldplannerServiceStub {

}

describe("FieldPlanner: FieldplannerComponent", () => {

    let comp: FieldplannerComponent;
    let fixture: ComponentFixture<FieldplannerComponent>;
    let de: DebugElement;
    let el: HTMLElement;
    let fieldplannerService: IFieldplannerService;

  beforeEach(() => {

    TestBed.configureTestingModule({
        declarations: [FieldplannerComponent],
        providers: [
            { provide: FieldplannerService, useClass: FieldplannerServiceStub }
        ]
    });

    fieldplannerService = TestBed.get(FieldplannerService);

    fixture = TestBed.createComponent(FieldplannerComponent);
    comp = fixture.componentInstance;

  });

  it("should create component", async() => {
    expect(fixture.componentInstance instanceof FieldplannerComponent).toBe(true);
  });

  
  

});
