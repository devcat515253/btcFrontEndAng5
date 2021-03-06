import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {UserService} from '../_services/user.service';
import {EmailModel} from '../_entity/email-model';
import {UserModel} from '../_entity/user-model';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DomSanitizer} from '@angular/platform-browser';
import {FileValidator, matchOtherValidator} from '../_validators/validator';
import {UserLogs} from '../_entity/user-logs';
import {ICustomFile} from 'file-input-accessor';
import {ExchangeService} from '../_services/exchange.service';
import {stepsArray} from '../_entity/stepsArray';

declare var $: any;

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.sass']
})
export class SettingsComponent implements OnInit, AfterViewInit {

  loadingMain: boolean = true;
  successMain: boolean = false;

  loadingIdCard: boolean = true;
  successIdCard: boolean = false;
  IdCardFileName: string = 'No file chosen';
  IdCardFileSize: number = 0;

  loadingPass: boolean = false;
  successPassTip: boolean = false;

  loadingKyc: boolean = true;
  successKycTip: boolean = false;
  KycFileName: string = 'No file chosen';
  KycFileSize: number = 0;
  KycFileValid: boolean = true;

  step3Show: boolean = true;
  step4Show: boolean = false;

  private base64Image: string;

  passwordOld: string;
  passwordNew: string;
  repasswordNew: string;


  userModel: UserModel = new UserModel();
  mainInfoForm: FormGroup;
  passwordForm: FormGroup;

  idCardForm: FormGroup;
  KycForm: FormGroup;


  loadingLogs: boolean = true;
  logsArray: UserLogs[] = [];


  fieldPhone: string = '';
  fieldCode: string = '';

  phoneForm: FormGroup;
  codeForm: FormGroup;

  loadingSms: boolean = false;
  loadingCode: boolean = false;

  verification_phone_form: boolean = false;
  successSendSms: boolean = false;
  btnDisabled: boolean = false;
  sendAgainDisabled: boolean = true;

  constructor(private cdr: ChangeDetectorRef,
              private userService: UserService,
              private exchangeService: ExchangeService) {
    this.passwordValidator();
    this.idCardFormValidator();
    this.KycFormValidator();
    this.initValidator();
    this.codeValidator();
  }


  ngOnInit() {
    // console.log(JSON.parse(localStorage.getItem('currentUser')));
    this.getLogs();
    this.getUserProfile();
  }

  ngAfterViewInit() {
    this.initJS();
  }



  getUserProfile() {
    this.userService.getUserProfile().subscribe((data) => {
      this.userModel = data.data;
      console.log(this.userModel);

      this.loadingMain = false;
      this.loadingKyc = false;
      this.loadingIdCard = false;

      this.IdCardFileName = this.userModel.verification_image;
      this.KycFileName = this.userModel.verification_kyc;

      if (this.IdCardFileName) {
        this.step4Show = true;
      }
    }, (error) => {
      console.log(error);
      this.loadingMain = false;
      this.loadingIdCard = false;
      this.loadingKyc = false;
    });
  }

  submitMainForm(event) {
    event.preventDefault();
    this.loadingMain = true;

    this.userService.updateUserProfile(this.userModel).subscribe((data) => {
      // console.log(data);
      console.log(this.userModel);
      this.userService.user$.next(this.userModel);


      this.loadingMain = false;
      this.successMain = true;
      setTimeout(() => {
        this.successMain = false;
        this.cdr.detectChanges();
      }, 1000);

    }, (error) => {
      console.log(error);
      this.loadingMain = false;
    });
  }

  // ================================
  // MOBILE PHONE VERIFICATION
  // ================================

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

  display_phone_form(event) {
    event.preventDefault();

    this.verification_phone_form = true;
  }

  submitSms(event) {
    event.preventDefault();

    const controls = this.phoneForm.controls;
    if (this.phoneForm.invalid) {
      Object.keys(controls)
        .forEach(controlName => controls[controlName].markAsTouched());
      return;
    }
    console.log('Форма пошла на отправку');

    this.loadingSms = true;

    this.exchangeService.exchangeSendSms(this.fieldPhone).subscribe((data) => {
        console.log(data);
        this.loadingSms = false;
        this.successSendSms = true;
        setTimeout((() => this.successSendSms = false), 1000);
        this.btnDisabled = true;

        this.startTimer();
      },
      error => {
        console.log(error);
        this.loadingSms = false;
      });
  }
  startTimer() {
    const duration = 60 / 3;
    const display: NodeListOf<Element> = document.querySelectorAll('.timer');
    console.log(display);

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

      for (let i = 0; i < display.length; i++) {
        const element = display[i];
        element.textContent = minutes + ':' + seconds;
      }

      if (diff <= 0) {
        // add one second so that the count down starts at the full duration
        // example 05:00 not 04:59
        // start = Date.now() + 1000;

        for (let i = 0; i < display.length; i++) {
          const element = display[i];
          element.textContent = '';
        }

        this.btnDisabled = false;
        this.sendAgainDisabled = false;
        clearInterval(smsInterval);
      }
    }, 1000);
  }

  verififcationCode(event) {
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
          this.verification_phone_form = false;
          this.loadingCode = false;
          this.successSendSms = true;
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

  isImage(file) {
    return file['type'].split('/')[0] === 'image'; // returns true or false
  }

  // ================================
  // READ IMAGE FILE FOR ID CARD FORM
  // ================================
  fileChangeIdCard($event) {
    this.loadingIdCard = true;
    let fileList: FileList = $event.target.files;

    if (fileList.length > 0) {
      this.IdCardFileName = fileList[0].name;
      this.IdCardFileSize = fileList[0].size;

      if (this.IdCardFileSize >= 10485760) {
      // if (this.IdCardFileSize >= 5242880) {
        this.idCardForm.controls['file'].setErrors({'maxsize': true});
      }

      if  (!this.isImage(fileList[0])) {
        this.idCardForm.controls['file'].setErrors({'badformat': true});
      }

    } else {
      this.IdCardFileName = 'No file chosen';
      this.base64Image = '';
      this.loadingIdCard = false;
      return;
    }
    this.readImageIdCard($event.target);
  }


  readImageIdCard(inputValue: any): void {
    var file: File = inputValue.files[0];
    var myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.base64Image = myReader.result;
      // console.log(this.base64Image);
      this.loadingIdCard = false;
    };
    myReader.readAsDataURL(file);
  }

  // ============================
  // READ IMAGE FILE FOR KYC FORM
  // ============================
  fileChangeKyc($event) {
    this.loadingKyc = true;
    let fileList: FileList = $event.target.files;
    if (fileList.length > 0) {
      this.KycFileName = fileList[0].name;
      this.KycFileSize = fileList[0].size;

      if (this.KycFileSize >= 10485760) {
        // if (this.IdCardFileSize >= 5242880) {
        this.KycForm.controls['file'].setErrors({'maxsize': true});
      }

      if  (!this.isImage(fileList[0])) {
        this.KycForm.controls['file'].setErrors({'badformat': true});
      }
    } else {
      this.KycFileName = 'No file chosen';
      this.base64Image = '';
      this.loadingKyc = false;
      return;
    }
    this.readImageKyc($event.target);
  }

  readImageKyc(inputValue: any): void {
    var file: File = inputValue.files[0];
    var myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.base64Image = myReader.result;
      // console.log(this.base64Image);
      this.loadingKyc = false;
    };
    myReader.readAsDataURL(file);
  }


  submitIdCardForm(event) {
    event.preventDefault();

    const controls = this.idCardForm.controls;


    if (this.idCardForm.invalid) {
      Object.keys(controls)
        .forEach(controlName => controls[controlName].markAsTouched());
      return;
    }

    this.loadingIdCard = true;
    this.userService.updateUserIdCardProfile(this.base64Image).subscribe((data) => {
      // console.log(data);

      this.getUserProfile();
      this.loadingIdCard = false;
      this.successIdCard = true;
      setTimeout((() => this.successIdCard = false), 1000);
    }, (error) => {
      console.log(error);
      this.loadingIdCard = false;
    });
  }

  submitKycForm(event) {
    event.preventDefault();

    const controls = this.KycForm.controls;

    if (this.KycForm.invalid) {
      Object.keys(controls)
        .forEach(controlName => controls[controlName].markAsTouched());
      return;
    }

    this.loadingKyc = true;
    this.userService.updateUserKycProfile(this.base64Image).subscribe((data) => {
      // console.log(data);
      this.getUserProfile();
      this.loadingKyc = false;
      this.successKycTip = true;
      setTimeout((() => this.successKycTip = false), 1000);
    }, (error) => {
      console.log(error);
      this.loadingKyc = false;
    });
  }




  idCardFormValidator() {
    this.idCardForm = new FormGroup({
      file: new FormControl('',    [
        FileValidator.validate
      ])
    });
  }

  KycFormValidator() {
    this.KycForm = new FormGroup({
      file: new FormControl('',    [
        FileValidator.validate
      ])
    });
  }


  passwordValidator() {
    this.passwordForm = new FormGroup({
      passwordOld: new FormControl(this.passwordOld, [
        Validators.required,
        Validators.minLength(6)
      ]),
      passwordNew: new FormControl(this.passwordNew, [
        Validators.required,
        Validators.minLength(6)
      ]),
      repasswordNew: new FormControl(this.repasswordNew, [
        Validators.required,
        matchOtherValidator('passwordNew')
      ])
    });
  }


  submitPassForm(event) {
    event.preventDefault();

    const controls = this.passwordForm.controls;

    if (this.passwordForm.invalid) {
      Object.keys(controls)
        .forEach(controlName => controls[controlName].markAsTouched());
      return;
    }
    this.loadingPass = true;

    let hotPasswords = {
      new_password: this.repasswordNew,
      current_password: this.passwordOld
    };
    console.log(hotPasswords);

    this.userService.updateUserPassword(hotPasswords).subscribe((data) => {
      // console.log(data);
      this.loadingPass = false;
      this.successPassTip = true;
      setTimeout((() => this.successPassTip = false), 1000);
      this.passwordForm.reset();
      this.passwordForm.controls['passwordOld'].setErrors(null);
      this.passwordForm.controls['passwordNew'].setErrors(null);
    }, (error) => {
      console.log(error);
      this.loadingPass = false;
      this.passwordForm.controls['passwordOld'].setErrors({'notequal': true});
    });
  }


  getLogs() {
    this.userService.getLogsProfile().subscribe((data) => {
      console.log(data.data);
      this.logsArray = data.data;
      this.loadingLogs = false;
    }, (error) => {
      console.log(error);
    });
  }

  logoutAll(event, logsItem) {
    event.preventDefault();
    event.target.remove();

    this.userService.logoutAllUser(logsItem.id).subscribe(result => {
      console.log(result);
    },(error) => {
      console.log(error);
    });

  }


  initJS() {
    $('.navbars li a').bind('click', function(e) {
      e.preventDefault();
      var anchor = $(this);
      $('html, body').stop().animate({
        scrollTop: $(anchor.attr('href')).offset().top
      }, 500);
      return false;
    });
  }

  // user/login-logs


}
