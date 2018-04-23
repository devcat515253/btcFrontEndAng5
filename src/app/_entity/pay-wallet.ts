import {PayWalletParams} from './pay-wallet-params';

export class PayWallet {

  auto: boolean;
  hash: string;
  method: string;
  params = [];
  url: string;

  constructor() {
    this.auto = false;
    this.hash = '';
    this.method = '';
    this.url = '';
  }
}
