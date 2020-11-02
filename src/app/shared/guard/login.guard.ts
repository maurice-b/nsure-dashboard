import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {selector as AuthSelector, state as AuthState} from '@app-shared/state/auth';
import {map} from 'rxjs/operators';
import {AuthService} from '@app-shared/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  public constructor(
    private router: Router,
    private authService: AuthService,
    private authStore: Store<AuthState.AuthStateInterface>
  ) {
  }

  public canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.authStore.pipe(
      select(AuthSelector.isAuthenticated),
      map((isAuthenticated: boolean) => {
        if (isAuthenticated) {
          this.router.navigate(['/'], {
            skipLocationChange: false
          });

          return false;
        }

        return true;
      }));
  }
}
