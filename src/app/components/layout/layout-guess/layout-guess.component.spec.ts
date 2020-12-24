import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutGuessComponent } from './layout-guess.component';

describe('LayoutGuessComponent', () => {
  let component: LayoutGuessComponent;
  let fixture: ComponentFixture<LayoutGuessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutGuessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutGuessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
