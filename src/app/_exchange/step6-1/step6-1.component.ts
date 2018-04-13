import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ExchangeStep4and2} from '../../_entity/steps-models';
import {Exchange} from '../../_entity/exchange';

@Component({
  selector: 'app-step6-1',
  templateUrl: './step6-1.component.html',
  styleUrls: ['./step6-1.component.sass']
})
export class Step61Component implements OnInit {

  @Input() inputFrom: number;
  @Input() selectedFrom: Exchange;

  @Input() dataBank: ExchangeStep4and2;
  @Output() goBack = new EventEmitter<any>();
  @Output() goPay = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
    console.log(this.dataBank);
  }

  goToBack(event) {
    event.preventDefault();
    this.goBack.emit();
  }
  goToPay(event) {
    event.preventDefault();
    this.goPay.emit();
  }


}
