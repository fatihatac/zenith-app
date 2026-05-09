import { Activity, Cloud, Database, Lock, Palette, X, Zap } from 'lucide-react-native';
import React from 'react';
import {
  Dimensions,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '../../../constants/theme';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const insets = useSafeAreaInsets();

  return (
    <Modal
      visible={isOpen}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent={true} // Arka planın kararması için true kalmalı
    >
      <View style={styles.modalContainer}>
        {/* Backdrop (Arka planı karartan alan) */}
        <Pressable style={styles.backdrop} onPress={onClose} />

        {/* Drawer Container - DÜZELTME: Dinamik Konumlandırma */}
        <View
          style={[
            styles.drawer,
            {
              // Çekmeceyi sistem çubuğunun bittiği yerden başlatıyoruz
              top: insets.top,
              // Boyunu kalan ekran kadar ayarlıyoruz
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

          {/* Footer - Güvenli Alan Payı (insets.bottom) */}
          <View style={[styles.footer, { paddingBottom: insets.bottom > 0 ? insets.bottom : 20 }]}>
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

const SidebarItem = ({ icon: Icon, label, active = false }: any) => (
  <Pressable style={[styles.navItem, active && styles.activeNavItem]}>
    <Icon
      color={active ? theme.colors.onPrimaryContainer : theme.colors.onSurfaceVariant}
      size={24}
      strokeWidth={active ? 2 : 1.5}
    />
    <Text style={[styles.navLabel, active && styles.activeNavLabel]}>{label}</Text>
  </Pressable>
);

const styles = StyleSheet.create({
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
    backgroundColor: theme.colors.surface, // #131313
    borderRightWidth: 1,
    borderColor: theme.colors.outlineVariant, // #444748
    // DÜZELTME: Kavisler artık StatusBar'ın altında kalacak
    borderTopRightRadius: theme.roundness.xl, // 24px
    borderBottomRightRadius: 0, // Alt kısmı düz bırakmak daha "pro" durur
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.md, // İçerik boşluğu
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
    lineHeight: 44, // Kesilmeyi önler
  },
  proText: {
    ...theme.typography.titleSm,
    color: theme.colors.onSurfaceVariant,
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
  },
  telemetryContent: {
    fontSize: 10,
    color: theme.colors.primary,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    letterSpacing: 1,
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
  },
});