import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  createFeatureSelector,
  createReducer,
  createSelector,
  on
} from '@ngrx/store';
import { login, loginAction, records, user, vaults } from '../actions';
import { LoginState, User, UserState } from '../../shared/interfaces/auth';
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
    loading: false
  },
  records: {
    records: [],
    loading: false
  },
  login: {
    isLoggedIn: false,
    loading: false
  },
  vaults: {
    vaults: [],
    loading: false
  }
};

export const loginReducer = createReducer(
  initialState.login,
  on(loginAction, (state: LoginState) => {
    return { ...state, loading: false, isLoggedIn: true };
  }),
  on(login, (state: LoginState) => {
    return { ...state, loading: true, isLoggedIn: false };
  })
);

export const userReducer = createReducer(
  initialState.user,
  on(user, (state: UserState, {user}) => {
    return { ...state, user: user, loading: false };
  })
);

export const recordReducer = createReducer(
  initialState.records,
  on(records, (state: RecordState, {records}) => {
    return { ...state, records: records, loading: false };
  })
);

export const vaultReducer = createReducer(
  initialState.vaults,
  on(vaults, (state: VaultState, {vaults}) => {
    return { ...state, vaults: vaults, loading: false };
  })
);
