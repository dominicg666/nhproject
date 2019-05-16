import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyshiftsPage } from './myshifts.page';

describe('MyshiftsPage', () => {
  let component: MyshiftsPage;
  let fixture: ComponentFixture<MyshiftsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyshiftsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyshiftsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
