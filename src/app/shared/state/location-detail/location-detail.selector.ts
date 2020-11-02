import {createFeatureSelector, createSelector} from '@ngrx/store';
import {LocationStateInterface} from './location.state.interface';
import * as locationReducer from './location-detail.reducer';

// Create the Feature Selector.
export const locationDetailSelector = createFeatureSelector<LocationStateInterface>('location-detail');

export const getTotal = createSelector(
  locationDetailSelector,
  s1 => s1.total || 0
);

export const getData = createSelector(
  locationDetailSelector,
  locationReducer.selectAll
);


