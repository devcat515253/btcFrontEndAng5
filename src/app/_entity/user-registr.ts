export class UserRegistr {
  name: string;
  email: string;
  password: string;
  repassword: string;
  checkbox: boolean;

  constructor() {
    this.name = '';
    this.email = '';
    this.password = '';
    this.repassword = '';
    this.checkbox = false;
  }
}
