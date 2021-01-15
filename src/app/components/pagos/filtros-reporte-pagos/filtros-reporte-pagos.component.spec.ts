import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltrosReportePagosComponent } from './filtros-reporte-pagos.component';

describe('FiltrosReportePagosComponent', () => {
  let component: FiltrosReportePagosComponent;
  let fixture: ComponentFixture<FiltrosReportePagosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltrosReportePagosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltrosReportePagosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
