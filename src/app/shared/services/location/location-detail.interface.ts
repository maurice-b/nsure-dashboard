import {DeviceInterface} from './device.interface';
import {ServiceInterface} from './service.interface';

export interface LocationDetailInterface {
  date: string;
  devices: DeviceInterface[];
  health: string;
  messages: string[];
  services: ServiceInterface[];
  nextToken: string;
}

