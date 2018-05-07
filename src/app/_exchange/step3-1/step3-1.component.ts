import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {UserService} from '../../_services/user.service';
import {UserRegistr} from '../../_entity/user-registr';
import {EmailModel} from '../../_entity/email-model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpResponse} from '@angular/common/http';
import {matchOtherValidator} from '../../_validators/validator';
import {of} from 'rxjs/observable/of';
import {ReferralService} from '../../referral/referral.service';
import {EffectBlurService} from '../../_services/effect-blur.service';
import {DialogRegistrationComponent} from '../../_dialog/dialog-registration/dialog-registration.component';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {DialogSuccessComponent} from '../../_dialog/dialog-success/dialog-success.component';
import {UserAuth} from '../../_entity/user-auth';
import {ExchangeService} from '../../_services/exchange.service';
import {Exchange} from '../../_entity/exchange';

@Component({
  selector: 'app-step3-1',
  templateUrl: './step3-1.component.html',
  styleUrls: ['./step3-1.component.sass']
})
export class Step31Component implements OnInit {

  @Output() goBack = new EventEmitter<any>();
  @Output() goNext = new EventEmitter<any>();

  @Input() inputExchangeFrom: number;
  @Input() exchangeFrom: Exchange;

  userRegistr: UserRegistr = new UserRegistr();
  userAuth: UserAuth = new UserAuth();
  emailModel: EmailModel = new EmailModel();
  userRegistrForm: FormGroup;
  loading: boolean = false;
  successRegistr: boolean = false;

  constructor(private userService: UserService,
              private referralService: ReferralService,
              private exchangeService: ExchangeService) {
    this.initValidator();
  }

  ngOnInit() {
  }

  checkEmailExist() {

    if  (this.userRegistr.email === '') {
      return;
    }

    this.emailModel.email = this.userRegistr.email;
    this.userService.checkEmail(this.emailModel).subscribe(
      (data: HttpResponse<any>) => {
      },
      error => {
        this.userRegistrForm.controls['email'].setErrors({'notunique': true});
      }
    );
  }
  initValidator() {
    this.userRegistrForm = new FormGroup({
      email: new FormControl(this.userRegistr.email, [
        Validators.required,
        Validators.email,
        Validators.minLength(8),
        Validators.maxLength(64)
      ]),
      password: new FormControl(this.userRegistr.password, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(64)
      ]),
      confirmPassword: new FormControl(this.userRegistr.repassword, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(64),
        matchOtherValidator('password')
      ]),
      checkbox: new FormControl(this.userRegistr.checkbox, [
        Validators.required
      ])
    });
  }


  submit(event) {
    event.preventDefault();

    const controls = this.userRegistrForm.controls;

    if (this.userRegistrForm.invalid) {
      Object.keys(controls)
        .forEach(controlName => controls[controlName].markAsTouched());
      return;
    }

    this.emailModel.email = this.userRegistr.email;
    this.userRegistr.refer = this.referralService.getReferralId();

    this.loading = true;

    this.userService.checkEmail(this.emailModel).flatMap(loginResult => {
      return this.userService.registration(this.userRegistr);
    }).subscribe(
      (data) => {
        console.log(data);
        console.log(data.status);
        this.loading = false;
        this.successRegistr = true;
        setTimeout((() => this.successRegistr = false), 1000);
        setTimeout((() => this.goNext.emit()), 1250);
      },
      error => {
        console.log(error);
        console.log(error.status);
        this.userRegistrForm.controls['email'].setErrors({'notunique': true});
        this.loading = false;
        return of();
      }
    );
  }




  goToBack(event) {
    event.preventDefault();
    this.exchangeService.getLimit(this.exchangeFrom, this.inputExchangeFrom).subscribe( (result) => {
      this.goBack.emit(result);
    }, (error) => {
      console.log(error);
      this.goBack.emit();
    });
  }




}
