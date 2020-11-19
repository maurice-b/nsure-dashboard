import {ReportDataActions, ReportDataActionTypes} from './report-data.actions';
import {ReportDataStateInterface} from './report-data.state.interface';
import {LocationInterface} from '../../services/location/location.interface';
import {createEntityAdapter, EntityAdapter} from '@ngrx/entity';
import {ReportDataInterface} from '@app-shared/services/report-data/report-data.interface';

// Create Adapter
export const dataItemAdapter: EntityAdapter<ReportDataInterface> = createEntityAdapter<ReportDataInterface>({
  selectId: (location: ReportDataInterface) => location.date.toMillis() // Define the select id
});

export const initialState: ReportDataStateInterface = dataItemAdapter.getInitialState({
  total: 0
});

export function reducer(state = initialState, action: ReportDataActions): ReportDataStateInterface {
  switch (action.type) {
    case ReportDataActionTypes.LoadSuccess: {
      // Clear collection
      const removedStateObject = dataItemAdapter.removeAll(state);
      // Add new records
      const newState = dataItemAdapter.setAll(action.data, removedStateObject);

      newState.total = action.data.length;
      return newState;
    }

    case ReportDataActionTypes.LoadFail: {
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
