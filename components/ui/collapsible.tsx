import { ChevronRight } from 'lucide-react-native'; // IconSymbol yerine standart Lucide kullanıyoruz
import { PropsWithChildren, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { theme } from '../../constants/theme';

export function Collapsible({ children, title }: PropsWithChildren & { title: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.heading}
        onPress={() => setIsOpen((value) => !value)}
        activeOpacity={0.7}>
        <ChevronRight
          size={18}
          color={theme.colors.onSurfaceVariant}
          style={{ transform: [{ rotate: isOpen ? '90deg' : '0deg' }] }}
        />
        <View style={styles.textWrapper}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </TouchableOpacity>
      {isOpen && <View style={styles.content}>{children}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.sm,
  },
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 8,
  },
  textWrapper: {
    flex: 1,
  },
  title: {
    ...theme.typography.titleSm,
    color: theme.colors.primary,
  },
  content: {
    marginTop: 4,
    marginLeft: 26,
    paddingLeft: 12,
    borderLeftWidth: 1,
    borderLeftColor: theme.colors.innerStroke,
  },
});