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
  noSuchFilterFrom: boolean = false;
  noSuchFilterTo: boolean = false;


  btnSelectedFilterForm: string = 'All';
  btnSelectedFilterTo: string = 'All';

  exchangeFromForm: FormGroup;
  exchangeToForm: FormGroup;


  exchangeFromArray: Exchange[] = [];
  exchangeFromArrayOriginal: Exchange[] = [];
  exchangeFromArrayFiltred: Exchange[] = [];

  exchangeToArray: Exchange[] = [];
  exchangeToArrayOriginal: Exchange[] = [];
  exchangeToArrayFiltred: Exchange[] = [];

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

  checkMaxBalance() {
    if  (this.inputExchangeTo > this.selectedExchangeTo.balance) {
      this.exchangeToForm.controls['inputTo'].setErrors({'maxbalance': true});
    } else {
      this.exchangeToForm.controls['inputTo'].setErrors(null);
    }
  }

  asyncGetExchangeList() {
    this.loading = true;

    Observable.forkJoin([
      this.exchangeService.getExchangeListFromFiltered(this.selectedExchangeTo),
      this.exchangeService.getExchangeListToFiltered(this.selectedExchangeFrom)]).subscribe(t => {
      let firstResult: any = t[0];
      let secondResult: any = t[1];

      this.exchangeFromArray = firstResult.data as Exchange[];
      this.exchangeFromArrayFiltred = firstResult.data as Exchange[];
      this.checkSelectedFromPayment(this.exchangeFromArray);

      this.exchangeToArray = secondResult.data as Exchange[];
      this.exchangeToArrayFiltred = secondResult.data as Exchange[];
      this.checkSelectedToPayment(this.exchangeToArray);
      this.checkMaxBalance();

      this.loading = false;
      this.noSuchFilterFrom = false;
      this.noSuchFilterTo = false;
    }, (error) => {
        console.log(error);
        this.loading = false;
        this.noSuchFilterFrom = false;
        this.noSuchFilterTo = false;
    });
  }

  exchangeSwap(event) {
    let tempSelectedExchangeFrom = this.selectedExchangeFrom;
    let tempSelectedExchangeTo = this.selectedExchangeTo;

    this.selectedExchangeFrom = tempSelectedExchangeTo;
    this.selectedExchangeTo = tempSelectedExchangeFrom;


    let tempInputExchangeFrom = this.inputExchangeFrom;
    let tempInputExchangeTo = this.inputExchangeTo;

    this.inputExchangeFrom = tempInputExchangeTo;
    this.inputExchangeTo = tempInputExchangeFrom;
    this.cdr.detectChanges();


    this.asyncGetExchangeList();
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
        this.exchangeFromArrayFiltred = result.data as Exchange[];
        this.checkSelectedFromPayment(this.exchangeFromArray);
        this.loading = false;
        this.noSuchFilterTo = false;
        console.log(this.selectedExchangeFrom);
      }, (error) => {
        console.log(error);
        this.loading = false;
        this.noSuchFilterTo = false;
      }
    );
  }

  getExchangeListToFiltered() {
    this.loading = true;

    this.exchangeService.getExchangeListToFiltered(this.selectedExchangeFrom).subscribe(
      result => {
        this.exchangeToArray = result.data as Exchange[];
        this.exchangeToArrayFiltred = result.data as Exchange[];
        this.checkSelectedToPayment(this.exchangeToArray);
        this.loading = false;
        this.noSuchFilterTo = false;
        console.log(this.selectedExchangeTo)

      }, error => {
        console.log(error);
        this.loading = false;
        this.noSuchFilterTo = false;
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
    this.inputFromChanged();
    console.log(itemTo);
  }
  inputExchangeChanged(event) {
    if (!this.selectedExchangeFrom) {
      this.selectedFromNotChoise = true;
      return;
    }
    if (!this.selectedExchangeTo) {
      this.selectedToNotChoise = true;
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


      this.inputExchangeTo = this.digits(amount, this.selectedExchangeTo.currency);
      this.cdr.detectChanges();

      this.checkMaxBalance();
      this.cdr.detectChanges();


  }

  inputToChanged() {
    if (!this.selectedExchangeFrom || !this.selectedExchangeTo) {
      return;
    }

    let percentCommision = 100 - this.selectedExchangeTo.commission;
    let inputFrom: number = this.inputExchangeTo / this.selectedExchangeTo.course;
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
    this.cdr.detectChanges();

    this.checkMaxBalance();
    this.cdr.detectChanges();
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
    this.btnSelectedFilterForm = event.target.innerText;
    let currency = event.target.getAttribute('filterValue');

    let tempArray = [];

    if (this.selectedExchangeTo) {
      tempArray = this.exchangeFromArrayFiltred;
    }else {
      tempArray = this.exchangeFromArrayOriginal;
    }

    if (currency === 'all' && this.selectedExchangeFrom && this.selectedExchangeTo) {
      this.noSuchFilterFrom = false;
      this.noSuchFilterTo = false;
      this.showAllItems();
      this.clearSelectedPayments();
      this.btnSelectedFilterTo = 'All';
      this.btnSelectedFilterForm = 'All';
      return;
    }

    if (currency === 'all' && this.selectedExchangeFrom) {
      this.noSuchFilterFrom = false;
      this.noSuchFilterTo = false;
      this.showAllItems();
      return;
    }

    if (currency === 'all') {
      this.noSuchFilterFrom = false;
      this.noSuchFilterTo = false;
      this.showAllItems();
      return;
    }



    if (currency === 'coin') {
      this.exchangeFromArray = tempArray.filter(item => {
        return currencyArray.indexOf( item.currency ) === -1;
      });

      if  (this.exchangeFromArray.length === 0) {
        this.noSuchFilterFrom = true;
      } else {
        this.noSuchFilterFrom = false;
      }
      return;
    }

    let resultArray: Exchange[] = tempArray.filter(item => item.currency === currency);
    if  (resultArray.length === 0) {
      this.noSuchFilterFrom = true;
    } else {
      this.noSuchFilterFrom = false;
    }
    this.exchangeFromArray = resultArray;

  }

  changeToFilter(event) {
    event.preventDefault();
    this.btnSelectedFilterTo = event.target.innerText;
    let currency = event.target.getAttribute('filterValue');
    console.log(currency);

    let tempArray = [];
    if (this.selectedExchangeFrom) {
      tempArray = this.exchangeToArrayFiltred;
    }else {
      tempArray = this.exchangeToArrayOriginal;
    }


    console.log(tempArray);


    if (currency === 'all' && this.selectedExchangeFrom && this.selectedExchangeTo) {
      this.noSuchFilterFrom = false;
      this.noSuchFilterTo = false;
      this.showAllItems();
      this.clearSelectedPayments();
      this.btnSelectedFilterTo = 'All';
      this.btnSelectedFilterForm = 'All';
      return;
    }

    if (currency === 'all' && this.selectedExchangeTo) {
      this.noSuchFilterFrom = false;
      this.noSuchFilterTo = false;
      this.showAllItems();
      return;
    }

    if (currency === 'all') {
      this.noSuchFilterFrom = false;
      this.noSuchFilterTo = false;
      this.showAllItems();
      return;
    }



    if (currency === 'coin') {
      this.exchangeToArray = tempArray.filter(item => {
       return currencyArray.indexOf( item.currency ) === -1;
      });

      if  (this.exchangeToArray.length === 0) {
        this.noSuchFilterTo = true;
      } else {
        this.noSuchFilterTo = false;
      }
      return;
    }


    let resultArray: Exchange[] = tempArray.filter(item => item.currency === currency);
    if  (resultArray.length === 0) {
      this.noSuchFilterTo = true;
    } else {
      this.noSuchFilterTo = false;
    }
    this.exchangeToArray = resultArray;
  }


  showAllItems() {
    this.exchangeFromArray = this.exchangeFromArrayOriginal;
    this.exchangeToArray = this.exchangeToArrayOriginal;
    // this.clearSelectedPayments();
  }

  clearSelectedPayments() {
    this.selectedExchangeTo = null;
    this.selectedExchangeFrom = null;
  }


  exchangeFromValidator() {
    this.exchangeFromForm = new FormGroup({
      inputFrom: new FormControl(this.inputExchangeFrom, [
        Validators.required,
        Validators.maxLength(64)
      ])
    });
  }

  exchangeToValidator() {
    this.exchangeToForm = new FormGroup({
      inputTo: new FormControl(this.inputExchangeTo, [
        Validators.required,
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
