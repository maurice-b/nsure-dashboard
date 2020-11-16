import {EntityState} from '@ngrx/entity';
import {DongleInterface} from '../../services/device/dongle.interface';

export interface DeviceStateInterface extends EntityState<DongleInterface> {
  total: number;
  selected: string | undefined;
}
