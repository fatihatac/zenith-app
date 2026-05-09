import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { VaultItemRow } from '../../components/features/vault/VaultItemRow';
import { VaultStatusCard } from '../../components/features/vault/VaultStatusCard';
import { theme } from '../../constants/theme';
import { useVault } from '../../hooks/useVault';

export default function VaultScreen() {
    const { items, status } = useVault();

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}
        >
            {/* Vault Status Card */}
            {status && <VaultStatusCard status={status} />}

            <Text style={styles.sectionTitle}>Secure Items</Text>

            {/* Encrypted Items List */}
            <View style={styles.listContainer}>
                {items.map((item) => (
                    <VaultItemRow key={item.id} item={item} />
                ))}
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
        paddingTop: 20,
        paddingHorizontal: theme.spacing.marginMobile, // 24px
        paddingBottom: 120,
    },
    sectionTitle: {
        ...theme.typography.labelCaps,
        color: theme.colors.onSurfaceVariant,
        textTransform: 'uppercase',
        paddingLeft: 8,
        marginTop: 32,
        marginBottom: 12,
    },
    listContainer: {
        flexDirection: 'column',
        gap: 12,
    },
});