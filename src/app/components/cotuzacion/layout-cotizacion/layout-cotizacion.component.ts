import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MENU } from 'src/app/core/Constantes';

@Component({
  selector: 'app-layout-cotizacion',
  templateUrl: './layout-cotizacion.component.html',
  styleUrls: ['./layout-cotizacion.component.scss']
})
export class LayoutCotizacionComponent implements AfterViewChecked{

  constructor(private translate: TranslateService) { 
  }

  ngAfterViewChecked(): void {
    if(MENU.value !== this.translate.instant('NAV_COTIZACION')){
      MENU.value = this.translate.instant('NAV_COTIZACION');
    }
  }

}
