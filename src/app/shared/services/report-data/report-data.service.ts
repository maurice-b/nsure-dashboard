import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BASE_API_URL} from '@app-shared/const';
import {map, take} from 'rxjs/operators';
import {ReportDataInterface} from '@app-shared/services/report-data/report-data.interface';
import {ReportDateTimeIndicatorType, ReportType} from '@app-shared/types';
import {DateTime} from 'luxon';
import {ResultReportDataInterface} from '@app-shared/services/report-data/result-report-data.interface';

@Injectable({
  providedIn: 'root'
})
export class ReportDataService {


  constructor(private http: HttpClient) {
  }


  public getReportData(
    dongleId: string,
    reportType: ReportType,
    reportDateTimeIndicatorType: ReportDateTimeIndicatorType,
    startDateTime: DateTime,
    endDateTime: DateTime): Observable<ReportDataInterface[]> {

    const startDateTimeUtc = startDateTime.toUTC();
    const endDateTimeUtc = endDateTime.toUTC();

    const startDateTimeString = `${startDateTimeUtc.toFormat('yyyyLLdd')}T${startDateTimeUtc.toFormat('HHmmss')}`;
    const endDateTimeString = `${endDateTimeUtc.toFormat('yyyyLLdd')}T${endDateTimeUtc.toFormat('HHmmss')}`;

    const url = `${BASE_API_URL}/dongle/${dongleId}/reports/${reportType}/${reportDateTimeIndicatorType}/${startDateTimeString}/${endDateTimeString}`;
    return this.http.get<ResultReportDataInterface>(url,
      {
        responseType: 'json'
      }
    ).pipe(
      map(data => {
        if (data === undefined || data.reports === undefined || data.reports.length === 0) {
          return [];
        }

        return data.reports.map(d => {
          return {
            ...d,
            date: DateTime.fromISO(d.date.toString())
          };
        });
      }),
      take(1)
    );
  }
}
