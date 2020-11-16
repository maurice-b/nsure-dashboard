import {DateTime} from 'luxon';

export interface RealtimeDataInterface {
  consumption: number;
  date: DateTime;
  delivery: number;
}
