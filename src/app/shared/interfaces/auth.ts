export interface Login {
  email: string;
  password: string;
}

export interface LoginState {
  isLoggedIn: boolean;
  loading: boolean;
  error: AppError;
}

export interface UserState {
  user: User;
  loading: boolean;
  avatar: string;
  error: AppError;
}

export interface User {
  id: string;
  name: string;
  lastname: string;
  email: string;
  password: string;
  role: string;
  avatar: string;
  avatarId: string;
}

export interface LoginResponse {
  token: string;
  userId: string;
  role: string;
  expiresIn: string;
}

export interface AppError {
  message: string;
  status: number;
}
