import {LocationStateInterface} from './location/location.state.interface';
import {AuthStateInterface} from '@app-shared/state/auth/auth.state.interface';
import {LocationDetailStateInterface} from '@app-shared/state/location-detail/location-detail.state.interface';
import {DeviceStateInterface} from '@app-shared/state/device/device.state.interface';
import {DeviceDetailStateInterface} from '@app-shared/state/device-detail/device-detail.state.interface';
import {DeviceRealtimeStateInterface} from '@app-shared/state/device-realtime/device-realtime.state.interface';

export interface AppStateInterface {
  location: LocationStateInterface;
  locationDetail: LocationDetailStateInterface;
  auth: AuthStateInterface;
  device: DeviceStateInterface;
  deviceDetail: DeviceDetailStateInterface;
  deviceRealtime: DeviceRealtimeStateInterface;
}
