import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    private snackBar: MatSnackBar) {
      console.log(data);
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
      this.snackBar.open(`Se borró el producto ${this.data.clave}.`, '', DEFAULT_DURATION) :
      this.snackBar.open(`Se habilitó el producto ${this.data.clave}.`, '', DEFAULT_DURATION) 
    }).catch((err) => {
      this.data.activo = !this.data.activo;
      ACTIVE_BLOCK.value = false;
      this.snackBar.open(err.message, 'Aceptar', DEFAULT_DURATION);
    });
    
  }
}
