import { useEffect } from 'react';
import { useSignalStore } from '@/store/signalStore';

export const useSignals = () => {
  const signals = useSignalStore((s) => s.signals);
  const loading = useSignalStore((s) => s.loading);
  const error = useSignalStore((s) => s.error);
  const fetchSignals = useSignalStore((s) => s.fetchSignals);

  useEffect(() => {
    fetchSignals();
  }, [fetchSignals]);

  return { signals, loading, error, refresh: fetchSignals };
};
