import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MENU } from 'src/app/core/Constantes';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.scss']
})
export class ReporteComponent implements AfterViewChecked {

  constructor(private translate: TranslateService) { 
  }

  ngAfterViewChecked(): void {
    if(MENU.value !== this.translate.instant('NAV_REPORTE')){
      MENU.value = this.translate.instant('NAV_REPORTE');
    }
  }

}
