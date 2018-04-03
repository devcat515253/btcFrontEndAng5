import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {NameIcon} from '../_entity/name-icon';

@Injectable()
export class TablesService {

  baseUrl  = 'http://api.smartex.info';



  constructor(private http: HttpClient) {
    this.getExchanges();
  }



  getAuthHeader() {
    let localAuthToken = JSON.parse(localStorage.getItem('access_token'));
    let header = new HttpHeaders();
    let other_header = header.append('Authorization', `Bearer ${localAuthToken}`);
    return other_header;
  }

  getExchanges() {
    return this.http.get<any>(`${this.baseUrl}/api/user/exchanges`,  {headers: this.getAuthHeader()});
  }

  getCommissions() {
    return this.http.get<any>(`${this.baseUrl}/api/commissions/view`,  {headers: this.getAuthHeader()});
  }


}
