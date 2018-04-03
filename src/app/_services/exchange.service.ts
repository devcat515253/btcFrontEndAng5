import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Exchange} from '../_entity/exchange';

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


  getExchangeListFromFiltered(itemTo: Exchange) {
    console.log(`${this.baseUrl}/api/payment-systems/from?filters={"payment_system":${ itemTo.id },"currency":"${ itemTo.currency }"}`);
    return this.http.get<any>(`${this.baseUrl}/api/payment-systems/from?filters={"payment_system":${ itemTo.id },"currency":"${ itemTo.currency }"}`);
  }

  getExchangeListToFiltered(itemFrom: Exchange) {
    console.log(`${this.baseUrl}/api/payment-systems/to?filters={"payment_system":${ itemFrom.id },"currency":"${ itemFrom.currency }"}`);
    return this.http.get<any>(`${this.baseUrl}/api/payment-systems/to?filters={"payment_system":${ itemFrom.id },"currency":"${ itemFrom.currency }"}`);
  }




}
