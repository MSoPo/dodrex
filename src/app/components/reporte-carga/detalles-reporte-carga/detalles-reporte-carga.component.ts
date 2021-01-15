import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DetalleVenta } from 'src/app/models/DetalleVenta';
import { TranslateService } from '@ngx-translate/core';
import { Carga } from 'src/app/models/Carga';
import { Timestamp } from 'rxjs';

@Component({
  selector: 'app-detalles-reporte-carga',
  templateUrl: './detalles-reporte-carga.component.html',
  styleUrls: ['./detalles-reporte-carga.component.scss']
})
export class DetallesReporteCargaComponent {

  productos: DetalleVenta[] | undefined;
  idVenta: string | undefined;
  fecha: any | undefined;
  cancelar = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Partial<Carga>,
    public dialogRef: MatDialogRef<DetalleVenta>,
    public translate: TranslateService
  ) {
    translate.setDefaultLang('es');
      this.productos = data.productos;
      this.idVenta = data.id;
      this.fecha = data.fecha;
     }

  cerrar(): void {
    this.dialogRef.close();
  }

}
