export interface UserExchange {
  date: Date;
  inPayment: string;
  in_amount: number;
  in_currency: string;
  outPayment: {
    data: {
      paymentSystem: {
        data: {
          name: string;
        }
      }
    }
  };
}
