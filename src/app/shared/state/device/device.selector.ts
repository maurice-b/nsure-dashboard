import {createFeatureSelector, createSelector} from '@ngrx/store';
import {DeviceStateInterface} from './device.state.interface';
import * as locationReducer from './device.reducer';
import {DongleInterface} from '@app-shared/services/device/dongle.interface';

// Create the Feature Selector.
export const featureSelector = createFeatureSelector<DeviceStateInterface>('device');

export const getData = createSelector(
  featureSelector,
  locationReducer.selectAll
);

export const getSelected = createSelector(
  featureSelector,
  getData,
  (state: DeviceStateInterface, dataCollection: DongleInterface[]) => {
    if (state !== undefined && state.selected !== undefined && dataCollection !== undefined && dataCollection.length > 0) {
      return dataCollection.find(d => d.dongleID === state.selected);
    }

    return undefined;
  }
);


