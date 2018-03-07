import { TestBed, inject } from '@angular/core/testing';

import { EffectBlurService } from './effect-blur.service';

describe('EffectBlurService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EffectBlurService]
    });
  });

  it('should be created', inject([EffectBlurService], (service: EffectBlurService) => {
    expect(service).toBeTruthy();
  }));
});
