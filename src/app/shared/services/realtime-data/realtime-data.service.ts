import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map, take} from 'rxjs/operators';
import {DeviceTypeEnum} from '@app-shared/services/device/device-type.enum';

import {DateTime} from 'luxon';
import {RealtimeDataInterface} from '@app-shared/services/realtime-data/realtime-data.interface';
import {BASE_API_URL} from '@app-shared/const';

// https://public-api.nsure.cloud/devices/
// https://public-api.nsure.cloud/devices/dongle/000F11506BA1
// https://public-api.nsure.cloud/devices/dongle/000F11506BA1/realtime

@Injectable({
  providedIn: 'root'
})
export class RealtimeDataService {

  public constructor(private http: HttpClient) {
  }

  public getRealtimeData(deviceType: DeviceTypeEnum, dongleId: string): Observable<RealtimeDataInterface> {
    return this.http.get<RealtimeDataInterface>(`${BASE_API_URL}/${deviceType}/${dongleId}/realtime`,
      {
        responseType: 'json'
      }
    ).pipe(
      take(1),
      map(data => {
        return {
          ...data,
          date: DateTime.fromISO(data.date.toString())
        };
      })
    );
  }
}
