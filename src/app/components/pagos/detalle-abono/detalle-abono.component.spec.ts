import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleAbonoComponent } from './detalle-abono.component';

describe('DetalleAbonoComponent', () => {
  let component: DetalleAbonoComponent;
  let fixture: ComponentFixture<DetalleAbonoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleAbonoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleAbonoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
