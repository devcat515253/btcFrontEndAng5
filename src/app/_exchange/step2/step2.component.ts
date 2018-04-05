import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.sass']
})
export class Step2Component implements OnInit {

  @Output() goBack = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  goToBack(event) {
    event.preventDefault();
    this.goBack.emit();
  }

}
