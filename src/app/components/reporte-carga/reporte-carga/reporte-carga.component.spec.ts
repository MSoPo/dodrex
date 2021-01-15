import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteCargaComponent } from './reporte-carga.component';

describe('ReporteCargaComponent', () => {
  let component: ReporteCargaComponent;
  let fixture: ComponentFixture<ReporteCargaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteCargaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteCargaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
