import { AppError } from "./auth";

export interface Record {
  id: string;
  name: string;
  description: string;
  username: string;
  password: string;
}

export interface RecordState {
  records: Record[];
  loading: boolean;
  error: AppError;
}
