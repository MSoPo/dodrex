import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaCargaComponent } from './tabla-carga.component';

describe('TablaCargaComponent', () => {
  let component: TablaCargaComponent;
  let fixture: ComponentFixture<TablaCargaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaCargaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaCargaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
