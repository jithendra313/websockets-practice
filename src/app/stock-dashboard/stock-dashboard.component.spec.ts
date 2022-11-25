
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { StockDashboardComponent } from './stock-dashboard.component';
import { BrowserModule } from '@angular/platform-browser';
import { MSAL_INSTANCE, MSAL_GUARD_CONFIG, MsalService, MsalGuard, MsalBroadcastService } from '@azure/msal-angular';
import { HotToastModule } from '@ngneat/hot-toast';
import { NgToggleModule } from 'ng-toggle-button';
import { AppRoutingModule } from '../app-routing.module';
import { MSALInstanceFactory, MSALGuardConfigFactory } from '../app.module';

describe('StockDashboardComponent', () => {
  let component: StockDashboardComponent;
  let fixture: ComponentFixture<StockDashboardComponent>;

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
      declarations: [ StockDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
