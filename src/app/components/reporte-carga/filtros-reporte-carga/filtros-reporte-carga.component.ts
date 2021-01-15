import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import {
  ACTIVE_BLOCK,
  DEFAULT_DURATION,
  USER_ACTIVE,
} from 'src/app/core/Constantes';
import { CargaService } from 'src/app/core/services/carga.service';
import { UsersService } from 'src/app/core/services/users.service';
import { Carga } from 'src/app/models/Carga';
import { Usuario } from 'src/app/models/Usuario';

@Component({
  selector: 'app-filtros-reporte-carga',
  templateUrl: './filtros-reporte-carga.component.html',
  styleUrls: ['./filtros-reporte-carga.component.scss'],
})
export class FiltrosReporteCargaComponent {
  @Output() getCargas = new EventEmitter<any>();

  usuario = new FormControl();

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  lstUsuario: Usuario[] = [];

  constructor(
    private userService: UsersService,
    private snackBar: MatSnackBar,
    private cargaService: CargaService,
    public translate: TranslateService
  ) {
    translate.setDefaultLang('es');

    this.userService.getUserEmpresa(USER_ACTIVE.id_empresa).then((respu) => {
      respu.forEach((element: { data: () => any; id: string }) => {
        this.lstUsuario.push({
          ...element.data(),
          id: element.id,
        });
      });
    });
  }

  buscar(): void {

    if (!this.range.valid) {
      this.SNACK('ERROR_FECHAS', 'ACEPTAR');
      return;
    }
    ACTIVE_BLOCK.value = true;
    this.cargaService
      .getFecha(
        this.range.value.start,
        this.range.value.end,
        this.usuario.value
      )
      .then((r) => {
        const lstCargas: Carga[] = [];
        r.forEach((element: { data: () => any; id: string }) => {
          lstCargas.push({ ...element.data(), id: element.id });
        });
        this.getCargas.emit(lstCargas);
        if (lstCargas.length < 1) {
          this.SNACK('ERROR_NO_RESULT', 'ACEPTAR');
        }
        ACTIVE_BLOCK.value = false;
      })
      .catch((err) => {
        this.SNACK('ERROR_GRAL', 'ACEPTAR');
        ACTIVE_BLOCK.value = false;
      });
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
