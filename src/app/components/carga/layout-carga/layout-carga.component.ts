import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MENU } from 'src/app/core/Constantes';

@Component({
  selector: 'app-layout-carga',
  templateUrl: './layout-carga.component.html',
  styleUrls: ['./layout-carga.component.scss']
})
export class LayoutCargaComponent implements AfterViewChecked {

  constructor(private translate: TranslateService) { 
  }

  ngAfterViewChecked(): void {
    if(MENU.value !== this.translate.instant('NAV_CARGA')){
      MENU.value = this.translate.instant('NAV_CARGA');
    }
  }

}
