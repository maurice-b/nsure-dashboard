import {ActionReducerMap} from '@ngrx/store';
import * as locationReducer from './location/location.reducer';
import * as locationDetailReducer from './location-detail/location-detail.reducer';
import * as authReducer from './auth/auth.reducer';
import * as deviceReducer from './device/device.reducer';
import * as deviceDetailReducer from './device-detail/device-detail.reducer';
import * as deviceRealtimeReducer from './device-realtime/device-realtime.reducer';
import {AppStateInterface} from '../state/app.state';

// tslint:disable-next-line:no-any
export const appReducer: ActionReducerMap<AppStateInterface, any> = {
  location: locationReducer.reducer,
  locationDetail: locationDetailReducer.reducer,
  auth: authReducer.reducer,
  device: deviceReducer.reducer,
  deviceDetail: deviceDetailReducer.reducer,
  deviceRealtime: deviceRealtimeReducer.reducer
};
