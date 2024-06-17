import {
  createReducer,
  on
} from '@ngrx/store';
import { addNewRecord, deleteNewRecord, getRecords, getUser, login, loginAction, loginError, recordLoading, records, selectedRecord, showForm, uploadAvatarSuccess, user, vaults } from '../actions';
import { AppError, LoginState, User, UserState } from '../../shared/interfaces/auth';
import { RecordState } from '../../shared/interfaces/records';
import { VaultState } from '../../shared/interfaces/vaults';
import { AppState } from '../../shared/interfaces/state';
import { FormState } from '../../shared/interfaces/form';

export const initialState: AppState = {
  user: {
    user: {
      id: "",
      name: "",
      lastname: "",
      email: "",
      password: "",
      role: "",
      avatar: "",
      avatarId: ""
    },
    avatar: "",
    loading: false,
    error: {
      message: "",
      status: 0
    },
  },
  records: {
    records: [],
    loading: false,
    selectedRecord: null,
    error: {
      message: "",
      status: 0
    },
    newRecord:  null,
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
  },
  form: {
    loading: false,
    error: {
      message: "",
      status: 0
    },
    show: false,
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
  }),
  on(uploadAvatarSuccess, (state: UserState, { avatar, avatarId }) => {
    return {
     ...state,
      user: {
       ...state.user,
        avatar: avatar,
        avatarId: avatarId,
      },
      avatar: avatar,
      loading: false
    };
  })
);

export const recordReducer = createReducer(
  initialState.records,
  on(records, (state: RecordState, {records}) => {
    return { ...state, records: records, loading: false };
  }),
  on(getRecords, (state: RecordState) => {
    return {...state, loading: false};
  }),
  on(selectedRecord, (state: RecordState, { record })  => {
    return { ...state, loading: false, selectedRecord: record };
  }),
  on(addNewRecord, (state: RecordState, {record}) => {


    console.log('Reducer Record: ', record);
    return { ...state, loading: false, selectedRecord: record, newRecord: record, records: [ ...state.records, record ] };
  }),
  on(deleteNewRecord, (state: RecordState, { name }) => {
    return {...state, loading: false, newRecord: null, selectedRecord: null, records: [ ...state.records.filter(record => record.name !== name) ]};
  }),
  on(recordLoading, (state: RecordState, { loading })  => {
    return { ...state, loading };
  }),
);

export const vaultReducer = createReducer(
  initialState.vaults,
  on(vaults, (state: VaultState, {vaults}) => {
    return { ...state, vaults: vaults, loading: false };
  })
);

export const formReducer = createReducer(
  initialState.form,
  on(showForm, (state: FormState, { show }) => {
    return { ...state, show: show, loading: false };
  }),
)
