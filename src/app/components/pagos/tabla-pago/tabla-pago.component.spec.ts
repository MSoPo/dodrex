import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaPagoComponent } from './tabla-pago.component';

describe('TablaPagoComponent', () => {
  let component: TablaPagoComponent;
  let fixture: ComponentFixture<TablaPagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaPagoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
