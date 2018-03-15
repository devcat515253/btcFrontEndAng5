import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class NewsService {

  baseUrl  = 'http://api.smartex.info';

  constructor(private http: HttpClient) { }

  getNewsList(lang: string) {
    return this.http.get<any>(`${this.baseUrl}/api/news/view?filters={"language":"${lang}"}&pagination={"limit":1000000,"offset":0}`);
  }
}
