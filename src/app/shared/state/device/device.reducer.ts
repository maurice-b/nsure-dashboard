import {DeviceActions, DeviceActionTypes} from './device.actions';
import {DeviceStateInterface} from './device.state.interface';
import {DongleInterface} from '../../services/device/dongle.interface';
import {createEntityAdapter, EntityAdapter} from '@ngrx/entity';

// Create Adapter
export const dataItemAdapter: EntityAdapter<DongleInterface> = createEntityAdapter<DongleInterface>({
  selectId: (dongle: DongleInterface) => dongle.dongleID // Define the select id
});

export const initialState: DeviceStateInterface = dataItemAdapter.getInitialState({
  total: 0,
  selected: undefined
});

export function reducer(state = initialState, action: DeviceActions): DeviceStateInterface {
  switch (action.type) {
    case DeviceActionTypes.Load: {
      return {
        ...state,
        selected: undefined
      };
    }
    case DeviceActionTypes.LoadSuccess: {
      // Clear collection
      const removedStateObject = dataItemAdapter.removeAll(state);
      // Add new records
      const newState = dataItemAdapter.setAll(action.data, removedStateObject);

      newState.total = action.data.length;
      return newState;
    }

    case DeviceActionTypes.LoadFail: {
      const removedStateObject = dataItemAdapter.removeAll(state);
      removedStateObject.total = 0;
      return removedStateObject;
    }

    case DeviceActionTypes.SetSelectedDevice: {
      return {
        ...state,
        selected: action.dongleId
      };
    }

    default:
      return state;
  }
}


export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal
} = dataItemAdapter.getSelectors();
