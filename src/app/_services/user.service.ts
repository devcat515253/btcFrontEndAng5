import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {UserRegistr} from '../_entity/user-registr';
import {UserAuth} from '../_entity/user-auth';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

  baseUrl  = 'http://api.smartex.info';

  constructor(private http: HttpClient) { }


  registration(newUser: UserRegistr) {
    // console.log(newUser);
    return this.http.post<any>(`${this.baseUrl}/api/user/registration`, newUser, {observe: 'response'});
  }

  checkEmail(newUser: UserRegistr) {
    return this.http.post<any>(`${this.baseUrl}/user/registration`, newUser);
  }


  auth(authUser: UserAuth) {
    return this.http.post<any>(`${this.baseUrl}/api/login`, authUser)
      .map(result => {
        if (result.data.access_token && result.data.expires_in ) {
          localStorage.setItem('currentUser', JSON.stringify(result));
        }

        return result;
      });
  }




}

