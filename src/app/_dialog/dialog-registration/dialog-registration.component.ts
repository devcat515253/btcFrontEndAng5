import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {UserRegistr} from '../../_entity/user-registr';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {matchOtherValidator} from '../../_validators/validator';
import {UserService} from '../../_services/user.service';

@Component({
  selector: 'app-dialog-registration',
  templateUrl: './dialog-registration.component.html',
  styleUrls: ['./dialog-registration.component.sass']
})
export class DialogRegistrationComponent implements OnInit {

  userRegistr: UserRegistr = new UserRegistr();

  policeAgree: boolean = false;
  userRegistrForm: FormGroup;


  constructor(public dialogRef: MatDialogRef<DialogRegistrationComponent>,
              private userService: UserService,
              @Inject(MAT_DIALOG_DATA) public data: any) {

    this.initValidator();
  }

  ngOnInit() {
  }


  checkEmailExist() {

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
        Validators.minLength(4),
        Validators.maxLength(64)
      ]),
      password: new FormControl(this.userRegistr.password, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(64)
      ]),
      confirmPassword: new FormControl(this.userRegistr.repassword, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(64),
        matchOtherValidator('password')
      ])
    });
  }


  submit(event) {
    event.preventDefault();

    const controls = this.userRegistrForm.controls;

    // this.checkEmail();

    if (!this.policeAgree) {
      return;
    }

    if (this.userRegistrForm.invalid) {
      Object.keys(controls)
        .forEach(controlName => controls[controlName].markAsTouched());
      return;
    }

    // this.userService.checkEmail(this.userRegistr).subscribe((result) => {
    //
    //
    // });


    this.userService.registration(this.userRegistr).subscribe(
      (data) => {
        // this.data = data.json();
        console.log(data.headers);
        console.log(data.url);
      },
      error => {
        console.log('Some error1');
      },
      () => {
        console.log('.. but not here');
        // alert("Data retrieve completed!");
      }
    );


  }

  onNoClick(event): void {
    event.preventDefault();
    this.dialogRef.close();
  }

  // onYesClick() {
  //   this.dialogRef.close({ data: 'data' });
  // }

}


