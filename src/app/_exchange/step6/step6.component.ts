import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ExchangeStep4and1} from '../../_entity/steps-models';

@Component({
  selector: 'app-step6',
  templateUrl: './step6.component.html',
  styleUrls: ['./step6.component.sass']
})
export class Step6Component implements OnInit {

  @Input() dataBank: ExchangeStep4and1;
  @Output() goBack = new EventEmitter<any>();


  constructor() { }

  ngOnInit() {
  }

  goToBack(event) {
    event.preventDefault();
    this.goBack.emit();
  }
}
