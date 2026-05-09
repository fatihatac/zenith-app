import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SignalCard } from '../../components/features/signal/SignalCard';
import { theme } from '../../constants/theme';
import { useSignals } from '../../hooks/useSignals';

export default function SignalScreen() {
    const { signals } = useSignals();

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}
        >
            {signals.map((signal) => (
                <SignalCard key={signal.id} signal={signal} />
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    contentContainer: {
        paddingTop: 20,
        paddingHorizontal: theme.spacing.marginMobile, // 24px
        paddingBottom: 120,
    },
});