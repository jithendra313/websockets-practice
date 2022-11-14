import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { Router } from '@angular/router';
import { InteractionRequiredAuthError } from '@azure/msal-browser';
import { silentRequest } from '../auth-config';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-login-sso',
  templateUrl: './login-sso.component.html',
  styleUrls: ['./login-sso.component.css']
})
export class LoginSSOComponent implements OnInit {

  constructor(
    private authService: MsalService,
    private router: Router,
    private toastService: HotToastService,
  ) { }
  checkAndSetActiveAccount() {
    let activeAccount = this.authService.instance.getActiveAccount();
    if (
      !activeAccount &&
      this.authService.instance.getAllAccounts().length > 0
    ) {
      let accounts = this.authService.instance.getAllAccounts();
      this.authService.instance.setActiveAccount(accounts[0]);
    }
  }

  ngOnInit(): void {
    this.checkAndSetActiveAccount();
  }
  isLoggedIn() {
    return this.authService.instance.getActiveAccount() != null;
  }
 
  login() {
    try {
      sessionStorage.clear()
      if (this.isLoggedIn()) {
        try {
          this.authService
            .acquireTokenSilent(silentRequest)
            .subscribe( (data: any) => {
              this.authService.instance.setActiveAccount(data.account);
              this.router.navigate([`/dashboard`]);
              localStorage.setItem('jwtToken', data.accessToken);
              this.toastService.success('Successfully logged-in',{
                position: 'top-right',
                duration:5000,style: {
                  border: '1px solid #fb4238',
                  color: '#fb4238',
                },
              });
            });
          
        } catch (err) {
          sessionStorage.clear()
          if (err instanceof InteractionRequiredAuthError) {
            this.authService
              .loginPopup(silentRequest)
              .subscribe((response: any) => {
                this.authService.instance.setActiveAccount(response.account);
                this.router.navigate([`/dashboard`]);
                localStorage.setItem('jwtToken', response.accessToken);
                this.toastService.success('Successfully logged-in' ,{
                  position: 'top-right',
                  duration:5000,style: {
                    border: '1px solid #fb4238',
                    color: '#fb4238',
                  },
                });
              });
          } else {
            alert(err);
          }
        }
      } else {
        sessionStorage.clear()
        this.authService
          .loginPopup(silentRequest)
          .subscribe((response: any) => {
            this.authService.instance.setActiveAccount(response.account);
            this.router.navigate([`/dashboard`]);
            localStorage.setItem('jwtToken', response.accessToken);
            this.toastService.success('Successfully logged-in',{
              position: 'top-right',
              duration:5000,style: {
                border: '1px solid #fb4238',
                color: '#fb4238',
              },
            });
          });
      }
    } catch (err) {
     
      alert(err);
    }
  }
}
