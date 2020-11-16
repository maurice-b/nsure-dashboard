import {HttpErrorResponse} from '@angular/common/http';
import {Action} from '@ngrx/store';
import {LocationDetailInterface} from '@app-shared/services/location/location-detail.interface';

export enum LocationDetailActionTypes {
  Load = '[Location detail] Load by location id',
  LoadSuccess = '[Location detail] Load succeed',
  LoadFail = '[Location detail] Load fail',

  ShowErrorNotification = '[Location detail] Show error notification',
}

export class ShowErrorNotification implements Action {
  readonly type = LocationDetailActionTypes.ShowErrorNotification;

  constructor(public payload: string) {
  }
}

export class Load implements Action {
  readonly type = LocationDetailActionTypes.Load;

  constructor(public locationId: string) {
  }
}

export class LoadSuccess implements Action {
  readonly type = LocationDetailActionTypes.LoadSuccess;

  constructor(public data: LocationDetailInterface) {
  }
}

export class LoadFail implements Action {
  readonly type = LocationDetailActionTypes.LoadFail;

  constructor(public payload: HttpErrorResponse) {
  }
}


// Union the valid types
export type LocationDetailActions =
  | ShowErrorNotification
  | Load
  | LoadSuccess
  | LoadFail
  ;

