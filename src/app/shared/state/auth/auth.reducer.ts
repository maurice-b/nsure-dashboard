import {AuthActions, AuthActionTypes} from './auth.actions';
import {AuthStateInterface} from './auth.state.interface';

export const initialState: AuthStateInterface = {
  isAuthenticated: false,
  retryAttempts: 0,
  token: {
    requestedDateTime: undefined,
    expires_in: 0,
    access_token: '',
    id_token: '',
    refresh_token: '',
    token_type: ''
  }
};

export function reducer(state = initialState, action: AuthActions): AuthStateInterface {
  switch (action.type) {
    case AuthActionTypes.StoreToken: {
      return {
        ...state,
        token: {...action.token},
        retryAttempts: 0,
        isAuthenticated: true
      };
    }

    case AuthActionTypes.LoadFail: {
      return {
        ...state,
        retryAttempts: 0,
        isAuthenticated: false
      };
    }

    default:
      return state;
  }
}
