import { TestBed } from '@angular/core/testing';

import { InventarioGuard } from './inventario.guard';

describe('InventarioGuard', () => {
  let guard: InventarioGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(InventarioGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
