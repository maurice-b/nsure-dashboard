import {LocationDetailActions, LocationDetailActionTypes} from './location-detail.actions';
import {LocationDetailStateInterface} from './location-detail.state.interface';

export const initialState: LocationDetailStateInterface = {
  loaded: false,
  details: {
    date: '',
    devices: [],
    health: '',
    messages: [],
    nextToken: '',
    services: []
  }
};

export function reducer(state = initialState, action: LocationDetailActions): LocationDetailStateInterface {
  switch (action.type) {
    case LocationDetailActionTypes.Load: {
      return {
        ...state,
        loaded: false
      };
    }
    case LocationDetailActionTypes.LoadSuccess: {
      return {
        ...state,
        details: {...action.data},
        loaded: true
      };
    }

    case LocationDetailActionTypes.LoadFail: {
      return {
        ...state,
        ...initialState
      };
    }

    default:
      return state;
  }
}
