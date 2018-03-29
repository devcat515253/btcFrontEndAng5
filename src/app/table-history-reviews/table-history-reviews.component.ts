import { Component, OnInit } from '@angular/core';
import {TablesService} from '../_services/tables.service';
import {UserExchange} from '../_entity/user-exchange';
import {UserLogs} from '../_entity/user-logs';

@Component({
  selector: 'app-table-history-reviews',
  templateUrl: './table-history-reviews.component.html',
  styleUrls: ['./table-history-reviews.component.sass']
})
export class TableHistoryReviewsComponent implements OnInit {

  exchangesArray: UserExchange[] = [];


  constructor(private tablesService: TablesService) { }

  ngOnInit() {
    this.getExchanges();
  }

  getExchanges() {
    this.tablesService.getExchanges().subscribe( (result) => {
      console.log(result);

      this.exchangesArray = result.data;

      // this.exchangesArray[0].inPayment = result.data[0].inPayment.data.paymentSystem.data.name;
      console.log(result.data[0].inPayment.data.paymentSystem.data.name);


    }, (error) => {
      console.log(error);
    });
  }




}
