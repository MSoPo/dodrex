import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {
  ACTIVE_BLOCK,
  DEFAULT_DURATION,
  EMPRESA,
  USER_ACTIVE,
} from 'src/app/core/Constantes';
import { AuthService } from 'src/app/core/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/core/services/users.service';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
  username = USER_ACTIVE.nombre;
  id_empresa = USER_ACTIVE.id_empresa;
  rutaActual = '';

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
    private userService: UsersService
  ) {
    this.rutaActual = this.router.url;
    this.cargarFavs();
  }

  logout(): void {
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
}
