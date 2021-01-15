import { TestBed } from '@angular/core/testing';

import { UserActiveGuard } from './user-active.guard';

describe('UserActiveGuard', () => {
  let guard: UserActiveGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UserActiveGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
