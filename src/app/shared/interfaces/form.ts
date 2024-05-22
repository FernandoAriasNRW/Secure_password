import { AppError } from "./auth";

export interface FormState {
  loading: boolean;
  error: AppError;
  show: boolean;
}
