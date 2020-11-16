import {HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';
import * as LocationDetailActions from './location-detail.actions';
import {LocationService} from '../../services/location/location.service';
import {LocationDetailInterface} from '@app-shared/services/location/location-detail.interface';

@Injectable()
export class LocationDetailEffects {

  constructor(
    private actions$: Actions,
    private locationService: LocationService
  ) {
  }

  @Effect()
  loadLocationDetails$: Observable<Action> = this.actions$.pipe(
    ofType(LocationDetailActions.LocationDetailActionTypes.Load),
    map((action: LocationDetailActions.Load) => action.locationId),
    switchMap((locationId: string) =>
      this.locationService.getLocationDetails(locationId).pipe(
        map((data: LocationDetailInterface) =>
          new LocationDetailActions.LoadSuccess(data)
        ),
        catchError((err: HttpErrorResponse) => of(new LocationDetailActions.LoadFail(err)))
      )
    )
  );

  @Effect()
  showErrorNotification$: Observable<Action> = this.actions$.pipe(
    ofType(
      LocationDetailActions.LocationDetailActionTypes.LoadFail
    ),
    map((action: LocationDetailActions.LoadFail) => action.payload),
    mergeMap(error => of(new LocationDetailActions.ShowErrorNotification(error.message)))
  );
}
