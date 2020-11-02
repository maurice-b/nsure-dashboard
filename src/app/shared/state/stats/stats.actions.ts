import { HttpErrorResponse } from '@angular/common/http';
import { Action } from '@ngrx/store';

export enum StatsActionTypes {
  Load = '[Stats] Load by source system name',
  LoadSuccess = '[Stats] Load succeed',
  LoadFail = '[Stats] Load fail',

  ShowErrorNotification = '[Stats] Show error notification',
}

export class ShowErrorNotification implements Action {
  readonly type = StatsActionTypes.ShowErrorNotification;

  constructor(public payload: string) {
  }
}

export class Load implements Action {
  readonly type = StatsActionTypes.Load;

  constructor(public sourceSystemName: string) {
  }
}

export class LoadSuccess implements Action {
  readonly type = StatsActionTypes.LoadSuccess;

  constructor() {
  }
}

export class LoadFail implements Action {
  readonly type = StatsActionTypes.LoadFail;

  constructor(public payload: HttpErrorResponse) {
  }
}


// Union the valid types
export type StatsActions =
  | ShowErrorNotification
  | LoadSuccess
  | LoadFail
  ;

