import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-agrgar-producto-card',
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        opacity: 1
      })),
      state('closed', style({
        height: '0px',
        opacity: 0
      })),
      transition('open => closed', [
        animate('0.5s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
    ]),
  ],
  templateUrl: './agrgar-producto-card.component.html',
  styleUrls: ['./agrgar-producto-card.component.scss']
})
export class AgrgarProductoCardComponent implements OnInit {

  options: FormGroup;
  hideMayoreoControl = new FormControl(false);
  constructor(fb: FormBuilder) {
    this.options = fb.group({
      hideRequired: this.hideMayoreoControl
    });
  }

  ngOnInit(): void {
  }

}
