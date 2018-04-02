import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Step62Component } from './step6-2.component';

describe('Step62Component', () => {
  let component: Step62Component;
  let fixture: ComponentFixture<Step62Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Step62Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Step62Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
