import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Step31Component } from './step3-1.component';

describe('Step31Component', () => {
  let component: Step31Component;
  let fixture: ComponentFixture<Step31Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Step31Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Step31Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
