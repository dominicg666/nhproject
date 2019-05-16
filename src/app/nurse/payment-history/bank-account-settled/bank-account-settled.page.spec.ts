import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BankAccountSettledPage } from './bank-account-settled.page';

describe('BankAccountSettledPage', () => {
  let component: BankAccountSettledPage;
  let fixture: ComponentFixture<BankAccountSettledPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BankAccountSettledPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankAccountSettledPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
