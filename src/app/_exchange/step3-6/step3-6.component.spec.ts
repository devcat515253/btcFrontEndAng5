import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Step36Component } from './step3-6.component';

describe('Step36Component', () => {
  let component: Step36Component;
  let fixture: ComponentFixture<Step36Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Step36Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Step36Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
