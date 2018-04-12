import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ExchangeService} from '../../_services/exchange.service';
import {Exchange} from '../../_entity/exchange';
import {UserService} from '../../_services/user.service';
import {UserModel} from '../../_entity/user-model';

@Component({
  selector: 'app-step3-3',
  templateUrl: './step3-3.component.html',
  styleUrls: ['./step3-3.component.sass']
})
export class Step33Component implements OnInit {


  fieldPhone: string = '';
  fieldCode: string = '';

  userModel: UserModel = new UserModel();

  phoneForm: FormGroup;
  codeForm: FormGroup;

  loading: boolean = false;
  loadingCode: boolean = false;


  successSendSms: boolean = false;

  @Input() inputFrom: number;
  @Input() selectedFrom: Exchange;
  @Output() goBack = new EventEmitter<any>();
  @Output() exchangeSubmitResult = new EventEmitter<any>();

  btnDisabled: boolean = false;
  sendAgainDisabled: boolean = true;



  constructor(private exchangeService: ExchangeService,
              private userService: UserService) {
    this.initValidator();
    this.codeValidator();
  }

  ngOnInit() {
    this.getUser();
  }


  getUser() {
    this.userService.user$.subscribe( (result) => {
      this.userModel = result;
      console.log(this.userModel);
    });
  }

  initValidator() {
    this.phoneForm = new FormGroup({
      phone: new FormControl(this.fieldPhone, [
        Validators.required,
        Validators.minLength(11)
      ])
    });
  }
  codeValidator() {
    this.codeForm = new FormGroup({
      code: new FormControl(this.fieldCode, [
        Validators.required,
        Validators.maxLength(64)
      ])
    });
  }




  submit(event) {
    event.preventDefault();

    const controls = this.phoneForm.controls;
    if (this.phoneForm.invalid) {
      Object.keys(controls)
        .forEach(controlName => controls[controlName].markAsTouched());
      return;
    }
    console.log('Форма пошла на отправку');

    this.loading = true;

    this.exchangeService.exchangeSendSms(this.fieldPhone).subscribe((data) => {
        console.log(data);
        this.loading = false;
        this.successSendSms = true;
        setTimeout((() => this.successSendSms = false), 1000);
        this.btnDisabled = true;

        this.startTimer();
      },
      error => {
        console.log(error);
        this.loading = false;
      });
  }


  goToNext(event) {
    event.preventDefault();

    const controls = this.codeForm.controls;
    if (this.codeForm.invalid) {
      Object.keys(controls)
        .forEach(controlName => controls[controlName].markAsTouched());
      return;
    }
    console.log('Форма пошла на отправку');

    this.loadingCode = true;



      this.exchangeService.exchangeSendCode(this.fieldPhone, this.fieldCode).subscribe((data) => {
        console.log(data);
        this.codeForm.controls['code'].setErrors(null);
          this.userModel.phone = this.fieldPhone;
          this.userModel.verification_phone_ok = true;

          this.userService.updateUserProfile(this.userModel).subscribe(() => {
            this.userService.user$.next(this.userModel);
            this.exchangeService.getLimit(this.selectedFrom, this.inputFrom).subscribe( (result) => {
              this.loadingCode = false;
              this.successSendSms = true;
              setTimeout((() => this.successSendSms = false), 1000);
              setTimeout((() => this.exchangeSubmitResult.emit(result)), 1000);
            }, (error) => {
              console.log(error);
              this.loadingCode = false;
            });
          }, (error) => {
            console.log(error);
            this.loadingCode = false;
          });

      },
      error => {
        console.log(error);
        this.loadingCode = false;
        this.codeForm.controls['code'].setErrors({'invalid': true});

      });
  }

  //



  startTimer() {
    var duration = 60 / 3,
      display = document.querySelector('#timer');

    var start = Date.now(),
      diff,
      minutes,
      seconds;

    let smsInterval = setInterval(() => {
      // get the number of seconds that have elapsed since
      // startTimer() was called
      diff = duration - (((Date.now() - start) / 1000) | 0);

      // does the same job as parseInt truncates the float
      minutes = (diff / 60) | 0;
      seconds = (diff % 60) | 0;

      minutes = minutes < 10 ? '0' + minutes : minutes;
      seconds = seconds < 10 ? '0' + seconds : seconds;

      display.textContent = minutes + ':' + seconds;

      if (diff <= 0) {
        // add one second so that the count down starts at the full duration
        // example 05:00 not 04:59
        // start = Date.now() + 1000;
        display.textContent = '';
        this.btnDisabled = false;
        this.sendAgainDisabled = false;
        clearInterval(smsInterval);
      }
    }, 1000);
  }


  goToBack(event) {
    event.preventDefault();
    this.goBack.emit();
  }

}
