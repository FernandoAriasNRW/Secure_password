import { AppError } from "./auth";

export interface Record {
  id: string;
  name: string;
  description: string;
  username: string;
  password: string;
  url: string;
  vaultId: string;
  userId: string;
}

export interface RecordState {
  records: Record[];
  loading: boolean;
  selectedRecord: Record | null;
  error: AppError;
  newRecord: Record | null;
}
