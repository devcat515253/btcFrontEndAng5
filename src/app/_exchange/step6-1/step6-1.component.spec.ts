import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Step61Component } from './step6-1.component';

describe('Step61Component', () => {
  let component: Step61Component;
  let fixture: ComponentFixture<Step61Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Step61Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Step61Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
