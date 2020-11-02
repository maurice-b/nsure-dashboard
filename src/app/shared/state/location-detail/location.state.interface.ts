import {LocationInterface} from '../../services/location/location.interface';
import {EntityState} from '@ngrx/entity';

export interface LocationStateInterface extends EntityState<LocationInterface>{
  total: number;
}
