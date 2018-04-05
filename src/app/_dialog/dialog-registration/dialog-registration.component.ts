import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {UserRegistr} from '../../_entity/user-registr';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {matchOtherValidator} from '../../_validators/validator';
import {UserService} from '../../_services/user.service';
import {HttpResponse} from '@angular/common/http';
import {EmailModel} from '../../_entity/email-model';
import 'rxjs/add/operator/mergeMap';
import {of} from 'rxjs/observable/of';
import {EffectBlurService} from '../../_services/effect-blur.service';
import {DialogSuccessComponent} from '../dialog-success/dialog-success.component';
import {ReferralService} from '../../referral/referral.service';

@Component({
  selector: 'app-dialog-registration',
  templateUrl: './dialog-registration.component.html',
  styleUrls: ['./dialog-registration.component.sass']
})
export class DialogRegistrationComponent implements OnInit {

  userRegistr: UserRegistr = new UserRegistr();
  emailModel: EmailModel = new EmailModel();
  userRegistrForm: FormGroup;
  loading: boolean = false;




  constructor(public dialogRef: MatDialogRef<DialogRegistrationComponent>,
              private userService: UserService,
              private referralService: ReferralService,
              public dialog: MatDialog, private blurService: EffectBlurService,
              @Inject(MAT_DIALOG_DATA) public data: any) {

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

      name: new FormControl(this.userRegistr.name, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(64),
      ]),
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
        this.dialogRef.close();
        this.openDialogSuccess();
        this.loading = false;
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

  onNoClick(event): void {
    event.preventDefault();
    this.dialogRef.close();
  }


  openDialogSuccess() {
    this.blurService.toggleBlur(true);

    const dialogRef = this.dialog.open(DialogSuccessComponent, {
      width: '60rem',
      data: { title: 'Successful registration!', subtitle: 'A pleasant and profitable exchange for You!' }
    });


    dialogRef.beforeClose().subscribe(result => {
      this.blurService.toggleBlur(false);
    });
  }

  // onYesClick() {
  //   this.dialogRef.close({ data: 'data' });
  // }

}


