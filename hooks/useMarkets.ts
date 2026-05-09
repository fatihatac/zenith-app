import { useEffect, useState } from 'react';
import { getMarketAssets } from '../services/marketService';
import { MarketAsset } from '../types/market';

export const useMarkets = () => {
  const [assets, setAssets] = useState<MarketAsset[]>([]);

  useEffect(() => {
    setAssets(getMarketAssets());
  }, []);

  return {
    assets,
  };
};
