import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ExchangeService {

  baseUrl  = 'http://api.smartex.info';

  constructor(private http: HttpClient) { }

// ?filters={"all":5}
  getExchangeListFrom() {
    return this.http.get<any>(`${this.baseUrl}/api/payment-systems/from`);
  }

  getExchangeListTo() {
    return this.http.get<any>(`${this.baseUrl}/api/payment-systems/to`);
  }



}
