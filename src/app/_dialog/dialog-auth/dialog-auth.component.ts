import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {UserAuth} from '../../_entity/user-auth';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpResponse} from '@angular/common/http';
import {UserService} from '../../_services/user.service';

@Component({
  selector: 'app-dialog-auth',
  templateUrl: './dialog-auth.component.html',
  styleUrls: ['./dialog-auth.component.sass']
})
export class DialogAuthComponent implements OnInit {

  userAuth: UserAuth = new UserAuth();
  userAuthForm: FormGroup;
  userNotFound: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<DialogAuthComponent>,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.initValidator();
  }

  ngOnInit() {
  }

  onNoClick(event): void {
    event.preventDefault();
    this.dialogRef.close();
  }

  // onYesClick() {
  //   this.dialogRef.close({ data: 'data' });
  // }

  initValidator() {
    this.userAuthForm = new FormGroup({
      email: new FormControl( this.userAuth.email, [
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

    // this.checkEmail();


    if (this.userAuthForm.invalid) {
      Object.keys(controls)
        .forEach(controlName => controls[controlName].markAsTouched());
      return;
    }

    this.userService.auth(this.userAuth).subscribe(
      (data) => {
        console.log(data);
        this.userNotFound = false;
      },
      error => {
        console.log(error);
        this.userNotFound = true;
      }
    );



    console.log(this.userAuth);
  }

}
