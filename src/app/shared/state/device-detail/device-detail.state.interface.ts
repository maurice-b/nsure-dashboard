import {DongleDataInterface} from '@app-shared/services/device/dongle-data.interface';

export interface DeviceDetailStateInterface {
  loaded: boolean;
  details: DongleDataInterface;
}
