import {createFeatureSelector, createSelector} from '@ngrx/store';
import {DeviceDetailStateInterface} from './device-detail.state.interface';

// Create the Feature Selector.
export const deviceDetailSelector = createFeatureSelector<DeviceDetailStateInterface>('deviceDetail');

export const getDetail = createSelector(
  deviceDetailSelector,
  (s: DeviceDetailStateInterface) => (s !== undefined && s.details !== undefined && s.loaded) ? s.details : undefined
);


