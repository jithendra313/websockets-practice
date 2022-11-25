import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { MSAL_INSTANCE, MSAL_GUARD_CONFIG, MsalService, MsalGuard, MsalBroadcastService } from '@azure/msal-angular';
import { HotToastModule } from '@ngneat/hot-toast';
import { NgToggleModule } from 'ng-toggle-button';
import { AppRoutingModule } from '../app-routing.module';
import { MSALInstanceFactory, MSALGuardConfigFactory } from '../app.module';

import { LoginSSOComponent } from './login-sso.component';

describe('LoginSSOComponent', () => {
  let component: LoginSSOComponent;
  let fixture: ComponentFixture<LoginSSOComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        HotToastModule.forRoot(),
        NgToggleModule.forRoot()
      ],
      providers: [
        {
          provide: MSAL_INSTANCE,
          useFactory: MSALInstanceFactory,
        }, {
          provide: MSAL_GUARD_CONFIG,
          useFactory: MSALGuardConfigFactory,
        },
        MsalService,
        MsalGuard,
        MsalBroadcastService,
      ],
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
