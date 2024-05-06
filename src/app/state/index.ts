import { ActionReducerMap, MetaReducer } from "@ngrx/store";
import { AppState } from "../shared/interfaces/state";
import { isDevMode } from "@angular/core";
import { loginReducer, recordReducer, userReducer, vaultReducer } from "./reducers";


export const reducers: ActionReducerMap<AppState> = {
    user: userReducer,
    login: loginReducer,
    records: recordReducer,
    vaults: vaultReducer
 };


export const metaReducers: MetaReducer<AppState>[] = isDevMode() ? [] : [];

