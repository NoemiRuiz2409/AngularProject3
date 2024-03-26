import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideNavStateComponent } from './side-nav-state.component';

describe('SideNavStateComponent', () => {
  let component: SideNavStateComponent;
  let fixture: ComponentFixture<SideNavStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SideNavStateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SideNavStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
