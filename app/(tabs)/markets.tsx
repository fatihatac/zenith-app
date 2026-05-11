import { useMemo } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { MarketAssetRow } from '@/components/features/markets/MarketAssetRow';
import { useThemeContext } from '@/contexts/ThemeContext';
import { useMarkets } from '@/hooks/useMarkets';

export default function MarketsScreen() {
    const { assets } = useMarkets();
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
        listContainer: {
            backgroundColor: theme.colors.surfaceContainerLow,
            borderWidth: 1,
            borderColor: theme.colors.innerStroke,
            borderRadius: theme.roundness.xl,
            overflow: 'hidden',
        },
    }), [theme]);

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.listContainer}>
                {assets.map((asset, index) => (
                    <MarketAssetRow
                        key={asset.id}
                        asset={asset}
                        isLast={index === assets.length - 1}
                    />
                ))}
            </View>
        </ScrollView>
    );
}

