import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // Проверяем наличие ключа в локал стордж
    if (localStorage.getItem('access_token')) {
      // Если есть, то Guard разрешает переход
      return true;
    }
    // Если ключа нет, то перебрасываем на страницу входа по Роуту
    this.router.navigate(['/home', 'openDialogAuth'], {queryParams: {returnUrl: state.url}});
    return false;
  }
}

