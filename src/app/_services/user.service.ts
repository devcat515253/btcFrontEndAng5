import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserRegistr} from '../_entity/user-registr';
import 'rxjs/add/operator/map';
import {RequestOptions} from '@angular/http';

@Injectable()
export class UserService {

  baseUrl  = 'http://api.smartex.info';

  constructor(private http: HttpClient) { }


  registration(newUser: UserRegistr) {

    console.log(newUser);
    // const options = { observe: 'response' };
    // return this.http.post<any>(`${this.baseUrl}/api/user/registration`, newUser).pipe(
    //   map((res) => {
    //     console.log(res.headers);
    //     console.log(res.headers.get('Content-Disposition'));
    //     return res;
    //   }));

    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post<any>(`${this.baseUrl}/api/user/registration`, newUser, {headers: headers}).map((res) => res);


  // checkEmail(newUser: UserRegistr) {
  //   return this.http.post<any>(`${this.baseUrl}/user/registration`, newUser);
  // }

}
}

