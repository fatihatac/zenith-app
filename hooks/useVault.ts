import { useEffect, useState } from 'react';
import { getVaultItems, getVaultStatus } from '../services/vaultService';
import { VaultItem, VaultStatus } from '../types/vault';

export const useVault = () => {
  const [items, setItems] = useState<VaultItem[]>([]);
  const [status, setStatus] = useState<VaultStatus | null>(null);

  useEffect(() => {
    // Simulate data fetching
    setItems(getVaultItems());
    setStatus(getVaultStatus());
  }, []);

  return {
    items,
    status,
  };
};
