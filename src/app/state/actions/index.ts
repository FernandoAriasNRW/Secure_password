import { createAction, props } from '@ngrx/store';
import { AppError, User } from '../../shared/interfaces/auth';
import { Record } from '../../shared/interfaces/records';

export const login = createAction(
  '[Login Page] Login',
  props<{ email: string, password: string }>()
);

export const loginError = createAction(
  '[Login Page] Login Error',
  props<{ error: AppError }>()
);

export const user = createAction(
  '[Home Page] User',
  props<{ user: User }>()
);

export const getUser = createAction(
  '[Home Page] Get User',
  props<{ user: string }>()
);

export const getRecords = createAction(
  '[Home Page] Get Records'
);

export const records = createAction(
  '[Home Page] Records',
  props<{ records: Record[] }>()
);

export const recordsFailed = createAction(
  '[Home Page] Records Failed',
  props<{ error: Error }>()
);

export const getRecordsFailed = createAction(
  '[Home Page] Get Records Failed',
  props<{ error: Error }>()
);

export const vaults = createAction(
  '[Home Page] Vaults',
  props<{ vaults: Record[] }>()
);

export const loading = createAction(
  '[Home Page] Loading',
  props<{ loading: boolean }>()
);

export const loginAction = createAction(
  '[Login Page] Login Success',
  props<{ login: boolean }>()
);

export const selectedRecord = createAction(
  '[Home Page] Selected Record',
  props<{ record: Record | null }>()
);

export const showForm = createAction(
  '[Form Field] Show',
  props<{ show: boolean }>()
);

export const addNewRecord = createAction(
  '[Add New Record] Add New Record',
  props<{ name: string }>()
);

export const deleteNewRecord = createAction(
  '[Delete New Record] Delete New Record',
  props<{ name: string }>()
);

export const updateRecord = createAction(
  '[Update Record] Update Record',
  props<{ record: Record }>()
);
