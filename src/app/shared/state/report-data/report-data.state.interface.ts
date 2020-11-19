import {EntityState} from '@ngrx/entity';
import {ReportDataInterface} from '@app-shared/services/report-data/report-data.interface';

export interface ReportDataStateInterface extends EntityState<ReportDataInterface> {
  total: number;
}
