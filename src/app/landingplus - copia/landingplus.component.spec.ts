import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingplusComponent } from './landingplus.component';

describe('LandingplusComponent', () => {
  let component: LandingplusComponent;
  let fixture: ComponentFixture<LandingplusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LandingplusComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LandingplusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
