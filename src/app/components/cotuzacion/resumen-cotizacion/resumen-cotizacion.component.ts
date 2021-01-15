import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {
  ACTIVE_BLOCK,
  DEFAULT_DURATION,
  VENTAACTUAL,
} from 'src/app/core/Constantes';
import { PedidoService } from 'src/app/core/services/pedido.service';
import { Venta } from 'src/app/models/Venta';

@Component({
  selector: 'app-resumen-cotizacion',
  templateUrl: './resumen-cotizacion.component.html',
  styleUrls: ['./resumen-cotizacion.component.scss'],
})
export class ResumenCotizacionComponent {
  recibido = new FormControl(0);
  cambio = 0;
  valid = false;
  cotizacion;
  venta;

  constructor(
    public dialogRef: MatDialogRef<ResumenCotizacionComponent>,
    @Inject(MAT_DIALOG_DATA) public valTabla: any,
    private pedidoService: PedidoService,
    private snackBar: MatSnackBar,
    private router: Router,
    public translate: TranslateService
  ) {
    translate.setDefaultLang('es');
    this.venta = valTabla.venta;
    this.cotizacion = valTabla.cotizacion;
  }

  onClickPedido(impresion: boolean): void {
    ACTIVE_BLOCK.value = true;
    this.pedidoService
      .add(this.venta)
      .then((resp) => {
        ACTIVE_BLOCK.value = false;
        this.snackBar.open(
          this.translate.instant('PEDIDO_CREATE', { id: resp.id }),
          '',
          DEFAULT_DURATION
        );
        this.dialogRef.close();
        if (impresion) {
          Object.assign(VENTAACTUAL, this.venta);
          VENTAACTUAL.id = this.translate.instant('PEDIDO_IMP');
          this.router
            .navigateByUrl('/nota', { skipLocationChange: true })
            .then(() => {
              this.router.navigate(['/cotizacion']);
            });
        } else {
          this.router
            .navigateByUrl('/reload', { skipLocationChange: true })
            .then(() => {
              this.router.navigate(['/cotizacion']);
            });
        }
      })
      .catch((err) => {
        ACTIVE_BLOCK.value = false;
        this.SNACK('ERROR_GRAL', 'ACEPTAR');
      });
  }

  onCotizacion(): void {
    Object.assign(VENTAACTUAL, this.venta);
    VENTAACTUAL.id = this.translate.instant('COTIZACION');
    this.dialogRef.close();
    this.router
      .navigateByUrl('/nota', { skipLocationChange: true })
      .then(() => {
        this.router.navigate(['/cotizacion']);
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
