import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ACTIVE_BLOCK, DEFAULT_DURATION } from 'src/app/core/Constantes';
import { ClienteService } from 'src/app/core/services/cliente.service';
import { Cliente } from 'src/app/models/Cliente';

@Component({
  selector: 'app-eliminar-cliente',
  templateUrl: './eliminar-cliente.component.html',
  styleUrls: ['./eliminar-cliente.component.scss']
})
export class EliminarClienteComponent {

  constructor(
    public dialogRef: MatDialogRef<EliminarClienteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Cliente, private clienteService: ClienteService,
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
      this.clienteService.activate(this.data).then((resutl) => {
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
