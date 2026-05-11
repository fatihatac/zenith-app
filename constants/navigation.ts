import { Activity, Cloud, Compass, Database, Home, LineChart, Lock, LucideIcon, Palette, Zap } from 'lucide-react-native';

export interface TabConfig {
  icon: LucideIcon;
  label: string;
  route: string;
}

export const TAB_CONFIG: Record<string, TabConfig> = {
  index: {
    icon: Home,
    label: 'Home',
    route: '/',
  },
  signal: {
    icon: Compass,
    label: 'Signal',
    route: '/signal',
  },
  markets: {
    icon: LineChart,
    label: 'Markets',
    route: '/markets',
  },
  vault: {
    icon: Lock,
    label: 'Vault',
    route: '/vault',
  },
};

export interface SidebarItemConfig {
  icon: LucideIcon;
  label: string;
  route: string;
  expandableContent?: {
    title: string;
    content: string;
  };
}

export const SIDEBAR_ITEMS: SidebarItemConfig[] = [
  {
    icon: Cloud,
    label: 'Account & Sync',
    route: '/settings/account',
  },
  {
    icon: Database,
    label: 'Data Sources & API',
    route: '/settings/api',
  },
  {
    icon: Activity,
    label: 'Engine & Telemetry',
    route: '/settings/telemetry',
    expandableContent: {
      title: 'Telemetry Data',
      content: 'CPU: 45°C | TPL: Active | FIVR: -50mV',
    },
  },
  {
    icon: Zap,
    label: 'Focus Automations',
    route: '/settings/automations',
  },
  {
    icon: Palette,
    label: 'Appearance',
    route: '/settings/appearance',
  },
];
