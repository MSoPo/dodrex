import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ACTIVE_BLOCK, DEFAULT_DURATION, USER_ACTIVE } from 'src/app/core/Constantes';
import { AuthService } from 'src/app/core/services/auth.service';
import { CambiarPasswordComponent } from '../cambiar-password/cambiar-password.component';

@Component({
  selector: 'app-cambiar-usuario',
  templateUrl: './cambiar-usuario.component.html',
  styleUrls: ['./cambiar-usuario.component.scss']
})
export class CambiarUsuarioComponent implements OnInit {

  correo = new FormControl(USER_ACTIVE.correo);
  nombre_usuario = new FormControl(USER_ACTIVE.nombre);
  
  constructor(private authService: AuthService, private snackBar: MatSnackBar, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  updateName(): void {
    ACTIVE_BLOCK.value = true;
    this.authService.hasUser().subscribe(user => {
      user.updateProfile({
        displayName: this.nombre_usuario.value
      }).then(() => {
        ACTIVE_BLOCK.value = false;
        this.snackBar.open('Nombre actualizado.', '', DEFAULT_DURATION);
      }).catch((er: any) => this.snackBar.open(er.message, 'Aceptar', DEFAULT_DURATION));
    });
  }

  openDialog(): void {
    console.log(this.correo.value);
    this.authService.restorePassword(this.correo.value);
    const dialogRef = this.dialog.open(CambiarPasswordComponent, {
      width: '300px',
      data: { }
    });
  }

}
