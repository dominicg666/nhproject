import { TestBed } from '@angular/core/testing';

import { NurseHomeGuardService } from './nurse-home-guard.service';

describe('NurseHomeGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NurseHomeGuardService = TestBed.get(NurseHomeGuardService);
    expect(service).toBeTruthy();
  });
});
