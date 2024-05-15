import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  createFeatureSelector,
  createReducer,
  createSelector,
  on
} from '@ngrx/store';
import { getRecords, getUser, login, loginAction, loginError, records, user, vaults } from '../actions';
import { AppError, LoginState, User, UserState } from '../../shared/interfaces/auth';
import { RecordState } from '../../shared/interfaces/records';
import { VaultState } from '../../shared/interfaces/vaults';
import { AppState } from '../../shared/interfaces/state';

export const initialState: AppState = {
  user: {
    user: {
      id: "",
      name: "",
      lastname: "",
      email: "",
      password: "",
      role: ""
    },
    loading: false,
    error: {
      message: "",
      status: 0
    },
  },
  records: {
    records: [],
    loading: false,
    error: {
      message: "",
      status: 0
    },
  },
  login: {
    isLoggedIn: false,
    loading: false,
    error: {
      message: "",
      status: 0
    },
  },
  vaults: {
    vaults: [],
    loading: false,
    error: {
      message: "",
      status: 0
    },
  }
};

export const loginReducer = createReducer(
  initialState.login,
  on(loginAction, (state: LoginState, action) => {
    return { ...state, loading: false, isLoggedIn: action.login };
  }),
  on(login, (state: LoginState) => {
    return { ...state, loading: true, isLoggedIn: false };
  }),
  on(loginError, (state: LoginState, action) => {
    return { ...state, loading: false, error: action.error };
  })
);

export const userReducer = createReducer(
  initialState.user,
  on(user, (state: UserState, {user}) => {
    return { ...state, user: user, loading: false };
  }),
  on(getUser, (state: UserState) => {
    return { ...state, loading: false };
  })
);

export const recordReducer = createReducer(
  initialState.records,
  on(records, (state: RecordState, {records}) => {
    console.log('Records: ', records);
    return { ...state, records: records, loading: false };
  }),
  on(getRecords, (state: RecordState) => {
    return {...state, loading: false};
  })
);

export const vaultReducer = createReducer(
  initialState.vaults,
  on(vaults, (state: VaultState, {vaults}) => {
    return { ...state, vaults: vaults, loading: false };
  })
);
