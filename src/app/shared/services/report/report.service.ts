import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DeviceTypeEnum} from '@app-shared/services/device/device-type.enum';
import {Observable} from 'rxjs';
import {DongleDataInterface} from '@app-shared/services/device/dongle-data.interface';
import {take} from 'rxjs/operators';

const API_URL = 'https://public-api.nsure.cloud/devices/dongle';

// Report
// https://public-api.nsure.cloud/devices/dongle/000F11506BA1/reports/usage/quarter/20200922T000000/20201022T235959/maximum
// https://public-api.nsure.cloud/devices/dongle/000F11506BA1/reports/amount/hour/20201022T000000/20201022T235959
// https://public-api.nsure.cloud/devices/dongle/000F11506BA1/reports/amount/day/20201022T000000/20201022T235959
// https://public-api.nsure.cloud/devices/dongle/000F11506BA1/reports/cost/hour/20201022T000000/20201022T235959


@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient) { }


  public getUsage(dongleId: string): Observable<DongleDataInterface> {
    return this.http.get<DongleDataInterface>(`${API_URL}/${deviceType}/${dongleId}`,
      {
        responseType: 'json'
      }
    ).pipe(
      take(1)
    );
  }
}
