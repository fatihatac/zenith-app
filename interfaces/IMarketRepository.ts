import { MarketAsset } from '@/types/market';

export interface IMarketRepository {
  getMarketAssets(): Promise<MarketAsset[]>;
}
