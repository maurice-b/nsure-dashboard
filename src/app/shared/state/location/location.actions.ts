import { HttpErrorResponse } from '@angular/common/http';
import { Action } from '@ngrx/store';
import {LocationInterface} from '../../services/location/location.interface';

export enum LocationActionTypes {
  Load = '[Location] Load by source system name',
  LoadSuccess = '[Location] Load succeed',
  LoadFail = '[Location] Load fail',

  ShowErrorNotification = '[Location] Show error notification',
}

export class ShowErrorNotification implements Action {
  readonly type = LocationActionTypes.ShowErrorNotification;

  constructor(public payload: string) {
  }
}

export class Load implements Action {
  readonly type = LocationActionTypes.Load;

  constructor() {
  }
}

export class LoadSuccess implements Action {
  readonly type = LocationActionTypes.LoadSuccess;

  constructor(public data: LocationInterface[]) {
  }
}

export class LoadFail implements Action {
  readonly type = LocationActionTypes.LoadFail;

  constructor(public payload: HttpErrorResponse) {
  }
}


// Union the valid types
export type LocationActions =
  | ShowErrorNotification
  | LoadSuccess
  | LoadFail
  ;

