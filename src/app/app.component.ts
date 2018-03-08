import {Component, OnInit} from '@angular/core';
import {EffectBlurService} from './_services/effect-blur.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'app';

  isBlur: boolean = false;

  constructor(public isBlurService: EffectBlurService) { }

  ngOnInit() {
    this.getBlur();
  }


  getBlur() {
    this.isBlurService.isBlur.subscribe( (result) => {
      this.isBlur = result;
    });
  }

  onActivate(event) {
    window.scroll(0, 0);
  }

}



