import { VaultItem, VaultStatus } from '@/types/vault';

export interface IVaultRepository {
  getVaultStatus(): Promise<VaultStatus>;
  getVaultItems(): Promise<VaultItem[]>;
}
