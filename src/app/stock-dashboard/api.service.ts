import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LivePrice } from './livePrice';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private httpClient:HttpClient) { }
  getLivePrice(){
    return this.httpClient.get<LivePrice>("https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h")
  }
  
}