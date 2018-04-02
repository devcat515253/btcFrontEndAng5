import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Step43Component } from './step4-3.component';

describe('Step43Component', () => {
  let component: Step43Component;
  let fixture: ComponentFixture<Step43Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Step43Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Step43Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
