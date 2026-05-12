import { usePathname, useRouter } from 'expo-router';
import { Lock, X } from 'lucide-react-native';
import {
  Animated,
  Dimensions,
  Easing,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SIDEBAR_ITEMS } from '@/constants/navigation';
import { useThemeContext } from '@/contexts/ThemeContext';
import { useMemo, useRef, useEffect } from 'react';
import { useAppearanceStore } from '@/store/appearanceStore';
import { SidebarItem } from './SidebarItem';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const theme = useThemeContext();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const pathname = usePathname();
  const { visualEffects } = useAppearanceStore();
  const closeScale = useRef(new Animated.Value(1)).current;

  const createPressIn = (anim: Animated.Value) => () => {
    if (visualEffects === 'full') {
      Animated.spring(anim, { toValue: 0.96, useNativeDriver: true }).start();
    }
  };
  const createPressOut = (anim: Animated.Value) => () => {
    if (visualEffects === 'full') {
      Animated.spring(anim, { toValue: 1, friction: 3, useNativeDriver: true }).start();
    }
  };
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

  const handleNavigation = (route: string) => {
    onClose(); // KRİTİK: Modal'ı kapat ki yeni ekranı görebilelim!
    router.push(route as any);
  };

  const isActive = (route: string) => pathname === route;

  return (
    <Modal
      visible={isOpen}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent={true}
    >
      <View style={styles.modalContainer}>
        <Pressable style={styles.backdrop} onPress={onClose} />

        <View
          style={[
            styles.drawer,
            {
              top: insets.top,
              height: SCREEN_HEIGHT - insets.top
            }
          ]}
        >
          <View style={styles.header}>
            <View>
              <Text style={styles.brandTitle}>
                ZENITH <Text style={styles.proText}>PRO</Text>
              </Text>
              <View style={styles.statusRow}>
                <Animated.View style={[styles.statusDot, { opacity: pulseAnim }]} />
                <Text style={styles.statusText}>E2E Encryption Active</Text>
              </View>
            </View>
            <Pressable onPress={onClose} style={styles.closeButton} onPressIn={createPressIn(closeScale)} onPressOut={createPressOut(closeScale)}>
              <Animated.View style={{ transform: [{ scale: closeScale }] }}>
                <X color={theme.colors.onSurfaceVariant} size={24} />
              </Animated.View>
            </Pressable>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollArea}>
            <View style={styles.navGroup}>
              {SIDEBAR_ITEMS.map((item) => {
                if (item.expandableContent) {
                  return (
                    <View key={item.route} style={isActive(item.route) ? styles.activeSection : undefined}>
                      <SidebarItem
                        icon={item.icon}
                        label={item.label}
                        active={isActive(item.route)}
                        onPress={() => handleNavigation(item.route)}
                      />
                      {isActive(item.route) && (
                        <View style={styles.telemetryCard}>
                          <Text style={styles.telemetryTitle}>{item.expandableContent.title}</Text>
                          <Text style={styles.telemetryContent}>{item.expandableContent.content}</Text>
                        </View>
                      )}
                    </View>
                  );
                }
                return (
                  <SidebarItem
                    key={item.route}
                    icon={item.icon}
                    label={item.label}
                    active={isActive(item.route)}
                    onPress={() => handleNavigation(item.route)}
                  />
                );
              })}
            </View>
          </ScrollView>

          <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 20) }]}>
            <Pressable style={styles.lockButton} onPress={onClose}>
              <Lock color={theme.colors.onSurfaceVariant} size={18} strokeWidth={2} />
              <Text style={styles.lockText}>Lock Vault & Exit</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

interface SidebarStyles {
  modalContainer: ViewStyle;
  backdrop: ViewStyle;
  drawer: ViewStyle;
  header: ViewStyle;
  brandTitle: TextStyle;
  proText: TextStyle;
  statusRow: ViewStyle;
  statusDot: ViewStyle;
  statusText: TextStyle;
  closeButton: ViewStyle;
  scrollArea: ViewStyle;
  navGroup: ViewStyle;
  activeSection: ViewStyle;
  telemetryCard: ViewStyle;
  telemetryTitle: TextStyle;
  telemetryContent: TextStyle;
  footer: ViewStyle;
  lockButton: ViewStyle;
  lockText: TextStyle;
}

const createStyles = (theme: ReturnType<typeof useThemeContext>) =>
  StyleSheet.create<SidebarStyles>({
    modalContainer: { flex: 1, flexDirection: 'row' },
    backdrop: { ...StyleSheet.absoluteFillObject, backgroundColor: theme.colors.backdrop },
    drawer: {
      position: 'absolute',
      left: 0,
      width: SCREEN_WIDTH * 0.8,
      maxWidth: 360,
      backgroundColor: theme.colors.surface,
      borderRightWidth: 1,
      borderColor: theme.colors.outlineVariant,
      borderTopRightRadius: theme.roundness.xl,
      paddingHorizontal: theme.spacing.md,
      paddingTop: theme.spacing.sm + 4,
      shadowColor: '#000',
      shadowOffset: { width: 10, height: 0 },
      shadowOpacity: 0.3,
      shadowRadius: 20,
      elevation: 10,
    },
    header: { marginBottom: theme.spacing.lg, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
    brandTitle: { ...theme.typography.displayLg, color: theme.colors.primary, marginBottom: theme.spacing.xs, lineHeight: 48 },
    proText: { ...theme.typography.titleSm, color: theme.colors.onSurfaceVariant, lineHeight: 22 },
    statusRow: { flexDirection: 'row', alignItems: 'center', gap: theme.spacing.xs },
    statusDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: theme.colors.emerald },
    statusText: { ...theme.typography.labelCaps, color: theme.colors.onSurfaceVariant, lineHeight: 16 },
    closeButton: { padding: theme.spacing.xs, marginRight: -16, marginTop: -8 },
    scrollArea: { flex: 1 },
    navGroup: { gap: theme.spacing.unit },
    activeSection: { marginVertical: theme.spacing.unit },
    telemetryCard: { marginLeft: 44, backgroundColor: theme.colors.surfaceContainerLow, borderWidth: 1, borderColor: theme.colors.outlineVariant, borderRadius: theme.roundness.sm, padding: theme.spacing.xs, marginTop: 4 },
    telemetryTitle: { ...theme.typography.labelCaps, color: theme.colors.onSurfaceVariant, marginBottom: 4, lineHeight: 16 },
    telemetryContent: { fontSize: 10, color: theme.colors.primary, fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace', letterSpacing: 1, lineHeight: 14 },
    footer: { marginTop: 'auto', paddingTop: theme.spacing.md, borderTopWidth: 1, borderTopColor: theme.colors.innerStroke },
    lockButton: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: theme.spacing.xs, paddingVertical: theme.spacing.sm },
    lockText: { ...theme.typography.labelCaps, color: theme.colors.onSurfaceVariant, lineHeight: 16 },
  });