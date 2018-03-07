import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingMagazineComponent } from './landing-magazine.component';

describe('LandingMagazineComponent', () => {
  let component: LandingMagazineComponent;
  let fixture: ComponentFixture<LandingMagazineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingMagazineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingMagazineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
