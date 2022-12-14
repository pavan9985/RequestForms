import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormViewDirectiveComponent } from './form-view-directive.component';

describe('FormViewDirectiveComponent', () => {
  let component: FormViewDirectiveComponent;
  let fixture: ComponentFixture<FormViewDirectiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormViewDirectiveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormViewDirectiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
