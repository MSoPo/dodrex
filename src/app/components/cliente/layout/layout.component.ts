import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MENU } from 'src/app/core/Constantes';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements AfterViewChecked {

  constructor(private translate: TranslateService) { 
  }

  ngAfterViewChecked(): void {
    if(MENU.value !== this.translate.instant('NAV_CLIENTES')){
      MENU.value = this.translate.instant('NAV_CLIENTES');
    }
  }

}
