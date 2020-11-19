import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {take} from 'rxjs/operators';
import {DevicesInterface} from '@app-shared/services/device/devices.interface';
import {DeviceTypeEnum} from '@app-shared/services/device/device-type.enum';
import {DongleDataInterface} from '@app-shared/services/device/dongle-data.interface';
import {BASE_API_URL} from '@app-shared/const';


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
    return this.http.get<DevicesInterface>(`${BASE_API_URL}`,
      {
        responseType: 'json'
      }
    ).pipe(
      take(1)
    );
  }


  public getDeviceDetails(deviceType: DeviceTypeEnum, dongleId: string): Observable<DongleDataInterface> {
    return this.http.get<DongleDataInterface>(`${BASE_API_URL}/${deviceType}/${dongleId}`,
      {
        responseType: 'json'
      }
    ).pipe(
      take(1)
    );
  }
}
