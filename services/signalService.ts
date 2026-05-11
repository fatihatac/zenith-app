import { SignalIntel } from '@/types/signal';
import { ISignalRepository } from '@/interfaces/ISignalRepository';

const MOCK_SIGNALS: SignalIntel[] = [
  {
    id: '1',
    category: 'Global Markets',
    timestamp: '10m ago',
    title: 'Federal Reserve Signals Potential Rate Cuts Ahead',
    description: 'Central bank officials indicate a shift in monetary policy might be on the horizon as inflation shows signs of cooling consistently over the past quarter.',
  },
  {
    id: '2',
    category: 'Tech Sector',
    timestamp: '1h ago',
    title: 'Next-Gen AI Models Show Breakthrough Capabilities',
    description: 'Researchers publish findings on a new neural network architecture that significantly reduces compute requirements while maintaining state-of-the-art performance.',
  },
  {
    id: '3',
    category: 'Geopolitics',
    timestamp: '3h ago',
    title: 'New Trade Agreement Reshapes Supply Chains',
    description: 'A landmark pact signed today is expected to reroute significant manufacturing capacity, prioritizing regional resilience over traditional cost-optimization strategies.',
  },
];

export class SignalRepository implements ISignalRepository {
  async getSignals(): Promise<SignalIntel[]> {
    return Promise.resolve(MOCK_SIGNALS);
  }
}

const signalRepository = new SignalRepository();

export const signalRepo = signalRepository;

export const getSignals = (): Promise<SignalIntel[]> => {
  return signalRepository.getSignals();
};
