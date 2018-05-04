export class TransactionHistory {
  id: number;
  date: Date;
  in_prefix: string;
  in_amount: number;
  comment: string;
  out_prefix: string;
  out_amount: number;
  rating: number;
  status: number;
  inPayment: {
    data: {
      id: number;
      paymentSystem: {
        data: {
          id: number;
          name: string;
          logo_link: string;
        }
      }
    }
  };
  outPayment: {
    data: {
      id: number;
      paymentSystem: {
        data: {
          id: number;
          name: string;
          logo_link: string;
        }
      }
    }
  };

  constructor() {
    this.id = 0;
    this.date = new Date();
    this.in_prefix = '';
    this.in_amount = 0;
    this.comment = '';
    this.out_prefix = '';
    this.out_amount = 0;
    this.rating = 0;
    this.status = 0;
  }
}

