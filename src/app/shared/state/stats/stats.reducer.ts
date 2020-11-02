import {StatsActions, StatsActionTypes} from './stats.actions';
import {StatsStateInterface} from './stats.state.interface';

export const initialState: StatsStateInterface = {
  total: 0
};

export function reducer(state = initialState, action: StatsActions): StatsStateInterface {
  switch (action.type) {
    case StatsActionTypes.LoadSuccess: {
      return {
        ...state
      };
    }

    case StatsActionTypes.LoadFail: {
      return {
        ...state,
        total: 0
      };
    }

    default:
      return state;
  }
}
