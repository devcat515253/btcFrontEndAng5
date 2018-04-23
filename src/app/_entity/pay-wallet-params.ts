export class PayWalletParams {
  NOPAYMENT_URL: string;
  NOPAYMENT_URL_METHOD: string;
  PAYEE_ACCOUNT: string;
  PAYEE_NAME: string;
  PAYMENT_AMOUNT: number;
  PAYMENT_ID: number;
  PAYMENT_UNITS: string;
  PAYMENT_URL: string;
  PAYMENT_URL_METHOD: string;
  STATUS_URL: string;
  SUGGESTED_MEMO: string;

  constructor() {
    this.NOPAYMENT_URL = '';
    this.NOPAYMENT_URL_METHOD = '';
    this.PAYEE_ACCOUNT = '';
    this.PAYEE_NAME = '';
    this.PAYMENT_AMOUNT = 0;
    this.PAYMENT_ID = 0;
    this.PAYMENT_UNITS = '';
    this.PAYMENT_URL = '';
    this.PAYMENT_URL_METHOD = '';
    this.STATUS_URL = '';
    this.SUGGESTED_MEMO = '';
  }
}
