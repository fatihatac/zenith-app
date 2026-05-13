import { useMemo, useCallback, memo } from 'react';
import { Pressable, StyleSheet, Text, View, ViewStyle, TextStyle } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { useThemeContext } from '@/contexts/ThemeContext';
import { useAppearanceStore } from '@/store/appearanceStore';
import { FeedItem } from '@/types/signal';

interface SignalCardProps {
  signal: FeedItem;
  onMarkRead?: () => void;
}

export const SignalCard = memo(({ signal, onMarkRead }: SignalCardProps) => {
  const theme = useThemeContext();
  const { visualEffects } = useAppearanceStore();

  const handlePress = useCallback(async () => {
    await WebBrowser.openBrowserAsync(signal.link, {
      toolbarColor: theme.colors.surface,
      controlsColor: theme.colors.primary,
    });
    onMarkRead?.();
  }, [signal.link, theme, onMarkRead]);

  const formattedTime = useMemo(() => {
    const now = Date.now();
    const diffMs = now - signal.pubDate;
    const diffMin = Math.floor(diffMs / 60000);
    if (diffMin < 1) return 'Just now';
    if (diffMin < 60) return `${diffMin}m ago`;
    const diffH = Math.floor(diffMin / 60);
    if (diffH < 24) return `${diffH}h ago`;
    const date = new Date(signal.pubDate);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[date.getMonth()]} ${date.getDate()}`;
  }, [signal.pubDate]);

  const styles = useMemo(() => StyleSheet.create<SignalCardStyles>({
    card: {
      backgroundColor: theme.colors.surfaceContainerLow,
      borderWidth: 1,
      borderColor: theme.colors.innerStroke,
      borderRadius: theme.roundness.xl,
      padding: theme.spacing.md,
      marginBottom: theme.spacing.sm,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
    },
    sourceName: {
      ...theme.typography.labelCaps,
      color: theme.colors.primary,
      textTransform: 'uppercase',
      lineHeight: 16,
    },
    timestamp: {
      ...theme.typography.labelCaps,
      color: theme.colors.onSurfaceVariant,
      textTransform: 'uppercase',
      lineHeight: 16,
    },
    title: {
      ...theme.typography.titleSm,
      color: theme.colors.primary,
      fontWeight: '600',
      marginBottom: 12,
      lineHeight: 26,
    },
    description: {
      ...theme.typography.bodyMd,
      color: theme.colors.onSurfaceVariant,
      lineHeight: 24,
    },
    unreadDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: theme.colors.primary,
      marginLeft: 8,
    },
  }), [theme]);

  const visualStyle: ViewStyle = visualEffects === 'full' ? {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
    borderColor: 'rgba(255, 255, 255, 0.12)',
  } : {};

  return (
    <Pressable onPress={handlePress} style={({ pressed }) => [
      styles.card,
      visualStyle,
      pressed && { opacity: 0.8 },
    ]}>
      <View style={styles.header}>
        <Text style={styles.sourceName}>{signal.sourceName} · {signal.category}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.timestamp}>{formattedTime}</Text>
          {signal.isRead === false && <View style={styles.unreadDot} />}
        </View>
      </View>
      <Text style={styles.title}>{signal.title}</Text>
      <Text style={styles.description}>{signal.description}</Text>
    </Pressable>
  );
});

interface SignalCardStyles {
  card: ViewStyle;
  header: ViewStyle;
  sourceName: TextStyle;
  timestamp: TextStyle;
  title: TextStyle;
  description: TextStyle;
  unreadDot: ViewStyle;
}
