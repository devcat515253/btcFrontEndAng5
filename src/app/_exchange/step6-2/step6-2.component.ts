import {Component, Input, OnInit} from '@angular/core';
import {ExchangeStep4} from '../../_entity/steps-models';
import {Exchange} from '../../_entity/exchange';
import {ExchangeService} from '../../_services/exchange.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-step6-2',
  templateUrl: './step6-2.component.html',
  styleUrls: ['./step6-2.component.sass']
})
export class Step62Component implements OnInit {


  loading: boolean = false;

  @Input() inputFrom: number;
  @Input() selectedFrom: Exchange;
  @Input() dataCoinInput: any;

  constructor(private exchangeService: ExchangeService,
              private router: Router) { }

  ngOnInit() {
    console.log(this.dataCoinInput);
  }

  goFinish(event) {
    event.preventDefault();
    this.loading = true;

    this.exchangeService.sendPayBTC(this.dataCoinInput.id).subscribe( (result) => {
      console.log(result);
      this.loading = false;
      this.router.navigate(['/more/payment']);
    }, (error) => {
      console.log(error);
      this.loading = false;
    });

  }


}
