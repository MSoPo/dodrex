import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { DEFAULT_DURATION, ROL_ADMINISTRADO, USER_ACTIVE } from '../core/Constantes';
import { AuthService } from '../core/services/auth.service';
import { UsersService } from '../core/services/users.service';
import { clearLogout } from '../core/Util';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private usersService: UsersService, private authService: AuthService, private router: Router, private snackBar: MatSnackBar ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    console.log("ADMIN.GUARDA => ",USER_ACTIVE);
    if (!USER_ACTIVE.id_empresa){
      this.router.navigate(['/']);
      //this.snackBar.open('Ingresa los datos de tu empresa.', 'Aceptar', DEFAULT_DURATION);
    }else if (!USER_ACTIVE.activo){
      this.router.navigate(['/user']);
      this.snackBar.open('Tú usuario se encuentra bloqueado, contacte con el administrador', 'Aceptar', DEFAULT_DURATION);
      clearLogout();
    }else if (!USER_ACTIVE.id_rol) {
      this.router.navigate(['/user']);
      this.authService.logout();
      clearLogout();
      this.snackBar.open('Espera la asignación de tu usuario.', 'Aceptar', DEFAULT_DURATION);
    } else {
      if(ROL_ADMINISTRADO.valor == USER_ACTIVE.id_rol){
        return true;
      } else {
        this.router.navigate(['/ventas']);
        return false;
      }
    }
    return false;

    /*
    return this.usersService.getUser(USER_ACTIVE.id).pipe(tap(user => console.log(user.data())),
    map(user => {
      console.log(user.data());
      if(user.data() &&!user.data().id_empresa){
        this.router.navigate(['/user/user']);
        this.snackBar.open('Ingresa los datos de tu empresa.', 'Aceptar', DEFAULT_DURATION);
        return false;
      }
      if(user.data() && user.data().id_rol){
        USER_ACTIVE.id_rol = user.data().id_rol;
        if(ROL_ADMINISTRADO.valor == user.data().id_rol){
          return true;
        }else{
          this.router.navigate(['/ventas']);
        }
      }else{
        this.router.navigate(['/user']);
        this.authService.logout();
        this.snackBar.open('Espera la asignación de tu usuario.', 'Aceptar', DEFAULT_DURATION);
      }
        return false;
    }));*/
  }
  



}
