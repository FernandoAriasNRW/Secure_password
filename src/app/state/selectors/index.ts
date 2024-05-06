import { createSelector } from "@ngrx/store";
import { AppState } from "../../shared/interfaces/state";
import { LoginState, UserState } from "../../shared/interfaces/auth";
import { RecordState } from "../../shared/interfaces/records";
import { VaultState } from "../../shared/interfaces/vaults";

export const selectUser = (state: AppState) => state.user;

export const selectRecords = (state: AppState) => state.records;

export const selectLogin = (state: AppState) => state.login;

export const selectVaults = (state: AppState) => state.vaults;

export const selectUserInfo = createSelector( selectUser, (state: UserState) => state.user);

export const selectRecordList = createSelector( selectRecords, (state: RecordState) => state.records);

export const selectVaultList = createSelector( selectVaults, (state: VaultState) => state.vaults);

export const selectLoading = createSelector(
  selectUser,
  selectRecords,
  selectLogin,
  selectVaults,
  (user: UserState, records: RecordState, login: LoginState, vaults: VaultState) => user.loading || records.loading || login.loading || vaults.loading
)
