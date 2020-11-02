import {createFeatureSelector, createSelector} from '@ngrx/store';
import {StatsStateInterface} from './stats.state.interface';

// Create the Feature Selector. This is the base selector
export const featureSelector = createFeatureSelector<StatsStateInterface>('stats');

export const getTotal = createSelector(
  featureSelector,
  s1 => s1.total || 0
);

