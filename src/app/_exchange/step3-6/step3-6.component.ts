import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ExchangeService} from '../../_services/exchange.service';
import {Exchange} from '../../_entity/exchange';

@Component({
  selector: 'app-step3-6',
  templateUrl: './step3-6.component.html',
  styleUrls: ['./step3-6.component.sass']
})
export class Step36Component implements OnInit {

  @Input() inputFrom: number;
  @Input() selectedFrom: Exchange;
  @Output() goBack = new EventEmitter<any>();
  @Output() goToStart = new EventEmitter<any>();

  constructor(private exchangeService: ExchangeService) { }

  ngOnInit() {
  }

  goToBack(event) {
    event.preventDefault();
    this.goBack.emit();
  }

  goToNext(event) {
    event.preventDefault();

    this.exchangeService.getLimit(this.selectedFrom, this.inputFrom).subscribe( (result) => {
      // console.log(result);
      this.goToStart.emit(result);
    }, (error) => {
      console.log(error);
    });
  }

}
