import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltrosInventarioComponent } from './filtros-inventario.component';

describe('FiltrosInventarioComponent', () => {
  let component: FiltrosInventarioComponent;
  let fixture: ComponentFixture<FiltrosInventarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltrosInventarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltrosInventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
