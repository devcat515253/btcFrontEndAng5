import { Component, OnInit } from '@angular/core';
import {UserService} from '../_services/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.sass']
})
export class SettingsComponent implements OnInit {

  constructor( private userService: UserService) { }

  ngOnInit() {
    console.log(JSON.parse(localStorage.getItem('currentUser')));

    this.getUserProfile();
  }


  getUserProfile() {

    this.userService.getUserProfile().subscribe((data) => {
      console.log(data);
    }, (error) => {
      console.log(error);
    });
  }







}
