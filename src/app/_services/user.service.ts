import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {UserRegistr} from '../_entity/user-registr';
import {UserAuth} from '../_entity/user-auth';
import 'rxjs/add/operator/map';
import {EmailModel} from '../_entity/email-model';
import {UserModel} from '../_entity/user-model';

@Injectable()
export class UserService {

  baseUrl  = 'http://api.smartex.info';
  userModel: UserModel = new UserModel();



  constructor(private http: HttpClient) { }


  getAuthToken() {
    let token = JSON.parse(localStorage.getItem('access_token'));
    return token;
  }


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
          localStorage.setItem('access_token', JSON.stringify(result.data.access_token));
        }
        return result;
      });
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('access_token');
  }


  activateUser(hash: string) {
    return this.http.get<any>(`${this.baseUrl}/api/user/activation/${hash}`,  {observe: 'response'});
  }

  forgotPass(data: EmailModel) {
    return this.http.post<any>(`${this.baseUrl}/api/user/password/reset`, data, {observe: 'response'});
  }



  getUserProfile() {
    let localAuthToken = JSON.parse(localStorage.getItem('access_token'));

    let header = new HttpHeaders();
    let other_header = header.append('Authorization', `Bearer ${localAuthToken}`);

    return this.http.get<any>(`${this.baseUrl}/api/me`, {headers: other_header});
  }


  updateUserProfile(userModel: UserModel) {
    let localAuthToken = JSON.parse(localStorage.getItem('access_token'));

    delete userModel.date;

    let header = new HttpHeaders();
    let other_header = header.append('Authorization', `Bearer ${localAuthToken}`);

    return this.http.put<any>(`${this.baseUrl}/api/me`, userModel, {headers: other_header});
  }

  updateUserIdCardProfile(base64img: string) {
    let localAuthToken = JSON.parse(localStorage.getItem('access_token'));


    let header = new HttpHeaders();
    let other_header = header.append('Authorization', `Bearer ${localAuthToken}`);


    let hotImg = {
      verification_image_64_base: base64img
    };

    return this.http.put<any>(`${this.baseUrl}/api/me`, hotImg, {headers: other_header});
  }

  updateUserPassword(pass: any) {
    let localAuthToken = JSON.parse(localStorage.getItem('access_token'));


    let header = new HttpHeaders();
    let other_header = header.append('Authorization', `Bearer ${localAuthToken}`);

    return this.http.put<any>(`${this.baseUrl}/api/me`, pass, {headers: other_header});
  }







}

