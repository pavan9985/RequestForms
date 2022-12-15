import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFieldDirectiveComponent } from './form-field-directive.component';

describe('FormFieldDirectiveComponent', () => {
  let component: FormFieldDirectiveComponent;
  let fixture: ComponentFixture<FormFieldDirectiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormFieldDirectiveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormFieldDirectiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
