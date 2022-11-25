import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginSSOComponent } from './login-sso/login-sso.component';
import { StockDashboardComponent } from './stock-dashboard/stock-dashboard.component';
import {MsalGuard} from '@azure/msal-angular';
import { ErrorComponent } from './error/error.component';

const routes: Routes = [
  {
    path: 'dashboard',

    component: StockDashboardComponent,
    canActivate: [
      MsalGuard]

  },  {
    path: 'login',

    component: LoginSSOComponent,

  },
  
  { path:'', redirectTo: '/login', pathMatch: 'full' },
  {
    path: '**',

    component: ErrorComponent,

  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }