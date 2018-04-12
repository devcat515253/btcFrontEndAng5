import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.sass']
})
export class Step2Component implements OnInit {

  @Output() goBack = new EventEmitter<any>();
  @Output() goAuth = new EventEmitter<any>();
  @Output() goRegistration = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  goToBack(event) {
    event.preventDefault();
    this.goBack.emit();
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
