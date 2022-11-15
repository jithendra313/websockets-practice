export interface Trade {
  data: {
    p: number,
    s: string,
    t: number,
    v: number
  }[],
  type: string
}
import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, throwError, of, tap, EMPTY } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { switchMap } from 'rxjs';
import { MsalService } from '@azure/msal-angular';
import { timer } from 'rxjs';
import { Subscription } from 'rxjs';
import { ApiService } from './api.service';
import { LivePrice } from './livePrice';
import { silentRequest } from '../auth-config';
import { webSocket, WebSocketSubject } from "rxjs/webSocket";
import { map, distinctUntilChanged, pairwise, delay, first, takeLast, distinct } from 'rxjs/operators';
import { HotToastService } from '@ngneat/hot-toast';
@Component({
  selector: 'app-stock-dashboard',
  templateUrl: './stock-dashboard.component.html',
  styleUrls: ['./stock-dashboard.component.css']
})
export class StockDashboardComponent implements OnInit {
  socket1$: WebSocketSubject<any> = webSocket({
    url: 'wss://ws.finnhub.io?token=bsr37a748v6tucpfplbg',
    openObserver: {
      next: () => {
        this.socket1$.next({ 'type': 'subscribe', 'symbol': 'BINANCE:BTCUSDT', });
        // this.socket$.next({'type':'subscribe', 'symbol': 'AAPL',});
      }
    },
  });
  socket2$: WebSocketSubject<any> = webSocket({
    url: 'wss://ws.finnhub.io?token=cdidvoiad3i4h8m0jdo0cdidvoiad3i4h8m0jdog',
    openObserver: {
      next: () => {
        this.socket2$.next({ 'type': 'subscribe', 'symbol': 'BINANCE:BTCUSDT' });
      }
    },
  });
  price$: any;
  direction$: Observable<any> = of('/assets/icons8-up-arrow-100.png');
  latestprice$: any;
  latestPrice: any;
  timeStamp: any

  employeeData: any;
  subscription: Subscription;
  livePrice: any;
  updatedData: any;
  livePrice$: Observable<LivePrice>;
  constructor(private httpClient: HttpClient, private apiService: ApiService, private authService: MsalService, private toastService: HotToastService,) {
    // this.apiService.getLivePrice().subscribe(result =>{
    //   console.log(result);
    //   this.livePrice = result;
    // })
  }
  getLatestPrice() {
    this.latestPrice = this.socket1$.pipe(
      map((t: Trade) => t.type === 'trade' && t.data[0].p.toFixed()),
      distinctUntilChanged()
    )
    this.timeStamp = this.socket1$.pipe(
      map((t: Trade) => t.type === 'trade' && t.data[0].t.toFixed()),
      distinctUntilChanged()
    )
  }
  getLatestPrice1() {
    return this.socket2$.pipe(
      map((t: Trade) => t.type === 'trade' && t.data[0].v.toFixed()),
      distinctUntilChanged()
    )
  }
  getDirection() {
    return this.getLatestPrice1().pipe(
      pairwise(),
      // tap(d => {
      //   console.log(`Current val ${d[1]} > ${d[0]} `, d[1] > d[0])
      // }),
      map(arr => arr[0] < arr[1] ? '/assets/icons8-up-arrow-100.png' : '/assets/decrease.png')
    )
  }
  logout() {
    this.toastService.loading('Logging Out',{
      position: 'top-right',
      duration:2000,
      theme: 'snackbar',
    });
    setTimeout(() => {
      this.authService.logout();
    }, 2000);


    // sessionStorage.clear()
    // localStorage.clear()
  }
  ngOnInit(): void {
    this.subscription = timer(0, 10000).pipe(
      switchMap(() => this.apiService.getLivePrice())
    ).subscribe(result => {
      console.log(result);
      this.livePrice = result;
    }
    );
    this.latestprice$ = this.getLatestPrice1();
    this.getLatestPrice();
    this.direction$ = this.getDirection();
  }
}
// this.getEmployees().subscribe(data => {
//   this.employeeData = data
// })
// subscribe(data => {
//   this.employeeData = data
// })
