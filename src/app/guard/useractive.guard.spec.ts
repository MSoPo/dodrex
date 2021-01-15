import { TestBed } from '@angular/core/testing';

import { UseractiveGuard } from './useractive.guard';

describe('UseractiveGuard', () => {
  let guard: UseractiveGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UseractiveGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
