import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import jwt_decode from "jwt-decode";
import { not } from '@angular/compiler/src/output/output_ast';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = localStorage.getItem('token');

    if (token !== null) {
      const expire = this.isExpiredToken(token)
      if (expire) {
        this.router.navigateByUrl('/login');
        return false;
      } else {
        return true;
      }
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }
  isExpiredToken(token: string): boolean {
    let decoded: any = jwt_decode(token);
    const expireDate = new Date();
    expireDate.setUTCDate(decoded.exp);
    const currentDate = new Date();
    return (expireDate.valueOf() > currentDate.valueOf());
  }
}
