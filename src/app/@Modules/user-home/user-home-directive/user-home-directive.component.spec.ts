import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserHomeDirectiveComponent } from './user-home-directive.component';

describe('UserHomeDirectiveComponent', () => {
  let component: UserHomeDirectiveComponent;
  let fixture: ComponentFixture<UserHomeDirectiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserHomeDirectiveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserHomeDirectiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
