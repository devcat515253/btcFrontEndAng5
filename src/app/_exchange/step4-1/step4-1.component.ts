import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-step4-1',
  templateUrl: './step4-1.component.html',
  styleUrls: ['./step4-1.component.sass']
})
export class Step41Component implements OnInit {

  @Output() goBack = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  goToBack(event) {
    event.preventDefault();
    this.goBack.emit();
  }

}
