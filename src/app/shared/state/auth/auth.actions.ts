import {HttpErrorResponse} from '@angular/common/http';
import { Action, INIT } from '@ngrx/store';
import {TokenInterface} from '@app-shared/services/token-storage/token.interface';
import {CredentialsInterface} from '@app-shared/services/auth/credentials.interface';
import {UserInfoInterface} from '@app-shared/services/user/user-info.interface';

export enum AuthActionTypes {
  Authenticate = '[Auth] Loading authentication token',
  StoreToken = '[Auth] Authentication token store',
  StoreTokenSuccess = '[Auth] Authentication token store successfully',
  RefreshToken = '[Auth] Loading refresh token',
  UserInfo = '[Auth] Loading user info',
  UserInfoSuccess = '[Auth] Loading user info successfully',

  LoadFail = '[Auth] Load fail',

  ShowErrorNotification = '[Auth] Show error notification',
}


export class Init implements Action {
  readonly type = INIT;
}

export class ShowErrorNotification implements Action {
  readonly type = AuthActionTypes.ShowErrorNotification;

  constructor(public payload: string) {
  }
}

export class Authenticate implements Action {
  readonly type = AuthActionTypes.Authenticate;

  constructor(public credentials: CredentialsInterface) {
  }
}

export class StoreToken implements Action {
  readonly type = AuthActionTypes.StoreToken;

  constructor(public token: TokenInterface) {
  }
}

export class RefreshToken implements Action {
  readonly type = AuthActionTypes.RefreshToken;

  constructor() {
  }
}

export class StoreTokenSuccess implements Action {
  readonly type = AuthActionTypes.StoreTokenSuccess;

  constructor() {
  }
}

export class LoadFail implements Action {
  readonly type = AuthActionTypes.LoadFail;

  constructor(public payload: HttpErrorResponse) {
  }
}

export class UserInfo implements Action {
  readonly type = AuthActionTypes.UserInfo;

  constructor() {
  }
}

export class UserInfoSuccess implements Action {
  readonly type = AuthActionTypes.UserInfoSuccess;

  constructor(public userInfo: UserInfoInterface) {
  }
}


// Union the valid types
export type AuthActions =
  | ShowErrorNotification
  | Authenticate
  | RefreshToken
  | LoadFail
  | StoreToken
  | StoreTokenSuccess
  | Init
  | UserInfo
  | UserInfoSuccess
  ;

