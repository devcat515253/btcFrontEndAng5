import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Step30Component } from './step3-0.component';

describe('Step30Component', () => {
  let component: Step30Component;
  let fixture: ComponentFixture<Step30Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Step30Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Step30Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
