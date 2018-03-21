import { Injectable } from '@angular/core';

@Injectable()
export class ReferralService {

  constructor() {
  }

  setReferralId(refID: number) {
    localStorage.removeItem('referral-id');
    localStorage.setItem('referral-id', JSON.stringify(refID));
  }

}
