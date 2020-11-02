import {StatsEffects} from './stats/stats.effects';
import {LocationEffects} from './location/location.effects';
import {AuthEffects} from './auth/auth.effects';
import {LocationDetailEffects} from './location-detail/location-detail.effects';

export const appEffects = [
  StatsEffects,
  LocationEffects,
  LocationDetailEffects,
  AuthEffects
];
