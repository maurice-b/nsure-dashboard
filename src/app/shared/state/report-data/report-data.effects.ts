import {HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap} from 'rxjs/operators';
import * as ReportDataActions from './report-data.actions';
import {ReportDataInterface} from '@app-shared/services/report-data/report-data.interface';
import {ReportDataService} from '@app-shared/services/report-data/report-data.service';

@Injectable()
export class ReportDataEffects {

  constructor(
    private actions$: Actions,
    private reportDataService: ReportDataService
  ) {
  }

  @Effect()
  loadReportData$: Observable<Action> = this.actions$.pipe(
    ofType(ReportDataActions.ReportDataActionTypes.Load),
    map((action: ReportDataActions.Load) => ({
      dongleId: action.dongleId,
      reportType: action.reportType,
      reportDateTimeIndicatorType: action.reportDateTimeIndicatorType,
      startDateTime: action.startDateTime,
      endDateTime: action.endDateTime
    })),
    mergeMap(inputData =>
      this.reportDataService.getReportData(
        inputData.dongleId,
        inputData.reportType,
        inputData.reportDateTimeIndicatorType,
        inputData.startDateTime,
        inputData.endDateTime
      ).pipe(
        map((data: ReportDataInterface[]) => new ReportDataActions.LoadSuccess(data)),
        catchError((err: HttpErrorResponse) => of(new ReportDataActions.LoadFail(err)))
      )
    )
  );

  @Effect()
  showErrorNotification$: Observable<Action> = this.actions$.pipe(
    ofType(
      ReportDataActions.ReportDataActionTypes.LoadFail
    ),
    map((action: ReportDataActions.LoadFail) => action.payload),
    mergeMap(error => of(new ReportDataActions.ShowErrorNotification(error.message)))
  );
}
