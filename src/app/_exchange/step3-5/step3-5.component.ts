import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-step3-5',
  templateUrl: './step3-5.component.html',
  styleUrls: ['./step3-5.component.sass']
})
export class Step35Component implements OnInit {

  @Output() goBack = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  goToBack(event) {
    event.preventDefault();
    this.goBack.emit();
  }

}
