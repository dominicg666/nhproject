import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeltonProfilePage } from './skelton-profile.page';

describe('SkeltonProfilePage', () => {
  let component: SkeltonProfilePage;
  let fixture: ComponentFixture<SkeltonProfilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkeltonProfilePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkeltonProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
