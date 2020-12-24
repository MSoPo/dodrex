import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ACTIVE_BLOCK, DEFAULT_DURATION, USER_ACTIVE } from 'src/app/core/Constantes';
import { ClienteService } from 'src/app/core/services/cliente.service';
import { UsersService } from 'src/app/core/services/users.service';
import { VentaService } from 'src/app/core/services/venta.service';
import { Cliente } from 'src/app/models/Cliente';
import { Usuario } from 'src/app/models/Usuario';
import { Venta } from 'src/app/models/Venta';

@Component({
  selector: 'app-filtros',
  templateUrl: './filtros.component.html',
  styleUrls: ['./filtros.component.scss']
})
export class FiltrosComponent implements OnInit {

  @Output() getVentas = new EventEmitter<any>();

  cliente = new FormControl();
  usuario = new FormControl();
  especial = new FormControl();
  
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  lstCliente: Cliente[] = [];

  lstUsuario: Usuario[] = [];

  constructor(private clienteService: ClienteService, private userService: UsersService, 
    private snackBar: MatSnackBar, private ventaService: VentaService) { 
    this.clienteService.getAll().then(respu => {
      respu.forEach((element: { data: () => any; }) => {
        console.log(element.data());
        this.lstCliente.push(element.data());
      });
    });

    this.userService.getUserEmpresa(USER_ACTIVE.id_empresa).then(respu => {
      respu.forEach((element: { data: () => any; id: string }) => {
        console.log(element.data());
        this.lstUsuario.push({
          ...element.data(),
          id: element.id
        });
      });
    });;
  }

  buscar(): void{
    console.log(this.range.value.start);
    console.log(this.cliente.value);
    console.log(this.usuario.value);
    console.log(this.especial.value);

    if(this.especial.value == 1){
      this.buscarCanceladas();
      return;
    }

    if(!this.range.valid){
      this.snackBar.open('Ingresa el rango de fechas.', 'Aceptar', DEFAULT_DURATION);
      return;
    }
    ACTIVE_BLOCK.value = true;
    this.ventaService.getFecha(this.range.value.start, this.range.value.end, this.cliente.value, this.usuario.value).then(r => {
      const lstventas: Venta[] = [];
      r.forEach((element: { data: () => any, id: string }) => {
        lstventas.push({...element.data(), id: element.id});
      });
      this.getVentas.emit(lstventas);
      if(lstventas.length < 1){
        this.snackBar.open('No se encontraron ventas.', 'Aceptar', DEFAULT_DURATION);
      }
      ACTIVE_BLOCK.value = false;
    }).catch(err => {
      this.snackBar.open(err, 'Aceptar', DEFAULT_DURATION);
      ACTIVE_BLOCK.value = false;
    });

  }

  buscarCanceladas():void {
    ACTIVE_BLOCK.value = true;
    this.ventaService.getAllCancelada().then(res => {
      const lstventas: Venta[] = [];
      res.forEach((element: { data: () => any, id: string }) => {
        lstventas.push({...element.data(), id: element.id});
      });
      this.getVentas.emit(lstventas);
      if(lstventas.length < 1){
        this.snackBar.open('No se encontraron ventas canceladas.', 'Aceptar', DEFAULT_DURATION);
      }
      ACTIVE_BLOCK.value = false;
    }).catch(er => {
      this.snackBar.open(er, 'Aceptar', DEFAULT_DURATION);
      ACTIVE_BLOCK.value = false;
    });
  }

  ngOnInit(): void {
  }

}
