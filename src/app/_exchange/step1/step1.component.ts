import {Component, Input, OnInit} from '@angular/core';
import {Exchange} from '../../_entity/exchange';
import {UserService} from '../../_services/user.service';

@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.sass']
})
export class Step1Component implements OnInit {

  @Input() exchangeTo: Exchange;
  @Input() exchangeFrom: Exchange;

  userDiscount: number = 0;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.getUserDiscount();

  }

  getUserDiscount() {
    this.userService.discount$.subscribe( discount => {
      this.userDiscount = discount;
      console.log(this.userDiscount);
    });
  }


}



