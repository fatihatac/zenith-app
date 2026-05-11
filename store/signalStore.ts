import { create } from 'zustand';
import { SignalIntel } from '@/types/signal';
import { signalRepo } from '@/services/signalService';

interface SignalStoreState {
  signals: SignalIntel[];
  loading: boolean;
  error: Error | null;
  fetchSignals: () => Promise<void>;
}

export const useSignalStore = create<SignalStoreState>((set) => ({
  signals: [],
  loading: false,
  error: null,
  fetchSignals: async () => {
    set({ loading: true, error: null });
    try {
      const signals = await signalRepo.getSignals();
      set({ signals, loading: false });
    } catch (err) {
      set({ error: err instanceof Error ? err : new Error(String(err)), loading: false });
    }
  },
}));
