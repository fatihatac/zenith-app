import { useEffect } from 'react';
import { useVaultStore } from '@/store/vaultStore';

export const useVault = () => {
  const items = useVaultStore((s) => s.items);
  const status = useVaultStore((s) => s.status);
  const loading = useVaultStore((s) => s.loading);
  const error = useVaultStore((s) => s.error);
  const fetchVaultData = useVaultStore((s) => s.fetchVaultData);

  useEffect(() => {
    fetchVaultData();
  }, [fetchVaultData]);

  return { items, status, loading, error, refresh: fetchVaultData };
};
