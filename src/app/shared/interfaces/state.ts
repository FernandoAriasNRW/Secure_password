import { Login, LoginState, User, UserState } from "./auth";
import { FormState } from "./form";
import { Record, RecordState } from "./records";
import { Vault, VaultState } from "./vaults";

export interface LoginAction {
  type: string;
  payload: Login;
}

export interface AppState {
  user: UserState;
  records: RecordState;
  login: LoginState;
  vaults: VaultState;
  form: FormState;
}
