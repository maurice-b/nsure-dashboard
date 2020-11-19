import {EntityState} from '@ngrx/entity';
import {RealtimeDataInterface} from '../../services/realtime-data/realtime-data.interface';

export interface DeviceRealtimeStateInterface extends EntityState<RealtimeDataInterface> {
}
