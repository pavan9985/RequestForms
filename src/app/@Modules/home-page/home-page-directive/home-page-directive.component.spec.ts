import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageDirectiveComponent } from './home-page-directive.component';

describe('HomePageDirectiveComponent', () => {
  let component: HomePageDirectiveComponent;
  let fixture: ComponentFixture<HomePageDirectiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomePageDirectiveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomePageDirectiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
