import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltrosClienteComponent } from './filtros-cliente.component';

describe('FiltrosClienteComponent', () => {
  let component: FiltrosClienteComponent;
  let fixture: ComponentFixture<FiltrosClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltrosClienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltrosClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
