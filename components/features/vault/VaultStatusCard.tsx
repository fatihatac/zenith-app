import { useMemo, useRef, useEffect } from 'react';
import { Lock } from 'lucide-react-native';
import { Animated, Easing, StyleSheet, Text, View, ViewStyle, TextStyle } from 'react-native';
import { useThemeContext } from '@/contexts/ThemeContext';
import { useAppearanceStore } from '@/store/appearanceStore';
import { VaultStatus } from '@/types/vault';

interface VaultStatusCardProps {
  status: VaultStatus;
}

export const VaultStatusCard = ({ status }: VaultStatusCardProps) => {
  const theme = useThemeContext();
  const { visualEffects } = useAppearanceStore();
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (visualEffects === 'full') {
      const pulse = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, { toValue: 0.6, duration: 1500, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
          Animated.timing(pulseAnim, { toValue: 1, duration: 1500, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        ])
      );
      pulse.start();
      return () => pulse.stop();
    }
  }, [visualEffects]);

  const styles = useMemo(() => StyleSheet.create<VaultStatusCardStyles>({
    card: {
      backgroundColor: theme.colors.surfaceContainerLow,
      borderWidth: 1,
      borderColor: theme.colors.innerStroke,
      borderRadius: theme.roundness.xl,
      padding: theme.spacing.md,
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.sm + 4,
      marginBottom: 8,
    },
    iconContainer: {
      backgroundColor: theme.colors.innerStroke,
      padding: theme.spacing.sm,
      borderRadius: theme.roundness.full,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: theme.colors.emeraldMuted,
    },
    textContainer: {
      flexDirection: 'column',
      gap: theme.spacing.unit,
    },
    title: {
      ...theme.typography.titleSm,
      fontSize: 20,
      color: theme.colors.primary,
      fontWeight: '500',
      lineHeight: 26,
    },
    statusText: {
      ...theme.typography.labelCaps,
      color: theme.colors.emerald,
      fontWeight: '600',
      letterSpacing: 1,
      lineHeight: 16,
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
    <View style={[styles.card, visualStyle]}>
      <View style={styles.iconContainer}>
        <Lock color={theme.colors.emerald} size={24} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{status.title}</Text>
        <Animated.View style={{ opacity: pulseAnim }}>
          <Text style={styles.statusText}>{status.status}</Text>
        </Animated.View>
      </View>
    </View>
  );
};

interface VaultStatusCardStyles {
  card: ViewStyle;
  iconContainer: ViewStyle;
  textContainer: ViewStyle;
  title: TextStyle;
  statusText: TextStyle;
}