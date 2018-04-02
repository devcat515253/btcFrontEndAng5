import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Step41Component } from './step4-1.component';

describe('Step41Component', () => {
  let component: Step41Component;
  let fixture: ComponentFixture<Step41Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Step41Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Step41Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
