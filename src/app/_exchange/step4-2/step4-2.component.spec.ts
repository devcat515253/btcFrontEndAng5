import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Step42Component } from './step4-2.component';

describe('Step42Component', () => {
  let component: Step42Component;
  let fixture: ComponentFixture<Step42Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Step42Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Step42Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
