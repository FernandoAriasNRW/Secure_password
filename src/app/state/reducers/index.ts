import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { State } from '../../shared/interfaces/state';
import { login } from '../actions';

export const initialState: State = {
  user: '',
  records: [],
  loading: false,
  login: false,
  vaults: []
};

export const reducers: ActionReducerMap<any> = {
 };


export const metaReducers: MetaReducer<any>[] = isDevMode() ? [] : [];
