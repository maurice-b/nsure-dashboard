import {ActionReducerMap} from '@ngrx/store';
import * as LocationReducer from './location/location.reducer';
import * as LocationDetailReducer from './location-detail/location-detail.reducer';
import * as AuthReducer from './auth/auth.reducer';
import * as DeviceReducer from './device/device.reducer';
import * as DeviceDetailReducer from './device-detail/device-detail.reducer';
import * as DeviceRealtimeReducer from './device-realtime/device-realtime.reducer';
import * as ReportDataReducer from './report-data/report-data.reducer';
import {AppStateInterface} from '../state/app.state';

// tslint:disable-next-line:no-any
export const appReducer: ActionReducerMap<AppStateInterface, any> = {
  location: LocationReducer.reducer,
  locationDetail: LocationDetailReducer.reducer,
  auth: AuthReducer.reducer,
  device: DeviceReducer.reducer,
  deviceDetail: DeviceDetailReducer.reducer,
  deviceRealtime: DeviceRealtimeReducer.reducer,
  reportData: ReportDataReducer.reducer
};
