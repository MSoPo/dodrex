import { ChangeDetectorRef, Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {
  ACTIVE_BLOCK,
  DEFAULT_DURATION,
  EMPRESA,
  MENU,
  ROL_ADMINISTRADO,
  USER_ACTIVE,
} from 'src/app/core/Constantes';
import { AuthService } from 'src/app/core/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/core/services/users.service';
import { ProductService } from 'src/app/core/services/product.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
  username = USER_ACTIVE.nombre;
  rol = USER_ACTIVE.id_rol;
  rolAdmin = ROL_ADMINISTRADO.valor;
  id_empresa = USER_ACTIVE.id_empresa;
  rutaActual = '';
  menu;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private auth: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private userService: UsersService,
    private cdRef:ChangeDetectorRef,
    private translate: TranslateService,
    private authService: AuthService
  ) {
    this.rutaActual = this.router.url;
    this.menu = MENU;
    this.cargarFavs();
  }

  ngAfterViewChecked(): void{
    this.cdRef.detectChanges();
  }

  logout(): void {
    clearLogout();
    this.auth
      .logout()
      .then(() => {
        this.snackBar.open('Vuelve pronto.', undefined, DEFAULT_DURATION);
        this.router.navigate(['/user']);
      })
      .catch((err) => {
        this.snackBar.open(err.message, 'Aceptar', DEFAULT_DURATION);
      });
  }

  cargarFavs(): void {
    console.log(EMPRESA.id);
    if (!EMPRESA.id) {
      if(!USER_ACTIVE.id_rol){
        this.router.navigate(['/user/user']);
        return
      }
      ACTIVE_BLOCK.value = true;
      this.userService.getUser(USER_ACTIVE.id).subscribe((respuesta) => {
        const usuario = respuesta.data();
        USER_ACTIVE.id_rol = usuario.id_rol;
          console.log(usuario);
          USER_ACTIVE.id_empresa = usuario.id_empresa;
          this.userService
            .getEmpresa(usuario.id_empresa)
            .subscribe((resp) => {
              const dataEmpresa: any = resp.data();
              if (!dataEmpresa) {
                ACTIVE_BLOCK.value = false;
                this.snackBar.open(
                  '¡Error al iniciar sesión!',
                  'Aceptar',
                  DEFAULT_DURATION
                );
                return;
              }
              Object.assign(EMPRESA, dataEmpresa)
              this.id_empresa = resp.id;
              EMPRESA.id = resp.id;
              ACTIVE_BLOCK.value = false;
            });
      });
    }
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

function clearLogout(){
  delete USER_ACTIVE.activo;
  delete USER_ACTIVE.correo;
  delete USER_ACTIVE.id;
  delete USER_ACTIVE.id_empresa;
  delete USER_ACTIVE.id_rol;
  delete USER_ACTIVE.nombre;
  delete EMPRESA.correo;
  delete EMPRESA.direccion;
  delete EMPRESA.id;
  delete EMPRESA.id_usuario;
  delete EMPRESA.operacion;
  delete EMPRESA.razon_social;
  delete EMPRESA.rfc;
  delete EMPRESA.telefono;
}
