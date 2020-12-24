import { TestBed } from '@angular/core/testing';

import { VentaGuard } from './venta.guard';

describe('VentaGuard', () => {
  let guard: VentaGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(VentaGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
