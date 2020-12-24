import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ROL_ADMINISTRADO, ROL_VENTAS, USER_ACTIVE } from '../core/Constantes';
import { UsersService } from '../core/services/users.service';

@Injectable({
  providedIn: 'root'
})
export class VentaGuard implements CanActivate {
  
  constructor(private usersService: UsersService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    return this.usersService.getUser(USER_ACTIVE.id).pipe(tap(user => console.log(user.data())),
    map(user => {
      USER_ACTIVE.id_rol = user.data().id_rol;
      console.log(user.data());
      if(USER_ACTIVE.id_rol === ROL_ADMINISTRADO.valor || USER_ACTIVE.id_rol === ROL_VENTAS.valor) {
        return true;
      } else {
        return false;
      }
    }));

  }
  
}
