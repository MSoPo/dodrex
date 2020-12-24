import { TestBed } from '@angular/core/testing';

import { AllrolGuard } from './allrol.guard';

describe('AllrolGuard', () => {
  let guard: AllrolGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AllrolGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
