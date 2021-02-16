import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { DEFAULT_DURATION, EMPRESA, USER_ACTIVE } from '../core/Constantes';
import { AuthService } from '../core/services/auth.service';
import { UsersService } from '../core/services/users.service';
import { clearLogout } from '../core/Util';

@Injectable({
  providedIn: 'root'
})
export class UserActiveGuard implements CanActivate {
  constructor(private usersService: UsersService, private snackBar: MatSnackBar, private translate: TranslateService,
    private authService: AuthService, private router: Router){}
    canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log("USER_ACTIVE.GUARD =>",USER_ACTIVE);
      return this.usersService.getUser(USER_ACTIVE.id).pipe(tap(user => console.log(user.data())),
      map(user => {
        const usuario = user.data();
        Object.assign(USER_ACTIVE, usuario);
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
