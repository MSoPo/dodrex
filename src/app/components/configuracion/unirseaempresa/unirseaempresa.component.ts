import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { ACTIVE_BLOCK, DEFAULT_DURATION, USER_ACTIVE } from 'src/app/core/Constantes';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-unirseaempresa',
  templateUrl: './unirseaempresa.component.html',
  styleUrls: ['./unirseaempresa.component.scss']
})
export class UnirseaempresaComponent {

  id_empresa = new FormControl();

  constructor(
    private snackBar: MatSnackBar,
    public translate: TranslateService
  ) {
    translate.setDefaultLang('es');
  }

  guardar(): void {
    console.log('Guardar');
  }

  TRANSLATE(str: string) {
    return str ? this.translate.instant(str) : '';
  }

  SNACK(msj: string, btm: string) {
    this.snackBar.open(
      this.TRANSLATE(msj),
      this.TRANSLATE(btm),
      DEFAULT_DURATION
    );
  }

}
