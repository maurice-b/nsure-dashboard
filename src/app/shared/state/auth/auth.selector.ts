import {createFeatureSelector, createSelector} from '@ngrx/store';
import {AuthStateInterface} from './auth.state.interface';

// Create the Feature Selector. This is the base selector
export const featureSelector = createFeatureSelector<AuthStateInterface>('auth');

export const isAuthenticated = createSelector(
  featureSelector,
  s => (s !== undefined && s.isAuthenticated !== undefined) ? s.isAuthenticated : false
);

export const getToken = createSelector(
  featureSelector,
  s => (s !== undefined && s.token !== undefined) ? s.token : undefined);


export const getAuthState = createSelector(
  featureSelector,
  s => (s === undefined || s.token === undefined || s.retryAttempts === undefined) ? undefined : s);

export const getUserInfo = createSelector(
  featureSelector,
  s => (s.userInfo !== undefined) ? s.userInfo : undefined
);


