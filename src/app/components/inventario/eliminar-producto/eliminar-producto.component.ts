import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { ACTIVE_BLOCK, DEFAULT_DURATION } from 'src/app/core/Constantes';
import { ProductService } from 'src/app/core/services/product.service';
import { Producto } from 'src/app/models/Producto';

@Component({
  selector: 'app-eliminar-producto',
  templateUrl: './eliminar-producto.component.html',
  styleUrls: ['./eliminar-producto.component.scss']
})
export class EliminarProductoComponent {

  constructor(
    public dialogRef: MatDialogRef<EliminarProductoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Producto, private productService: ProductService,
    private snackBar: MatSnackBar, public translate: TranslateService
    ) {
      translate.setDefaultLang('es');
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  borrar(): void {
    this.data.activo = !this.data.activo;
    ACTIVE_BLOCK.value = true;
    this.dialogRef.close();
    this.productService.activate(this.data).then((resutl) => {
      ACTIVE_BLOCK.value = false;
      !this.data.activo ? 
      this.SNACK('BORRADO_OK', '')
          : this.SNACK('ACTIVADO_OK', '')
    }).catch((err) => {
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
