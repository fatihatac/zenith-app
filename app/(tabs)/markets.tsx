import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { MarketAssetRow } from '../../components/features/markets/MarketAssetRow';
import { theme } from '../../constants/theme';
import { useMarkets } from '../../hooks/useMarkets';

export default function MarketsScreen() {
    const { assets } = useMarkets();

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

const styles = StyleSheet.create({
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
        backgroundColor: '#1A1A1A',
        borderWidth: 1,
        borderColor: theme.colors.innerStroke,
        borderRadius: theme.roundness.xl,
        overflow: 'hidden',
    },
});