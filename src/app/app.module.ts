import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule }  from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StockDashboardComponent } from './stock-dashboard/stock-dashboard.component';
import { LoginSSOComponent } from './login-sso/login-sso.component';

@NgModule({
  declarations: [
    AppComponent,
    StockDashboardComponent,
    LoginSSOComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
