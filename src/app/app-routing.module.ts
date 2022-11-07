import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginSSOComponent } from './login-sso/login-sso.component';
import { StockDashboardComponent } from './stock-dashboard/stock-dashboard.component';

const routes: Routes = [
  {
    path: 'dashboard',

    component: StockDashboardComponent,

  },  {
    path: 'login',

    component: LoginSSOComponent,

  },
  
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }