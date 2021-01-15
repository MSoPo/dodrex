import { AfterContentChecked, Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ignoreElements } from 'rxjs/operators';
import { EMPRESA, MENU, ROL_ADMINISTRADO, USER_ACTIVE } from 'src/app/core/Constantes';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.scss']
})
export class ConfiguracionComponent implements AfterContentChecked {

  user = USER_ACTIVE
  rol_admin  = ROL_ADMINISTRADO.valor
  empresa = EMPRESA;
  
  constructor(private translate: TranslateService) { 
  }

  ngAfterContentChecked(): void {
    if(MENU.value !== this.translate.instant('NAV_CONF')){
      console.log( MENU.value );
      MENU.value = this.translate.instant('NAV_CONF');
    }
  }

}
