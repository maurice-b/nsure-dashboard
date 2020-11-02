import {LocationDetailActions, LocationActionTypes} from './location-detail.actions';
import {LocationStateInterface} from './location.state.interface';
import {LocationInterface} from '../../services/location/location.interface';
import {createEntityAdapter, EntityAdapter} from '@ngrx/entity';

// Create Adapter
export const dataItemAdapter: EntityAdapter<LocationInterface> = createEntityAdapter<LocationInterface>({
  selectId: (location: LocationInterface) => location.locationId // Define the select id
});

export const initialState: LocationStateInterface = dataItemAdapter.getInitialState({
  total: null
});

export function reducer(state = initialState, action: LocationDetailActions): LocationStateInterface {
  switch (action.type) {
    case LocationActionTypes.LoadSuccess: {
      // Clear collection
      const removedStateObject = dataItemAdapter.removeAll(state);
      // Add new records
      const newState = dataItemAdapter.setAll(action.data, removedStateObject);

      newState.total = action.data.length;
      return newState;
    }

    case LocationActionTypes.LoadFail: {
      const removedStateObject = dataItemAdapter.removeAll(state);
      removedStateObject.total = 0;
      return removedStateObject;
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
