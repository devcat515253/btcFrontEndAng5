import {ChangeDetectorRef, EventEmitter, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {UserRegistr} from '../_entity/user-registr';
import {UserAuth} from '../_entity/user-auth';
import 'rxjs/add/operator/map';
import {EmailModel} from '../_entity/email-model';
import {UserModel} from '../_entity/user-model';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Router} from '@angular/router';
import {UserLogs} from '../_entity/user-logs';
import {IntervalObservable} from 'rxjs/observable/IntervalObservable';


@Injectable()
export class UserService {

  baseUrl = 'http://api.smartex.info';
  userModel: UserModel = new UserModel();


  isLogged: boolean = false;
  token$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  discount$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  user$: BehaviorSubject<UserModel> = new BehaviorSubject<UserModel>(new UserModel);
  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  newUser$: BehaviorSubject<UserRegistr> = new BehaviorSubject<UserRegistr>(new UserRegistr);
  exchangeGoStart = new EventEmitter(); // подписка на ответ

  discount: number = 0;

  constructor(private http: HttpClient,
              private router: Router) {
    this.getAuthToken();
    this.checkToken();
    this.getUserDiscount();
  }



  checkToken() {
    this.loading$.next(true);
    this.http.get<any>(`${this.baseUrl}/api/me`, {headers: this.getAuthHeader()}).subscribe(result => {
      console.log(result);
      this.userModel = result.data;
      setTimeout(() => {
        this.user$.next(this.userModel);
        this.loading$.next(false);
      }, 100);

    }, (error) => {
      this.loading$.next(false);
      console.log(error);
      console.log(error.status);

      localStorage.removeItem('access_token');
      this.getAuthToken();
      this.discount = 0;
      this.getUserDiscount();
      this.userModel = new UserModel();
      this.user$.next(this.userModel);
    });
  }


  getToken() {
    return JSON.parse(localStorage.getItem('access_token')) || '';
  }

  getAuthToken() {
    if (this.getToken()) {
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
    this.newUser$.next(newUser);
    return this.http.post<any>(`${this.baseUrl}/api/user/registration`, newUser, {observe: 'response'});

  }

  checkEmail(emailUnique: EmailModel) {
    return this.http.post<any>(`${this.baseUrl}/api/user/email-check-unique`, emailUnique, {observe: 'response'});
  }

  auth(authUser: UserAuth) {
    console.log(authUser);
    return this.http.post<any>(`${this.baseUrl}/api/login`, authUser)
      .map(result => {
        if (result.data.access_token && result.data.expires_in) {
          localStorage.setItem('access_token', JSON.stringify(result.data.access_token));
          this.getAuthToken();
          this.getUserDiscount();
          this.checkToken();
        }
        return result;
      });
  }

  logout() {
    // next - установка нового значения
    localStorage.removeItem('access_token');

    // remove user from local storage to log user out
    this.getAuthToken();
    this.discount = 0;
    this.getUserDiscount();
    this.router.navigate(['/home']);
    this.userModel = new UserModel();
    this.user$.next(this.userModel);
    this.exchangeGoStart.emit();
  }

  logoutNoForwarding() {
    localStorage.removeItem('access_token');
    this.getAuthToken();
    this.discount = 0;
    this.getUserDiscount();
    this.userModel = new UserModel();
    this.user$.next(this.userModel);
    this.exchangeGoStart.emit();
  }

  getUserDiscount() {
     this.http.get<any>(`${this.baseUrl}/api/me`, {headers: this.getAuthHeader()}).subscribe( (result) => {
       this.discount = result.data.discount;
       this.discount$.next(this.discount);
     }, (error) => {
       console.log(error);
       this.discount = 0;
       this.discount$.next(this.discount);
     });
  }

  getTransactionInfoFirst(hash: string) {
    if ( hash === 'null') { return this.http.get<any>(`${this.baseUrl}/api/user/not-auth/exchanges/`); }
    return this.http.get<any>(`${this.baseUrl}/api/user/not-auth/exchanges/${hash}`);
  }



  getTransactionInfo(hash: string) {
    return IntervalObservable
      .create(5000)
      .flatMap((i) => this.http.get<any>(`${this.baseUrl}/api/user/not-auth/exchanges/${hash}`));
  }


  // ADD REVIEWS
  addReview(text: string, rating: number, id: number) {
    return this.http.put<any>(`${this.baseUrl}/api/user/exchanges/${id}/comment`, {'comment': text, 'rating': rating}, {headers: this.getAuthHeader()});
  }


  activateUser(hash: string) {
    return this.http.get<any>(`${this.baseUrl}/api/user/activation/${hash}`, {observe: 'response'});
  }

  forgotPass(data: EmailModel) {
    return this.http.post<any>(`${this.baseUrl}/api/user/password/reset`, data, {observe: 'response'});
  }

  // GET
  getLogsProfile() {
    return this.http.get<any>(`${this.baseUrl}/api/user/login-logs`, {headers: this.getAuthHeader()});
  }
  getUserProfile() {
    console.log(`${this.baseUrl}/api/me`, {headers: this.getAuthHeader()});
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

  getPartnersList() {
    return this.http.get<any>(`${this.baseUrl}/api/user/referrers`, {headers: this.getAuthHeader()});
  }

  logoutAllUser(idUser: number) {
    location.reload();
    return this.http.put<any>(`${this.baseUrl}/api/user/login-logs/${idUser}/token-revoke`, '', {headers: this.getAuthHeader()});
  }


}

