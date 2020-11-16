import {HttpErrorResponse} from '@angular/common/http';
import {Action} from '@ngrx/store';
import {DeviceTypeEnum} from '@app-shared/services/device/device-type.enum';
import {DongleDataInterface} from '@app-shared/services/device/dongle-data.interface';

export enum DeviceDetailActionTypes {
  Load = '[Device detail] Load by device id',
  LoadSuccess = '[Device detail] Load succeed',
  LoadFail = '[Device detail] Load fail',

  ShowErrorNotification = '[Device detail] Show error notification',
}

export class ShowErrorNotification implements Action {
  readonly type = DeviceDetailActionTypes.ShowErrorNotification;

  constructor(public payload: string) {
  }
}

export class Load implements Action {
  readonly type = DeviceDetailActionTypes.Load;

  constructor(public deviceType: DeviceTypeEnum, public deviceId: string) {
  }
}

export class LoadSuccess implements Action {
  readonly type = DeviceDetailActionTypes.LoadSuccess;

  constructor(public data: DongleDataInterface) {
  }
}

export class LoadFail implements Action {
  readonly type = DeviceDetailActionTypes.LoadFail;

  constructor(public payload: HttpErrorResponse) {
  }
}

// Union the valid types
export type DeviceDetailActions =
  | ShowErrorNotification
  | Load
  | LoadSuccess
  | LoadFail
  ;

