import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import {
  ACTIVE_BLOCK,
  DEFAULT_DURATION,
  EMPRESA,
  USER_ACTIVE,
} from 'src/app/core/Constantes';
import { UsersService } from 'src/app/core/services/users.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  googleLogoURL =
    'https://raw.githubusercontent.com/fireflysemantics/logo/master/Google.svg';
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    public dialog: MatDialog,
    private usersService: UsersService,
    public translate: TranslateService
  ) {
    translate.setDefaultLang('es');
    this.matIconRegistry.addSvgIcon(
      'gmlogo',
      this.domSanitizer.bypassSecurityTrustResourceUrl(this.googleLogoURL)
    );

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
      email: [
        '',
        [Validators.email, Validators.maxLength(50), Validators.minLength(10)],
      ],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  login(e: Event): void {
    e.preventDefault();
    ACTIVE_BLOCK.value = true;
    if (this.form.valid) {
      const value = this.form.value;
      this.authService
        .login(value.email, value.password)
        .then((response) => {
          USER_ACTIVE.nombre = response.user.displayName;
          USER_ACTIVE.correo = value.email;
          this.cargarUsuario(response.user.uid);
        })
        .catch((error) => {
          this.SNACK('ERROR_DATOS', 'ACEPTAR');
          ACTIVE_BLOCK.value = false;
        });
    } else {
      this.SNACK('ERROR_DATOS', 'ACEPTAR');
      ACTIVE_BLOCK.value = false;
    }
  }

  loginGmail(): void {
    this.authService
      .loginGmail()
      .then(() => {
        this.SNACK('BIENVENIDO', '');
        this.router.navigate(['/']);
      })
      .catch((error) => {
        if(error.code == 'auth/user-disabled'){
          this.SNACK('ERROR_BLOQ', 'ACEPTAR');
        }else{
          this.SNACK('ERROR_DATOS', 'ACEPTAR');
        }
      });
  }

  openDialog(): void {
    console.log(this.form.value.email);
    const dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
      width: '250px',
      data: { email: this.form.value.email },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.authService
          .restorePassword(result)
          .then(() => this.SNACK('MSJ_REC', ''))
          .catch((error) => this.SNACK('ERROR_REC_PAS', 'ACEPTAR'));
      }
    });
  }

  addUser(): void {
    this.router.navigate(['/user/user']);
  }

  cargarUsuario(uid: string): void {
    this.usersService.getUser(uid).subscribe((valores) => {
      ACTIVE_BLOCK.value = false;
      const data: any = valores.data();
      if (!data) {
        this.SNACK('ERROR_SESION', 'ACEPTAR');
        return;
      }
      USER_ACTIVE.id = uid;
      USER_ACTIVE.id_empresa = data.id_empresa;
      USER_ACTIVE.id_rol = data.id_rol;
      this.usersService.getEmpresa(data.id_empresa).subscribe((respuesta) => {
        const dataEmpresa: any = respuesta.data();
        if (!dataEmpresa) {
          ACTIVE_BLOCK.value = false;
          this.SNACK('ERROR_SESION', 'ACEPTAR');
          return;
        }
        Object.assign(EMPRESA, dataEmpresa);
        this.snackBar.open(
          this.translate.instant('BIENVENIDO_USR', {
            user: USER_ACTIVE.nombre,
          }),
          this.TRANSLATE('ACEPTAR'),
          DEFAULT_DURATION
        );
        this.router.navigate(['/']);
      });
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
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    console.log(data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
