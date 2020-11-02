import {StatsStateInterface} from './stats/stats.state.interface';
import {LocationStateInterface} from './location/location.state.interface';
import {AuthStateInterface} from '@app-shared/state/auth/auth.state.interface';

export interface AppStateInterface {
  stats: StatsStateInterface;
  location: LocationStateInterface;
  auth: AuthStateInterface;
}
