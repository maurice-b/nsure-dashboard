import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, Subject, throwError} from 'rxjs';
import {catchError, switchMap, take} from 'rxjs/operators';
import {TokenStorageService} from '../services/token-storage/token-storage.service';
import {AuthService} from '../services/auth/auth.service';
import {Router} from '@angular/router';

enum STATUS_CODE {
  UNAUTHORIZED = 401,
  FORBIDDEN = 403
}

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private refreshSubject: Subject<any> = new Subject<any>();
  private ignoreEndpoints: string[] = [];

  constructor(
    private router: Router,
    private tokenStorageService: TokenStorageService,
    private authService: AuthService,
  ) {
    this.ignoreEndpoints = [...this.authService.listAuthEndpoints()];
  }


  private static checkTokenIsExpiredError(error: HttpErrorResponse): boolean {
    return (
      error.status !== undefined &&
      error.status === STATUS_CODE.UNAUTHORIZED &&
      error.statusText === 'Unauthorized'
    );
  }

  private static updateHeader(req: HttpRequest<object>, accessToken: string): HttpRequest<object> {
    req = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${accessToken}`)
    });
    return req;
  }

  private ifTokenExpired(refreshToken: string): Subject<any> {
    this.refreshSubject.subscribe({
      complete: () => {
        this.refreshSubject = new Subject<any>();
      }
    });
    if (this.refreshSubject.observers.length === 1) {
      this.authService.refreshToken(refreshToken)
        .pipe(
          take(1)
        ).subscribe(this.refreshSubject);
    }
    return this.refreshSubject;
  }

  public logOut(): void {
    this.authService.logOut();
    this.router.navigate(['login']);
  }

  public intercept(
    req: HttpRequest<object>,
    next: HttpHandler
  ): Observable<HttpEvent<object>> {
    const ignoreEndpoint = this.ignoreEndpoints.findIndex(endpoint => endpoint === req.url);
    if (ignoreEndpoint !== -1) {
      return next.handle(req);
    }

    const token = this.tokenStorageService.getToken();
    if (token === undefined) {
      return throwError('Token not available');
    }

    req = AuthInterceptor.updateHeader(req, token.access_token);

    return next.handle(req).pipe(
      catchError((error, caught) => {
        if (error instanceof HttpErrorResponse) {

          // if (!AuthInterceptor.checkTokenIsExpiredError(error)) {
          //   return throwError(error);
          // }

          return this.ifTokenExpired(token.refresh_token).pipe(
            switchMap(() =>
              next.handle(AuthInterceptor.updateHeader(req, token.access_token))),
            catchError((httpErrorResponse: HttpErrorResponse) => {
              this.tokenStorageService.signOut();
              this.logOut();
              return throwError(httpErrorResponse.message);
            })
          );
        }
        return caught;
      })
    );
  }
}
