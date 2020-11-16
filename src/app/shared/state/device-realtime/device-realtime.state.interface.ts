import {EntityState} from '@ngrx/entity';
import {RealtimeDataInterface} from '../../services/device/realtime-data.interface';

export interface DeviceRealtimeStateInterface extends EntityState<RealtimeDataInterface> {
}
