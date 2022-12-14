import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardDirectiveComponent } from './dashboard-directive.component';

describe('DashboardDirectiveComponent', () => {
  let component: DashboardDirectiveComponent;
  let fixture: ComponentFixture<DashboardDirectiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardDirectiveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardDirectiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
