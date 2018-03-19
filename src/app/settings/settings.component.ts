import { Component, OnInit } from '@angular/core';
import {UserService} from '../_services/user.service';
import {EmailModel} from '../_entity/email-model';
import {UserModel} from '../_entity/user-model';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.sass']
})
export class SettingsComponent implements OnInit {

  loading: boolean = true;
  userModel: UserModel = new UserModel();
  mainInfoForm: FormGroup;

  constructor( private userService: UserService) {
    // this.mainFormValidator();
  }

  ngOnInit() {
    console.log(JSON.parse(localStorage.getItem('currentUser')));

    this.getUserProfile();
  }


  getUserProfile() {
    this.userService.getUserProfile().subscribe((data) => {
      this.userModel = data.data;
      console.log(this.userModel);

      this.loading = false;
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
    this.userService.updateUserProfile(this.userModel).subscribe((data) => {
      console.log(data);
    }, (error) => {
      console.log(error);
    });
  }







}
