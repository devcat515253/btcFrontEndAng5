import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Step35Component } from './step3-5.component';

describe('Step35Component', () => {
  let component: Step35Component;
  let fixture: ComponentFixture<Step35Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Step35Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Step35Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
