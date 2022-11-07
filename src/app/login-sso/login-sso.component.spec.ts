import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginSSOComponent } from './login-sso.component';

describe('LoginSSOComponent', () => {
  let component: LoginSSOComponent;
  let fixture: ComponentFixture<LoginSSOComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginSSOComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginSSOComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
