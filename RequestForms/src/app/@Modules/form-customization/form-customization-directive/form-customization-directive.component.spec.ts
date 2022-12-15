import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCustomizationDirectiveComponent } from './form-customization-directive.component';

describe('FormCustomizationDirectiveComponent', () => {
  let component: FormCustomizationDirectiveComponent;
  let fixture: ComponentFixture<FormCustomizationDirectiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormCustomizationDirectiveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormCustomizationDirectiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
