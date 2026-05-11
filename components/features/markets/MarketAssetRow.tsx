import { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useThemeContext } from '@/contexts/ThemeContext';
import { MarketAsset } from '@/types/market';

interface MarketAssetRowProps {
  asset: MarketAsset;
  isLast?: boolean;
}

export const MarketAssetRow = ({ asset, isLast }: MarketAssetRowProps) => {
  const theme = useThemeContext();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        row: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: 16,
          paddingHorizontal: 16,
        },
        borderBottom: {
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.innerStroke,
        },
        symbol: {
          ...theme.typography.titleSm,
          color: theme.colors.primary,
          fontWeight: '600',
        },
        name: {
          ...theme.typography.labelCaps,
          color: theme.colors.onSurfaceVariant,
          textTransform: 'none',
          marginTop: 2,
          letterSpacing: 0,
        },
        priceContainer: {
          alignItems: 'flex-end',
        },
        price: {
          ...theme.typography.titleSm,
          color: theme.colors.primary,
          fontWeight: '600',
        },
        change: {
          ...theme.typography.labelCaps,
          fontWeight: '700',
          marginTop: 2,
        },
      }),
    [theme]
  );
  const isPositive = asset.change.startsWith('+');

  return (
    <View style={[styles.row, !isLast && styles.borderBottom]}>
      <View>
        <Text style={styles.symbol}>{asset.symbol}</Text>
        <Text style={styles.name}>{asset.name}</Text>
      </View>
      <View style={styles.priceContainer}>
        <Text style={styles.price}>{asset.price}</Text>
        <Text style={[styles.change, { color: isPositive ? theme.colors.emerald : theme.colors.error }]}>
          {asset.change}
        </Text>
      </View>
    </View>
  );
};
