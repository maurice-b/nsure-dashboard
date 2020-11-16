import {HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';
import * as DeviceActions from './device.actions';
import * as DeviceDetailActions from '../device-detail/device-detail.actions';
import * as DeviceRealtimeActions from '../device-realtime/device-realtime.actions';
import {DeviceService} from '@app-shared/services/device/device.service';
import {DevicesInterface} from '@app-shared/services/device/devices.interface';
import {DeviceTypeEnum} from '@app-shared/services/device/device-type.enum';

@Injectable()
export class DeviceEffects {

  constructor(
    private actions$: Actions,
    private deviceService: DeviceService
  ) {
  }

  @Effect()
  loadDevices$: Observable<Action> = this.actions$.pipe(
    ofType(DeviceActions.DeviceActionTypes.Load),
    switchMap(() =>
      this.deviceService.getDevices().pipe(
        map((data: DevicesInterface) => new DeviceActions.LoadSuccess(data.dongles)),
        catchError((err: HttpErrorResponse) => of(new DeviceActions.LoadFail(err)))
      )
    )
  );

  @Effect()
  loadSelectedDeviceDetails$: Observable<Action> = this.actions$.pipe(
    ofType(DeviceActions.DeviceActionTypes.SetSelectedDevice),
    map((action: DeviceActions.SetSelectedDevice) => action.dongleId),
    mergeMap((dongleId: string) => [
      new DeviceDetailActions.Load(DeviceTypeEnum.dongle, dongleId),
      new DeviceRealtimeActions.Load(DeviceTypeEnum.dongle, dongleId),
    ])
  );

  @Effect()
  showErrorNotification$: Observable<Action> = this.actions$.pipe(
    ofType(
      DeviceActions.DeviceActionTypes.LoadFail
    ),
    map((action: DeviceActions.LoadFail) => action.payload),
    switchMap(error => of(new DeviceActions.ShowErrorNotification(error.message)))
  );
}
