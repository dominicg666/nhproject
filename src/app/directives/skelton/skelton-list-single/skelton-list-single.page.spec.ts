import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeltonListSinglePage } from './skelton-list-single.page';

describe('SkeltonListSinglePage', () => {
  let component: SkeltonListSinglePage;
  let fixture: ComponentFixture<SkeltonListSinglePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkeltonListSinglePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkeltonListSinglePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
