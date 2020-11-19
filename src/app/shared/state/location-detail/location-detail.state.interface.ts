import {LocationDetailInterface} from '@app-shared/services/location/location-detail.interface';

export interface LocationDetailStateInterface {
  loaded: boolean;
  details: LocationDetailInterface;
}
