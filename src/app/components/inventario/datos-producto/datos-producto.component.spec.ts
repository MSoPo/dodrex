import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosProductoComponent } from './datos-producto.component';

describe('DatosProductoComponent', () => {
  let component: DatosProductoComponent;
  let fixture: ComponentFixture<DatosProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatosProductoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
