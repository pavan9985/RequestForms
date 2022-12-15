import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpInDirectiveComponent } from './sign-up-in-directive.component';

describe('SignUpInDirectiveComponent', () => {
  let component: SignUpInDirectiveComponent;
  let fixture: ComponentFixture<SignUpInDirectiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignUpInDirectiveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignUpInDirectiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
