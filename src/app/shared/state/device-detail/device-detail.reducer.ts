import {DeviceDetailActions, DeviceDetailActionTypes} from './device-detail.actions';
import {DeviceDetailStateInterface} from './device-detail.state.interface';

export const initialState: DeviceDetailStateInterface = {
  loaded: false,
  details: {
    electricityCost: 0,
    electricityCostLow: 0,
    electricityTarget: 0,
    firmwareVersion: '',
    gasCost: 0,
    gasTarget: 0,
    macAddress: '',
    name: '',
    solar: undefined,
    solarTarget: undefined,
    timezone: ''
  }
};

export function reducer(state = initialState, action: DeviceDetailActions): DeviceDetailStateInterface {
  switch (action.type) {
    case DeviceDetailActionTypes.Load: {
      return {
        ...state,
        loaded: false
      };
    }
    case DeviceDetailActionTypes.LoadSuccess: {
      return {
        ...state,
        details: {...action.data},
        loaded: true
      };
    }

    case DeviceDetailActionTypes.LoadFail: {
      return {
        ...state,
        ...initialState
      };
    }

    default:
      return state;
  }
}
