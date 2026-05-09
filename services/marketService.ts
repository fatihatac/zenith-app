import { MarketAsset } from '../types/market';

export const getMarketAssets = (): MarketAsset[] => [
  {
    id: '1',
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: '173.50',
    change: '+1.2%',
    isPositive: true,
  },
  {
    id: '2',
    symbol: 'BTC',
    name: 'Bitcoin',
    price: '64,210.00',
    change: '+3.1%',
    isPositive: true,
  },
  {
    id: '3',
    symbol: 'TSLA',
    name: 'Tesla, Inc.',
    price: '162.10',
    change: '-2.4%',
    isPositive: false,
  },
  {
    id: '4',
    symbol: 'NVDA',
    name: 'NVIDIA Corp.',
    price: '885.30',
    change: '+0.8%',
    isPositive: true,
  },
];
