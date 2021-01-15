import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableCotizacionComponent } from './table-cotizacion.component';

describe('TableCotizacionComponent', () => {
  let component: TableCotizacionComponent;
  let fixture: ComponentFixture<TableCotizacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableCotizacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableCotizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
