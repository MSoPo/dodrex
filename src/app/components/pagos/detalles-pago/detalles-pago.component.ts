import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { DEFAULT_DURATION } from 'src/app/core/Constantes';
import { ClienteService } from 'src/app/core/services/cliente.service';
import { DetallePago } from 'src/app/models/DetallePago';

@Component({
  selector: 'app-detalles-pago',
  templateUrl: './detalles-pago.component.html',
  styleUrls: ['./detalles-pago.component.scss']
})
export class DetallesPagoComponent implements OnInit {

  pagos: DetallePago[] | undefined;
  idVenta: string | undefined;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DetallesPagoComponent>,
    private snackBar: MatSnackBar,
    public translate: TranslateService
  ) {
    translate.setDefaultLang('es');
    this.pagos = data.detalle;
    this.idVenta = data.ventaPago.fecha.toDate();
     }

  ngOnInit(): void {
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
