import { HttpErrorResponse } from '@angular/common/http';
import { Action } from '@ngrx/store';
import {LocationInterface} from '../../services/location/location.interface';
import {DeviceInterface} from '@app-shared/services/location/device.interface';
import {DevicesInterface} from '@app-shared/services/device/devices.interface';
import {DongleInterface} from '@app-shared/services/device/dongle.interface';

export enum DeviceActionTypes {
  Load = '[Device] Load data from web api',
  LoadSuccess = '[Device] Load succeed',
  LoadFail = '[Device] Load fail',

  SetSelectedDevice = '[Device] Set selected device',

  ShowErrorNotification = '[Device] Show error notification',
}

export class ShowErrorNotification implements Action {
  readonly type = DeviceActionTypes.ShowErrorNotification;

  constructor(public payload: string) {
  }
}

export class Load implements Action {
  readonly type = DeviceActionTypes.Load;

  constructor() {
  }
}

export class LoadSuccess implements Action {
  readonly type = DeviceActionTypes.LoadSuccess;

  constructor(public data: DongleInterface[]) {
  }
}

export class LoadFail implements Action {
  readonly type = DeviceActionTypes.LoadFail;

  constructor(public payload: HttpErrorResponse) {
  }
}

export class SetSelectedDevice implements Action {
  readonly type = DeviceActionTypes.SetSelectedDevice;

  constructor(public dongleId: string) {
  }
}

// Union the valid types
export type DeviceActions =
  | ShowErrorNotification
  | Load
  | LoadSuccess
  | LoadFail
  | SetSelectedDevice
  ;

