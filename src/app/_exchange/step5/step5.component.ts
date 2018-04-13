import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Exchange} from '../../_entity/exchange';
import {UserService} from '../../_services/user.service';
import {ExchangeStep4, ExchangeStep4and1, ExchangeStep4and2} from '../../_entity/steps-models';

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

  @Input() Wallet: ExchangeStep4;
  @Input() BankEur: ExchangeStep4and1;
  @Input() BankCzk: ExchangeStep4and2;


  userDiscount: number = 0;

  @Output() goBack = new EventEmitter<any>();
  @Output() goForm4_1 = new EventEmitter<any>();
  @Output() goForm4_2 = new EventEmitter<any>();
  @Output() goStart = new EventEmitter<any>();
  @Output() goPay = new EventEmitter<any>();

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUserDiscount();

    console.log('==============================================')
    console.log(this.Wallet);
    console.log(this.BankEur);
    console.log(this.BankCzk);
  }



  getUserDiscount() {
    this.userService.discount$.subscribe( discount => {
      this.userDiscount = discount;
      console.log(this.userDiscount);
    });
  }

  goToBack(event) {
    event.preventDefault();
    if  (this.Wallet.controlsId !== '') {this.goBack.emit(); }
    if  (this.BankEur.address !== '') {this.goForm4_1.emit(); }
    if  (this.BankCzk.controlsBank !== '') {this.goForm4_2.emit(); }
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
