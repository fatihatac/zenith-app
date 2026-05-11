import { MarketAsset } from '@/types/market';
import { IMarketRepository } from '@/interfaces/IMarketRepository';

const MOCK_MARKET_ASSETS: MarketAsset[] = [
  {
    id: '1',
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: '173.50',
    change: '+1.2%',
  },
  {
    id: '2',
    symbol: 'BTC',
    name: 'Bitcoin',
    price: '64,210.00',
    change: '+3.1%',
  },
  {
    id: '3',
    symbol: 'TSLA',
    name: 'Tesla, Inc.',
    price: '162.10',
    change: '-2.4%',
  },
  {
    id: '4',
    symbol: 'NVDA',
    name: 'NVIDIA Corp.',
    price: '885.30',
    change: '+0.8%',
  },
];

export class MarketRepository implements IMarketRepository {
  async getMarketAssets(): Promise<MarketAsset[]> {
    return Promise.resolve(MOCK_MARKET_ASSETS);
  }
}

const marketRepository = new MarketRepository();

export const marketRepo = marketRepository;

export const getMarketAssets = (): Promise<MarketAsset[]> => {
  return marketRepository.getMarketAssets();
};
