import {HttpErrorResponse} from '@angular/common/http';
import {Action} from '@ngrx/store';
import {ReportDataInterface} from '@app-shared/services/report-data/report-data.interface';
import {ReportDateTimeIndicatorType, ReportType} from '@app-shared/types';
import {DateTime} from 'luxon';

export enum ReportDataActionTypes {
  Load = '[Report data] Load data from web api',
  LoadSuccess = '[Report data] Load succeed',
  LoadFail = '[Report data] Load fail',

  ShowErrorNotification = '[Report data] Show error notification',
}

export class ShowErrorNotification implements Action {
  readonly type = ReportDataActionTypes.ShowErrorNotification;

  constructor(public payload: string) {
  }
}

export class Load implements Action {
  readonly type = ReportDataActionTypes.Load;

  constructor(public dongleId: string,
              public reportType: ReportType,
              public reportDateTimeIndicatorType: ReportDateTimeIndicatorType,
              public startDateTime: DateTime,
              public endDateTime: DateTime) {
  }
}

export class LoadSuccess implements Action {
  readonly type = ReportDataActionTypes.LoadSuccess;

  constructor(public data: ReportDataInterface[]) {
  }
}

export class LoadFail implements Action {
  readonly type = ReportDataActionTypes.LoadFail;

  constructor(public payload: HttpErrorResponse) {
  }
}


// Union the valid types
export type ReportDataActions =
  | ShowErrorNotification
  | Load
  | LoadSuccess
  | LoadFail
  ;

