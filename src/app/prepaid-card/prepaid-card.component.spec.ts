import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrepaidCardComponent } from './prepaid-card.component';

describe('PrepaidCardComponent', () => {
  let component: PrepaidCardComponent;
  let fixture: ComponentFixture<PrepaidCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrepaidCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrepaidCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
