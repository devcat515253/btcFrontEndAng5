import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {UserRegistr} from '../_entity/user-registr';
import {UserAuth} from '../_entity/user-auth';
import 'rxjs/add/operator/map';
import {EmailModel} from '../_entity/email-model';

@Injectable()
export class UserService {

  baseUrl  = 'http://api.smartex.info';



  constructor(private http: HttpClient) { }


  registration(newUser: UserRegistr) {
    // console.log(newUser);
    return this.http.post<any>(`${this.baseUrl}/api/user/registration`, newUser, {observe: 'response'});
  }

  checkEmail(emailUnique: EmailModel) {
    return this.http.post<any>(`${this.baseUrl}/api/user/email-check-unique`, emailUnique, {observe: 'response'});
  }

  auth(authUser: UserAuth) {
    return this.http.post<any>(`${this.baseUrl}/api/login`, authUser)
      .map(result => {
        if (result.data.access_token && result.data.expires_in ) {
          localStorage.setItem('currentUser', JSON.stringify(result.data));
        }
        return result;
      });
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }


  activateUser(hash: string) {
    return this.http.get<any>(`${this.baseUrl}/api/user/activation/${hash}`,  {observe: 'response'});
  }

  forgotPass(data: EmailModel) {
    return this.http.post<any>(`${this.baseUrl}/api/user/password/reset`, data, {observe: 'response'});
  }



  getUserProfile() {
    let localStorageData = JSON.parse(localStorage.getItem('currentUser'));
    const headers = new HttpHeaders({'Authorization': `Bearer ${localStorageData.access_token}`});

    return this.http.post<any>(`${this.baseUrl}/api/me`, headers);
  }





}

