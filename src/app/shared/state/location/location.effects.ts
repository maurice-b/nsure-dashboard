import {HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap} from 'rxjs/operators';
import * as locationActions from './location.actions';
import {LocationService} from '../../services/location/location.service';
import {LocationInterface} from '../../services/location/location.interface';

@Injectable()
export class LocationEffects {

  constructor(
    private actions$: Actions,
    private locationService: LocationService
  ) {
  }

  @Effect()
  loadLocations$: Observable<Action> = this.actions$.pipe(
    ofType(locationActions.LocationActionTypes.Load),
    mergeMap(() => {
        return this.locationService.getLocations().pipe(
          map((data: LocationInterface[]) => {
              return new locationActions.LoadSuccess(data);
            }
          ),
          catchError((err: HttpErrorResponse) => of(new locationActions.LoadFail(err)))
        );
      }
    )
  );

  @Effect()
  showErrorNotification$: Observable<Action> = this.actions$.pipe(
    ofType(
      locationActions.LocationActionTypes.LoadFail
    ),
    map((action: locationActions.LoadFail) => action.payload),
    mergeMap(error => of(new locationActions.ShowErrorNotification(error.message)))
  );
}
