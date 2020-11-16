import {createFeatureSelector, createSelector} from '@ngrx/store';
import {DeviceRealtimeStateInterface} from './device-realtime.state.interface';
import * as deviceRealtimeReducer from './device-realtime.reducer';

// Create the Feature Selector.
export const featureSelector = createFeatureSelector<DeviceRealtimeStateInterface>('deviceRealtime');

export const getData = createSelector(
  featureSelector,
  deviceRealtimeReducer.selectAll
);

export const getLatestData = createSelector(
  getData,
  state => (state !== undefined && state.length > 0) ? state[state.length - 1] : undefined
);


