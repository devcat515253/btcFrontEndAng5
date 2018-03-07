import { Component } from '@angular/core';
import {MatDialog} from '@angular/material';
import {EffectBlurService} from './_services/effect-blur.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'app';

  isBlur: boolean = false;

  constructor(public isBlurService: EffectBlurService) {
    this.isBlurService.isBlur.subscribe( (result) => {
      this.isBlur = result;
    });
  }



}



