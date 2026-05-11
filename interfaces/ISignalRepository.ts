import { SignalIntel } from '@/types/signal';

export interface ISignalRepository {
  getSignals(): Promise<SignalIntel[]>;
}
