export interface Vault {
  id: string;
  name: string;
  description: string;
}

export interface VaultState {
  vaults: Vault[];
  loading: boolean;
}
