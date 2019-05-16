import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferAFriendPage } from './refer-a-friend.page';

describe('ReferAFriendPage', () => {
  let component: ReferAFriendPage;
  let fixture: ComponentFixture<ReferAFriendPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferAFriendPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferAFriendPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
