import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Step34Component } from './step3-4.component';

describe('Step34Component', () => {
  let component: Step34Component;
  let fixture: ComponentFixture<Step34Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Step34Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Step34Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
