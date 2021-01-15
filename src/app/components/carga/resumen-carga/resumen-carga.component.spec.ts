import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenCargaComponent } from './resumen-carga.component';

describe('ResumenCargaComponent', () => {
  let component: ResumenCargaComponent;
  let fixture: ComponentFixture<ResumenCargaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResumenCargaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumenCargaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
