import { ActionReducerMap, MetaReducer } from "@ngrx/store";
import { AppState } from "../shared/interfaces/state";
import { isDevMode } from "@angular/core";
import { formReducer, loginReducer, recordReducer, userReducer, vaultReducer } from "./reducers";


export const reducers: ActionReducerMap<AppState> = {
    user: userReducer,
    login: loginReducer,
    records: recordReducer,
    vaults: vaultReducer,
    form: formReducer,
 };


export const metaReducers: MetaReducer<AppState>[] = isDevMode() ? [] : [];

