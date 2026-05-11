import { useEffect } from 'react';
import { useMarketStore } from '@/store/marketStore';

export const useMarkets = () => {
  const assets = useMarketStore((s) => s.assets);
  const loading = useMarketStore((s) => s.loading);
  const error = useMarketStore((s) => s.error);
  const fetchAssets = useMarketStore((s) => s.fetchAssets);

  useEffect(() => {
    fetchAssets();
  }, [fetchAssets]);

  return { assets, loading, error, refresh: fetchAssets };
};
