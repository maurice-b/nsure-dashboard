import {createFeatureSelector, createSelector} from '@ngrx/store';
import {LocationDetailStateInterface} from './location-detail.state.interface';

// Create the Feature Selector.
export const locationDetailSelector = createFeatureSelector<LocationDetailStateInterface>('locationDetail');

export const getLocationDetail = createSelector(
  locationDetailSelector,
  (s: LocationDetailStateInterface) => (s !== undefined && s.loaded) ? s.details : undefined
);


