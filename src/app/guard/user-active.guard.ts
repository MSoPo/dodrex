import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { DEFAULT_DURATION, EMPRESA, USER_ACTIVE } from '../core/Constantes';
import { AuthService } from '../core/services/auth.service';
import { UsersService } from '../core/services/users.service';

@Injectable({
  providedIn: 'root'
})
export class UserActiveGuard implements CanActivate {
  constructor(private usersService: UsersService, private snackBar: MatSnackBar, private translate: TranslateService,
    private authService: AuthService, private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log(USER_ACTIVE);
    
      return this.usersService.getUser(USER_ACTIVE.id).pipe(tap(user => console.log(user.data())),
      map(user => {
        const usuario = user.data();
        if(!usuario.activo) {
          this.SNACK('ERROR_BLOQ', 'ACEPTAR');
          clearLogout();
          this.authService.logout().then(res => {
            this.router.navigate(['/user']);
          });
          return false;
        }
        return true;
      }));
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
