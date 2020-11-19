import {DeviceRealtimeActionTypes, DeviceRealtimeActions} from './device-realtime.actions';
import {DeviceRealtimeStateInterface} from './device-realtime.state.interface';
import {createEntityAdapter, EntityAdapter} from '@ngrx/entity';
import {RealtimeDataInterface} from '@app-shared/services/realtime-data/realtime-data.interface';

// Create Adapter
export const dataItemAdapter: EntityAdapter<RealtimeDataInterface> = createEntityAdapter<RealtimeDataInterface>({
  selectId: (realtimeData: RealtimeDataInterface) => realtimeData.date.toMillis() // Define the select id
});

export const initialState: DeviceRealtimeStateInterface = dataItemAdapter.getInitialState({
});

export function reducer(state = initialState, action: DeviceRealtimeActions): DeviceRealtimeStateInterface {
  switch (action.type) {
    case DeviceRealtimeActionTypes.LoadSuccess: {
      // Clear collection
      // const removedStateObject = dataItemAdapter.removeAll(state);
      // Add new records
      return dataItemAdapter.setOne(action.data, state);
    }

    // case DeviceRealtimeActionTypes.LoadFail: {
    //   return dataItemAdapter.removeAll(state);
    // }

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
