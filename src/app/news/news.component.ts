import { Component, OnInit } from '@angular/core';
import {NewsService} from '../_services/news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.sass']
})
export class NewsComponent implements OnInit {

  language: string = 'en';

  constructor(private newsService: NewsService) { }

  ngOnInit() {
    this.getNewsList();
  }

  getNewsList() {
    this.newsService.getNewsList(this.language).subscribe(
      (data) => {
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }
}
