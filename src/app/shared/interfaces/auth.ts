export interface Login {
  email: string;
  password: string;
}

export interface LoginState {
  isLoggedIn: boolean;
  loading: boolean;
}

export interface UserState {
  user: User;
  loading: boolean;
}

export interface User {
  id: string;
  name: string;
  lastname: string;
  email: string;
  password: string;
  role: string;
}

export interface LoginResponse {
  token: string;
  userId: string;
  role: string;
}
