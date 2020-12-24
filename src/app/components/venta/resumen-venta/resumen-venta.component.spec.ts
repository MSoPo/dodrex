import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenVentaComponent } from './resumen-venta.component';

describe('ResumenVentaComponent', () => {
  let component: ResumenVentaComponent;
  let fixture: ComponentFixture<ResumenVentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResumenVentaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumenVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
