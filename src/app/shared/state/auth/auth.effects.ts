import {Injectable} from '@angular/core';
import {Actions, Effect, ofType, ROOT_EFFECTS_INIT} from '@ngrx/effects';
import {Action, INIT} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';
import * as authActions from './auth.actions';
import {AuthService} from '../../services/auth/auth.service';
import {TokenInterface} from '../../services/token-storage/token.interface';
import {HttpErrorResponse} from '@angular/common/http';
import {TokenStorageService} from '../../services/token-storage/token-storage.service';
import {UserService} from '@app-shared/services/user/user.service';
import {UserInfoInterface} from '@app-shared/services/user/user-info.interface';

@Injectable()
export class AuthEffects {

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private userService: UserService,
    private tokenStorageService: TokenStorageService
  ) {
  }


  @Effect()
  init$ = this.actions$.pipe(
    ofType(ROOT_EFFECTS_INIT),
    map(() => {
      const storedToken = this.tokenStorageService.getToken();

      if (storedToken !== undefined) {
        // check if the token is valid
        const tokenIsValid = this.authService.isValidToken(storedToken);
        if (tokenIsValid) {
          return new authActions.StoreToken(storedToken);
        }
      }

      return new authActions.Init();
    })
  );

  @Effect()
  authenticate$: Observable<Action> = this.actions$.pipe(
    ofType(authActions.AuthActionTypes.Authenticate),
    map((action: authActions.Authenticate) => action.credentials),
    switchMap(credentials => {
      return this.authService.getAuthToken(credentials)
        .pipe(
          map((token: TokenInterface) => new authActions.StoreToken(token)),
          catchError((err: HttpErrorResponse) => of(new authActions.LoadFail(err)))
        );
    })
  );

  @Effect()
  refreshToken$: Observable<Action> = this.actions$.pipe(
    ofType(authActions.AuthActionTypes.RefreshToken),
    map((action: authActions.RefreshToken) => action),
    switchMap(() => {
      const storedToken = this.tokenStorageService.getToken();
      if (storedToken === undefined) {
        return of(new authActions.LoadFail(new HttpErrorResponse({
          error: new Error('Token not exist in token storage')
        })));
      }
      return this.authService.refreshToken(storedToken.refresh_token)
        .pipe(
          map((token: TokenInterface) => new authActions.StoreToken(token)),
          catchError((err: HttpErrorResponse) => of(new authActions.LoadFail(err)))
        );
    })
  );

  @Effect()
  userInfo$: Observable<Action> = this.actions$.pipe(
    ofType(authActions.AuthActionTypes.UserInfo),
    map((action: authActions.UserInfo) => action),
    switchMap(() => {
      return this.userService.getUserInfo().pipe(
        map((userInfo: UserInfoInterface) => new authActions.UserInfoSuccess(userInfo)),
        catchError((err: HttpErrorResponse) => of(new authActions.LoadFail(err)))
      );
    })
  );

  @Effect()
  storeToken$: Observable<Action> = this.actions$.pipe(
    ofType(authActions.AuthActionTypes.StoreToken),
    map((action: authActions.StoreToken) => action.token),
    mergeMap(token => {
      this.tokenStorageService.saveToken(token);
      return of(new authActions.StoreTokenSuccess());
    })
  );

  @Effect()
  showErrorNotification$: Observable<Action> = this.actions$.pipe(
    ofType(
      authActions.AuthActionTypes.LoadFail
    ),
    map((action: authActions.LoadFail) => action.payload),
    mergeMap(error => of(new authActions.ShowErrorNotification(error.message)))
  );
}
