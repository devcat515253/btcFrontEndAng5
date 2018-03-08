import {AfterViewInit, Component, OnInit} from '@angular/core';

declare var $: any;
declare var google: any;

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.sass']
})
export class ContactsComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    $( document ).ready(() => {
            this.initMap();
      //$('html, body').animate({scrollTop: 0}, 500);
      //window.scroll(0, 0);

    });
  }

  initMap() {
		const map = new google.maps.Map(document.getElementById('map'), {
			center: {lat: 55.760186, lng: 37.618711},
			zoom: 13,
			styles: [ { "featureType": "administrative", "elementType": "all", "stylers": [ { "visibility": "simplified" } ] }, { "featureType": "administrative.province", "elementType": "all", "stylers": [ { "visibility": "off" } ] }, { "featureType": "administrative.locality", "elementType": "all", "stylers": [ { "visibility": "simplified" } ] }, { "featureType": "administrative.neighborhood", "elementType": "all", "stylers": [ { "visibility": "off" } ] }, { "featureType": "landscape", "elementType": "all", "stylers": [ { "visibility": "on" } ] }, { "featureType": "landscape.man_made", "elementType": "all", "stylers": [ { "visibility": "on" } ] }, { "featureType": "landscape.man_made", "elementType": "geometry.fill", "stylers": [ { "lightness": "-2" }, { "hue": "#ffcc00" }, { "saturation": "0" } ] }, { "featureType": "landscape.natural", "elementType": "geometry.fill", "stylers": [ { "saturation": "9" }, { "lightness": "-5" } ] }, { "featureType": "poi", "elementType": "all", "stylers": [ { "visibility": "simplified" } ] }, { "featureType": "poi", "elementType": "labels.text", "stylers": [ { "hue": "#0024ff" } ] }, { "featureType": "poi", "elementType": "labels.text.stroke", "stylers": [ { "visibility": "on" }, { "lightness": "-100" } ] }, { "featureType": "poi", "elementType": "labels.icon", "stylers": [ { "visibility": "on" } ] }, { "featureType": "poi.attraction", "elementType": "all", "stylers": [ { "visibility": "off" } ] }, { "featureType": "poi.business", "elementType": "labels", "stylers": [ { "visibility": "simplified" } ] }, { "featureType": "poi.business", "elementType": "labels.text.fill", "stylers": [ { "color": "#111e6c" } ] }, { "featureType": "poi.business", "elementType": "labels.text.stroke", "stylers": [ { "visibility": "on" }, { "lightness": "-100" } ] }, { "featureType": "poi.business", "elementType": "labels.icon", "stylers": [ { "hue": "#0024ff" }, { "saturation": "-62" }, { "visibility": "simplified" } ] }, { "featureType": "poi.government", "elementType": "all", "stylers": [ { "visibility": "simplified" } ] }, { "featureType": "poi.medical", "elementType": "all", "stylers": [ { "visibility": "simplified" } ] }, { "featureType": "poi.park", "elementType": "geometry.fill", "stylers": [ { "saturation": "6" }, { "lightness": "-23" } ] }, { "featureType": "road", "elementType": "all", "stylers": [ { "visibility": "on" } ] }, { "featureType": "road", "elementType": "labels", "stylers": [ { "visibility": "off" } ] }, { "featureType": "transit", "elementType": "all", "stylers": [ { "visibility": "on" } ] }, { "featureType": "transit", "elementType": "labels", "stylers": [ { "visibility": "off" } ] }, { "featureType": "water", "elementType": "all", "stylers": [ { "visibility": "on" } ] }, { "featureType": "water", "elementType": "geometry", "stylers": [ { "color": "#12608d" } ] }, { "featureType": "water", "elementType": "geometry.fill", "stylers": [ { "lightness": "0" }, { "color": "#111e6c" } ] }, { "featureType": "water", "elementType": "labels.text.fill", "stylers": [ { "visibility": "off" } ] }, { "featureType": "water", "elementType": "labels.text.stroke", "stylers": [ { "visibility": "off" } ] } ]
		});

		let marker = new google.maps.Marker({
			position: {lat: 55.762186, lng: 37.625711},
			map: map,
			title: 'Наш маркер: Большой театр',
			icon: '../assets/img/map-marker.svg'
		});
	}

}
