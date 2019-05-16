import { TestBed } from '@angular/core/testing';

import { NurseGuardService } from './nurse-guard.service';

describe('NurseGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NurseGuardService = TestBed.get(NurseGuardService);
    expect(service).toBeTruthy();
  });
});
