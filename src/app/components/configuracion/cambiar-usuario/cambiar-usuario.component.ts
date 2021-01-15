import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import {
  ACTIVE_BLOCK,
  DEFAULT_DURATION,
  USER_ACTIVE,
} from 'src/app/core/Constantes';
import { AuthService } from 'src/app/core/services/auth.service';
import { CambiarPasswordComponent } from '../cambiar-password/cambiar-password.component';

@Component({
  selector: 'app-cambiar-usuario',
  templateUrl: './cambiar-usuario.component.html',
  styleUrls: ['./cambiar-usuario.component.scss'],
})
export class CambiarUsuarioComponent {
  correo = new FormControl(USER_ACTIVE.correo);
  nombre_usuario = new FormControl(USER_ACTIVE.nombre);

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    public translate: TranslateService
  ) {
    translate.setDefaultLang('es');
  }

  updateName(): void {
    ACTIVE_BLOCK.value = true;
    this.authService.hasUser().subscribe((user) => {
      user
        .updateProfile({
          displayName: this.nombre_usuario.value,
        })
        .then(() => {
          ACTIVE_BLOCK.value = false;
          this.SNACK('ACTUALIZACION_OK', '');
        })
        .catch((er: any) => this.SNACK('ERROR_GRAL', 'ACEPTAR'));
    });
  }

  openDialog(): void {
    console.log(this.correo.value);
    this.authService.restorePassword(this.correo.value);
    const dialogRef = this.dialog.open(CambiarPasswordComponent, {
      width: '300px',
      data: {},
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
