import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoCargaComponent } from './producto-carga.component';

describe('ProductoCargaComponent', () => {
  let component: ProductoCargaComponent;
  let fixture: ComponentFixture<ProductoCargaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductoCargaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductoCargaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
