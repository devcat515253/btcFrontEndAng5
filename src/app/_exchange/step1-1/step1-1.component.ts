import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-step1-1',
  templateUrl: './step1-1.component.html',
  styleUrls: ['./step1-1.component.sass']
})
export class Step11Component implements OnInit {

  @Output() goBack = new EventEmitter<any>();
  @Output() goNext = new EventEmitter<any>();
  @Output() goAuth = new EventEmitter<any>();
  @Output() goRegistration = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  goToBack(event) {
    event.preventDefault();
    this.goBack.emit();
  }

  goToNext(event) {
    event.preventDefault();
    this.goNext.emit();
  }

  goToAuth(event) {
    event.preventDefault();
    this.goAuth.emit();
  }

  goToRegistr(event) {
    event.preventDefault();
    this.goRegistration.emit();
  }

}
