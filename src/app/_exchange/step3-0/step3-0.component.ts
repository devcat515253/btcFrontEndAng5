import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {EmailModel} from '../../_entity/email-model';
import {UserService} from '../../_services/user.service';

@Component({
  selector: 'app-step3-0',
  templateUrl: './step3-0.component.html',
  styleUrls: ['./step3-0.component.sass']
})
export class Step30Component implements OnInit {

  userForgot: EmailModel = new EmailModel();
  userForgotForm: FormGroup;
  userNotFound: boolean = false;

  forgotSendSuccess: boolean = false;
  forgotSendError: boolean = false;

  loading: boolean = false;

  @Output() goBack = new EventEmitter<any>();

  constructor(private userService: UserService) {
    this.validatorForgot();
  }

  ngOnInit() {
  }


  validatorForgot() {
    this.userForgotForm = new FormGroup({
      email: new FormControl(this.userForgot.email, [
        Validators.required,
        Validators.email,
        Validators.maxLength(64)
      ])
    });
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

  goToBack(event) {
    event.preventDefault();

    this.goBack.emit();

  }

}
