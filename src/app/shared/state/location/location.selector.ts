import {createFeatureSelector, createSelector} from '@ngrx/store';
import {LocationStateInterface} from './location.state.interface';
import * as locationReducer from './location.reducer';

// Create the Feature Selector.
export const featureSelector = createFeatureSelector<LocationStateInterface>('location');

export const getTotal = createSelector(
  featureSelector,
  s1 => s1.total || 0
);

export const getData = createSelector(
  featureSelector,
  locationReducer.selectAll
);


