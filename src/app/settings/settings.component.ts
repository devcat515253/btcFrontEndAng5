import { Component, OnInit } from '@angular/core';
import {UserService} from '../_services/user.service';
import {EmailModel} from '../_entity/email-model';
import {UserModel} from '../_entity/user-model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DomSanitizer} from '@angular/platform-browser';
import {matchOtherValidator} from '../_validators/validator';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.sass']
})
export class SettingsComponent implements OnInit {

  loadingMain: boolean = true;
  successMain: boolean = false;

  loadingIdCard: boolean = true;
  successIdCard: boolean = false;

  loadingPass: boolean = false;
  successPassTip: boolean = false;


  IdCardFileName: string = 'No file chosen';


  step3Show: boolean = true;
  step4Show: boolean = false;

  private base64Image: string;



  passwordOld: string;
  passwordNew: string;
  repasswordNew: string;


  userModel: UserModel = new UserModel();
  mainInfoForm: FormGroup;
  passwordForm: FormGroup;

  constructor( private userService: UserService) {
    // this.mainFormValidator();
    this.passwordValidator();
  }

  ngOnInit() {
    console.log(JSON.parse(localStorage.getItem('currentUser')));

    this.getUserProfile();
  }


  getUserProfile() {
    this.userService.getUserProfile().subscribe((data) => {
      this.userModel = data.data;
      console.log(this.userModel);

      this.loadingMain = false;
    }, (error) => {
      console.log(error);
    });
  }

  // mainFormValidator() {
  //   this.mainInfoForm = new FormGroup({
  //     name: new FormControl(this.userModel.name, [
  //       Validators.required
  //     ]),
  //     address: new FormControl(this.userModel.address, [
  //       Validators.required
  //     ]),
  //     country: new FormControl(this.userModel.country, [
  //       Validators.required
  //     ])
  //   });
  // }


  submitMainForm() {
    this.loadingMain = true;
    this.userService.updateUserProfile(this.userModel).subscribe((data) => {
      console.log(data);
      this.loadingMain = false;
      this.successMain = true;
      setTimeout((() => this.successMain = false), 1000);
    }, (error) => {
      console.log(error);
      this.loadingMain = false;
    });
  }

  fileChange($event) {
    this.loadingIdCard = true;
    let fileList: FileList = $event.target.files;
    if (fileList.length > 0) {
      this.IdCardFileName = fileList[0].name;
    } else {
      this.IdCardFileName = 'No file chosen';
      this.base64Image = '';
      this.loadingIdCard = false;
      return;
    }
    this.readThis($event.target);
  }



  readThis(inputValue: any): void {
    var file: File = inputValue.files[0];
    var myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.base64Image = myReader.result;
      // console.log(this.base64Image);
      this.loadingIdCard = false;
    };
    myReader.readAsDataURL(file);
  }

  submitIdCardForm() {
    this.loadingIdCard = true;
    this.userService.updateUserIdCardProfile(this.base64Image).subscribe((data) => {
      console.log(data);
      this.loadingIdCard = false;
      this.successIdCard = true;
      setTimeout((() => this.successIdCard = false), 1000);
    }, (error) => {
      console.log(error);
      this.loadingIdCard = false;
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
      console.log(data);
      this.loadingPass = false;
      this.successPassTip = true;
      setTimeout((() => this.successIdCard = false), 1000);
    }, (error) => {
      console.log(error);
      this.loadingPass = false;
    });




  }







}
