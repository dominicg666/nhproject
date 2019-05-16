import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnHolidayPage } from './on-holiday.page';

describe('OnHolidayPage', () => {
  let component: OnHolidayPage;
  let fixture: ComponentFixture<OnHolidayPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnHolidayPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnHolidayPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
