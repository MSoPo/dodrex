import { Component } from '@angular/core';
import { ACTIVE_BLOCK } from './core/Constantes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dodrex';
  active = ACTIVE_BLOCK;
}
