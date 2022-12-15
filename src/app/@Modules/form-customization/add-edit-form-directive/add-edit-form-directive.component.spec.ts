import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditFormDirectiveComponent } from './add-edit-form-directive.component';

describe('AddEditFormDirectiveComponent', () => {
  let component: AddEditFormDirectiveComponent;
  let fixture: ComponentFixture<AddEditFormDirectiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditFormDirectiveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditFormDirectiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
