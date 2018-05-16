import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Exchange} from '../_entity/exchange';

@Injectable()
export class ExchangeService {

  baseUrl = 'http://api.smartex.info';

  constructor(private http: HttpClient) {
  }

  getAuthHeader() {
    let localAuthToken = JSON.parse(localStorage.getItem('access_token'));
    let header = new HttpHeaders();
    let other_header = header.append('Authorization', `Bearer ${localAuthToken}`);
    return other_header;
  }

  sendDataPay(data: any) {
    let query = `${this.baseUrl}/api/exchanges/add?commission_id=${ data.commission }&in_amount=${ data.in_amount }&email=${ data.email }&out_payee=${ data.out }`;
    return this.http.post<any>(query,  {}, {headers:  this.getAuthHeader()} );
  }

  sendPayBTC(id: number) {
    let query = `${this.baseUrl}/api/user/exchanges/${ id }/income/confirm`;
    return this.http.put<any>(query,  {}, {headers:  this.getAuthHeader()} );
  }


  getTransactionsList() {
    return this.http.get<any>(`${this.baseUrl}/api/exchanges/view`);
  }



  getExchangeListFrom() {
    return this.http.get<any>(`${this.baseUrl}/api/payment-systems/from`);
  }

  getExchangeListTo() {
    return this.http.get<any>(`${this.baseUrl}/api/payment-systems/to`);
  }

  exchangeSendSms(data: string) {
    var phoneNumber = data,
      phone = {
        prefix: phoneNumber.substring(0, phoneNumber.length - 10),
        number: phoneNumber.substring(phoneNumber.length - 10, phoneNumber.length)
      };
    return this.http.post<any>(`${this.baseUrl}/api/user/phone/verification/${ phone.prefix }/${ phone.number }`,  {}, {headers:  this.getAuthHeader()} );
  }

  exchangeSendCode(data: string, code: string) {
    var phoneNumber = data,
      phone = {
        prefix: phoneNumber.substring(0, phoneNumber.length - 10),
        number: phoneNumber.substring(phoneNumber.length - 10, phoneNumber.length)
      };
    return this.http.get<any>(`${this.baseUrl}/api/user/phone/verification/${ phone.prefix }/${ phone.number }/${ code }`, {headers: this.getAuthHeader()});
  }

  getExchangeListFromFiltered(itemTo: Exchange) {
    console.log(`${this.baseUrl}/api/payment-systems/from?filters={"payment_system":${ itemTo.id },"currency":"${ itemTo.currency }"}`);
    return this.http.get<any>(`${this.baseUrl}/api/payment-systems/from?filters={"payment_system":${ itemTo.id },"currency":"${ itemTo.currency }"}`);
  }

  getExchangeListToFiltered(itemFrom: Exchange) {
    console.log(`${this.baseUrl}/api/payment-systems/to?filters={"payment_system":${ itemFrom.id },"currency":"${ itemFrom.currency }"}`);
    return this.http.get<any>(`${this.baseUrl}/api/payment-systems/to?filters={"payment_system":${ itemFrom.id },"currency":"${ itemFrom.currency }"}`);
  }

  getLimit(sendForm: Exchange, input: number) {
    console.log(sendForm.currency);
    console.log(input);
    return this.http.post<any>(`${this.baseUrl}/api/user/exchanges/can?amount=${input}&currency=${sendForm.currency}`, {}, {headers: this.getAuthHeader()});
  }


}
