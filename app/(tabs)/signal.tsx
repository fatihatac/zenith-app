import React from 'react';
import { ScrollView } from 'react-native';
import { SignalCard } from '../../components/features/signal/SignalCard';
import { useSignals } from '../../hooks/useSignals';

export default function SignalScreen() {
  const { signals } = useSignals();

  return (
    <ScrollView className="flex-1 bg-background pt-24 px-margin-mobile pb-32" showsVerticalScrollIndicator={false}>
      {signals.map((signal) => (
        <SignalCard key={signal.id} signal={signal} />
      ))}
    </ScrollView>
  );
}