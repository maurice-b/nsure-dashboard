import {Injectable} from '@angular/core';
import {TokenInterface} from './token.interface';
import {UserInfoInterface} from '../user/user-info.interface';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor(
  ) {
  }

  public signOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: TokenInterface): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, JSON.stringify(token));
  }

  public getToken(): TokenInterface | undefined {
    const tokenString = sessionStorage.getItem(TOKEN_KEY);

    if (tokenString === null) {
      return undefined;
    }

    return JSON.parse(tokenString) as TokenInterface;
  }

  public saveUser(user: UserInfoInterface): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUserInfo(): UserInfoInterface | undefined {
    const userString = sessionStorage.getItem(USER_KEY);

    if (userString === null) {
      return undefined;
    }

    return JSON.parse(userString) as UserInfoInterface;
  }
}
