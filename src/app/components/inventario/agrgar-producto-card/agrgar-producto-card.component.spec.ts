import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgrgarProductoCardComponent } from './agrgar-producto-card.component';

describe('AgrgarProductoCardComponent', () => {
  let component: AgrgarProductoCardComponent;
  let fixture: ComponentFixture<AgrgarProductoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgrgarProductoCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgrgarProductoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
