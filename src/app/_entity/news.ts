
export class News {
  id: number;
  active: boolean;
  date: Date;
  title: string;
  text: string;
  meta_description: string;
  meta_key: string;


  constructor() {
    this.id = 0;
    this.active = false;
    this.date = new Date();
    this.title = '';
    this.text = '';
    this.meta_description = '';
    this.meta_key = '';
  }
}
