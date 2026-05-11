import { useMemo } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SignalCard } from '@/components/features/signal/SignalCard';
import { useThemeContext } from '@/contexts/ThemeContext';
import { useSignals } from '@/hooks/useSignals';

export default function SignalScreen() {
    const { signals } = useSignals();
    const theme = useThemeContext();
    const styles = useMemo(() => StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.background,
        },
        contentContainer: {
            paddingTop: 20,
            paddingHorizontal: theme.spacing.marginMobile,
            paddingBottom: 120,
        },
    }), [theme]);

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

