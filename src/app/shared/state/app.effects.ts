import {LocationEffects} from './location/location.effects';
import {AuthEffects} from './auth/auth.effects';
import {LocationDetailEffects} from './location-detail/location-detail.effects';
import {DeviceEffects} from '@app-shared/state/device/device.effects';
import {DeviceDetailEffects} from '@app-shared/state/device-detail/device-detail.effects';
import {DeviceRealtimeEffects} from '@app-shared/state/device-realtime/device-realtime.effects';
import {ReportDataEffects} from '@app-shared/state/report-data/report-data.effects';

export const appEffects = [
  LocationEffects,
  LocationDetailEffects,
  AuthEffects,
  DeviceEffects,
  DeviceDetailEffects,
  DeviceRealtimeEffects,
  ReportDataEffects
];
