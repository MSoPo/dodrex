import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ACTIVE_BLOCK, DEFAULT_DURATION, ROL_ADMINISTRADO, USER_ACTIVE } from 'src/app/core/Constantes';
import { AuthService } from 'src/app/core/services/auth.service';
import { Usuario } from 'src/app/models/Usuario';
import { CambiarPasswordComponent } from '../cambiar-password/cambiar-password.component';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.scss']
})
export class ConfiguracionComponent {

  user = USER_ACTIVE
  rol_admin  = ROL_ADMINISTRADO.valor
  
  constructor() { 
    console.log(this.user);
    console.log(this.rol_admin);
  }

  ngOnInit(): void {
  }

}
