export interface VaultItem {
  id: string;
  title: string;
  subtitle: string;
  icon: 'key' | 'file-text' | 'folder-open';
}

export interface VaultStatus {
  title: string;
  status: string;
  isActive: boolean;
}
