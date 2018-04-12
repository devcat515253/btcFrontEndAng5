export class UserModel {
  activation: boolean;
  avatar: string;
  avatar_link: string;
  address: string;
  comment: string;
  country: string;
  date: Date;
  discount: string;
  document_number: string;
  email: string;
  family: string;
  id: string;
  ip: string;
  lang: string;
  name: string;
  online: string;
  refer: string;
  phone: string;
  total_exchange: string;
  verification_image: string;
  verification_kyc: string;
  verification_ok: boolean;
  verification_kyc_ok: boolean;
  verification_phone_ok: boolean;

  constructor() {
    this.activation = false;
    this.avatar = '';
    this.avatar_link = '';
    this.comment = '';
    this.address = '';
    this.country = '';
    this.date = new Date();
    this.document_number = '';
    this.email = '';
    this.family = '';
    this.id = '';
    this.ip = '';
    this.lang = '';
    this.name = '';
    this.online = '';
    this.refer = '';
    this.phone = '';
    this.total_exchange = '';
    this.verification_image = '';
    this.verification_kyc = '';
    this.verification_ok = false;
    this.verification_kyc_ok = false;
    this.verification_phone_ok = false;
  }
}

