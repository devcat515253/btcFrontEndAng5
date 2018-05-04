export class Transaction {
  comment: string;
  clear_comment: string;
  date: Date;
  id: number;
  in_amount: number;
  in_currency: string;
  in_currency_amount: string;
  in_fee: number;
  in_id_pay: number;
  in_payee: string;
  in_payment: string;
  inPayment: {
    data: {
      paymentSystem: {
        data: {
          logo_link: string;
          name: string;
        }
      }
    }
  };

  outPayment: {
    data: {
      paymentSystem: {
        data: {
          logo_link: string;
          name: string;
        }
      }
    }
  };

  in_prefix: string;
  out_amount: number;
  out_currency: string;
  out_currency_amount: string;
  out_date: any;
  out_fee: number;
  out_id_pay: number;
  out_payee: number;
  out_payment: string;
  out_prefix: string;
  status: number;


  constructor() {
    this.clear_comment = '';
    this.comment = '';
    this.date = new Date();
    this.id = 0;
    this.in_amount = 0;
    this.in_currency = '';
    this.in_currency_amount = '';
    this.in_fee = 0;
    this.in_id_pay = 0;
    this.in_payee = '';
    this.in_payment = '';
    this.in_prefix = '';

    this.out_amount = 0;
    this.out_currency = '';
    this.out_currency_amount = '';
    this.out_date = '';
    this.out_fee = 0;
    this.out_id_pay = 0;
    this.out_payee = 0;
    this.out_payment = '';
    this.in_payee = '';
    this.in_payment = '';
    this.out_prefix = '';
    this.status = 0;
  }
}
