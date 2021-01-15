import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltrosReporteCargaComponent } from './filtros-reporte-carga.component';

describe('FiltrosReporteCargaComponent', () => {
  let component: FiltrosReporteCargaComponent;
  let fixture: ComponentFixture<FiltrosReporteCargaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltrosReporteCargaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltrosReporteCargaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
