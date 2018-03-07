import {EventEmitter, Injectable} from '@angular/core';

@Injectable()
export class EffectBlurService {

  isBlur = new EventEmitter(); // подписка на ответ


  constructor() {
    this.isBlur.emit(false);
  }


  toggleBlur(statusBlur: boolean) {
    this.isBlur.emit(statusBlur);
  }





}
