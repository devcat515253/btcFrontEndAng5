import { Component, OnInit } from '@angular/core';
import {UserService} from '../_services/user.service';

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.sass']
})
export class DiscountComponent implements OnInit {

  loggedUser: boolean = false;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getAuth();
    console.log(this.loggedUser);
  }

  getAuth() {
    this.userService.token$.subscribe(logged => {
      this.loggedUser = logged;
    });
  }

}
