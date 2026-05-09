import { useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '../../../constants/theme';

export const SubHeader = ({ title }: { title: string }) => {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const handleBack = () => {
        router.back();
    };

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <View style={styles.content}>
                <Pressable onPress={handleBack} style={styles.backButton}>
                    <ChevronLeft color={theme.colors.primary} size={28} />
                    <Text style={styles.backText}>BACK</Text>
                </Pressable>
                <Text style={styles.title}>{title.toUpperCase()}</Text>
                <View style={{ width: 80 }} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { backgroundColor: theme.colors.background, borderBottomWidth: 1, borderBottomColor: theme.colors.innerStroke },
    content: { height: 56, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16 },
    backButton: { flexDirection: 'row', alignItems: 'center', width: 80 },
    backText: { ...theme.typography.labelCaps, color: theme.colors.primary, marginLeft: -4 },
    title: { ...theme.typography.titleSm, color: theme.colors.onSurfaceVariant, fontSize: 13, letterSpacing: 1 },
});