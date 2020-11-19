import {HttpErrorResponse} from '@angular/common/http';
import {Action} from '@ngrx/store';
import {RealtimeDataInterface} from '../../services/realtime-data/realtime-data.interface';
import {DeviceTypeEnum} from '@app-shared/services/device/device-type.enum';

export enum DeviceRealtimeActionTypes {
  Load = '[Device realtime] Load data from web api',
  LoadSuccess = '[Device realtime] Load succeed',
  LoadFail = '[Device realtime] Load fail',

  ShowErrorNotification = '[Device realtime] Show error notification',
}

export class ShowErrorNotification implements Action {
  readonly type = DeviceRealtimeActionTypes.ShowErrorNotification;

  constructor(public payload: string) {
  }
}

export class Load implements Action {
  readonly type = DeviceRealtimeActionTypes.Load;

  constructor(public deviceType: DeviceTypeEnum, public deviceId: string) {
  }
}

export class LoadSuccess implements Action {
  readonly type = DeviceRealtimeActionTypes.LoadSuccess;

  constructor(public data: RealtimeDataInterface) {
  }
}

export class LoadFail implements Action {
  readonly type = DeviceRealtimeActionTypes.LoadFail;

  constructor(public payload: HttpErrorResponse) {
  }
}


// Union the valid types
export type DeviceRealtimeActions =
  | ShowErrorNotification
  | Load
  | LoadSuccess
  | LoadFail
  ;

