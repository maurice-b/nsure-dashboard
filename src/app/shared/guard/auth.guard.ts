import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {forkJoin, Observable, of} from 'rxjs';
import {AuthService} from '../services/auth/auth.service';
import {actions as AuthActions, selector as AuthSelector, state as AuthState} from '@app-shared/state/auth';
import {select, Store} from '@ngrx/store';
import {catchError, filter, map, take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService,
    private authStore: Store<AuthState.AuthStateInterface>
  ) {
  }

  public canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {

    const auth$ = this.authStore.pipe(
      select(AuthSelector.getAuthState),
      map((result: AuthState.AuthStateInterface | undefined) => {
        if (result === undefined) {
          // Log in.
          throw Error('Redirect to login page');
          // this.router.navigate(['/login'], {
          //   skipLocationChange: false
          // });
          // return false;
          // this.authStore.dispatch(new AuthActions.Authenticate());
          // return undefined;
        }

        // Check if the token in valid
        const isValidToken = this.authService.isValidToken(result.token);
        if (isValidToken) {
          return true;
        }

        if (result.retryAttempts === 0) {
          this.authStore.dispatch(new AuthActions.RefreshToken());
          return undefined;
        }

        throw Error('Redirect to login page');
      }),
      filter(data => data !== undefined),
      take(1)
    );

    return forkJoin([
        auth$
      ]
    ).pipe(
      map(([auth]) => {
        if (auth === true) {
          return true;
        }

        this.router.navigate(['/login'], {
          skipLocationChange: false
        });
        return false;
      }),
      catchError(() => {
        this.router.navigate(['/login'], {
          skipLocationChange: false
        });
        return of<boolean>(false);
      })
    );
  }
}

