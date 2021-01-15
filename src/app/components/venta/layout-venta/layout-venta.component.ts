import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MENU } from 'src/app/core/Constantes';

@Component({
  selector: 'app-layout-venta',
  templateUrl: './layout-venta.component.html',
  styleUrls: ['./layout-venta.component.scss']
})
export class LayoutVentaComponent implements AfterViewChecked {

  constructor(private translate: TranslateService) { 
  }

  ngAfterViewChecked(): void {
    if(MENU.value !== this.translate.instant('NAV_VENTA')){
      MENU.value = this.translate.instant('NAV_VENTA');
    }
  }

}
