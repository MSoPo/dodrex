import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ACTIVE_BLOCK, DEFAULT_DURATION, EMPRESA, USER_ACTIVE } from 'src/app/core/Constantes';
import { UsersService } from 'src/app/core/services/users.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  googleLogoURL = 'https://raw.githubusercontent.com/fireflysemantics/logo/master/Google.svg';
  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService,
              private router: Router, private snackBar: MatSnackBar, private matIconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer, public dialog: MatDialog, private usersService: UsersService) {

                this.matIconRegistry.addSvgIcon(
                  'gmlogo',
                  this.domSanitizer.bypassSecurityTrustResourceUrl(this.googleLogoURL));

                this.matIconRegistry.addSvgIcon(
                  'fblogo',
                  this.domSanitizer.bypassSecurityTrustResourceUrl('assets/fblogo.svg')
                );

                this.matIconRegistry.addSvgIcon(
                  'adduser',
                  this.domSanitizer.bypassSecurityTrustResourceUrl('assets/adduser.svg')
                );

                this.matIconRegistry.addSvgIcon(
                  'loginlogo',
                  this.domSanitizer.bypassSecurityTrustResourceUrl('assets/login.svg')
                );

                this.form = this.formBuilder.group({
                  email: ['', [
                    Validators.email,
                    Validators.maxLength(50),
                    Validators.minLength(10)
                  ]],
                  password: ['', [
                    Validators.required
                  ]]});
              }

  ngOnInit(): void {
  }

  login(e: Event): void {
    e.preventDefault();
    ACTIVE_BLOCK.value = true;
    console.log(this.form.value);
    if (this.form.valid){
      const value = this.form.value;
      this.authService.login(value.email, value.password).then((response) => {
        console.log(response.user);
        USER_ACTIVE.nombre = response.user.displayName;
        USER_ACTIVE.correo = value.email; 
        this.cargarUsuario(response.user.uid);
      }).catch(error => {
        this.snackBar.open(error.message , 'Aceptar', DEFAULT_DURATION);
        ACTIVE_BLOCK.value = false;
      });
    }else{
      console.log(this.form.errors);
      this.snackBar.open('Los datos ingresados son incorrectos.' , 'Aceptar', DEFAULT_DURATION);
      ACTIVE_BLOCK.value = false;
    }
  }

  loginGmail(): void{
    this.authService.loginGmail().then(() => {
      this.snackBar.open('Bienvendo!', undefined, DEFAULT_DURATION);
      this.router.navigate(['/']);
    }).catch(error => {
      console.log(error);
      this.snackBar.open('Datos incorrectos.' , 'Aceptar', DEFAULT_DURATION);
    });
  }

  openDialog(): void {
    console.log(this.form.value.email);
    const dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
      width: '250px',
      data: { email : this.form.value.email }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        this.authService.restorePassword(result).
        then(() => this.snackBar.open('Se envió el correo para la recuperación de la contraseña.', undefined, DEFAULT_DURATION))
        .catch(error => this.snackBar.open(error.message , 'Aceptar', DEFAULT_DURATION));
      }
    });
  }

  addUser(): void{
    this.router.navigate(['/user/user']);
  }

  cargarUsuario(uid: string): void{
    this.usersService.getUser(uid).subscribe(valores => {
      ACTIVE_BLOCK.value = false;
      const data: any = valores.data();
      if (!data) {
        this.snackBar.open('¡Error al iniciar sesión!', 'Aceptar', DEFAULT_DURATION);
        return;
      }
      USER_ACTIVE.id = uid;
      USER_ACTIVE.id_empresa = data.id_empresa;
      USER_ACTIVE.id_rol = data.id_rol;
      this.usersService.getEmpresa(data.id_empresa).subscribe(respuesta => {
        const dataEmpresa: any = respuesta.data();
        if (!dataEmpresa) {
          this.snackBar.open('¡Error al iniciar sesión!', 'Aceptar', DEFAULT_DURATION);
          return;
        }
        Object.assign(EMPRESA, dataEmpresa)
        console.log(EMPRESA);
        console.log(USER_ACTIVE);

        this.snackBar.open(`¡Bienvendo ${USER_ACTIVE.nombre}!`, undefined, DEFAULT_DURATION);
        this.router.navigate(['/']);
      });
    });
  }
}

export interface DialogData {
  email: string;
}

@Component({
  selector: 'app-dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      console.log(data);
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
