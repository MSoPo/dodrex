import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaReporteCargaComponent } from './tabla-reporte-carga.component';

describe('TablaReporteCargaComponent', () => {
  let component: TablaReporteCargaComponent;
  let fixture: ComponentFixture<TablaReporteCargaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaReporteCargaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaReporteCargaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
