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

  inputExchangeFrom: number;
  inputExchangeTo: number;


  constructor(public dialog: MatDialog,
              private cdr: ChangeDetectorRef,
              private blurService: EffectBlurService,
              private activatedRoute: ActivatedRoute,
              private userService: UserService,
              private exchangeService: ExchangeService) { }

  ngOnInit() {
    this.readRouteHash();
    this.exchangeFromValidator();
    this.exchangeToValidator();
    this.getExchangeList();


  }



  inputFromChanged() {
    console.log(this.inputExchangeFrom);
  }

  inputToChanged() {
    console.log(this.inputExchangeTo);
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

      this.loading = false;
    });
  }

  changeFromFilter(event) {
    event.preventDefault();
    let currency = event.target.attributes.filtervalue.value;

    if  (currency === 'all') {
      this.exchangeFromArray = this.exchangeFromArrayOriginal;
      return;
    }

    let resultArray: Exchange[]  = this.exchangeFromArrayOriginal.filter(item => item.currency === currency);
    this.exchangeFromArray = resultArray;
  }

  changeToFilter(event) {
    event.preventDefault();
    let currency = event.target.attributes.filtervalue.value;

    if  (currency === 'all') {
      this.exchangeToArray = this.exchangeToArrayOriginal;
      return;
    }

    let resultArray: Exchange[]  = this.exchangeToArrayOriginal.filter(item => item.currency === currency);
    this.exchangeToArray = resultArray;
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
