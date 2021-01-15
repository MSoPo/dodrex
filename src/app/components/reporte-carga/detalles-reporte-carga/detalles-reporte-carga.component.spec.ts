import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesReporteCargaComponent } from './detalles-reporte-carga.component';

describe('DetallesReporteCargaComponent', () => {
  let component: DetallesReporteCargaComponent;
  let fixture: ComponentFixture<DetallesReporteCargaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetallesReporteCargaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallesReporteCargaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
