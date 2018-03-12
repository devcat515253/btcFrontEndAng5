import {AfterViewInit, Component, OnInit} from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.sass']
})
export class TransactionsComponent implements OnInit, AfterViewInit {

  constructor() { }


  ngOnInit() {
  }

  ngAfterViewInit() {
    this.initJS();
  }




  initJS() {

    $('.progress-bar > span').each(function () {

      let _thisChildrenSpan = $(this).children('span');
      let statusText = _thisChildrenSpan.attr('statusText');

      if ($(this).closest('.progress-bar').hasClass('green')) {
        $(this)
          .data('origWidth', $(this).width())
          .width(0)
          .animate({
            width: $(this).data('origWidth')
          }, 1200);

        setTimeout(function () {
          _thisChildrenSpan.text(statusText);
        }, 1200);
      } else {
        _thisChildrenSpan.text(statusText);
      }
    });
  }




}
