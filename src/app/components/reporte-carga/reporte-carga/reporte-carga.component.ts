import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MENU } from 'src/app/core/Constantes';

@Component({
  selector: 'app-reporte-carga',
  templateUrl: './reporte-carga.component.html',
  styleUrls: ['./reporte-carga.component.scss']
})
export class ReporteCargaComponent implements AfterViewChecked {

  constructor(private translate: TranslateService) { 
  }

  ngAfterViewChecked(): void {
    if(MENU.value !== this.translate.instant('NAV_REPORTE_CARGA')){
      MENU.value = this.translate.instant('NAV_REPORTE_CARGA');
    }
  }

}
