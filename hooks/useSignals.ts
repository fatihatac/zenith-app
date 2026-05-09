import { useEffect, useState } from 'react';
import { getSignals } from '../services/signalService';
import { SignalIntel } from '../types/signal';

export const useSignals = () => {
  const [signals, setSignals] = useState<SignalIntel[]>([]);

  useEffect(() => {
    setSignals(getSignals());
  }, []);

  return {
    signals,
  };
};
