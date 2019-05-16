import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BankAccountPendingPage } from './bank-account-pending.page';

describe('BankAccountPendingPage', () => {
  let component: BankAccountPendingPage;
  let fixture: ComponentFixture<BankAccountPendingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BankAccountPendingPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankAccountPendingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
