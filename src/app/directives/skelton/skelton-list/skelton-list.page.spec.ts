import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeltonListPage } from './skelton-list.page';

describe('SkeltonListPage', () => {
  let component: SkeltonListPage;
  let fixture: ComponentFixture<SkeltonListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkeltonListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkeltonListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
