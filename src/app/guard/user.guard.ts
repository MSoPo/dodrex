import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { CONFIG, USER_ACTIVE } from '../core/Constantes';
import { UsersService } from '../core/services/users.service';
import { AuthService } from '../core/services/auth.service';
import { clearLogout } from 'src/app/core/Util';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(CONFIG.reload){
      return true;
    }
    clearLogout();
    return this.authService.hasUser().pipe(
      tap(user => console.log(user)),
      map(user => {
        const bandera = user === null ? false : true;
        if (!bandera) {
          this.router.navigate(['/user']);
          return bandera;
        }
        USER_ACTIVE.id = user.uid;
        USER_ACTIVE.nombre = user.displayName;
        USER_ACTIVE.correo = user.email;
        return bandera;
      })
    );
  }



}
