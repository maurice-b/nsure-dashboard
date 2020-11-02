import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map, take} from "rxjs/operators";
import {LocationsInterface} from "./locations.interface";
import {LocationInterface} from "./location.interface";
import {LocationDetailInterface} from "./location-detail.interface";

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
    return this.http.get<LocationDetailInterface>(`${API_URL}/locations/${locationId}/status`,
      {
        responseType: 'json'
      }
    ).pipe(
      take(1)
    );
  }
}

