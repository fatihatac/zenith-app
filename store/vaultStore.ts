import { create } from 'zustand';
import { VaultItem, VaultStatus } from '@/types/vault';
import { vaultRepo } from '@/services/vaultService';

interface VaultStoreState {
  items: VaultItem[];
  status: VaultStatus | null;
  loading: boolean;
  error: Error | null;
  fetchVaultData: () => Promise<void>;
}

export const useVaultStore = create<VaultStoreState>((set) => ({
  items: [],
  status: null,
  loading: false,
  error: null,
  fetchVaultData: async () => {
    set({ loading: true, error: null });
    try {
      const [items, status] = await Promise.all([
        vaultRepo.getVaultItems(),
        vaultRepo.getVaultStatus(),
      ]);
      set({ items, status, loading: false });
    } catch (err) {
      set({ error: err instanceof Error ? err : new Error(String(err)), loading: false });
    }
  },
}));
