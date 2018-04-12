import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Exchange} from '../../_entity/exchange';
import {UserService} from '../../_services/user.service';

@Component({
  selector: 'app-step5',
  templateUrl: './step5.component.html',
  styleUrls: ['./step5.component.sass']
})
export class Step5Component implements OnInit {


  @Input() inputFrom: number;
  @Input() selectedFrom: Exchange;
  @Input() inputTo: number;
  @Input() selectedTo: Exchange;
  @Input() dataWallet: any;
  userDiscount: number = 0;

  @Output() goBack = new EventEmitter<any>();
  @Output() goStart = new EventEmitter<any>();
  @Output() goPay = new EventEmitter<any>();

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUserDiscount();
  }

  getUserDiscount() {
    this.userService.discount$.subscribe( discount => {
      this.userDiscount = discount;
      console.log(this.userDiscount);
    });
  }

  goToBack(event) {
    event.preventDefault();
    this.goBack.emit();
  }

  goToStart(event) {
    event.preventDefault();
    this.goStart.emit();
  }

  goToPay(event) {
    event.preventDefault();
    // this.goPay.emit();
  }
}
