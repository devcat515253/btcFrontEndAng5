import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Exchange} from '../../_entity/exchange';
import {UserService} from '../../_services/user.service';
import {FormGroup} from '@angular/forms';
import { ViewChild } from '@angular/core';
import { ReCaptchaComponent } from 'angular2-recaptcha';
import {ExchangeService} from '../../_services/exchange.service';

@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.sass']
})
export class Step1Component implements OnInit {

  @Input() exchangeTo: Exchange;
  @Input() exchangeFrom: Exchange;

  @Input() exchangeFromForm: FormGroup;
  @Input() exchangeToForm: FormGroup;

  @Input() inputExchangeFrom: number;

  @Output() onExchangeSwap = new EventEmitter<any>();
  @Output() loading = new EventEmitter<boolean>();
  @Output() exchangeSubmitResult = new EventEmitter<any>();
  @ViewChild(ReCaptchaComponent) captcha: ReCaptchaComponent;

  userDiscount: number = 0;

  constructor(private userService: UserService,
              private exchangeService: ExchangeService) {
  }

  ngOnInit() {
    this.getUserDiscount();
  }

  handleCorrectCaptcha() {
    let token = this.captcha.getResponse();
    console.log(token);
  }

  getUserDiscount() {
    this.userService.discount$.subscribe( discount => {
      this.userDiscount = discount;
      console.log(this.userDiscount);
    });
  }

  exchangeSwap(event) {
    if  (this.exchangeTo && this.exchangeFrom) {
      this.onExchangeSwap.emit();
    }
  }

  exchangeSubmit(event) {
    this.loading.emit(true);
    this.exchangeService.getLimit(this.exchangeFrom, this.inputExchangeFrom).subscribe( (result) => {
      // console.log(result);
      this.loading.emit(false);
      this.exchangeSubmitResult.emit(result);
    }, (error) => {
      console.log(error);
      this.loading.emit(false);
    });
  }

}



