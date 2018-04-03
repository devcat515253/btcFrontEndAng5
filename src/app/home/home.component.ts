import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {UserService} from '../_services/user.service';
import {DialogSuccessComponent} from '../_dialog/dialog-success/dialog-success.component';
import {MatDialog} from '@angular/material';
import {DialogAuthComponent} from '../_dialog/dialog-auth/dialog-auth.component';
import {EffectBlurService} from '../_services/effect-blur.service';
import {DialogRegistrationComponent} from '../_dialog/dialog-registration/dialog-registration.component';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import {ExchangeService} from '../_services/exchange.service';
import {Exchange} from '../_entity/exchange';
import {EmailModel} from '../_entity/email-model';
import 'rxjs/add/observable/forkJoin';
import {Observable} from 'rxjs/Observable';
import {currencyArray} from '../_entity/currency';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  param: string = '';
  loggedUser: boolean = false;
  loading: boolean = true;

  exchangeFromForm: FormGroup;
  exchangeToForm: FormGroup;



  exchangeFromArray: Exchange[] = [];
  exchangeFromArrayOriginal: Exchange[] = [];

  exchangeToArray: Exchange[] = [];
  exchangeToArrayOriginal: Exchange[] = [];

  inputExchangeFrom: number = 100;
  inputExchangeTo: number = 100;
  userDiscount: number = 0;

  selectedExchangeFrom: Exchange;
  selectedExchangeTo: Exchange;

  selectedFromNotChoise: boolean = false;
  selectedToNotChoise: boolean = false;


  constructor(public dialog: MatDialog,
              private cdr: ChangeDetectorRef,
              private blurService: EffectBlurService,
              private activatedRoute: ActivatedRoute,
              private userService: UserService,
              private exchangeService: ExchangeService) {
  }

  ngOnInit() {
    this.getAuth();
    this.readRouteHash();
    this.exchangeFromValidator();
    this.exchangeToValidator();
    this.getExchangeList();
    this.getUserDiscount();
  }

  getAuth() {
    this.userService.token$.subscribe(logged => {
      this.loggedUser = logged;
    });
  }
  getUserDiscount() {
    this.userService.discount$.subscribe( discount => {
      this.userDiscount = discount;
      console.log(this.userDiscount);
    });
  }



  checkSelectedFromPayment(arr) {
    if (!this.selectedExchangeFrom) {
      return;
    }


    let resArr = arr.filter(el => el.name === this.selectedExchangeFrom.name && el.currency === this.selectedExchangeFrom.currency);

    if (resArr.length > 0) {
      this.selectedExchangeFrom = resArr[0];
    } else {
      this.selectedExchangeFrom = null;
    }

    console.log(resArr);
    console.log(this.selectedExchangeFrom);
  }

  checkSelectedToPayment(arr) {
    if (!this.selectedExchangeTo) {
      return;
    }

    let resArr = arr.filter(el => el.name === this.selectedExchangeTo.name && el.currency === this.selectedExchangeTo.currency);

    if (resArr.length > 0) {
      this.selectedExchangeTo = resArr[0];
    } else {
      this.selectedExchangeTo = null;
    }

    console.log(resArr);
    console.log(this.selectedExchangeTo);
  }

  getExchangeListFromFiltered() {
    this.loading = true;

    this.exchangeService.getExchangeListFromFiltered(this.selectedExchangeTo).subscribe(
      (result) => {
        this.exchangeFromArray = result.data as Exchange[];
        this.checkSelectedFromPayment(this.exchangeFromArray);
        this.loading = false;
      }, (error) => {
        console.log(error);
        this.loading = false;
      }
    );
  }

  getExchangeListToFiltered() {
    this.loading = true;

    this.exchangeService.getExchangeListToFiltered(this.selectedExchangeFrom).subscribe(
      result => {
        this.exchangeToArray = result.data as Exchange[];
        this.checkSelectedToPayment(this.exchangeToArray);
        this.loading = false;
      }, error => {
        console.log(error);
        this.loading = false;
      }
    );
  }

  selectExchangeFrom(itemFrom) {
    this.selectedExchangeFrom = itemFrom;
    this.getExchangeListToFiltered();
    this.selectedFromNotChoise = false;
    this.inputFromChanged();
    // console.log(itemFrom);
  }

  selectExchangeTo(itemTo) {
    this.selectedExchangeTo = itemTo;
    this.getExchangeListFromFiltered();
    this.selectedToNotChoise = false;
    this.inputToChanged();
    console.log(itemTo);
  }
  inputExchangeChanged(event) {
    if (!this.selectedExchangeFrom) {
      this.selectedFromNotChoise = true;
      setTimeout(() => {
        this.selectedFromNotChoise = false;
      }, 5000);
      return;
    }
    if (!this.selectedExchangeTo) {
      this.selectedToNotChoise = true;
      setTimeout(() => {
        this.selectedToNotChoise = false;
      }, 5000);
      return;
    }
  }

  inputFromChanged() {

    if (!this.selectedExchangeFrom || !this.selectedExchangeTo) {
      return;
    }

    console.log(this.inputExchangeFrom);
    // console.log(this.selectedExchangeFrom);

    // комиссия в валюте, тут считаем комиссию в валюте, она получается равна сумма from * комиссию (которую ты получил) / 100

    const comission_amount: number = this.inputExchangeFrom * this.selectedExchangeTo.commission / 100;
    console.log("FROM-Комиссия (число * (комиссия системы / 100) : " + comission_amount);

    /*
      тут считаем скидку в валюте для каждого пользователя, если не авторизирован то соответственно не считаем тк скидка 0 то есть,
      скидка в валюте = сумма комиссии (считали на прошлом шаге) * discount (из базы, таблица user.discount) / 100
    */
    let discount_amount: number = 0;
    if (!this.loggedUser) {
      discount_amount = 0;
    }
    else {
      // если зареган то считаем скидку в валюте
      let discount = this.userDiscount; // должно из базы

      discount_amount = comission_amount * (discount / 100);
      console.log("FROM-Скидка (комиссия системы * (скидка / 100)) : " + discount_amount);
    }


    let amount: number = (this.inputExchangeFrom - comission_amount + discount_amount) * this.selectedExchangeTo.course;
    console.log("FROM-Итого (число - (комиссия + скидка) * курс валюты): " + amount);

    console.log(amount);
    console.log(this.digits(amount));
    this.inputExchangeTo = this.digits(amount, this.selectedExchangeTo.currency);
  }

  inputToChanged() {
    if (!this.selectedExchangeFrom || !this.selectedExchangeTo) {
      return;
    }

    let percentCommision = 100 - this.selectedExchangeTo.commission;
    let inputFrom: number = (this.inputExchangeTo / this.selectedExchangeTo.course;
    inputFrom = inputFrom / percentCommision * 100;

    const comission_amount: number = inputFrom * (this.selectedExchangeTo.commission / 100);

    let discount_amount: number = 0;
    if (!this.loggedUser) {
      discount_amount = 0;
    } else {
      // если зареган то считаем скидку в валюте
      let discount = this.userDiscount; // должно из базы
      discount_amount = comission_amount * (discount / 100);
    }
    let amount = inputFrom - discount_amount;

    console.log(amount);
    this.inputExchangeFrom = this.digits(amount, this.selectedExchangeFrom.currency);
  }

  // кол-во знаков после запятой
  digits(amount: number, currency: string) {
    let result: string = '';

    if ( currencyArray.indexOf( currency ) !== -1 ) {
      result = amount.toFixed(2);
      return Number(result);
    }

    result = amount.toFixed(6);
    return Number(result);
  }


  // ================
  // EXCHANGE FROM
  // ================

  getExchangeList() {
    Observable.forkJoin([
      this.exchangeService.getExchangeListFrom(),
      this.exchangeService.getExchangeListTo()]).subscribe(t => {
      let firstResult: any = t[0];
      let secondResult: any = t[1];

      this.exchangeFromArray = firstResult.data as Exchange[];
      this.exchangeFromArrayOriginal = firstResult.data as Exchange[];

      this.exchangeToArray = secondResult.data as Exchange[];
      this.exchangeToArrayOriginal = secondResult.data as Exchange[];

      console.log(this.exchangeFromArray);
      console.log(this.exchangeToArray);

      this.loading = false;
    });
  }

  changeFromFilter(event) {
    event.preventDefault();
    let currency = event.target.attributes.filtervalue.value;

    if (currency === 'all') {
      this.showAllItems();
      return;
    }

    let resultArray: Exchange[] = this.exchangeFromArrayOriginal.filter(item => item.currency === currency);
    this.exchangeFromArray = resultArray;
  }

  changeToFilter(event) {
    event.preventDefault();
    let currency = event.target.attributes.filtervalue.value;

    if (currency === 'all') {
      this.showAllItems();
      return;
    }

    let resultArray: Exchange[] = this.exchangeToArrayOriginal.filter(item => item.currency === currency);
    this.exchangeToArray = resultArray;
  }


  showAllItems() {
    this.exchangeFromArray = this.exchangeFromArrayOriginal;
    this.exchangeToArray = this.exchangeToArrayOriginal;
    this.clearSelectedPayments();
  }

  clearSelectedPayments() {
    this.selectedExchangeTo = null;
    this.selectedExchangeFrom = null;
  }


  exchangeFromValidator() {
    this.exchangeFromForm = new FormGroup({
      inputFrom: new FormControl(this.inputExchangeFrom, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(64)
      ])
    });
  }

  exchangeToValidator() {
    this.exchangeToForm = new FormGroup({
      inputTo: new FormControl(this.exchangeToForm, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(64)
      ])
    });
  }


  readRouteHash() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.param = params['param'];

      if (this.param === 'openDialogAuth') {
        setTimeout((() => this.openDialogAuth()), 0);
      }

      if (this.param === 'registration') {
        setTimeout((() => this.openDialogReg()), 0);
      }


    });
  }


  openDialogAuth(): void {
    this.blurService.toggleBlur(true);

    const dialogRef = this.dialog.open(DialogAuthComponent, {
      width: '60rem',
    });

    dialogRef.beforeClose().subscribe(result => {
      this.blurService.toggleBlur(false);
    });
  }

  openDialogReg(): void {
    this.blurService.toggleBlur(true);

    const dialogRef = this.dialog.open(DialogRegistrationComponent, {
      width: '60rem',
    });

    dialogRef.beforeClose().subscribe(result => {
      this.blurService.toggleBlur(false);
    });
  }


}
