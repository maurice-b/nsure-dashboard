import {DateInterface} from '@app-shared/services/report-data/date.interface';

export interface RealtimeDataInterface extends DateInterface {
  consumption: number;
  delivery: number;
}
