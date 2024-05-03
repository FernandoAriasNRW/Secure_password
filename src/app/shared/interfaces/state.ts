import { Login } from "./auth";
import { Record } from "./records";
import { Vault } from "./vaults";

export interface LoginAction {
  type: string;
  payload: Login;
}

export interface State {
  user: string;
  records: Record[];
  loading: boolean;
  login: boolean;
  vaults: Vault[];
}
