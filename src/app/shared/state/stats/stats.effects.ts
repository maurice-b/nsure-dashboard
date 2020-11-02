import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {map, mergeMap} from 'rxjs/operators';
import * as statsActions from './stats.actions';

@Injectable()
export class StatsEffects {

  constructor(
    private actions$: Actions
  ) {
  }

  // @Effect()
  // loadBySourceSystemName$: Observable<Action> = this.actions$.pipe(
  //   ofType(statsActions.StatsActionTypes.Load),
  //   map((action: statsActions.Load) => action.sourceSystemName),
  //   mergeMap(sourceSystemName => {
  //     return of(true);
  //     //
  //     // return this.kpiService.getKPIsBySourceSystemName(sourceSystemName).pipe(
  //     //   map((data) => {
  //     //     return new statsActions.LoadSuccess(data.data, data.total || data.data.length);
  //     //   }
  //     //   ),
  //     //   catchError((err: HttpErrorResponse) => of(new statsActions.LoadFail(err)))
  //     // );
  //   }
  //   )
  // );

  @Effect()
  showErrorNotification$: Observable<Action> = this.actions$.pipe(
    ofType(
      statsActions.StatsActionTypes.LoadFail
    ),
    map((action: statsActions.LoadFail) => action.payload),
    mergeMap(error => of(new statsActions.ShowErrorNotification(error.message)))
  );
}
