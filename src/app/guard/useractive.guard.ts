import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { USER_ACTIVE } from '../core/Constantes';
import { AuthService } from '../core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UseractiveGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.authService.hasUser().pipe(
        tap(user => console.log(user)),
        map(user => {
          const bandera = user === null ? false : true;
          if (bandera) {
            this.router.navigate(['/']);
            return false;
          }
          return true;
        }));
  }
  
}
