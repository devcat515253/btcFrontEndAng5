import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {UserRegistr} from '../_entity/user-registr';
import {UserAuth} from '../_entity/user-auth';
import 'rxjs/add/operator/map';
import {EmailModel} from '../_entity/email-model';
import {UserModel} from '../_entity/user-model';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Router} from '@angular/router';
import {UserLogs} from '../_entity/user-logs';

@Injectable()
export class UserService {

  baseUrl  = 'http://api.smartex.info';
  userModel: UserModel = new UserModel();


  isLogged: boolean = false;
  token$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient,
              private router: Router) {
    this.getAuthToken();
  }
  getToken() {
    return JSON.parse(localStorage.getItem('access_token')) || '';
  }

  getAuthToken() {
    if  (this.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
    this.token$.next(this.isLogged);
    // next - установка нового значения
  }

  getAuthHeader() {
    let localAuthToken = JSON.parse(localStorage.getItem('access_token'));
    let header = new HttpHeaders();
    let other_header = header.append('Authorization', `Bearer ${localAuthToken}`);
    return other_header;
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
          this.getAuthToken();
        }
        return result;
      });
  }

  logout() {
    // next - установка нового значения
    localStorage.removeItem('access_token');

    // remove user from local storage to log user out
    this.getAuthToken();
    this.router.navigate(['/home']);
  }


  activateUser(hash: string) {
    return this.http.get<any>(`${this.baseUrl}/api/user/activation/${hash}`,  {observe: 'response'});
  }

  forgotPass(data: EmailModel) {
    return this.http.post<any>(`${this.baseUrl}/api/user/password/reset`, data, {observe: 'response'});
  }

  // GET
  getLogsProfile() {
    return this.http.get<UserLogs>(`${this.baseUrl}/api/user/login-logs`,  {headers: this.getAuthHeader()});
  }

  getUserProfile() {
    return this.http.get<any>(`${this.baseUrl}/api/me`, {headers: this.getAuthHeader()});
  }

  // UPDATE
  updateUserProfile(userModel: UserModel) {
    delete userModel.date;
    return this.http.put<any>(`${this.baseUrl}/api/me`, userModel, {headers: this.getAuthHeader()});
  }

  updateUserIdCardProfile(base64img: string) {
    let hotImg = {verification_image_64_base: base64img};
    return this.http.put<any>(`${this.baseUrl}/api/user/documents/card`, hotImg, {headers: this.getAuthHeader()});
  }

  updateUserKycProfile(base64img: string) {
    let hotImg = {verification_kyc_64_base: base64img};
    return this.http.put<any>(`${this.baseUrl}/api/user/documents/kyc`, hotImg, {headers: this.getAuthHeader()});
  }

  updateUserPassword(pass: any) {
    return this.http.put<any>(`${this.baseUrl}/api/user/password`, pass, {headers: this.getAuthHeader()});
  }







}

