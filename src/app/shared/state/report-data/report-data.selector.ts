import {createFeatureSelector, createSelector} from '@ngrx/store';
import {ReportDataStateInterface} from './report-data.state.interface';
import * as locationReducer from './report-data.reducer';

// Create the Feature Selector.
export const featureSelector = createFeatureSelector<ReportDataStateInterface>('reportData');

export const getTotal = createSelector(
  featureSelector,
  s1 => s1.total || 0
);

export const getData = createSelector(
  featureSelector,
  locationReducer.selectAll
);


