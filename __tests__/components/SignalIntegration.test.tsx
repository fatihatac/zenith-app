// ─── Signal Integration Tests ─────────────────────────────────────────
// Mocks signalRepo at the data layer so real store actions and component
// filtering/search/press flows are exercised end-to-end.

const asyncStorageStore: Record<string, string> = {};

jest.mock('@/services/signalService', () => ({
  signalRepo: { getSignals: jest.fn() },
}));

jest.mock('@react-native-async-storage/async-storage', () => ({
  __esModule: true,
  default: {
    setItem: jest.fn((key: string, value: string) => {
      asyncStorageStore[key] = value;
      return Promise.resolve();
    }),
    getItem: jest.fn((key: string) =>
      Promise.resolve(asyncStorageStore[key] ?? null),
    ),
    removeItem: jest.fn((key: string) => {
      delete asyncStorageStore[key];
      return Promise.resolve();
    }),
    clear: jest.fn(() => {
      Object.keys(asyncStorageStore).forEach(
        (key) => delete asyncStorageStore[key],
      );
      return Promise.resolve();
    }),
  },
}));

jest.mock('@/contexts/ThemeContext', () => ({
  useThemeContext: () => {
    const { theme } = require('@/constants/theme');
    return theme;
  },
}));

jest.mock('@/store/appearanceStore', () => ({
  useAppearanceStore: () => ({ visualEffects: 'minimal' }),
}));

jest.mock('expo-web-browser', () => ({
  openBrowserAsync: jest.fn().mockResolvedValue({ type: 'success' }),
}));

import React from 'react';
import { ActivityIndicator } from 'react-native';
import { render, fireEvent, act } from '@testing-library/react-native';
import SignalScreen from '@/app/(tabs)/signal';
import { useSignalStore } from '@/store/signalStore';
import { signalRepo } from '@/services/signalService';
import type { FeedItem } from '@/types/signal';

const mockGetSignals = signalRepo.getSignals as jest.Mock;

// ─── Helpers ──────────────────────────────────────────────────────────

function createMockFeed(
  id: string,
  category: string,
  title: string,
  description: string,
  overrides: Partial<FeedItem> = {},
): FeedItem {
  return {
    id,
    sourceId: `${id}-source`,
    sourceName: `${category} Source`,
    category,
    title,
    description,
    link: `https://example.com/${id}`,
    pubDate: Date.now(),
    guid: `guid-${id}`,
    isRead: false,
    ...overrides,
  };
}

// ─── Tests ────────────────────────────────────────────────────────────

describe('SignalIntegration', () => {
  jest.setTimeout(15000);

  beforeEach(() => {
    jest.clearAllMocks();
    mockGetSignals.mockReset();
    useSignalStore.setState(useSignalStore.getInitialState());
    Object.keys(asyncStorageStore).forEach(
      (key) => delete asyncStorageStore[key],
    );
  });

  // ─── 1. Combined filtering ──────────────────────────────────────────

  it('combined filtering with category and search works correctly', async () => {
    const feeds = [
      createMockFeed('1', 'Technology', 'React Native Guide', 'Learn RN'),
      createMockFeed('2', 'Crypto', 'Bitcoin Update', 'BTC price rally'),
      createMockFeed('3', 'Technology', 'TypeScript Tips', 'Advanced TS'),
      createMockFeed('4', 'Crypto', 'Ethereum News', 'ETH 2.0 upgrade'),
    ];
    mockGetSignals.mockResolvedValue({ items: feeds, errors: [] });

    // Pre-populate store so fetchFeeds TTL check skips the async call
    useSignalStore.setState({
      feeds,
      lastFetchedAt: Date.now(),
    });

    const { getByText, getByPlaceholderText, queryByText } = render(
      <SignalScreen />,
    );

    expect(getByText('React Native Guide')).toBeTruthy();
    expect(getByText('Bitcoin Update')).toBeTruthy();
    expect(getByText('TypeScript Tips')).toBeTruthy();
    expect(getByText('Ethereum News')).toBeTruthy();

    // Filter by Technology category
    fireEvent.press(getByText('Technology'));

    expect(getByText('React Native Guide')).toBeTruthy();
    expect(getByText('TypeScript Tips')).toBeTruthy();
    expect(queryByText('Bitcoin Update')).toBeNull();
    expect(queryByText('Ethereum News')).toBeNull();

    // Search "Bitcoin" within Technology — should show nothing
    fireEvent.changeText(
      getByPlaceholderText('Search feeds...'),
      'Bitcoin',
    );
    expect(queryByText('React Native Guide')).toBeNull();
    expect(queryByText('TypeScript Tips')).toBeNull();

    // Clear search — tech feeds return
    fireEvent.changeText(getByPlaceholderText('Search feeds...'), '');
    expect(getByText('React Native Guide')).toBeTruthy();
    expect(getByText('TypeScript Tips')).toBeTruthy();

    // Switch to All — all feeds return
    fireEvent.press(getByText('All'));
    expect(getByText('React Native Guide')).toBeTruthy();
    expect(getByText('Bitcoin Update')).toBeTruthy();
    expect(getByText('TypeScript Tips')).toBeTruthy();
    expect(getByText('Ethereum News')).toBeTruthy();
  });

  // ─── 2. Error banners + dismiss ─────────────────────────────────────

  it('shows error banners for failed sources and dismisses them', async () => {
    const feeds = [
      createMockFeed('1', 'Technology', 'Working Feed', 'Still loads'),
    ];

    useSignalStore.setState({
      feeds,
      sourceErrors: {
        hackernews: 'HTTP 500',
        techcrunch: 'Timeout',
      },
      lastFetchedAt: Date.now(),
    });

    const { getByText, queryByText } = render(<SignalScreen />);

    // Both error banners visible
    expect(getByText('Hacker News Failed')).toBeTruthy();
    expect(getByText('TechCrunch Failed')).toBeTruthy();

    // Dismiss one specific source error
    act(() => {
      useSignalStore.getState().clearError('hackernews');
    });
    await new Promise((resolve) => setTimeout(resolve, 50));

    expect(queryByText('Hacker News Failed')).toBeNull();
    expect(getByText('TechCrunch Failed')).toBeTruthy();

    // Dismiss all remaining errors
    act(() => {
      useSignalStore.getState().clearError();
    });
    await new Promise((resolve) => setTimeout(resolve, 50));

    expect(queryByText('TechCrunch Failed')).toBeNull();
    expect(queryByText('Hacker News Failed')).toBeNull();
  });

  // ─── 3. Empty + loading states ─────────────────────────────────────

  it('shows empty state and loading indicator', async () => {
    // Start with feeds already loaded (empty), skip async fetchFeeds
    useSignalStore.setState({
      feeds: [],
      lastFetchedAt: Date.now(),
    });

    const { getByText, UNSAFE_getAllByType, queryByText } = render(
      <SignalScreen />,
    );
    expect(getByText('No feeds available')).toBeTruthy();

    // Set loading with empty feeds — ActivityIndicator should appear,
    // empty message hidden
    act(() => {
      useSignalStore.setState({ loading: true, feeds: [] });
    });
    await new Promise((resolve) => setTimeout(resolve, 50));

    const indicators = UNSAFE_getAllByType(ActivityIndicator);
    expect(indicators.length).toBeGreaterThanOrEqual(1);
    expect(queryByText('No feeds available')).toBeNull();

    // Back to not-loading — empty message returns
    act(() => {
      useSignalStore.setState({ loading: false });
    });
    await new Promise((resolve) => setTimeout(resolve, 50));

    expect(getByText('No feeds available')).toBeTruthy();
  });

  // ─── 4. Read tracking via tap ───────────────────────────────────────

  it('marks feed as read when card is tapped', async () => {
    const feeds = [
      createMockFeed('1', 'Technology', 'Readable Article', 'Tap to read'),
    ];

    useSignalStore.setState({
      feeds,
      lastFetchedAt: Date.now(),
    });

    const { getByText } = render(<SignalScreen />);

    // Verify unread initially
    expect(useSignalStore.getState().feeds[0].isRead).toBe(false);

    // Tap the card's title
    fireEvent.press(getByText('Readable Article'));

    // Flush async chain (openBrowserAsync → onMarkRead → store update)
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Verify read state changed in the store
    expect(useSignalStore.getState().feeds[0].isRead).toBe(true);
  });

  // ─── 5. Pull-to-refresh ─────────────────────────────────────────────

  it('loads new data on refresh', async () => {
    const feedB = [
      createMockFeed('2', 'Crypto', 'Refreshed Feed', 'After refresh'),
    ];

    // Pre-populate store with initial data; refreshFeeds will call mock
    useSignalStore.setState({
      feeds: [
        createMockFeed('1', 'Technology', 'First Feed', 'Initial load'),
      ],
      lastFetchedAt: Date.now(),
    });

    mockGetSignals.mockResolvedValue({ items: feedB, errors: [] });

    const { getByText, queryByText } = render(<SignalScreen />);

    // Trigger refresh via the store
    await act(async () => {
      await useSignalStore.getState().refreshFeeds();
    });

    // Store already updated; component re-rendered inside act()
    expect(getByText('Refreshed Feed')).toBeTruthy();
    expect(queryByText('First Feed')).toBeNull();
  });

  // ─── 6. FlatList ListEmptyComponent ─────────────────────────────────

  it('shows "No results found" when search has no matches', async () => {
    const feeds = [
      createMockFeed('1', 'Technology', 'React Article', 'React stuff'),
      createMockFeed('2', 'Crypto', 'Bitcoin News', 'BTC stuff'),
    ];

    useSignalStore.setState({
      feeds,
      lastFetchedAt: Date.now(),
    });

    const { getByText, getByPlaceholderText } = render(<SignalScreen />);

    // Search for term that matches nothing
    fireEvent.changeText(
      getByPlaceholderText('Search feeds...'),
      'NonExistentTerm',
    );

    expect(getByText('No results found')).toBeTruthy();
  });
});
