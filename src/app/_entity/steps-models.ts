export class ExchangeStep4 {
  controlsId: string;
  controlsEmail: string;
  checkboxForm: boolean;
  constructor() {
    this.controlsId = '';
    this.controlsEmail = '';
    this.checkboxForm = false;
  }
}

export class ExchangeStep4and1 {
  name: string;
  address: string;
  country: string;
  iban: string;
  bic_swift: string;
  bank_name: string;
  bank_address: string;
  bank_country: string;
  email: string;
  checkbox: boolean;
  constructor() {
    this.name = '';
    this.address = '';
    this.country = '';
    this.iban = '';
    this.bic_swift = '';
    this.bank_name = '';
    this.bank_address = '';
    this.bank_country = '';
    this.email = '';
    this.checkbox = false;
  }
}

export class ExchangeStep4and2 {
  controlsName: string;
  controlsBank: string;
  controlsEmail: string;
  controlsBankCode: number;
  checkboxForm: boolean;
  constructor() {
    this.controlsName = '';
    this.controlsBank = '';
    this.controlsEmail = '';
    this.controlsBankCode = null;
    this.checkboxForm = false;
  }
}
