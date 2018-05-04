import {AfterViewInit, Component, OnInit} from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-landing-magazine',
  templateUrl: './landing-magazine.component.html',
  styleUrls: ['./landing-magazine.component.sass']
})
export class LandingMagazineComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.initJs();
  }



  initJs() {
    $('.advantages .item-title').bind('click', function(e) {
      e.preventDefault();

      let anchor = $(this);
      $('html, body').stop().animate({
        scrollTop: $(anchor.attr('href')).offset().top
      }, 500);
      return false;
    });
  }

}


