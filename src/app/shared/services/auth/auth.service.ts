import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TokenInterface} from '../token-storage/token.interface';
import {CredentialsInterface} from './credentials.interface';
import {TokenStorageService} from '../token-storage/token-storage.service';
import {DateTime} from 'luxon';
import {map, take} from 'rxjs/operators';
import {USER_API_URL} from '@app-shared/const';

const CLIENT_ID = 'n7LzLOJnYe5AN0g7EGMSsHEKc7yybuUx';
const SCOPE = 'openid email profile offline_access';
const AUDIENCE = 'thuis-platform';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private tokenStorageService: TokenStorageService) {
  }

  public listAuthEndpoints(): string[]{
    return [
      `${USER_API_URL}/oauth/token`
    ];
  }

  public getAuthToken(credentials: CredentialsInterface): Observable<TokenInterface> {
    return this.http.post<TokenInterface>(`${USER_API_URL}/oauth/token`, {
      client_id: `${CLIENT_ID}`,
      grant_type: 'password',
      username: credentials.username,
      password: credentials.password,
      audience: `${AUDIENCE}`,
      scope: `${SCOPE}`
    }, {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }).pipe(
      take(1),
      map(data => {
        data.requestedDateTime = DateTime.local().toMillis();
        return data;
      })
    );
  }

  public refreshToken(refreshToken: string): Observable<TokenInterface> {
    return this.http.post<TokenInterface>(`${USER_API_URL}/oauth/token`, {
      client_id: `${CLIENT_ID}`,
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      scope: `${SCOPE}`
    }, {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }).pipe(
      take(1),
      map(data => {
        data.requestedDateTime = DateTime.local().toMillis();
        return data;
      }),
    );
  }

  public isAuthenticated(): boolean {
    const token = this.tokenStorageService.getToken();

    if (token === undefined || token.requestedDateTime === undefined) {
      return false;
    }

    return this.isValidToken(token);
  }

  public isValidToken(token: TokenInterface): boolean {
    if (token.requestedDateTime === undefined) {
      return false;
    }

    // Check the expiration date time
    const expirationDateTime = DateTime.fromMillis(token.requestedDateTime).plus({
      second: token.expires_in
    });

    return expirationDateTime.toSeconds() >= DateTime.local().toSeconds();
  }

  public logOut(): void {
    this.tokenStorageService.signOut();
  }
}

