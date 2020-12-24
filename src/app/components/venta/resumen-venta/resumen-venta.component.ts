import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ACTIVE_BLOCK, DEFAULT_DURATION, VENTAACTUAL } from 'src/app/core/Constantes';
import { VentaService } from 'src/app/core/services/venta.service';
import { Venta } from 'src/app/models/Venta';

@Component({
  selector: 'app-resumen-venta',
  templateUrl: './resumen-venta.component.html',
  styleUrls: ['./resumen-venta.component.scss'],
})
export class ResumenVentaComponent {
  recibido = new FormControl(0);
  cambio = 0;
  valid = false;

  constructor(
    public dialogRef: MatDialogRef<ResumenVentaComponent>,
    @Inject(MAT_DIALOG_DATA) public venta: Venta,
    private snackBar: MatSnackBar, private ventaService: VentaService,
    private router: Router
  ) {
    console.log(venta);
    
  }

  onNoClick(impresion: boolean): void {
    if (this.valid) {
        ACTIVE_BLOCK.value = true;
        console.log(this.venta);
        this.ventaService.add(this.venta).then(resp => {
          console.log('Venta Realizada');
          console.log(resp);
          ACTIVE_BLOCK.value = false;
          this.snackBar.open(`Venta realizada folio: ${resp.id}`, '', DEFAULT_DURATION);
          this.dialogRef.close();
          if(impresion){
            Object.assign(VENTAACTUAL, this.venta);
          VENTAACTUAL.id = resp.id;
          this.router.navigateByUrl('/nota', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/ventas']);
          }); 
          }else {
            this.router.navigateByUrl('/reload', { skipLocationChange: true }).then(() => {
              this.router.navigate(['/ventas']);
            }); 
          }
          
          //this.dialogRef.close();
        }).catch(err => {
          console.log(err.message);
          ACTIVE_BLOCK.value = false;
          this.snackBar.open('Ocurrio un error al guardar la venta', 'Aceptar');
        });
    } else {
      this.snackBar.open(
        'El monsto pagado no es valido',
        'Aceptar',
        DEFAULT_DURATION
      );
    }
  }

  calcularCambio(): void {
    if (!isNaN(this.recibido.value) && this.recibido.value) {
      this.cambio = Number(this.recibido.value) - this.venta.total;
      this.valid = true;
      if(this.cambio < 0) { this.cambio = 0; this.valid = false }
    } else {
      this.cambio = 0; this.valid = false;
    }
  }
}
