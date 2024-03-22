import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginVolarisComponent } from './login-volaris.component';

describe('LoginVolarisComponent', () => {
  let component: LoginVolarisComponent;
  let fixture: ComponentFixture<LoginVolarisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginVolarisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginVolarisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
