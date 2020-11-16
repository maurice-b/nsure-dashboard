import {LocationDetailInterface} from '@app-shared/services/location/location-detail.interface';

// tslint:disable-next-line:no-empty-interface
export interface LocationDetailStateInterface {
  loaded: boolean;
  details: LocationDetailInterface;
}
