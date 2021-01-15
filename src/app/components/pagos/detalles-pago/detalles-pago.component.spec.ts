import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesPagoComponent } from './detalles-pago.component';

describe('DetallesPagoComponent', () => {
  let component: DetallesPagoComponent;
  let fixture: ComponentFixture<DetallesPagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetallesPagoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallesPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
