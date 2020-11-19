import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpSentEvent} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject, throwError} from 'rxjs';
import {catchError, filter, finalize, map, switchMap, take, tap} from 'rxjs/operators';
import {TokenStorageService} from '../services/token-storage/token-storage.service';
import {AuthService} from '../services/auth/auth.service';
import {Router} from '@angular/router';
import {TokenInterface} from '@app-shared/services/token-storage/token.interface';
import {tokenName} from '@angular/compiler';

enum STATUS_CODE {
  UNAUTHORIZED = 401,
  FORBIDDEN = 403
}

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private tokenStorageService: TokenStorageService,
    private authService: AuthService,
  ) {
    this.ignoreEndpoints = [...this.authService.listAuthEndpoints()];
  }

  private ignoreEndpoints: string[] = [];

  private refreshTokenInProgress = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  private static addAuthenticationToken(request: HttpRequest<any>, accessToken: string): HttpRequest<any> {
    if (!accessToken) {
      return request;
    }

    request = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${accessToken}`)
    });

    return request;
  }

  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    if (!req.headers.has('Content-Type')) {
      req = req.clone({
        headers: req.headers.set('Content-Type', 'application/json')
      });
    }

    const ignoreEndpoint = this.ignoreEndpoints.findIndex(endpoint => endpoint === req.url);
    if (ignoreEndpoint !== -1) {
      return next.handle(req);
    }

    const token = this.tokenStorageService.getToken();
    if (token === undefined) {
      return throwError('Token not available');
    }

    req = AuthInterceptor.addAuthenticationToken(req, token.id_token);



    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error && error.status === 401) {

          // 401 errors are most likely going to be because we have an expired token that we need to refresh.
          if (this.refreshTokenInProgress) {
            // If refreshTokenInProgress is true, we will wait until refreshTokenSubject has a non-null value
            // which means the new token is ready and we can retry the request again
            return this.refreshTokenSubject.pipe(
              filter(result => result !== null),
              take(1),
              switchMap((newAccessToken: string) =>
                next.handle(AuthInterceptor.addAuthenticationToken(req, newAccessToken)))
            );
          } else {
            this.refreshTokenInProgress = true;

            // Set the refreshTokenSubject to null so that subsequent API calls will wait until the new token has been retrieved
            this.refreshTokenSubject.next(null);

            return this.authService.refreshToken(token.refresh_token).pipe(
              filter(data => data !== undefined),
              // tap(data => this.tokenStorageService.saveToken(data)),
              // map(data => data.access_token),
              switchMap((tokenData: TokenInterface) => {
                this.tokenStorageService.saveToken(tokenData);

                this.refreshTokenSubject.next(tokenData.access_token);
                return next.handle(AuthInterceptor.addAuthenticationToken(req, token.access_token));
              }),
              catchError((httpErrorResponse: HttpErrorResponse) => {
                // Resign in
                // this.authService.getAuthToken(this.tokenStorageService.)
                this.tokenStorageService.signOut();
                this.logOut();
                return throwError(httpErrorResponse.message);
              }),
              // When the call to refreshToken completes we reset the refreshTokenInProgress to false
              // for the next time the token needs to be refreshed
              finalize(() => this.refreshTokenInProgress = false)
            );
          }
        } else {
          return throwError(error);
        }
      })
    );
  }

  public logOut(): void {
    this.authService.logOut();
    this.router.navigate(['login']);
  }
}
