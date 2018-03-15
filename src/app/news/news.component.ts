import { Component, OnInit } from '@angular/core';
import {NewsService} from '../_services/news.service';
import {News} from '../_entity/news';
import {HttpClient} from '@angular/common/http';
import {PaginationService} from '../_services/pagination.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.sass']
})
export class NewsComponent implements OnInit {

  language: string = 'en';
  newsArray: News[] = [];
  newsArrayCount: any[] = [];

  // array of all items to be paged
  private allItems: any[];

  // pager object
  pager: any = {};

  // paged items
  pagedItems: any[];

  constructor(private newsService: NewsService,
              private http: HttpClient, private paginationService: PaginationService) { }

  ngOnInit() {
    this.getNewsList();
  }

  getNewsList() {
    this.newsService.getNewsList(this.language).subscribe(
      (data) => {

        this.newsArray = data.data;
        this.newsArrayCount = data.meta.count + 1;
        this.setPage(1);
      },
      error => {
        console.log(error);
      }
    );
  }


  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    // get pager object from service
    this.pager = this.paginationService.getPager(this.newsArray.length, page, 5);

    // get current page of items
    this.pagedItems = this.newsArray.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }


}
