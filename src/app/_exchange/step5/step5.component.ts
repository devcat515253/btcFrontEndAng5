import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Exchange} from '../../_entity/exchange';
import {UserService} from '../../_services/user.service';
import {ExchangeStep4, ExchangeStep4and1, ExchangeStep4and2} from '../../_entity/steps-models';
import {ExchangeService} from '../../_services/exchange.service';
import {PayWallet} from '../../_entity/pay-wallet';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-step5',
  templateUrl: './step5.component.html',
  styleUrls: ['./step5.component.sass']
})
export class Step5Component implements OnInit {

  @ViewChild('hiddenForm')
  private hiddenForm: HTMLFormElement;


  @Input() inputFrom: number;
  @Input() selectedFrom: Exchange;
  @Input() inputTo: number;
  @Input() selectedTo: Exchange;

  @Input() Wallet: ExchangeStep4;
  @Input() BankEur: ExchangeStep4and1;
  @Input() BankCzk: ExchangeStep4and2;


  loading: boolean = false;
  userDiscount: number = 0;
  PayWallet: PayWallet = new PayWallet();
  // hiddenForm: FormGroup = new FormGroup({});

  @Output() goBack = new EventEmitter<any>();
  @Output() goForm4_1 = new EventEmitter<any>();
  @Output() goForm4_2 = new EventEmitter<any>();
  @Output() goStart = new EventEmitter<any>();
  @Output() goPay = new EventEmitter<any>();

  constructor(private userService: UserService,
              private exchangeService: ExchangeService) { }

  ngOnInit() {
    this.getUserDiscount();

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
    this.loading = true;

    let data = {
      commission: this.selectedTo.commission_id,
      in_amount: this.inputFrom,
      email: this.Wallet.controlsEmail || this.BankEur.email || this.BankCzk.controlsEmail,
      out: this.Wallet.controlsId || this.BankEur || this.BankCzk,
    };

    console.log(data);

    this.exchangeService.sendDataPay(data).subscribe( (result) => {
       console.log(result);
      this.PayWallet = result.data;
      console.log(this.PayWallet);
      console.log(this.hiddenForm);
      setTimeout(() => {
        this.hiddenForm.nativeElement.submit();
      }, 50);
      this.loading = false;
    }, (error) => {
      console.log(error);
    });
  }

}
