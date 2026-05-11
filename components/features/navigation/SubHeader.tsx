import { useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useThemeContext } from '@/contexts/ThemeContext';
import { useMemo } from 'react';

interface SubHeaderProps {
    title: string;
    showBack?: boolean;
}

export const SubHeader = ({ title, showBack = true }: SubHeaderProps) => {
    const theme = useThemeContext();
    const styles = useMemo(() => createStyles(theme), [theme]);
    const router = useRouter();
    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <View style={styles.content}>
                {showBack && (
                    <Pressable onPress={() => router.back()} style={styles.backButton}>
                        <ChevronLeft color={theme.colors.primary} size={28} />
                        <Text style={styles.backText}>BACK</Text>
                    </Pressable>
                )}
                <Text style={styles.title}>{title.toUpperCase()}</Text>
                {showBack && <View style={{ width: 80 }} />}
            </View>
        </View>
    );
};

const createStyles = (theme: ReturnType<typeof useThemeContext>) =>
  StyleSheet.create({
    container: {
        backgroundColor: theme.colors.background,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.innerStroke,
    },
    content: {
        height: 56,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
    },
    backButton: { flexDirection: 'row', alignItems: 'center', width: 80 },
    backText: { ...theme.typography.labelCaps, color: theme.colors.primary, marginLeft: -4 },
    title: {
        ...theme.typography.titleSm,
        color: theme.colors.onSurfaceVariant,
        fontSize: 13,
        letterSpacing: 1,
    },
});