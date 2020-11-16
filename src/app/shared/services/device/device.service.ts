import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map, take} from 'rxjs/operators';
import {DevicesInterface} from '@app-shared/services/device/devices.interface';
import {DeviceTypeEnum} from '@app-shared/services/device/device-type.enum';
import {DongleDataInterface} from '@app-shared/services/device/dongle-data.interface';
import {RealtimeDataInterface} from '@app-shared/services/device/realtime-data.interface';
import {DateTime} from 'luxon';

const API_URL = 'https://public-api.nsure.cloud/devices';

// https://public-api.nsure.cloud/devices/
// https://public-api.nsure.cloud/devices/dongle/000F11506BA1
// https://public-api.nsure.cloud/devices/dongle/000F11506BA1/realtime

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  public constructor(private http: HttpClient) {
  }

  public getDevices(): Observable<DevicesInterface> {
    return this.http.get<DevicesInterface>(`${API_URL}`,
      {
        responseType: 'json'
      }
    ).pipe(
      take(1)
    );
  }


  public getDeviceDetails(deviceType: DeviceTypeEnum, dongleId: string): Observable<DongleDataInterface> {
    return this.http.get<DongleDataInterface>(`${API_URL}/${deviceType}/${dongleId}`,
      {
        responseType: 'json'
      }
    ).pipe(
      take(1)
    );
  }

  public getRealtimeData(deviceType: DeviceTypeEnum, dongleId: string): Observable<RealtimeDataInterface> {
    return this.http.get<RealtimeDataInterface>(`${API_URL}/${deviceType}/${dongleId}/realtime`,
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
