import { VaultItem, VaultStatus } from '@/types/vault';
import { IVaultRepository } from '@/interfaces/IVaultRepository';

const MOCK_VAULT_STATUS: VaultStatus = {
  title: 'Local Vault',
  status: 'E2E ENCRYPTION ACTIVE',
};

const MOCK_VAULT_ITEMS: VaultItem[] = [
  {
    id: '1',
    title: 'Production API Keys',
    subtitle: 'Last synced: 2h ago',
    icon: 'key',
  },
  {
    id: '2',
    title: 'Recovery Seeds',
    subtitle: 'Offline only',
    icon: 'file-text',
  },
  {
    id: '3',
    title: 'Identity Documents',
    subtitle: '4 encrypted files',
    icon: 'folder-open',
  },
];

export class VaultRepository implements IVaultRepository {
  async getVaultStatus(): Promise<VaultStatus> {
    return Promise.resolve(MOCK_VAULT_STATUS);
  }

  async getVaultItems(): Promise<VaultItem[]> {
    return Promise.resolve(MOCK_VAULT_ITEMS);
  }
}

const vaultRepository = new VaultRepository();

export const vaultRepo = vaultRepository;

export const getVaultStatus = (): Promise<VaultStatus> => {
  return vaultRepository.getVaultStatus();
};

export const getVaultItems = (): Promise<VaultItem[]> => {
  return vaultRepository.getVaultItems();
};
