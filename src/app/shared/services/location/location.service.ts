import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map, take} from 'rxjs/operators';
import {LocationsInterface} from './locations.interface';
import {LocationInterface} from './location.interface';
import {LocationDetailInterface} from './location-detail.interface';

const API_URL = 'https://public-api.nsure.cloud/v4';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  public constructor(private http: HttpClient) {
  }

  public getLocations(): Observable<LocationInterface[]> {
    return this.http.get<LocationsInterface>(`${API_URL}/locations`,
      {
        responseType: 'json'
      }
    ).pipe(
      take(1),
      map((data: LocationsInterface) => {
        return data.locations;
      })
    );
  }

  public getLocationDetails(locationId: string): Observable<LocationDetailInterface> {
    // https://public-api.nsure.cloud/v4/locations/4c84e7c4-a14e-46f3-91b7-b0c8216d94c8/status?token=
    return this.http.get<LocationDetailInterface>(`${API_URL}/locations/${locationId}/status?token=`,
      {
        responseType: 'json'
      }
    ).pipe(
      take(1)
    );
  }
}

