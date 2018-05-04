import {AfterViewInit, Component, OnInit} from '@angular/core';
import {News} from '../_entity/news';
import {TransactionHistory} from '../_entity/transaction-history';
import {ExchangeService} from '../_services/exchange.service';
import {PaginationService} from '../_services/pagination.service';
import {UserService} from '../_services/user.service';

declare var $: any;


@Component({
  selector: 'app-table-history',
  templateUrl: './table-history.component.html',
  styleUrls: ['./table-history.component.sass']
})
export class TableHistoryComponent implements OnInit {

  transactionArray: TransactionHistory[] = [];
  transactionArrayCount: any[] = [];

  loadingTransaction: boolean = true;

  // array of all items to be paged
  private allItems: any[];

  // pager object
  pager: any = {};

  // paged items
  pagedItems: any[];

  constructor(private userService: UserService,
              private paginationService: PaginationService) { }

  ngOnInit() {
    this.getList();
  }


  getList() {
    this.userService.getTransactionInfoFirst('null').subscribe(
      (data) => {
        this.transactionArray = data.data;
        this.transactionArrayCount = data.meta.count + 1;

        this.initSetPage();
        this.loadingTransaction = false;
        setTimeout( () => {
          this.initJS();
        }, 500);
        console.log(data);
      },
      error => {
        console.log(error);
        this.loadingTransaction = false;
      }
    );
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    // get pager object from service
    this.pager = this.paginationService.getPager(this.transactionArray.length, page, 15);

    // get current page of items
    this.pagedItems = this.transactionArray.slice(this.pager.startIndex, this.pager.endIndex + 1);

    setTimeout( () => {
      this.initJS();
    }, 100);
  }

  initSetPage() {
    this.setPage(this.pager.currentPage);
  }


  initJS() {
    $('img.img-svg').each(function() {
      var $img = $(this);
      var imgID = $img.attr('id');
      var imgClass = $img.attr('class');
      var imgURL = $img.attr('src');

      $.get(imgURL, function(data) {
        // Get the SVG tag, ignore the rest
        var $svg = $(data).find('svg');

        // Add replaced image's ID to the new SVG
        if(typeof imgID !== 'undefined') {
          $svg = $svg.attr('id', imgID);
        }
        // Add replaced image's classes to the new SVG
        if(typeof imgClass !== 'undefined') {
          $svg = $svg.attr('class', imgClass+' replaced-svg');
        }

        // Remove any invalid XML tags as per http://validator.w3.org
        $svg = $svg.removeAttr('xmlns:a');

        // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
        if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
          $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
        }

        // Replace image with new SVG
        $img.replaceWith($svg);

      }, 'xml');

    });
  }

}
