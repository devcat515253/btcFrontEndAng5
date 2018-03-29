import { Component, OnInit } from '@angular/core';
import {TablesService} from '../_services/tables.service';
import {Commission} from '../_entity/commission';
import {UserExchange} from '../_entity/user-exchange';
import {NameIcon} from '../_entity/name-icon';

@Component({
  selector: 'app-fees-discount',
  templateUrl: './fees-discount.component.html',
  styleUrls: ['./fees-discount.component.sass']
})
export class FeesDiscountComponent implements OnInit {


  commissionArray: Commission[] = [];
  thDiscountsArray: NameIcon[];


  constructor(private tablesService: TablesService) { }

  ngOnInit() {
    this.getCommissions();

    this.getThForDiscounts();
  }
  getThForDiscounts(): void {
    this.tablesService.getThForDiscounts().then(array => this.thDiscountsArray = array);
  }


  getCommissions() {
    this.tablesService.getCommissions().subscribe( (result) => {
      console.log(result);

      this.commissionArray = result.data as Commission[];

      // this.exchangesArray[0].inPayment = result.data[0].inPayment.data.paymentSystem.data.name;
      // console.log(result.data[0].inPayment.data.paymentSystem.data.name);


    }, (error) => {
      console.log(error);
    });
  }


}
