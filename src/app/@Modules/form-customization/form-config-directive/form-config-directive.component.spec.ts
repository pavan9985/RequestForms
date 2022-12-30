import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormConfigDirectiveComponent } from './form-config-directive.component';

describe('FormConfigDirectiveComponent', () => {
  let component: FormConfigDirectiveComponent;
  let fixture: ComponentFixture<FormConfigDirectiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormConfigDirectiveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormConfigDirectiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
