import { useMemo } from 'react';
import { Cloud, ShieldCheck } from 'lucide-react-native';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SystemLogItem } from '@/components/features/focus/SystemLogItem';
import { WorkSessionWidget } from '@/components/features/focus/WorkSessionWidget';
import { useThemeContext } from '@/contexts/ThemeContext';

export default function FocusScreen() {
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
    logSection: {
      marginTop: theme.spacing.lg,
    },
    sectionHeader: {
      ...theme.typography.titleSm,
      color: theme.colors.primary,
      marginBottom: theme.spacing.sm,
    },
  }), [theme]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <WorkSessionWidget />

      <View style={styles.logSection}>
        <Text style={styles.sectionHeader}>System Log</Text>
        <SystemLogItem
          icon={Cloud}
          title="Backup Completed"
          description="System vault encrypted and synced."
          time="10m ago"
        />
        <SystemLogItem
          icon={ShieldCheck}
          title="New Device Authorized"
          description="MacBook Pro (14-inch, 2023) added to trusted keys."
          time="2h ago"
        />
      </View>
    </ScrollView>
  );
}

