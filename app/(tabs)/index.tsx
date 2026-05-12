import { useMemo, useState } from 'react';
import { Cloud, ShieldCheck, Brain, Coffee, Moon, Timer, XCircle } from 'lucide-react-native';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SystemLogItem } from '@/components/features/focus/SystemLogItem';
import { WorkSessionWidget } from '@/components/features/focus/WorkSessionWidget';
import FocusConfigModal from '@/components/features/focus/FocusConfigModal';
import { useThemeContext } from '@/contexts/ThemeContext';
import { useFocusStore } from '@/store/focusStore';
import type { FocusSessionRecord, FocusSessionType } from '@/types/focus';

const SESSION_ICONS: Record<FocusSessionType, typeof Brain> = {
  focus: Brain,
  shortBreak: Coffee,
  longBreak: Moon,
};

const SESSION_LABELS: Record<FocusSessionType, string> = {
  focus: 'Focus Session',
  shortBreak: 'Short Break',
  longBreak: 'Long Break',
};

function getRelativeTime(timestamp: number): string {
  const diff = Date.now() - timestamp;
  const sec = Math.floor(diff / 1000);
  if (sec < 60) return 'just now';
  const min = Math.floor(sec / 60);
  if (min < 60) return `${min}m ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}h ago`;
  const day = Math.floor(hr / 24);
  return `${day}d ago`;
}

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

export default function FocusScreen() {
  const theme = useThemeContext();
  const sessionHistory = useFocusStore((s) => s.sessionHistory);
  const [configVisible, setConfigVisible] = useState(false);

  const recentSessions = useMemo(() => sessionHistory.slice(0, 5), [sessionHistory]);

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
    headerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: theme.spacing.sm,
    },
    sectionHeader: {
      ...theme.typography.titleSm,
      color: theme.colors.primary,
    },
    logSection: {
      marginTop: theme.spacing.lg,
    },
  }), [theme]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <WorkSessionWidget onSettingsPress={() => setConfigVisible(true)} />

      <View style={styles.logSection}>
        <View style={styles.headerRow}>
          <Text style={styles.sectionHeader}>System Log</Text>
        </View>

        {/* Dynamic session history */}
        {recentSessions.map((record: FocusSessionRecord) => {
          const IconComponent = SESSION_ICONS[record.type] ?? Timer;
          const title = record.completed
            ? `${SESSION_LABELS[record.type]} � ${formatDuration(record.plannedDuration)}`
            : `${SESSION_LABELS[record.type]} Cancelled`;
          const description = record.completed
            ? `Completed full session`
            : `Stopped after ${formatDuration(Math.floor((record.endTime - record.startTime) / 1000))}`;
          return (
            <SystemLogItem
              key={record.id}
              icon={IconComponent}
              title={title}
              description={description}
              time={getRelativeTime(record.startTime)}
            />
          );
        })}

        {/* Static system log items */}
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

      <FocusConfigModal visible={configVisible} onClose={() => setConfigVisible(false)} />
    </ScrollView>
  );
}