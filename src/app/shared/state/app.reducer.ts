import {ActionReducerMap} from '@ngrx/store';
import * as statsReducer from './stats/stats.reducer';
import * as locationReducer from './location/location.reducer';
import * as authReducer from './auth/auth.reducer';
import {AppStateInterface} from '../state/app.state';

// tslint:disable-next-line:no-any
export const appReducer: ActionReducerMap<AppStateInterface, any> = {
  stats: statsReducer.reducer,
  location: locationReducer.reducer,
  auth: authReducer.reducer
};
