import { VaultItem, VaultStatus } from '../types/vault';

export const getVaultStatus = (): VaultStatus => ({
  title: 'Local Vault',
  status: 'E2E ENCRYPTION ACTIVE',
  isActive: true,
});

export const getVaultItems = (): VaultItem[] => [
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
