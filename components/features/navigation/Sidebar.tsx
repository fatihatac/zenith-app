import { Activity, Cloud, Database, Lock, LucideIcon, Palette, X, Zap } from 'lucide-react-native';
import {
  Dimensions,
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
import { theme } from '../../../constants/theme';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const insets = useSafeAreaInsets();

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
          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={styles.brandTitle}>
                ZENITH <Text style={styles.proText}>PRO</Text>
              </Text>
              <View style={styles.statusRow}>
                <View style={styles.statusDot} />
                <Text style={styles.statusText}>E2E Encryption Active</Text>
              </View>
            </View>
            <Pressable onPress={onClose} style={styles.closeButton}>
              <X color={theme.colors.onSurfaceVariant} size={24} />
            </Pressable>
          </View>

          {/* Navigation List */}
          <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollArea}>
            <View style={styles.navGroup}>
              <SidebarItem icon={Cloud} label="Account & Sync" />
              <SidebarItem icon={Database} label="Data Sources & API" />

              <View style={styles.activeSection}>
                <SidebarItem icon={Activity} label="Engine & Telemetry" active />
                <View style={styles.telemetryCard}>
                  <Text style={styles.telemetryTitle}>Telemetry Data</Text>
                  <Text style={styles.telemetryContent}>
                    CPU: 45°C | TPL: Active | FIVR: -50mV
                  </Text>
                </View>
              </View>

              <SidebarItem icon={Zap} label="Focus Automations" />
              <SidebarItem icon={Palette} label="Appearance" />
            </View>
          </ScrollView>

          {/* Footer */}
          <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 20) }]}>
            <Pressable style={styles.lockButton}>
              <Lock color={theme.colors.onSurfaceVariant} size={18} strokeWidth={2} />
              <Text style={styles.lockText}>Lock Vault & Exit</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  active?: boolean;
}

const SidebarItem = ({ icon: Icon, label, active = false }: SidebarItemProps) => (
  <Pressable style={[styles.navItem, active && styles.activeNavItem]}>
    <Icon
      color={active ? theme.colors.onPrimaryContainer : theme.colors.onSurfaceVariant}
      size={24}
      strokeWidth={active ? 2 : 1.5}
    />
    <Text style={[styles.navLabel, active && styles.activeNavLabel]}>{label}</Text>
  </Pressable>
);

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
  navItem: ViewStyle;
  activeNavItem: ViewStyle;
  navLabel: TextStyle;
  activeNavLabel: TextStyle;
  activeSection: ViewStyle;
  telemetryCard: ViewStyle;
  telemetryTitle: TextStyle;
  telemetryContent: TextStyle;
  footer: ViewStyle;
  lockButton: ViewStyle;
  lockText: TextStyle;
}

const styles = StyleSheet.create<SidebarStyles>({
  modalContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: theme.colors.backdrop,
  },
  drawer: {
    position: 'absolute',
    left: 0,
    width: SCREEN_WIDTH * 0.8,
    maxWidth: 360,
    backgroundColor: theme.colors.surface,
    borderRightWidth: 1,
    borderColor: theme.colors.outlineVariant,
    borderTopRightRadius: theme.roundness.xl,
    borderBottomRightRadius: 0,
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 10, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  header: {
    marginBottom: theme.spacing.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  brandTitle: {
    ...theme.typography.displayLg,
    color: theme.colors.primary,
    marginBottom: theme.spacing.xs,
    lineHeight: 48, // Increased to avoid clipping (fontSize is 40)
  },
  proText: {
    ...theme.typography.titleSm,
    color: theme.colors.onSurfaceVariant,
    lineHeight: 22,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.emerald,
    shadowColor: theme.colors.emerald,
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 4,
  },
  statusText: {
    ...theme.typography.labelCaps,
    color: theme.colors.onSurfaceVariant,
    lineHeight: 16, // Increased from 12
  },
  closeButton: {
    padding: 8,
    marginRight: -16,
    marginTop: -8,
  },
  scrollArea: {
    flex: 1,
  },
  navGroup: {
    gap: 4,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 12,
    borderRadius: theme.roundness.default,
  },
  activeNavItem: {
    backgroundColor: theme.colors.primaryContainer,
  },
  navLabel: {
    ...theme.typography.titleSm,
    color: theme.colors.onSurfaceVariant,
    lineHeight: 22,
  },
  activeNavLabel: {
    color: theme.colors.onPrimaryContainer,
    fontWeight: '700',
  },
  activeSection: {
    marginVertical: 4,
  },
  telemetryCard: {
    marginLeft: 44,
    backgroundColor: theme.colors.surfaceContainerLow,
    borderWidth: 1,
    borderColor: theme.colors.outlineVariant,
    borderRadius: theme.roundness.sm,
    padding: theme.spacing.xs,
    marginTop: 4,
  },
  telemetryTitle: {
    ...theme.typography.labelCaps,
    color: theme.colors.onSurfaceVariant,
    marginBottom: 4,
    lineHeight: 16,
  },
  telemetryContent: {
    fontSize: 10,
    color: theme.colors.primary,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    letterSpacing: 1,
    lineHeight: 14,
  },
  footer: {
    marginTop: 'auto',
    paddingTop: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.innerStroke,
  },
  lockButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 16,
  },
  lockText: {
    ...theme.typography.labelCaps,
    color: theme.colors.onSurfaceVariant,
    lineHeight: 16,
  },
});
