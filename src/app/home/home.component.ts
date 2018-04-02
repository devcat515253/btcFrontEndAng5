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
import 'rxjs/add/observable/forkJoin'
import {Observable} from 'rxjs/Observable';

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

  inputExchangeFrom: number = 0;
  inputExchangeTo: number = 0;


  selectedExchangeFrom: Exchange;
  selectedExchangeTo: Exchange;


  constructor(public dialog: MatDialog,
              private cdr: ChangeDetectorRef,
              private blurService: EffectBlurService,
              private activatedRoute: ActivatedRoute,
              private userService: UserService,
              private exchangeService: ExchangeService) { }

  ngOnInit() {
    this.getAuth();
    this.readRouteHash();
    this.exchangeFromValidator();
    this.exchangeToValidator();
    this.getExchangeList();


  }

  getAuth() {
    this.userService.token$.subscribe(logged => {
      this.loggedUser = logged;
    });
  }

  checkSelectedFromPayment(arr) {
    if (!this.selectedExchangeFrom.currency) {
      return;
    }


    let resArr = arr.filter( el => el.name === this.selectedExchangeFrom.name && el.currency === this.selectedExchangeFrom.currency );

    if (resArr.length > 0) {
      this.selectedExchangeFrom = resArr[0];
    }
    else {
      this.selectedExchangeFrom = null;
    }

    console.log(resArr);
    console.log( this.selectedExchangeFrom);
  }

  getExchangeListFromFiltered() {
    this.exchangeService.getExchangeListFromFiltered(this.selectedExchangeTo).subscribe(
      result => {
        this.exchangeFromArray = result.data as Exchange[];
        this.checkSelectedFromPayment( this.exchangeFromArray );
        },
      error => console.log(error)
    );
  }

  getExchangeListToFiltered() {
    this.exchangeService.getExchangeListToFiltered(this.selectedExchangeFrom).subscribe(
      result => this.exchangeToArray = result.data as Exchange[],
      error => console.log(error)
    );
  }


  selectExchangeFrom(itemFrom) {
    this.selectedExchangeFrom = itemFrom;
    this.getExchangeListToFiltered();
    // console.log(itemFrom);
  }

  selectExchangeTo(itemTo) {
    this.selectedExchangeTo = itemTo;
    this.getExchangeListFromFiltered();
    // console.log(itemTo);
  }


  inputFromChanged() {
    if (!this.selectedExchangeFrom || !this.selectedExchangeTo) {
      alert('Выберите платежную систему');
      return;
    }
    console.log(this.inputExchangeFrom);
    // console.log(this.selectedExchangeFrom);



    // комиссия в валюте, тут считаем комиссию в валюте, она получается равна сумма from * комиссию (которую ты получил) / 100
    const comission_amount: number = this.inputExchangeFrom * (this.selectedExchangeTo.commission / 100);

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
      let discount = 1; // должно из базы
      discount_amount = comission_amount * (discount / 100);
    }


    let amount: number = (this.inputExchangeFrom - (comission_amount + discount_amount)) * this.selectedExchangeTo.course;

    console.log(amount);
    console.log(this.digits(amount));

  }

  inputToChanged() {
    if (!this.selectedExchangeFrom || !this.selectedExchangeTo) {
      alert('Выберите платежную систему');
      return;
    }
    console.log(this.inputExchangeTo);
  }


  // кол-во знаков после запятой
  digits(amount: number) {
    let result: string = '';
    if (this.selectedExchangeTo.currency === 'btc') {
      result = amount.toFixed(6);
    }
    else {
      result = amount.toFixed(2);
    }
    return result;
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

    if  (currency === 'all') {
      this.showAllItems();
      return;
    }

    let resultArray: Exchange[]  = this.exchangeFromArrayOriginal.filter(item => item.currency === currency);
    this.exchangeFromArray = resultArray;
  }

  changeToFilter(event) {
    event.preventDefault();
    let currency = event.target.attributes.filtervalue.value;

    if  (currency === 'all') {
      this.showAllItems();
      return;
    }

    let resultArray: Exchange[]  = this.exchangeToArrayOriginal.filter(item => item.currency === currency);
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

      if  (this.param === 'openDialogAuth') {
        setTimeout((() => this.openDialogAuth()), 0);
      }

      if  (this.param === 'registration') {
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
