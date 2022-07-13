import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators'
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  isLoggedIn = new BehaviorSubject(false);
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this.authService.isAuthenticated().pipe(map((response: { status: boolean }) => {
      console.log(response)
      if (response.status) {
        this.isLoggedIn.next(true);
        return true;
      }
      this.router.navigate(['/login']);
      this.isLoggedIn.next(false);
      return false;
    }), catchError((error) => {
      this.router.navigate(['/login']);
      return of(false);
    }))
  }
}