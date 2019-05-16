import { TestBed } from '@angular/core/testing';

import { CustomvalidatorService } from './customvalidator.service';

describe('CustomvalidatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CustomvalidatorService = TestBed.get(CustomvalidatorService);
    expect(service).toBeTruthy();
  });
});
