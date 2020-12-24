import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ACTIVE_BLOCK, DEFAULT_DURATION, EMPRESA, USER_ACTIVE } from 'src/app/core/Constantes';
import { UsersService } from 'src/app/core/services/users.service';
import { Usuario } from 'src/app/models/Usuario';

@Component({
  selector: 'app-usuario-empresa',
  templateUrl: './usuario-empresa.component.html',
  styleUrls: ['./usuario-empresa.component.scss'],
})
export class UsuarioEmpresaComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'correo', 'rol', 'activar'];
  ELEMENT_DATA: Partial<Usuario>[] = [];
  dataSource = new MatTableDataSource<Partial<Usuario>>(this.ELEMENT_DATA);

  constructor(
    private userService: UsersService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.userService
      .getUserEmpresa(EMPRESA.id)
      .then((res) => {
        const list: Usuario[] = [];
        res.forEach((element: { data: () => any, id : any }) => {
          if(element.id !== USER_ACTIVE.id){
            const  us = element.data();
            us.id = element.id;
            list.push(us);   
          }
        });
        this.dataSource.data = list;
      })
      .catch((err) => {
        this.snackBar.open(
          'Error al cargar los usuario',
          'Aceptar',
          DEFAULT_DURATION
        );
      });
  }

  activate(el: Usuario): void {
    el.activo = !el.activo;
    ACTIVE_BLOCK.value = true;
    this.userService.activate(el).then(result => ACTIVE_BLOCK.value = false)
    .catch((err) => {
      this.snackBar.open(err.message, 'Aceptar', DEFAULT_DURATION);
      ACTIVE_BLOCK.value = false;
    });
  }

  cambioRol(e: any, element: Usuario): void {
    this.userService.updateRol(element.id, e.value).
    then(res => {
      this.snackBar.open('Rol asignado.','', DEFAULT_DURATION);
    }).
    catch(er => this.snackBar.open(er.message,'Aceptar', DEFAULT_DURATION));
  }
}
