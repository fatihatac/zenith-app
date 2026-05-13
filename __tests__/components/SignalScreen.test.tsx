jest.mock('@/hooks/useSignals', () => ({
  useSignals: jest.fn(),
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
  openBrowserAsync: jest.fn(),
}));

import React from 'react';
import { ActivityIndicator, RefreshControl } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';
import SignalScreen from '@/app/(tabs)/signal';
import { useSignals } from '@/hooks/useSignals';
import { FeedItem } from '@/types/signal';

const mockUseSignals = useSignals as jest.Mock;

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

function buildMockReturnValue(overrides: Record<string, unknown> = {}) {
  return {
    feeds: [],
    loading: false,
    refreshing: false,
    error: null,
    sourceErrors: {},
    isFromCache: false,
    refresh: jest.fn(),
    clearError: jest.fn(),
    markAsRead: jest.fn(),
    ...overrides,
  };
}

describe('SignalScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows loading indicator when loading with no feeds', () => {
    mockUseSignals.mockReturnValue(
      buildMockReturnValue({ loading: true, feeds: [] }),
    );

    const { UNSAFE_getAllByType } = render(<SignalScreen />);
    const indicators = UNSAFE_getAllByType(ActivityIndicator);
    expect(indicators.length).toBeGreaterThanOrEqual(1);
  });

  it('shows error text when error occurs and no feeds loaded', () => {
    mockUseSignals.mockReturnValue(
      buildMockReturnValue({ error: 'Failed to load feeds', feeds: [] }),
    );

    const { getByText } = render(<SignalScreen />);
    expect(getByText('Failed to load feeds')).toBeTruthy();
  });

  it('shows "No feeds available" when there are no feeds and not loading', () => {
    mockUseSignals.mockReturnValue(
      buildMockReturnValue({ feeds: [], loading: false, error: null }),
    );

    const { getByText } = render(<SignalScreen />);
    expect(getByText('No feeds available')).toBeTruthy();
  });

  it('renders SignalCard components for each feed', () => {
    const feeds = [
      createMockFeed('1', 'Technology', 'Tech Article One', 'Tech description'),
      createMockFeed('2', 'Technology', 'Tech Article Two', 'Another description'),
    ];
    mockUseSignals.mockReturnValue(buildMockReturnValue({ feeds }));

    const { getByText } = render(<SignalScreen />);
    expect(getByText('Tech Article One')).toBeTruthy();
    expect(getByText('Tech Article Two')).toBeTruthy();
  });

  it('renders category tabs with unique categories from RSS_SOURCES', () => {
    mockUseSignals.mockReturnValue(buildMockReturnValue());

    const { getByText } = render(<SignalScreen />);
    expect(getByText('All')).toBeTruthy();
    expect(getByText('Technology')).toBeTruthy();
    expect(getByText('Crypto')).toBeTruthy();
  });

  it('filters feeds when a category tab is pressed', () => {
    const feeds = [
      createMockFeed('1', 'Technology', 'Tech Article', 'A tech article'),
      createMockFeed('2', 'Crypto', 'Crypto Article', 'A crypto article'),
    ];
    mockUseSignals.mockReturnValue(buildMockReturnValue({ feeds }));

    const { getByText, queryByText } = render(<SignalScreen />);

    // Both feeds visible initially
    expect(getByText('Tech Article')).toBeTruthy();
    expect(getByText('Crypto Article')).toBeTruthy();

    // Press the "Crypto" category tab
    fireEvent.press(getByText('Crypto'));

    // Only Crypto feed should remain
    expect(getByText('Crypto Article')).toBeTruthy();
    expect(queryByText('Tech Article')).toBeNull();
  });

  it('filters feeds when search query is entered', () => {
    const feeds = [
      createMockFeed('1', 'Technology', 'React Native Guide', 'Learn React Native'),
      createMockFeed('2', 'Crypto', 'Bitcoin Update', 'Bitcoin price update'),
    ];
    mockUseSignals.mockReturnValue(buildMockReturnValue({ feeds }));

    const { getByText, getByPlaceholderText, queryByText } = render(<SignalScreen />);

    // Both feeds visible initially
    expect(getByText('React Native Guide')).toBeTruthy();
    expect(getByText('Bitcoin Update')).toBeTruthy();

    // Type search query
    fireEvent.changeText(getByPlaceholderText('Search feeds...'), 'Bitcoin');

    // Only matching feed should remain
    expect(getByText('Bitcoin Update')).toBeTruthy();
    expect(queryByText('React Native Guide')).toBeNull();
  });

  it('applies combined category and search filtering', () => {
    const feeds = [
      createMockFeed('1', 'Technology', 'TypeScript Tips', 'TypeScript programming'),
      createMockFeed('2', 'Technology', 'React Tutorial', 'React for beginners'),
      createMockFeed('3', 'Crypto', 'Ethereum News', 'Ethereum updates'),
    ];
    mockUseSignals.mockReturnValue(buildMockReturnValue({ feeds }));

    const { getByText, getByPlaceholderText, queryByText } = render(<SignalScreen />);

    // Select "Technology" category
    fireEvent.press(getByText('Technology'));

    // Only Technology feeds visible
    expect(getByText('TypeScript Tips')).toBeTruthy();
    expect(getByText('React Tutorial')).toBeTruthy();
    expect(queryByText('Ethereum News')).toBeNull();

    // Add search query
    fireEvent.changeText(getByPlaceholderText('Search feeds...'), 'React');

    // Only matching Technology feed
    expect(getByText('React Tutorial')).toBeTruthy();
    expect(queryByText('TypeScript Tips')).toBeNull();
  });

  it('renders ErrorBanner for source errors', () => {
    mockUseSignals.mockReturnValue(
      buildMockReturnValue({
        feeds: [],
        sourceErrors: { arstechnica: 'Failed to fetch' },
        error: null,
      }),
    );

    const { getByText } = render(<SignalScreen />);
    expect(getByText('Ars Technica Failed')).toBeTruthy();
    expect(getByText('Failed to fetch')).toBeTruthy();
  });

  it('calls refresh function when pull-to-refresh is triggered', () => {
    const refreshMock = jest.fn();
    mockUseSignals.mockReturnValue(
      buildMockReturnValue({ refresh: refreshMock, refreshing: false }),
    );

    const { UNSAFE_getAllByType } = render(<SignalScreen />);
    const refreshControls = UNSAFE_getAllByType(RefreshControl);
    expect(refreshControls.length).toBeGreaterThanOrEqual(1);

    refreshControls[0].props.onRefresh();
    expect(refreshMock).toHaveBeenCalledTimes(1);
  });
});
