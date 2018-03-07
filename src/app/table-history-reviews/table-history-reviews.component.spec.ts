import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableHistoryReviewsComponent } from './table-history-reviews.component';

describe('TableHistoryReviewsComponent', () => {
  let component: TableHistoryReviewsComponent;
  let fixture: ComponentFixture<TableHistoryReviewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableHistoryReviewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableHistoryReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
