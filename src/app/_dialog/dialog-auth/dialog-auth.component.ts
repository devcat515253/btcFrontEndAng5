import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {UserAuth} from '../../_entity/user-auth';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../_services/user.service';
import {HttpResponse} from '@angular/common/http';
import {EmailModel} from '../../_entity/email-model';
import {of} from 'rxjs/observable/of';

@Component({
  selector: 'app-dialog-auth',
  templateUrl: './dialog-auth.component.html',
  styleUrls: ['./dialog-auth.component.sass']
})
export class DialogAuthComponent implements OnInit {

  userAuth: UserAuth = new UserAuth();
  userForgot: EmailModel = new EmailModel();
  userAuthForm: FormGroup;
  userForgotForm: FormGroup;

  userNotFound: boolean = false;
  userAuthPopup: boolean = true;
  userForgotPopup: boolean = false;
  loading: boolean = false;
  forgotSendSuccess: boolean = false;
  forgotSendError: boolean = false;

  constructor(public dialogRef: MatDialogRef<DialogAuthComponent>,
              private userService: UserService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.initValidator();
    this.validatorForgot();
  }

  ngOnInit() {
  }

  onNoClick(event): void {
    event.preventDefault();
    this.dialogRef.close();
  }

  openForgotPopup(event) {
    event.preventDefault();
    this.userAuthPopup = false;
    this.userForgotPopup = true;
  }

  closeForgotPopup(event) {
    event.preventDefault();
    this.userAuthPopup = true;
    this.userForgotPopup = false;
  }


  // onYesClick() {
  //   this.dialogRef.close({ data: 'data' });
  // }

  validatorForgot() {
    this.userForgotForm = new FormGroup({
      email: new FormControl(this.userForgot.email, [
        Validators.required,
        Validators.email,
        Validators.maxLength(64)
      ])
    });
  }

  initValidator() {
    this.userAuthForm = new FormGroup({
      email: new FormControl(this.userAuth.email, [
        Validators.required,
        Validators.email,
        Validators.maxLength(64)
      ]),
      password: new FormControl(this.userAuth.password, [
        Validators.required,
        Validators.maxLength(64)
      ]),
    });
  }

  submit(event) {
    event.preventDefault();

    const controls = this.userAuthForm.controls;

    if (this.userAuthForm.invalid) {
      Object.keys(controls)
        .forEach(controlName => controls[controlName].markAsTouched());
      return;
    }

    this.loading = true;
    this.userService.auth(this.userAuth).subscribe(
      (data) => {
        console.log(data);
        this.userNotFound = false;
        this.loading = false;
      },
      error => {
        console.log(error);
        this.userNotFound = true;
        this.loading = false;
      }
    );
    console.log(this.userAuth);
  }

  sendForgotEmail() {
    return this.userService.forgotPass(this.userForgot).subscribe(
      (data) => {
        console.log(data);
        console.log(data.status);
        this.forgotSendError = false;
        this.forgotSendSuccess = true;
        this.userForgotForm.reset();
        this.userForgotForm.controls['email'].setErrors(null);
        this.loading = false;
      },
      error => {
        console.log(error);
        console.log(error.status);
        this.forgotSendError = true;
        this.forgotSendSuccess = false;
        this.loading = false;
      }
    );
  }

  forgot(event) {
    event.preventDefault();

    const controls = this.userForgotForm.controls;

    if (this.userForgotForm.invalid) {
      Object.keys(controls)
        .forEach(controlName => controls[controlName].markAsTouched());
      return;
    }

    this.loading = true;
    this.userService.checkEmail(this.userForgot).subscribe(
      (data) => {
        console.log(data);
        console.log(data.status);
        this.userForgotForm.controls['email'].setErrors({'notfounduser': true});
        this.loading = false;
        this.forgotSendSuccess = false;
        this.forgotSendError = false;
      },
      error => {
        if (error.error.errors.email[0] === 'This email somebody use already') {
          this.sendForgotEmail();
        }
        console.log(error);
        console.log(error.status);
      }
    );
  }

}
