import {HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';
import * as DeviceDetailActions from './device-detail.actions';
import {DeviceService} from '../../services/device/device.service';
import {DongleDataInterface} from '@app-shared/services/device/dongle-data.interface';

@Injectable()
export class DeviceDetailEffects {

  constructor(
    private actions$: Actions,
    private deviceService: DeviceService
  ) {
  }

  @Effect()
  loadDeviceDetails$: Observable<Action> = this.actions$.pipe(
    ofType(DeviceDetailActions.DeviceDetailActionTypes.Load),
    map((action: DeviceDetailActions.Load) => ({
      deviceId: action.deviceId,
      deviceType: action.deviceType
    })),
    switchMap(payload =>
      this.deviceService.getDeviceDetails(payload.deviceType, payload.deviceId).pipe(
        map((data: DongleDataInterface) =>
          new DeviceDetailActions.LoadSuccess(data)
        ),
        catchError((err: HttpErrorResponse) => of(new DeviceDetailActions.LoadFail(err)))
      )
    )
  );

  @Effect()
  showErrorNotification$: Observable<Action> = this.actions$.pipe(
    ofType(
      DeviceDetailActions.DeviceDetailActionTypes.LoadFail
    ),
    map((action: DeviceDetailActions.LoadFail) => action.payload),
    mergeMap(error => of(new DeviceDetailActions.ShowErrorNotification(error.message)))
  );
}
