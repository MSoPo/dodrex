import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { ACTIVE_BLOCK, DEFAULT_DURATION } from 'src/app/core/Constantes';
import { ClienteService } from 'src/app/core/services/cliente.service';
import { Cliente } from 'src/app/models/Cliente';

@Component({
  selector: 'app-eliminar-cliente',
  templateUrl: './eliminar-cliente.component.html',
  styleUrls: ['./eliminar-cliente.component.scss'],
})
export class EliminarClienteComponent {
  constructor(
    public dialogRef: MatDialogRef<EliminarClienteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Cliente,
    private clienteService: ClienteService,
    private snackBar: MatSnackBar,
    public translate: TranslateService
  ) {
    translate.setDefaultLang('es');
    console.log(data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  borrar(): void {
    this.data.activo = !this.data.activo;
    ACTIVE_BLOCK.value = true;
    this.dialogRef.close();
    this.clienteService
      .activate(this.data)
      .then((resutl) => {
        ACTIVE_BLOCK.value = false;
        !this.data.activo
          ? this.SNACK('BORRADO_OK', '')
          : this.SNACK('ACTIVADO_OK', '')
      })
      .catch((err) => {
        this.data.activo = !this.data.activo;
        ACTIVE_BLOCK.value = false;
        this.SNACK('ERROR_GRAL', 'ACEPTAR');
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
