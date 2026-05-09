import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SystemLogItem } from '../../components/features/focus/SystemLogItem';
import { WorkSessionWidget } from '../../components/features/focus/WorkSessionWidget';
import { theme } from '../../constants/theme';

export default function FocusScreen() {
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
          icon="cloud"
          title="Backup Completed"
          description="System vault encrypted and synced."
          time="10m ago"
        />
        <SystemLogItem
          icon="shield"
          title="New Device Authorized"
          description="MacBook Pro (14-inch, 2023) added to trusted keys."
          time="2h ago"
        />
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
    paddingTop: 20, // Header mesafesi
    paddingHorizontal: theme.spacing.marginMobile, // 24px
    paddingBottom: 120, // Bottom bar mesafesi
  },
  logSection: {
    marginTop: theme.spacing.lg, // 40px (Vertical Rhythm)
  },
  sectionHeader: {
    ...theme.typography.titleSm,
    color: theme.colors.primary,
    marginBottom: theme.spacing.sm,
  },
});