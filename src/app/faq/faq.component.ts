import {AfterViewInit, Component, OnInit} from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.sass']
})
export class FaqComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.initDropdown();
  }




  initDropdown() {
// scroll to element
    $('.inner .navbars .item__nav a').on('click', function (e) {
      e.preventDefault();

      $('.inner .list-numeric.drop .item__head').removeClass('opened');
      $('.inner .list-numeric.drop .item__content').slideUp();

      let targetId = $(this).attr('href');


      $('html, body').animate({
        scrollTop: $(targetId).offset().top - $(window).height() / 2
      }, 1000);

      $(targetId).find('.item__content').slideDown();
      $(targetId).find('.item__head').addClass('opened');
    });

    (function () {
      $('.inner .list-numeric.drop .item__content').hide();
      $('.inner .list-numeric.drop .item__head.opened').closest('.item').find('.item__content').slideDown();
    })();


    $('.inner .list-numeric.drop .item__head').on('click', function (e) {
      $(this).toggleClass('opened').closest('.item').find('.item__content').slideToggle();
    });

  }



}






