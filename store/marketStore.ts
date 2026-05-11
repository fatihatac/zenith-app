import { create } from 'zustand';
import { MarketAsset } from '@/types/market';
import { marketRepo } from '@/services/marketService';

interface MarketStoreState {
  assets: MarketAsset[];
  loading: boolean;
  error: Error | null;
  fetchAssets: () => Promise<void>;
}

export const useMarketStore = create<MarketStoreState>((set) => ({
  assets: [],
  loading: false,
  error: null,
  fetchAssets: async () => {
    set({ loading: true, error: null });
    try {
      const assets = await marketRepo.getMarketAssets();
      set({ assets, loading: false });
    } catch (err) {
      set({ error: err instanceof Error ? err : new Error(String(err)), loading: false });
    }
  },
}));
