import { TestBed } from '@angular/core/testing';

import { UserEmpresaActiveGuard } from './user-empresa-active.guard';

describe('UserEmpresaActiveGuard', () => {
  let guard: UserEmpresaActiveGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UserEmpresaActiveGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
