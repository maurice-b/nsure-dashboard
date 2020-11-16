import {HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';
import {DeviceService} from '@app-shared/services/device/device.service';
import * as DeviceRealtimeActions from '../device-realtime/device-realtime.actions';
import {RealtimeDataInterface} from '../../services/device/realtime-data.interface';

@Injectable()
export class DeviceRealtimeEffects {

  constructor(
    private actions$: Actions,
    private deviceService: DeviceService
  ) {
  }


  @Effect()
  loadRealtimeData$: Observable<Action> = this.actions$.pipe(
    ofType(DeviceRealtimeActions.DeviceRealtimeActionTypes.Load),
    map((action: DeviceRealtimeActions.Load) => ({
      deviceId: action.deviceId,
      deviceType: action.deviceType
    })),
    switchMap(payload =>
      this.deviceService.getRealtimeData(payload.deviceType, payload.deviceId).pipe(
        map((data: RealtimeDataInterface) =>
          new DeviceRealtimeActions.LoadSuccess(data)
        ),
        catchError((err: HttpErrorResponse) => of(new DeviceRealtimeActions.LoadFail(err)))
      )
    )
  );

  @Effect()
  showErrorNotification$: Observable<Action> = this.actions$.pipe(
    ofType(
      DeviceRealtimeActions.DeviceRealtimeActionTypes.LoadFail
    ),
    map((action: DeviceRealtimeActions.LoadFail) => action.payload),
    mergeMap(error => of(new DeviceRealtimeActions.ShowErrorNotification(error.message)))
  );
}
